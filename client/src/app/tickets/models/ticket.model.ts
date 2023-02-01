export interface Statut {
  id: number;
  label: string;
  code: number;
}

export interface Intervention {
  id: number;
  date: Date;
  description: string;
  reponse: string;
  statut: Statut;
  conseiller: Conseiller;
  titre: string;
  lieuIntervention: string;
}

export interface Conseiller {
  nom: string;
  prenom: string;
}

export interface RaisonSociale {
  raisonSociale: string;
}

export interface Client {
  id: number;
  raisonSociale: RaisonSociale;
  nom: string;
}

export interface TypeMateriel {
  type: string;
}

export interface Marque {
  marque: string;
}

export interface Modele {
  modele: string;
  url: string;
}

export interface Materiel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  miseEnService: Date;
  client: Client;
  typeMateriel: TypeMateriel;
  marque: Marque;
  modele: Modele;
}

export interface Ticket {
  id: number;
  ref: string;
  titre: string;
  resume: string;
  materiel_id: number;
  intervention: Intervention[];
  materiel: Materiel;
}
