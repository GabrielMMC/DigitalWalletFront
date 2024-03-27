import { Response } from "@/models/Request";

export default function apiError<T>(error: unknown): Response<T> {
  if (error instanceof Error) {
    return { data: null, ok: false, error: error.message };
  } else {
    return { data: null, ok: false, error: 'Erro genérico' };
  }
}
