import { Intervention } from './intervention.model';
import { Materiel } from './materiel.model';

export interface Ticket {
  id: number;
  ref: string;
  intervention: Intervention[];
  materiel: Materiel;
}
