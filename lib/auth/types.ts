export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string | null;
  roles: string[];
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: AuthUser;
};

export type AuthFormState = {
  message?: string;
  fieldErrors?: Record<string, string>;
};
