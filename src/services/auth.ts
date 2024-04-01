'use server';

import { Response } from '@/domain/Request';
import { GET } from '@/requests/get';
import { POST } from '@/requests/post';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const getUser = async <T>(): Promise<Response<T>> => {
  return await GET('user/me', ['user'], { revalidate: 60, tags: ['user'] });
}

export const createUser = async <T>(form: any): Promise<Response<T>> => {
  return await POST('auth/register', JSON.stringify(form));
}

export const login = async <T>(form: any): Promise<Response<T>> => {
  return await POST('auth/login', JSON.stringify(form));
}

export const logout = async () => {
  cookies().delete('token');
  redirect('/auth/login');
}




