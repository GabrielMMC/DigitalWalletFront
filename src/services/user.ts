'use server';

import { Response } from '@/domain/Request';
import { GET } from '@/requests/get';

export const getUsers = async <T>(search: string, page: number): Promise<Response<T>> => {
  return await GET(`transfer/users?search=${search}&page=${page}`, ['users'], { revalidate: 60, tags: ['users'] });
}





