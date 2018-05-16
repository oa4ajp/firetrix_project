export interface IUser {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
  online: boolean;
}