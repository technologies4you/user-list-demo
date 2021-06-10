import { Telephone } from './telephone.model';

export interface User {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  telephone: Telephone;
}
