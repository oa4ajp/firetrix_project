import { Roles } from './roles';

export interface IUser {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
  online: boolean;
  roles: Roles;
}