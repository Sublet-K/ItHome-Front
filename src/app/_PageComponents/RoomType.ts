export type Room = {
  key: number;
  city: string;
  gu: string;
  dong: string;
  price: number;
  image_id: string[];
};

export type Reservation = {};

export type User = {};

export type RequestRoom = {};

export type SignUpInfo = {
  userId: string;
  password: string;
  username: string;
  email: string;
  phone: string;
  school: string;
  gender: string;
  birth: string;
  studentId: string;
};
