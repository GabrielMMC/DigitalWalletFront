'use server';

import { Response } from '@/models/Request';
import { GET } from '@/requests/get';
import { POST } from '@/requests/post';

export const getUser = async <T>(): Promise<Response<T>> => {
  return await GET('auth/me', ['user'], { revalidate: 60, tags: ['user'] });
}

export const login = async <T>(form: any): Promise<Response<T>> => {
  return await POST('auth/login', JSON.stringify(form));
}




