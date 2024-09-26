import { ApiResponse } from "../model/apiResponse";
import { LoginRequest, LoginResponse, SignUpRequest } from "../model/user";


const server = import.meta.env.VITE_API_SERVER;

export async function signInService(input: LoginRequest) {
    let response = await fetch(`${server}/account/sign-in`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
    });
    let result = await response.json();
    return result as ApiResponse<LoginResponse>;
}

export async function signOutService() {
    let response = await fetch(`${server}/account/sign-out`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });
    let result = await response.json();
    return result as ApiResponse<null>;
}

export async function signUpService(input: SignUpRequest) {
    let response = await fetch(`${server}/account/sign-up`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
    });
    let result = await response.json();
    return result as ApiResponse<LoginResponse>;
}
