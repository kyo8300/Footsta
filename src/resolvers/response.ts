import { validate } from 'class-validator'
import { Resolver, Mutation, Query, Arg, Ctx, Int } from 'type-graphql'
import { Response } from '../entity/Response'
import { gqlContext } from '../types'

@Resolver()
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
}
