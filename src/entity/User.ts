import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Length, IsEmail } from 'class-validator'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => String)
  @Column()
  @Length(2, 20)
  username: string

  @Field()
  @Column({ unique: true })
  @IsEmail()
  email: string

  @Column()
  password: string

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
