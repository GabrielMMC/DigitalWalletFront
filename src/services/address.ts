'use server';

import { Response } from '@/domain/Request';
import { GET } from '@/requests/get';
import { GET_POSTAL_CODE } from '@/requests/get-postal-code';
import { POST } from '@/requests/post';

export const getPostalCode = async <T>(value: string): Promise<Response<T>> => {
  return await GET_POSTAL_CODE(value);
}

export const getAddresses = async <T>(): Promise<Response<T>> => {
  return await GET('address/list', ['addresses'], { tags: ['addresses'] });
}

export const createAddress = async <T>(form: any): Promise<Response<T>> => {
  return await POST('address/create', JSON.stringify(form), 'addresses');
}




