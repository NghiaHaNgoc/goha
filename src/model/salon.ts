import { GeneralStatus } from "./util";

export type Salon = {
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
