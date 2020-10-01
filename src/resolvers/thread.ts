import { validate } from 'class-validator'
import { User } from '../entity/User'
import {
  Mutation,
  Resolver,
  FieldResolver,
  Root,
  InputType,
  Field,
  Arg,
  Ctx,
  Authorized,
  Query,
  Int,
} from 'type-graphql'
import { Thread } from '../entity/Thread'
import { gqlContext } from '../types'

@InputType()
class CreateThreadInput implements Partial<Thread> {
  @Field()
  title: string

  @Field()
  text: string
}

@Resolver(() => Thread)
export class ThreadResolver {
  //Query
  @Query(() => [Thread], { nullable: true })
  async getThreads(): Promise<Thread[]> {
    const threads = await Thread.find()
    return threads
  }

  @Query(() => Thread, { nullable: true })
  async getThread(@Arg('threadId', () => Int) threadId: number) {
    return await Thread.findOne(threadId)
  }

  //Mutaion
  @Authorized()
  @Mutation(() => Thread, { nullable: true })
  async createThread(
    @Arg('data') data: CreateThreadInput,
    @Ctx() { session }: gqlContext
  ): Promise<Thread | null> {
    console.log(session.userId)
    const newThread = Thread.create({
      ...data,
      ownerId: session.userId,
    })
    const errors = await validate(newThread)
    if (errors.length > 0) {
      console.log(errors)
      return null
    } else {
      return await newThread.save()
    }
  }

  //   @Mutation(() => Boolean)
  //   async deleteThreads(): Promise<boolean> {
  //     try {
  //       await Thread.delete({})
  //       return true
  //     } catch (error) {
  //       console.log(error)
  //       return false
  //     }
  //   }

  @FieldResolver(() => User)
  async owner(
    @Root() thread: Thread,
    @Ctx() { userLoader }: gqlContext
  ): Promise<User> {
    return userLoader.load(thread.ownerId)
  }
}
