export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  access_token?: string;
}
