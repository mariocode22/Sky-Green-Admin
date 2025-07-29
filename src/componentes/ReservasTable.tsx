import type { FC } from "react";
import { format } from "date-fns";
import { EstadoBadge } from "./EstadoBadge";

export interface ReservaItem {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  identificacion: string;
  cabana: string;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
}

interface ReservasTableProps {
  reservas: ReservaItem[];
  onVer: (reserva: ReservaItem) => void;
  onEliminar: (reserva: ReservaItem) => void;
}

export const ReservasTable: FC<ReservasTableProps> = ({ reservas, onVer, onEliminar }) => {
  return (
    <section className="bg-white rounded-xl shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Lista de Reservas ({reservas.length})</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="px-4 py-2">Cliente</th>
              <th className="px-4 py-2">Contacto</th>
              <th className="px-4 py-2">Cabaña</th>
              <th className="px-4 py-2">Fechas</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id} className="border-t hover:bg-gray-50 text-sm">
                <td className="px-4 py-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                    {reserva.nombre.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{reserva.nombre}</p>
                    <p className="text-gray-400 text-xs">ID: {reserva.identificacion}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p>{reserva.email}</p>
                  <p className="text-gray-500 text-xs">{reserva.telefono}</p>
                </td>
                <td className="px-4 py-3">
                  <span className="text-gray-700">🏕️ {reserva.cabana}</span>
                </td>
                <td className="px-4 py-3">
                  <p>{format(new Date(reserva.fecha_inicio), 'dd/MM/yyyy')}</p>
                  <p className="text-gray-500 text-xs">{format(new Date(reserva.fecha_fin), 'dd/MM/yyyy')}</p>
                </td>
                <td className="px-4 py-3">
                  <EstadoBadge estado={reserva.estado} />
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => onVer(reserva)}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-200"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => onEliminar(reserva)}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-red-200"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {reservas.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  No hay reservas para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
