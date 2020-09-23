import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Length } from 'class-validator'
import { User } from './User'
import { Response } from './Response'

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

  @ManyToOne(() => User, (user) => user.threads)
  owner: User

  @OneToMany(() => Response, (response) => response.thread)
  responses: Response

  @Field()
  @Column()
  ownerId: number

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date
}
