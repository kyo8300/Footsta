import { Resolver, Mutation, InputType, Field, Arg } from 'type-graphql'
import { getManager } from 'typeorm'
import { validate } from 'class-validator'
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
  async register(@Arg('data') data: AddUserInput): Promise<User> {
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

    return user
  }
}
