import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  // RelationId,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Length } from 'class-validator'
import { User } from './User'

@ObjectType()
@Entity()
export class Thread extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field()
  @Column()
  @Length(2, 50)
  title: string

  @Field()
  @Column()
  @Length(2, 1024)
  text: string

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.threads)
  owner: User

  @Field()
  @Column()
  ownerId: number

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date
}
