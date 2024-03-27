export interface Response<T> {
  data: T | null;
  ok: boolean;
  error: string;
}