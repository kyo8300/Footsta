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
  ObjectType,
  Field,
} from 'type-graphql'
import { getRepository, getTreeRepository, IsNull, MoreThan } from 'typeorm'
import { Response } from '../entity/Response'
import { User } from '../entity/User'
import { gqlContext } from '../types'

@ObjectType()
class PaginatedResponses {
  @Field(() => [Response])
  responses: Response[]

  @Field()
  hasMore: boolean
}

@Resolver(() => Response)
export class ResponseResolver {
  @Query(() => PaginatedResponses)
  async getResponses(
    @Arg('threadId', () => Int) threadId: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string,
    @Arg('limit', () => Int, { defaultValue: 5 }) limit: number
  ) {
    const cursorOption = cursor
      ? { createdAt: MoreThan(new Date(parseInt(cursor) + 1)) }
      : {}
    const responseRepository = getTreeRepository(Response)
    const responses = await responseRepository.find({
      relations: ['parentResponse', 'childResponses'],
      where: {
        threadId,
        parentResponse: IsNull(),
        ...cursorOption,
      },
      take: limit + 1,
      order: { createdAt: 'ASC' },
    })

    const responsesTree = responses.map(async (res) => {
      if (res.childResponses.length) {
        const childrenResponse = await responseRepository.findDescendantsTree(
          res
        )
        res = childrenResponse
        return res
      }
      return res
    })
    return { responses: responsesTree, hasMore: responses.length > limit }
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

  @Mutation(() => Response)
  async reply(
    @Arg('responseId', () => Int) responseId: number,
    @Arg('text') text: string,
    @Ctx() { session }: gqlContext
  ): Promise<Response> {
    const responseRepository = getRepository(Response)
    const parentResponse = await responseRepository.findOne(responseId, {
      relations: ['childResponses'],
    })

    if (!parentResponse) {
      throw new Error('Invalid responseId')
    }

    const newReplyResponse = await responseRepository.create({
      text,
      threadId: parentResponse.threadId,
      userId: session.userId || null,
    })

    const errors = await validate(newReplyResponse)
    if (errors.length > 0) {
      console.error(errors)
      throw new Error('Invalid newReplyResponse')
    }

    newReplyResponse.parentResponse = parentResponse
    parentResponse.childResponses.push(newReplyResponse)
    try {
      await responseRepository.save(parentResponse)
      await responseRepository.save(newReplyResponse)

      return newReplyResponse
    } catch (err) {
      console.error('Error occured!', err)
      throw new Error('cannot response childResponses')
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
