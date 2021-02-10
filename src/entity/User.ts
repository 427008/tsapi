import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  middleName!: string;

  @Column()
  lastName!: string;

  @Column({unique: true})
  email!: string;

  @Column()
  phone!: string;

  @Column()
  isDeleted: boolean = false;
}

@Entity()
export class UserSec {
  @Column({unique: true})
  email!: string;

  @Column()
  password!: string;
}
