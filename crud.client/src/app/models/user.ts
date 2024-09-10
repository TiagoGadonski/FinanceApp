export interface User {
  id: number;
  username: string;
  email: string;
  passwordHash?: string;
  profilePicture?: string;// O campo passwordHash é opcional, pois pode não ser retornado pela API
}
