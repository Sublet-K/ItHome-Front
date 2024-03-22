export type Room = {
  key: number;
  city: string;
  gu: string;
  dong: string;
  price: number;
  image_id: string[];
  street: string;
  street_number: string;
  type: string;
  x_coordinate: number;
  y_coordinate: number;
  marker: string;
  limit_people: number;
  building_type: string;
  number_bathroom: number;
  number_room: number;
  number_bedroom: number;
  title: string;
  basic_info: string;
  start_day: Date;
  end_day: Date;
  rule: string;
  benefit: string;
  refund_policy: string;
  contract: string;
};

export type RequestRoom = {
  accomodation_type: string;
  request_text: string;
  contract: boolean;
  private: boolean;
  title: string;
};

export type CustomWindow = {
  naver: any;
  Kakao: any;
} & Window &
  typeof globalThis;
