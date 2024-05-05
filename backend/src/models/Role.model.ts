import { DataTypes } from 'sequelize';
import {  Column, CreatedAt, DeletedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { RequiredRoleAttributes, RoleAttributes } from './interface/role.interface';

@Table({
  timestamps: true,
  tableName: 'role',
  paranoid: true,
})
export default class Role extends Model<RoleAttributes, RequiredRoleAttributes> {
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  })
  uuid: number;

  @Column({
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  })
  roleName: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  readonly toJSON = () => {
    const values = Object.assign({}, this.get());
    // delete values.password;
    return values;
  };
}
