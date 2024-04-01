'use server';

import apiError from '@/utils/api-error';
import { cookies } from 'next/headers';
import { Response } from '@/domain/Request';
import { revalidateTags } from '@/utils/next-api';
import { API_URL } from './variables';

export const GET = async <T>(path: string, tags?: string | string[], next?: NextFetchRequestConfig): Promise<Response<T>> => {
  const token = cookies().get('token')?.value;
  const headers = { Authorization: token ? 'Bearer ' + token : 'No Auth' }

  try {
    const response = await fetch(API_URL + path, {
      method: 'GET',
      headers,
      next
    });
    if (!response.ok) throw new Error("fetching error: " + response.status)
    const data = await response.json();
    if (tags) revalidateTags(tags);

    return { data: data.collection ?? data, ok: true, error: '', pagination: data?.pagination };
  } catch (error: unknown) {
    return apiError(error);
  }
}