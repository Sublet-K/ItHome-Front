import { ChatRoom, Chat } from "./ChatType";
import { Post } from "./PostType";
import { Reservation } from "./ReservationType";

export type User = {
  name: string;
  email: string;
};

export type UserForm = {
  id: string;
  version: number;
  user_id: string;
  image_id: string;
  password: string;
  username: string;
  email: string;
  phone: string;
  reservation_post: Reservation[];
  //  post: Post[];
  delete: boolean;
  //  Request: RequestForm[];
  school: string;
  id_card: boolean;
  chat_id: string[];
  //  chat_room: ChatRoom[];
  //  Chat: Chat[];
  like_post_id: string[];
  //   like_post: Post[];
  verify_school: boolean;
  verify_email: boolean;
  verify_phone: boolean;
  birth: Date;
  student_id: number;
  gender: string;
};

export type SignUpInfo = {
  userId: string;
  password: string;
  username: string;
  email: string;
  phone: string;
  school: string;
  gender: string;
  birth: string;
  studentId: number;
  jobState: string;
};
