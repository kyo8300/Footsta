import {
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
import { ObjectType, Field } from 'type-graphql'
import { Length } from 'class-validator'
import { User } from './User'
import { Thread } from './Thread'

@ObjectType()
@Entity()
export class Response extends BaseEntity {
  @Field()
  @Column()
  @Length(2, 1024)
  text: string

  @ManyToOne(() => Thread, (thread) => thread.responses)
  thread: Thread

  @PrimaryColumn()
  threadId: number

  @ManyToOne(() => User, (user) => user.responses)
  user: User

  @PrimaryColumn()
  userId: number

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date
}
