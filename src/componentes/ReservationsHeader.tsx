import type{ FC } from "react";

export const ReservasHeader: FC = () => {
  return (
    <header className="bg-[#728b35] p-6 rounded-xl shadow-sm mb-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img src="/public/logo.png" alt="Logo" className="w-12 h-12 rounded-full bg-white" />
        <div>
          <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
          <p className="text-sm text-white">Gestión de Reservas - Sky Green</p>
        </div>
      </div>
      <div className="hidden md:block">
        <span className="text-sm text-white">Versión 1.0</span>
      </div>
    </header>
  );
};
