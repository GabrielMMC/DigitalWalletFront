'use server';

import { Response } from '@/domain/Request';
import { GET } from '@/requests/get';
import { POST } from '@/requests/post';

export const getBankAccounts = async <T>(): Promise<Response<T>> => {
  return await GET('bank_account/list', ['bank_account'], { tags: ['bank_account'] });
}

export const createBankAccount = async <T>(form: any): Promise<Response<T>> => {
  return await POST('bank_account/create', JSON.stringify(form), 'bank_account');
}




