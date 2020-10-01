import Dataloader from 'dataloader'
import { User } from '../entity/User'

export const createUserLoader = new Dataloader<number, User>(
  async (userIds: readonly number[]) => {
    const users = await User.findByIds(userIds as number[])
    const userIdToUser: Record<number, User> = {}
    users.forEach((user) => (userIdToUser[user.id] = user))

    return userIds.map(
      (userId) =>
        userIdToUser[userId] || new Error(`Error occured. Key: ${userIds}`)
    )
  }
)
