import { Resolver, Mutation, InputType, Field, Arg, Ctx } from 'type-graphql'
// import { Express } from 'express'
import { getManager } from 'typeorm'
import { isEmail, validate } from 'class-validator'
import bcrypt from 'bcrypt'
import { User } from '../entity/User'

@InputType()
class AddUserInput implements Partial<User> {
  @Field()
  username: string

  @Field()
  email: string

  @Field()
  password: string
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg('data') data: AddUserInput,
    @Ctx() { session }: Express.Session
  ): Promise<User> {
    const isExist = await User.findOne({ email: data.email })
    if (isExist) {
      throw new Error('User already exist!')
    }

    const user = new User()
    user.username = data.username
    user.email = data.email
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(data.password, salt)

    const errors = await validate(user)
    if (errors.length > 0) {
      console.log(errors)
      throw new Error(`Validation failed!`)
    } else {
      console.log(user)
      await getManager().save(user)
    }

    session.userId = user.id

    return user
  }

  @Mutation(() => User)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { session }: Express.Session
  ): Promise<User> {
    if (!isEmail(email)) {
      throw new Error('Email is not validate')
    }

    const user = await User.findOne({ email })
    if (!user) {
      throw new Error('User does not exist!')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new Error('Password is incorrect')
    }

    session.userId = user.id

    return user
  }
}
