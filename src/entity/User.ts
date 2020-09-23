import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Length, IsEmail } from 'class-validator'
import { Thread } from './Thread'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number

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

  @Field(() => [Thread])
  @OneToMany(() => Thread, (thread) => thread.owner)
  threads: Thread[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
