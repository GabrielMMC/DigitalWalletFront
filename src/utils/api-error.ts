import { Paginate } from "@/domain/Pagination";
import { Response } from "@/domain/Request";

export default function apiError<T>(error: unknown): Response<T> {
  if (error instanceof Error) {
    return { data: null, ok: false, error: error.message, pagination: Paginate };
  } else {
    return { data: null, ok: false, error: 'Erro genérico', pagination: Paginate };
  }
}
