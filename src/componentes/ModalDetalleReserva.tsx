import type { FC } from "react";
import { format } from "date-fns";
import type { ReservaItem } from "./ReservasTable";
import { EstadoBadge } from "./EstadoBadge";

interface ModalDetalleReservaProps {
  reserva: ReservaItem;
  onClose: () => void;
}

export const ModalDetalleReserva: FC<ModalDetalleReservaProps> = ({ reserva, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-lg overflow-y-auto max-h-[90vh] animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Detalle de la Reserva #{reserva.id}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4 text-sm text-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Nombre:</p>
              <p>{reserva.nombre}</p>
            </div>
            <div>
              <p className="font-semibold">Identificación:</p>
              <p>{reserva.identificacion}</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <p>{reserva.email}</p>
            </div>
            <div>
              <p className="font-semibold">Teléfono:</p>
              <p>{reserva.telefono}</p>
            </div>
            <div>
              <p className="font-semibold">Cabaña:</p>
              <p>{reserva.cabana}</p>
            </div>
            <div>
              <p className="font-semibold">Estado:</p>
              <EstadoBadge estado={reserva.estado} />
            </div>
            <div>
              <p className="font-semibold">Fecha de Inicio:</p>
              <p>{format(new Date(reserva.fecha_inicio), "dd/MM/yyyy")}</p>
            </div>
            <div>
              <p className="font-semibold">Fecha de Fin:</p>
              <p>{format(new Date(reserva.fecha_fin), "dd/MM/yyyy")}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
