import { validate } from 'class-validator'
import { Resolver, Authorized, Mutation, Arg, Ctx } from 'type-graphql'
import { Response } from '../entity/Response'
import { gqlContext } from '../types'

@Resolver()
export class ResponseResolver {
  @Authorized()
  @Mutation(() => Response, { nullable: true })
  async createResponse(
    @Arg('threadId') threadId: number,
    @Arg('text') text: string,
    @Ctx() { session }: gqlContext
  ): Promise<Response | null> {
    console.log(session.userId)
    const newResponse = Response.create({
      text,
      threadId,
      userId: session.userId,
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
