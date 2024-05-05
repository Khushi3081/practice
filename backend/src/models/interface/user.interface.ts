type RequiredKey<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export interface UserAttributes {
  uuid: string;

  firstName: string;
  
  lastName: string;

  email:string;

  password:string;

  roleId:string;

  token:string;

  created_at: Date;

  updated_at: Date;

  deleted_at: Date;
}

export type RequiredUserAttributes = RequiredKey<UserAttributes, 'uuid'>;
