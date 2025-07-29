import type { FC } from "react";

interface FiltrosProps {
  filtros: {
    busqueda: string;
    estado: string;
  };
  onBusquedaChange: (valor: string) => void;
  onEstadoChange: (valor: string) => void;
}

export const FiltrosReservas: FC<FiltrosProps> = ({ filtros, onBusquedaChange, onEstadoChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="relative w-full md:w-1/2">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre, email"
          value={filtros.busqueda}
          onChange={(e) => onBusquedaChange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="w-full md:w-auto">
        <select
          value={filtros.estado}
          onChange={(e) => onEstadoChange(e.target.value)}
          className="w-full md:w-auto border border-gray-300 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="todas">Todas las reservas</option>
          <option value="confirmadas">Confirmadas</option>
          <option value="pendientes">Pendientes</option>
          <option value="encurso">En curso</option>
          <option value="completadas">Completadas</option>
        </select>
      </div>
    </div>
  );
};
