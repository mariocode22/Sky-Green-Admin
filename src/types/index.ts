// types/database.ts
export interface Reserva {
  id: number;
  nombre: string;
  identificacion: string;
  email: string;
  telefono: string;
  fecha_inicio: string; // ISO date string
  fecha_fin: string; // ISO date string
  cantidad_personas: number;
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'completada';
  cabana_id: number;
  cabanas?: Cabana;
}

export interface Cabana {
  id: number;
  nombre: string;
}

// types/components.ts
export interface ReservaItem {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  identificacion: string;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
  cabana_id: number;
  cantidad_personas: number;
  cabana: string; // Nombre de la cabaña para mostrar
}

export interface FiltrosReserva {
  busqueda: string;
  estado: 'todas' | 'pendientes' | 'confirmadas' | 'encurso' | 'completadas' | 'canceladas' | 'vencidas';
}

export interface EstadisticasReserva {
  total: number;
  confirmadas: number;
  pendientes: number;
  canceladas: number;
  enCurso: number;
  completadas: number;
  proximasLlegadas: number;
}