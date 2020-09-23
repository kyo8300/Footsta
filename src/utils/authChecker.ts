import { AuthChecker } from 'type-graphql'

export const authChecker: AuthChecker<Express.Session> = ({
  context: { session },
}) => {
  if (!session.userId) {
    throw new Error('Not Logged In')
  }

  return true
}
