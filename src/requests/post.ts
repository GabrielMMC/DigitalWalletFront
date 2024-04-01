import apiError from '@/utils/api-error';
import { cookies } from 'next/headers';
import { Response } from '@/domain/Request';
import { revalidateTags } from '@/utils/next-api';
import { API_URL } from './variables';

export const POST = async <T>(path: string, body: any, tags?: string | string[], next?: NextFetchRequestConfig): Promise<Response<T>> => {
  const token = cookies().get('token')?.value;
  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": token ? 'Bearer ' + token : 'No Auth'
  }

  try {
    const response = await fetch(API_URL + path, {
      method: 'POST',
      headers,
      next,
      body
    });
    const data = await response.json();

    if (!response.ok) throw new Error(data?.message ?? "Erro durante requisição, verifique sua internet")
    if (tags) revalidateTags(tags);

    return { data: data.collection ?? data, ok: true, error: '', pagination: data?.pagination };
  } catch (error: unknown) {
    return apiError(error);
  }
}