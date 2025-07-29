import { useState, useEffect, useCallback } from "react";
import { supabase } from "../data/supabaseClient";
import { parseISO, isBefore, isAfter, isToday } from "date-fns";
import type { ReservaItem } from "../componentes/ReservasTable";


export const useReservas = () => {
  const [reservas, setReservas] = useState<ReservaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reservaDetalle, setReservaDetalle] = useState<ReservaItem | null>(null);
  const [modalEliminar, setModalEliminar] = useState<ReservaItem | null>(null);
  const [filtros, setFiltros] = useState({ busqueda: "", estado: "todas" });

  useEffect(() => {
    cargarReservas();
  }, []);

  const cargarReservas = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("reservas")
        .select(`
          id, nombre, email, telefono, identificacion, fecha_inicio, fecha_fin, 
          estado, cabana_id, cantidad_personas,
          cabanas (id, nombre)
        `);

      if (error) {
        console.error("Error loading reservas:", error);
        setError("Error al cargar las reservas");
        return;
      }

      if (data) {
        const reservasFormateadas: ReservaItem[] = data.map((r: any) => ({
          id: r.id,
          nombre: r.nombre,
          email: r.email,
          telefono: r.telefono,
          identificacion: r.identificacion,
          fecha_inicio: r.fecha_inicio,
          fecha_fin: r.fecha_fin,
          estado: r.estado || "pendiente",
          cabana_id: r.cabana_id,
          cantidad_personas: r.cantidad_personas,
          cabana: r.cabanas?.nombre || `Cabaña ${r.cabana_id}`,
        }));
        setReservas(reservasFormateadas);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Error inesperado al cargar las reservas");
    } finally {
      setLoading(false);
    }
  };

  const eliminarReserva = async (id: number) => {
    try {
      setError(null);
      const { error } = await supabase.from("reservas").delete().eq("id", id);
      
      if (error) {
        console.error("Error deleting reserva:", error);
        setError("Error al eliminar la reserva");
        return;
      }

      setModalEliminar(null);
      cargarReservas();
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Error inesperado al eliminar la reserva");
    }
  };

  const actualizarEstadoReserva = async (id: number, nuevoEstado: string) => {
    try {
      setError(null);
      const { error } = await supabase
        .from("reservas")
        .update({ estado: nuevoEstado })
        .eq("id", id);

      if (error) {
        console.error("Error updating reserva:", error);
        setError("Error al actualizar la reserva");
        return;
      }

      cargarReservas();
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Error inesperado al actualizar la reserva");
    }
  };

  const reservasFiltradas = useCallback(() => {
    let resultado = [...reservas];

    // Filtro por búsqueda
    if (filtros.busqueda.trim()) {
      const q = filtros.busqueda.toLowerCase().trim();
      resultado = resultado.filter((r) =>
        r.nombre.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.identificacion.toLowerCase().includes(q) ||
        r.cabana.toLowerCase().includes(q)
      );
    }

    // Filtro por estado
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    switch (filtros.estado) {
      case "confirmadas":
        resultado = resultado.filter((r) => r.estado === "confirmada");
        break;
      case "pendientes":
        resultado = resultado.filter((r) => r.estado === "pendiente");
        break;
      case "encurso":
        resultado = resultado.filter((r) => {
          const inicio = parseISO(r.fecha_inicio);
          const fin = parseISO(r.fecha_fin);
          return (isBefore(inicio, hoy) || isToday(inicio)) && isAfter(fin, hoy);
        });
        break;
      case "completadas":
        resultado = resultado.filter((r) => isBefore(parseISO(r.fecha_fin), hoy));
        break;
      case "vencidas":
        resultado = resultado.filter((r) => {
          const fin = parseISO(r.fecha_fin);
          return isBefore(fin, hoy) && r.estado !== "completada";
        });
        break;
      default:
        // "todas" - no filter
        break;
    }

    return resultado;
  }, [reservas, filtros]);

  const estadisticas = useCallback(() => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const confirmadas = reservas.filter((r) => r.estado === "confirmada").length;
    const pendientes = reservas.filter((r) => r.estado === "pendiente").length;
    const canceladas = reservas.filter((r) => r.estado === "cancelada").length;
    
    const enCurso = reservas.filter((r) => {
      const inicio = parseISO(r.fecha_inicio);
      const fin = parseISO(r.fecha_fin);
      return (isBefore(inicio, hoy) || isToday(inicio)) && isAfter(fin, hoy);
    }).length;

    const completadas = reservas.filter((r) => {
      const fin = parseISO(r.fecha_fin);
      return isBefore(fin, hoy);
    }).length;

    const proximasLlegadas = reservas.filter((r) => {
      const inicio = parseISO(r.fecha_inicio);
      const enTresDias = new Date();
      enTresDias.setDate(enTresDias.getDate() + 3);
      return isAfter(inicio, hoy) && isBefore(inicio, enTresDias);
    }).length;

    return {
      total: reservas.length,
      confirmadas,
      pendientes,
      canceladas,
      enCurso,
      completadas,
      proximasLlegadas,
    };
  }, [reservas]);

  const buscarReservaPorId = useCallback((id: number) => {
    return reservas.find(r => r.id === id) || null;
  }, [reservas]);

  const limpiarFiltros = useCallback(() => {
    setFiltros({ busqueda: "", estado: "todas" });
  }, []);

  return {
    // Data
    reservas: reservasFiltradas(),
    loading,
    error,
    
    // Filters and search
    filtros,
    setFiltros,
    limpiarFiltros,
    
    // Modal states
    reservaDetalle,
    setReservaDetalle,
    modalEliminar,
    setModalEliminar,
    
    // Actions
    eliminarReserva,
    actualizarEstadoReserva,
    recargar: cargarReservas,
    
    // Computed data
    estadisticas,
    buscarReservaPorId,
  };
};