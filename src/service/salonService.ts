import { ApiResponse, SalonPagination } from "../model/apiResponse";
import { Salon } from "../model/salon";

const server = import.meta.env.VITE_API_SERVER;

export async function listSalonService(offset: number, limit: number) {
  let params = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
  });
  let response = await fetch(`${server}/public/salon?${params.toString()}`, {
    method: "GET",
  });
  let result = await response.json();
  return result as ApiResponse<SalonPagination>;
}

export async function getSalonDetailService(id: string) {
  let response = await fetch(`${server}/public/salon/${id}`, {
    method: "GET",
  });
  let result = await response.json();
  return result as ApiResponse<Salon>;
}