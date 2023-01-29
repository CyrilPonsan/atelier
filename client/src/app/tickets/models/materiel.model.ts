import { Client } from './client.model';

export interface Materiel {
  id: number;
  type: string;
  marque: string;
  modele: string;
  createdAt: Date;
  updatedAt: Date;
  etat: boolean;
  miseEnService: Date;
  url: string;
  client: Client;
}
