export interface Card {
  id: string,
  last_four_digits: number,
  holder_name: string,
  holder_document: number,
  brand: string,
  expiration: string,
  installments: number,
  amount: number,
  card_code: string,
}