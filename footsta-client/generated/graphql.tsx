import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  getThreads?: Maybe<Array<Thread>>;
  getThread?: Maybe<Thread>;
  getResponses: Array<Response>;
};


export type QueryGetThreadArgs = {
  threadId: Scalars['Int'];
};


export type QueryGetResponsesArgs = {
  threadId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Thread = {
  __typename?: 'Thread';
  id: Scalars['ID'];
  title: Scalars['String'];
  text: Scalars['String'];
  ownerId: Scalars['Float'];
  createdAt: Scalars['String'];
  owner: User;
};

export type Response = {
  __typename?: 'Response';
  id: Scalars['ID'];
  text: Scalars['String'];
  childResponses: Array<Response>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']>;
  threadId: Scalars['Int'];
  createdAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  createThread?: Maybe<Thread>;
  createResponse?: Maybe<Response>;
  reply: Response;
};


export type MutationRegisterArgs = {
  data: AddUserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreateThreadArgs = {
  data: CreateThreadInput;
};


export type MutationCreateResponseArgs = {
  text: Scalars['String'];
  threadId: Scalars['Int'];
};


export type MutationReplyArgs = {
  text: Scalars['String'];
  responseId: Scalars['Int'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type AddUserInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateThreadInput = {
  title: Scalars['String'];
  text: Scalars['String'];
};

export type ResponseInfoFragment = (
  { __typename?: 'Response' }
  & Pick<Response, 'id' | 'text' | 'userId' | 'threadId' | 'createdAt'>
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username'>
  )> }
);

export type UserInfoFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email' | 'createdAt' | 'updatedAt'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserInfoFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserInfoFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type CreateResponseMutationVariables = Exact<{
  text: Scalars['String'];
  threadId: Scalars['Int'];
}>;


export type CreateResponseMutation = (
  { __typename?: 'Mutation' }
  & { createResponse?: Maybe<(
    { __typename?: 'Response' }
    & Pick<Response, 'id' | 'text' | 'createdAt'>
  )> }
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & UserInfoFragment
  )> }
);

export type GetResponsesQueryVariables = Exact<{
  threadId: Scalars['Int'];
}>;


export type GetResponsesQuery = (
  { __typename?: 'Query' }
  & { getResponses: Array<(
    { __typename?: 'Response' }
    & { childResponses: Array<(
      { __typename?: 'Response' }
      & { childResponses: Array<(
        { __typename?: 'Response' }
        & { childResponses: Array<(
          { __typename?: 'Response' }
          & { childResponses: Array<(
            { __typename?: 'Response' }
            & { childResponses: Array<(
              { __typename?: 'Response' }
              & ResponseInfoFragment
            )> }
            & ResponseInfoFragment
          )> }
          & ResponseInfoFragment
        )> }
        & ResponseInfoFragment
      )> }
      & ResponseInfoFragment
    )> }
    & ResponseInfoFragment
  )> }
);

export type GetThreadQueryVariables = Exact<{
  threadId: Scalars['Int'];
}>;


