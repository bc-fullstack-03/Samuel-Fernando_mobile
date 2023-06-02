export interface Auth {
  name?: string;
  email: string;
  password: string;
}

export interface UserToken {
  sub: string;
}

