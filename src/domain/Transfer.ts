import { User } from "./User";

export interface Transfer {
  id: string,
  amount: number
  receiver: User,
  sender: User,
  user_sender_id: string,
  user_receiver_id: string,
}