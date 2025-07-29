import type { FC } from "react";

interface EstadisticasProps {
  total: number;
  confirmadas: number;
  pendientes: number;
  enCurso: number;
}

export const EstadisticasPanel: FC<EstadisticasProps> = ({ total, confirmadas }) => {
  const stats = [
    {
      titulo: "Total Reservas",
      valor: total,
      icono: "📊",
      color: "bg-blue-100",
    },
    {
      titulo: "Confirmadas",
      valor: confirmadas,
      icono: "✅",
      color: "bg-green-100",
    },
   
   
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div>
            <p className="text-sm text-gray-500 mb-1">{stat.titulo}</p>
            <h3 className="text-3xl font-bold text-gray-800">{stat.valor}</h3>
          </div>
          <div
            className={`text-2xl p-3 rounded-full ${stat.color} text-gray-700`}
          >
            {stat.icono}
          </div>
        </div>
      ))}
    </section>
  );
};
