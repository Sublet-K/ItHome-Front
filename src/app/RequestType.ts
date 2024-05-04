import { Post } from "./PostType";
import { User } from "./UserType";

export type RequestForm = {
  id: string;
  version: number;
  key: number;
  delete: boolean;
  price: number;
  start_day: Date;
  end_day: Date;
  User: User;
  userId: string;
  Post: Post[];
  postId: string[];
  complete: boolean;
  request_text: string;
};