export type GetThreadQuery = (
  { __typename?: 'Query' }
  & { getThread?: Maybe<(
    { __typename?: 'Thread' }
    & Pick<Thread, 'id' | 'title' | 'text' | 'ownerId' | 'createdAt'>
    & { owner: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  )> }
);

export type GetThreadsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetThreadsQuery = (
  { __typename?: 'Query' }
  & { getThreads?: Maybe<Array<(
    { __typename?: 'Thread' }
    & Pick<Thread, 'id' | 'title' | 'text' | 'ownerId' | 'createdAt'>
    & { owner: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  )>> }
);

export const ResponseInfoFragmentDoc = gql`
    fragment ResponseInfo on Response {
  id
  text
  userId
  user {
    username
  }
  threadId
  createdAt
}
    `;
export const UserInfoFragmentDoc = gql`
    fragment UserInfo on User {
  id
  username
  email
  createdAt
  updatedAt
}
    `;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      ...UserInfo
    }
    errors {
      field
      message
    }
  }
}
    ${UserInfoFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $email: String!) {
  register(data: {username: $username, password: $password, email: $email}) {
    user {
      ...UserInfo
    }
    errors {
      field
      message
    }
  }
}
    ${UserInfoFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const CreateResponseDocument = gql`
    mutation CreateResponse($text: String!, $threadId: Int!) {
  createResponse(text: $text, threadId: $threadId) {
    id
    text
    createdAt
  }
}
    `;
export type CreateResponseMutationFn = Apollo.MutationFunction<CreateResponseMutation, CreateResponseMutationVariables>;

/**
 * __useCreateResponseMutation__
 *
 * To run a mutation, you first call `useCreateResponseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateResponseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createResponseMutation, { data, loading, error }] = useCreateResponseMutation({
 *   variables: {
 *      text: // value for 'text'
 *      threadId: // value for 'threadId'
 *   },
 * });
 */
export function useCreateResponseMutation(baseOptions?: Apollo.MutationHookOptions<CreateResponseMutation, CreateResponseMutationVariables>) {
        return Apollo.useMutation<CreateResponseMutation, CreateResponseMutationVariables>(CreateResponseDocument, baseOptions);
      }
export type CreateResponseMutationHookResult = ReturnType<typeof useCreateResponseMutation>;
export type CreateResponseMutationResult = Apollo.MutationResult<CreateResponseMutation>;
export type CreateResponseMutationOptions = Apollo.BaseMutationOptions<CreateResponseMutation, CreateResponseMutationVariables>;
export const CurrentUserDocument = gql`
    query currentUser {
  currentUser {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const GetResponsesDocument = gql`
    query GetResponses($threadId: Int!) {
  getResponses(threadId: $threadId) {
    ...ResponseInfo
    childResponses {
      ...ResponseInfo
      childResponses {
        ...ResponseInfo
        childResponses {
          ...ResponseInfo
          childResponses {
            ...ResponseInfo
            childResponses {
              ...ResponseInfo
            }
          }
        }
      }
    }
  }
}
    ${ResponseInfoFragmentDoc}`;

/**
 * __useGetResponsesQuery__
 *
 * To run a query within a React component, call `useGetResponsesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResponsesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResponsesQuery({
 *   variables: {
 *      threadId: // value for 'threadId'
 *   },
 * });
 */
export function useGetResponsesQuery(baseOptions?: Apollo.QueryHookOptions<GetResponsesQuery, GetResponsesQueryVariables>) {
        return Apollo.useQuery<GetResponsesQuery, GetResponsesQueryVariables>(GetResponsesDocument, baseOptions);
      }
export function useGetResponsesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetResponsesQuery, GetResponsesQueryVariables>) {
          return Apollo.useLazyQuery<GetResponsesQuery, GetResponsesQueryVariables>(GetResponsesDocument, baseOptions);
        }
export type GetResponsesQueryHookResult = ReturnType<typeof useGetResponsesQuery>;
export type GetResponsesLazyQueryHookResult = ReturnType<typeof useGetResponsesLazyQuery>;
export type GetResponsesQueryResult = Apollo.QueryResult<GetResponsesQuery, GetResponsesQueryVariables>;
export const GetThreadDocument = gql`
    query GetThread($threadId: Int!) {
  getThread(threadId: $threadId) {
    id
    title
    text
    owner {
      username
    }
    ownerId
    createdAt
  }
}
    `;

/**
 * __useGetThreadQuery__
 *
 * To run a query within a React component, call `useGetThreadQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThreadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThreadQuery({
 *   variables: {
 *      threadId: // value for 'threadId'
 *   },
 * });
 */
export function useGetThreadQuery(baseOptions?: Apollo.QueryHookOptions<GetThreadQuery, GetThreadQueryVariables>) {
        return Apollo.useQuery<GetThreadQuery, GetThreadQueryVariables>(GetThreadDocument, baseOptions);
      }
export function useGetThreadLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetThreadQuery, GetThreadQueryVariables>) {
          return Apollo.useLazyQuery<GetThreadQuery, GetThreadQueryVariables>(GetThreadDocument, baseOptions);
        }
export type GetThreadQueryHookResult = ReturnType<typeof useGetThreadQuery>;
export type GetThreadLazyQueryHookResult = ReturnType<typeof useGetThreadLazyQuery>;
export type GetThreadQueryResult = Apollo.QueryResult<GetThreadQuery, GetThreadQueryVariables>;
export const GetThreadsDocument = gql`
    query GetThreads {
  getThreads {
    id
    title
    text
    owner {
      username
    }
    ownerId
    createdAt
  }
}
    `;

/**
 * __useGetThreadsQuery__
 *
 * To run a query within a React component, call `useGetThreadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThreadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThreadsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetThreadsQuery(baseOptions?: Apollo.QueryHookOptions<GetThreadsQuery, GetThreadsQueryVariables>) {
        return Apollo.useQuery<GetThreadsQuery, GetThreadsQueryVariables>(GetThreadsDocument, baseOptions);
      }
export function useGetThreadsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetThreadsQuery, GetThreadsQueryVariables>) {
          return Apollo.useLazyQuery<GetThreadsQuery, GetThreadsQueryVariables>(GetThreadsDocument, baseOptions);
        }
export type GetThreadsQueryHookResult = ReturnType<typeof useGetThreadsQuery>;
export type GetThreadsLazyQueryHookResult = ReturnType<typeof useGetThreadsLazyQuery>;
export type GetThreadsQueryResult = Apollo.QueryResult<GetThreadsQuery, GetThreadsQueryVariables>;