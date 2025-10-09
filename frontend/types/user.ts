export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  token?: string; // JWT recibido del backend
}
