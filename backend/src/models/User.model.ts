import { DataTypes } from 'sequelize';
import { AutoIncrement, BelongsTo, Column, CreatedAt, DeletedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { RequiredUserAttributes, UserAttributes } from './interface/user.interface';
import Role from './Role.model';

@Table({
  timestamps: true,
  tableName: 'user',
  paranoid: true,
})
export default class User extends Model<UserAttributes, RequiredUserAttributes> {
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement:true
  })
  uuid: number;

  @Column({
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  })
  firstName: string;

  @Column({
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  })
  lastName: string;

  @Column({
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  })
  email: string;
  
  @Column({
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  })
  password: string;

  @ForeignKey(() => Role)
  @Column({
    allowNull: false,
    type: DataTypes.UUID,
  })
  roleId: string;
  @BelongsTo(() => Role)
  role_id: Role;

  @CreatedAt
  created_at:Date;

  @UpdatedAt
  updated_at:Date;

  @DeletedAt
  deleted_at:Date;

  readonly toJSON = () => {
    const values = Object.assign({}, this.get());
    // delete values.password;
    return values;
  };
  token: any;
  
}
