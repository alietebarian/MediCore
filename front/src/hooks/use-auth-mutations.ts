"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/store/auth-store";
import { LoginFormValues, RegisterFormValues } from "@/lib/validations/auth";

type AuthResponse = {
  token: string;
  userId: string;
  fullName: string;
  role: string;
};

export function useLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const { data } = await apiClient.post<AuthResponse>(
        "/auth/login",
        values,
      );
      return data;
    },
    onSuccess: (data) => {
      setAuth(data.token, {
        userId: data.userId,
        fullName: data.fullName,
        role: data.role,
      });
      router.push("/dashboard");
    },
  });
}

export function useRegister(){
    const router = useRouter()
    const setAuth = useAuthStore(s => s.setAuth)

    return useMutation({
        mutationFn: async (values: Omit<RegisterFormValues, "confirmPassword">) => {
            const {data} = await apiClient.post<AuthResponse>('/auth/register', values)
            return data
        },
        onSuccess: (data) => {
             setAuth(data.token, {
               userId: data.userId,
               fullName: data.fullName,
               role: data.role,
             });
             router.push("/dashboard");
        }
    })
}