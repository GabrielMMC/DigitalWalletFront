import { Pagination } from "./Pagination";

export interface Response<T> {
  data: T | null;
  ok: boolean;
  error: string;
  pagination: Pagination | null;
}