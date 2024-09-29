import { GeneralStatus } from "./util";

export interface Salon {
  coverPhoto?: string;
  createdAt?: string;
  description?: string;
  email?: string;
  id?: number;
  logo?: string;
  name?: string;
  phone?: string;
  status?: GeneralStatus;
};

export interface SalonDetail extends Salon {
  salonBranches?: SalonBranch[],
  therapies?: Therapy[]
}

export type SalonBranch = {
  id?: number
  address?: string
  salonId?: number
  createdAt?: string
}

export type Therapy = {
  id?: number
  salonId?: number
  name?: string
  description?: string
  price?: number
  duration?: string
  createdAt?: string
}
