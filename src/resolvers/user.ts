import {
  Resolver,
  Mutation,
  InputType,
  Field,
  Arg,
  Ctx,
  ObjectType,
} from 'type-graphql'
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

@ObjectType()
class FieldError {
  @Field()
  field: string

  @Field()
  message: string
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => User, { nullable: true })
  user?: User
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('data') data: AddUserInput,
    @Ctx() { session }: Express.Session
  ): Promise<UserResponse> {
    const isExist = await User.findOne({ email: data.email })
    if (isExist) {
      return {
        errors: [
          {
            field: 'email',
            message: 'User already exist!',
          },
        ],
      }
    }

    const user = new User()
    user.username = data.username
    user.email = data.email
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(data.password, salt)

    const errors = await validate(user)
    if (errors.length > 0) {
      console.log(errors)
      return {
        errors: [
          {
            field: errors[0].property,
            message: errors[0].constraints?.length || 'Error Occurred',
          },
        ],
      }
    } else {
      await getManager().save(user)
    }

    session.userId = user.id

    return { user }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { session }: Express.Session
  ): Promise<UserResponse> {
    if (!isEmail(email)) {
      return {
        errors: [
          {
            field: 'email',
            message: 'Email is not validate',
          },
        ],
      }
    }

    const user = await User.findOne({ email })
    if (!user) {
      return {
        errors: [
          {
            field: 'email',
            message: 'User does not exist!',
          },
        ],
      }
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Passwor is incorrect',
          },
        ],
      }
    }

    session.userId = user.id

    return { user }
  }
}
