// src/components/admin/index.ts
import { ReservasHeader } from "./ReservationsHeader";
import { EstadisticasPanel } from "./EstadisticasPanel";
import { FiltrosReservas } from "./FiltrosReservas";
import { ReservasTable } from "./ReservasTable";
import { ModalDetalleReserva } from "./ModalDetalleReserva";
import { ConfirmarEliminacion } from "./ConfirmarEliminacion";

import { useReservas } from "../hooks/useReservas";

export function AdminReservas() {
  const {
    reservas,
    filtros,
    setFiltros,
    loading,
    reservaDetalle,
    setReservaDetalle,
    modalEliminar,
    setModalEliminar,
    eliminarReserva,
    estadisticas,
    recargar,
  } = useReservas();

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <ReservasHeader />

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={recargar}
          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
        >
          🔄 Recargar
        </button>
      </div>

      <EstadisticasPanel {...estadisticas()} />

      <FiltrosReservas
        filtros={filtros}
        onBusquedaChange={(valor) => setFiltros({ ...filtros, busqueda: valor })}
        onEstadoChange={(valor) => setFiltros({ ...filtros, estado: valor })}
      />

      {loading ? (
        <div className="text-center py-12 text-gray-500">Cargando reservas...</div>
      ) : (
        <ReservasTable
          reservas={reservas}
          onVer={setReservaDetalle}
          onEliminar={setModalEliminar}
        />
      )}

      {reservaDetalle && (
        <ModalDetalleReserva
          reserva={reservaDetalle}
          onClose={() => setReservaDetalle(null)}
        />
      )}

      {modalEliminar && (
        <ConfirmarEliminacion
          nombre={modalEliminar.nombre}
          onCancelar={() => setModalEliminar(null)}
          onConfirmar={() => eliminarReserva(modalEliminar.id)}
        />
      )}
    </div>
  );
}
