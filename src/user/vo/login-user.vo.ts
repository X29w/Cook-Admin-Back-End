interface UserInfo {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

export class LoginUserVO {
  userInfo: UserInfo;
  accessToken: string;
  refreshToken: string;
}
