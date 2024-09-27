import { ApiResponse } from "../model/apiResponse";
import {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  User,
} from "../model/user";
import { useAccountStore } from "../store/zustand";

const server = import.meta.env.VITE_API_SERVER;

export async function signInService(input: LoginRequest) {
  let response = await fetch(`${server}/account/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  let result = await response.json();
  return result as ApiResponse<LoginResponse>;
}

export async function signUpService(input: SignUpRequest) {
  let response = await fetch(`${server}/account/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  let result = await response.json();
  return result as ApiResponse<LoginResponse>;
}

export async function getProfileService(token?: string) {
  let response = await fetch(`${server}/account/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let result = await response.json();
  return result as ApiResponse<User>;
}

export async function updateProfileService(token: string, data: Object) {
  let response = await fetch(`${server}/account/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  let result = await response.json();
  return result as ApiResponse<User>;
}
