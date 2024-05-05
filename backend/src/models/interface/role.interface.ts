type RequiredKey<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export interface RoleAttributes {
  uuid: string;

  roleName:string

  created_at: Date;

  updated_at: Date;

  deleted_at: Date;
}

export type RequiredRoleAttributes = RequiredKey<RoleAttributes, 'uuid'>;
