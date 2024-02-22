export type Dictionary<T> = { [key: string]: T };

export interface Project {
  id?: any;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  name: string;
  description?: string;
  driver: string;
  environment: string;
}
