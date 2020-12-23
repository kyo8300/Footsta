import withApollo from 'next-with-apollo'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { PaginatedResponses } from '../generated/graphql'

export default withApollo(({ initialState, headers }) => {
  return new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getResponses: {
              keyArgs: ['threadId'],
              merge(
                existing: PaginatedResponses | undefined,
                incoming: PaginatedResponses,
                { readField }
              ): PaginatedResponses {
                let merged = {
                  ...incoming,
                  responses: [
                    ...(existing?.responses || []),
                    ...incoming.responses,
                  ],
                }
                if (existing) {
                  if (
                    readField('id', existing.responses[0]) ===
                    readField('id', incoming.responses[0])
                  ) {
                    merged = {
                      ...existing,
                      responses: [...existing.responses],
                    }
                  }
                }

                return merged
              },
            },
          },
        },
      },
    }).restore(initialState || {}),
    headers: {
      // cookie: (headers && headers.cookie) || '',
      cookie:
        (typeof window === 'undefined'
          ? headers && headers.cookie
          : undefined) || '',
    },
  })
})
