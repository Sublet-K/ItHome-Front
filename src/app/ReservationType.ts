import { Post } from "./PostType";
import { UserForm } from "./UserType";

export type Reservation = {
  id: string;
  version: number;
  key: number;
  User: UserForm;
  Post: Post;
  r_start_day: Date;
  r_end_day: Date;
  user_id: string;
  post_key: string;
  deleted: boolean;
  pay: number;
  reservationProgress: string;
};
