import { Statut } from './statut.model';
import { User } from './user.model';

export interface Intervention {
  id: number;
  date: Date;
  statut: Statut;
  user: User;
  description: string;
  reponse: string;
}
