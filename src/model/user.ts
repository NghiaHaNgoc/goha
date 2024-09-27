export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  avatar: string;
  email: string;
  fullName?: string;
  role?: Role;
  token: string;
  username: string;
};

export type SignUpRequest = {
  username: string;
  password: string;
  email: string;
  gender: Gender;
  fullName: string;
};

export type User = {
  id: number;
  username: string;
  password: string;
  fullName: string;
  email: string;
  gender: string;
  role: Role;
  avatar: string;
  dateOfBirth: string;
};

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum Role {
  ADMIN = "ADMIN",
  SALON_OWNER = "SALON_OWNER",
  CUSTOMER = "CUSTOMER",
}
