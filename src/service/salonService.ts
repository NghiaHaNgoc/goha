import { ApiResponse, SalonPagination } from "../model/apiResponse";

const server = import.meta.env.VITE_API_SERVER;

export async function listSalonService(offset: number, limit: number) {
    let params = new URLSearchParams({
        offset: offset.toString(),
        limit: limit.toString()
    })
    let response = await fetch(`${server}/public/salon?${params.toString()}`, {
        method: "GET",
        credentials: "include"
    });
    let result = await response.json();
    return result as ApiResponse<SalonPagination>;
}