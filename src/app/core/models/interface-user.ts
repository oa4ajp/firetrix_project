import { Roles } from './roles';

export interface IUser {
  uid: string;
  displayName?: string;
  email?: string | null;
  password?: string | null;
  photoURL?: string;  
  online: boolean;
  roles: Roles;
  refreshRandomButtonClicks?: number;
}