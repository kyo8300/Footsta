import withApollo from 'next-with-apollo'
import { ApolloClient, InMemoryCache } from '@apollo/client'

export default withApollo(({ initialState, headers }) => {
  return new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
    cache: new InMemoryCache().restore(initialState || {}),
    headers: {
      // cookie: (headers && headers.cookie) || '',
      cookie:
        (typeof window === 'undefined'
          ? headers && headers.cookie
          : undefined) || '',
    },
  })
})
