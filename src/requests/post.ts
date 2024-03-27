import apiError from '@/utils/api-error';
import { cookies } from 'next/headers';
import { Response } from '@/models/Request';
import { revalidateTags } from '@/utils/next-api';
import { API_URL } from './variables';

export const POST = async <T>(path: string, body: any, tags?: string | string[], next?: NextFetchRequestConfig): Promise<Response<T>> => {
  const token = cookies().get('token')?.value;
  const headers = {
    "Content-Type": "application/json",
    Authorization: token ? 'Bearer ' + token : 'No Auth'
  }

  try {
    const response = await fetch(API_URL + path, {
      method: 'POST',
      headers,
      next,
      body
    });
    if (!response.ok) throw new Error("fetching error")
    const data = await response.json();
    if (tags) revalidateTags(tags);

    return { data, ok: true, error: '' };
  } catch (error: unknown) {
    return apiError(error);
  }
}