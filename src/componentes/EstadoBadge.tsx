import type { FC } from "react";

interface EstadoBadgeProps {
  estado: string;
}

export const EstadoBadge: FC<EstadoBadgeProps> = ({ estado }) => {
  const estilos: Record<string, string> = {
    confirmada: "bg-green-100 text-green-700",
    pendiente: "bg-yellow-100 text-yellow-700",
    completada: "bg-gray-100 text-gray-700",
    encurso: "bg-blue-100 text-blue-700",
    cancelada: "bg-red-100 text-red-700",
  };

  const textoCapitalizado = estado.charAt(0).toUpperCase() + estado.slice(1);
  const estilo = estilos[estado.toLowerCase()] || "bg-gray-100 text-gray-600";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${estilo}`}> 
      {textoCapitalizado}
    </span>
  );
};
