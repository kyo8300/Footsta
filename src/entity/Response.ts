import {
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm'
import { ObjectType, Field, ID, Int } from 'type-graphql'
import { Length } from 'class-validator'
import { User } from './User'
import { Thread } from './Thread'

@ObjectType()
@Entity()
@Tree('closure-table')
export class Response extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field()
  @Column()
  @Length(2, 1024)
  text: string

  @TreeParent()
  parentResponse: Response

  @Field(() => [Response])
  @TreeChildren()
  childResponses: Response[]

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.responses)
  user?: User | null

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  userId?: number | null

  @ManyToOne(() => Thread, (thread) => thread.responses)
  thread: Thread

  @Field(() => Int)
  @Column()
  threadId: number

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date
}
