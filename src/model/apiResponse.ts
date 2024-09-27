import { Salon } from "./salon";

export interface ApiResponse<T> {
  data?: T;
  status: number;
  message: string;
}

export interface PaginationData {
  pages: number;
  total: number;
}

export interface SalonPagination extends PaginationData {
  salons: Salon[];
}
