export type User = {
  id: string;
  user_id: string;
  image_id: string;
  username: string;
  school: string;
  id_card: boolean;
  birth: string | Date;
  student_id: number;
  gender: string;
  verify_school: boolean;
  verify_email: boolean;
  verify_phone: boolean;
  // like_post_id: string[];
  email: string;
  phone: string;
};

export type Post = {
  key: number;
  image_id: string[];
  title: string;
  basic_info: string;
  price: number;
  description: string;
  position: string;
  rule: string;
  refund_policy: string;
  benefit: string;
  extra_info: string;
  start_day: string | Date;
  end_day: string | Date;
  min_duration: number;
  max_duration: number;
  post_date: Date | string;
  private: boolean;
  request: boolean;
  limit_people: number;
  number_room: number;
  number_bathroom: number;
  number_bedroom: number;
  accomodation_type: string; //건물 유형
  building_type: string; //아파트인지, 주택인지
  contract: boolean;
  x_coordinate: number;
  y_coordinate: number;
  city: string;
  gu: string;
  dong: string;
  street: string;
  street_number: string;
  post_code: string;
  local_save: boolean;
  like_count: number;
  like_user: User[];
  postuser: User;
};

export type RequestForm = {
  key: number;
  limit_people: number;
  number_room: number;
  number_bathroom: number;
  number_bedroom: number;
  price: number;
  city: string;
  gu: string;
  dong: string;
  start_day: string | Date;
  end_day: string | Date;
  accomodation_type: string;
  building_type: string;
  school: string;
  alarm: boolean;
  contract: boolean;
  complete: boolean;
  request_text: string;
  user: User;
  post: Post[];
};

export type Reservation = {
  key: number;
  r_start_day: Date | string;
  r_end_day: Date | string;
  pay: number;
  reservation_progress: string;
  move_in_instruction: string;
  user: User;
  post: Post;
};
