import type{ FC } from "react";

interface ConfirmarEliminacionProps {
  nombre: string;
  onCancelar: () => void;
  onConfirmar: () => void;
}

export const ConfirmarEliminacion: FC<ConfirmarEliminacionProps> = ({ nombre, onCancelar, onConfirmar }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">¿Eliminar reserva?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Estás a punto de eliminar la reserva de <span className="font-medium text-gray-800">{nombre}</span>. Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancelar}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
