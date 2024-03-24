import { UserForm } from "@app/UserType";
export function verifyFrame(user: UserForm) {
  return {
    신분증: user.id_card,
    "학교 이메일": user.verify_email,
    전화번호: user.verify_phone,
    재학증: user.verify_school,
  };
}
