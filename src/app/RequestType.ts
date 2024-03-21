import { Post } from "./PostType";
import { User } from "./UserType";

export type RequestForm = {
  id: string;
  version: number;
  key: number;
  delete: boolean;
  limit_people: number;
  number_room: number;
  number_bathroom: number;
  number_bedroom: number;
  price: number;
  city: string;
  gu: string;
  dong: string;
  start_day: Date;
  end_day: Date;
  accomodation_type: string; //건물 유형
  building_type: string; //아파트인지, 주택인지
  school: string; //안전한 사용자 -> 같은 학교, 완전한 인증
  alarm: boolean;
  contract: boolean;
  User: User;
  userId: string;
  Post: Post[];
  postId: string[];
  complete: boolean;
  request_text: string;
};
