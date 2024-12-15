import { AuthResponse, SignInDto, SignUpDto } from "@/types/auth.type";
import { apiClient } from "./api-client";

const AUTH_BASE_URL = "/auth";

export const authService = {
  signUp: async (signUpDto: SignUpDto): Promise<AuthResponse> => {
    const response = await apiClient.post(`${AUTH_BASE_URL}/signup`, signUpDto);
    return response.data as AuthResponse;
  },

  signIn: async (signInDto: SignInDto): Promise<AuthResponse> => {
    const response = await apiClient.post(`${AUTH_BASE_URL}/signin`, signInDto);
    return response.data as AuthResponse;
  },

  signOut: async (): Promise<AuthResponse> => {
    const response = await apiClient.post(`${AUTH_BASE_URL}/signout`, {});
    return response.data as AuthResponse;
  },

  checkUserId: async (userId: string): Promise<boolean> => {
    const response = await apiClient.post(`${AUTH_BASE_URL}/check-user-id`, {
      userId,
    });
    return response.data as boolean;
  },
};
