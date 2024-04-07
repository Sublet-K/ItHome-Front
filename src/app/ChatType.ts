import { Post } from "./PostType";
import { User } from "./UserType";

export type ChatRoom = {
  id: string;
  version: number;
  user: User;
  post_key: number;
  post: Post;
  Chat: Chat[];
};

export type Chat = {
  id: string;
  version: number;
  user: User;
  chatroom_id: string;
  chatroom: ChatRoom;
  message: string;
  send_time: Date;
};
