import { validate } from 'class-validator'
import {
  Resolver,
  Mutation,
  Query,
  Arg,
  Ctx,
  Int,
  FieldResolver,
  Root,
} from 'type-graphql'
import { Response } from '../entity/Response'
import { User } from '../entity/User'
import { gqlContext } from '../types'

@Resolver(() => Response)
export class ResponseResolver {
  @Query(() => [Response])
  async getResponses(@Arg('threadId', () => Int) threadId: number) {
    const responses = await Response.find({ threadId })
    return responses
  }

  @Mutation(() => Response, { nullable: true })
  async createResponse(
    @Arg('threadId', () => Int) threadId: number,
    @Arg('text') text: string,
    @Ctx() { session }: gqlContext
  ): Promise<Response | null> {
    const newResponse = Response.create({
      text,
      threadId,
      userId: session.userId || null,
    })
    const errors = await validate(newResponse)
    if (errors.length > 0) {
      console.log(errors)
      return null
    } else {
      return await newResponse.save()
    }
  }

  @FieldResolver()
  async user(
    @Root() response: Response,
    @Ctx() { userLoader }: gqlContext
  ): Promise<User | null> {
    if (!response.userId) return null
    return userLoader.load(response.userId)
  }
}
