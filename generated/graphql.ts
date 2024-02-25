import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: any; output: any; }
};

export type Alarm = {
  __typename?: 'Alarm';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  msg: Scalars['String']['output'];
  read: Scalars['Boolean']['output'];
  updatedAt: Scalars['String']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type Alarms = {
  __typename?: 'Alarms';
  alarms?: Maybe<Array<Maybe<Alarm>>>;
  unreadTotal: Scalars['Int']['output'];
};

export type Location = {
  __typename?: 'Location';
  isFollowing: Scalars['Boolean']['output'];
  isMe: Scalars['Boolean']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lon?: Maybe<Scalars['Float']['output']>;
  user: User;
  userId: Scalars['Int']['output'];
  vectorDistance?: Maybe<Scalars['Float']['output']>;
};

export type LocationRoom = {
  __typename?: 'LocationRoom';
  id: Scalars['Int']['output'];
  locations?: Maybe<Array<Location>>;
};

export type LoginResult = {
  __typename?: 'LoginResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  payload: Scalars['String']['output'];
  read: Scalars['Boolean']['output'];
  room: Room;
  updatedAt: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: MutationResponse;
  createAlarm: MutationResponse;
  deleteAlarm: MutationResponse;
  deleteFreeze: MutationResponse;
  deletePhoto: MutationResponse;
  editProfile: MutationResponse;
  followUser: MutationResponse;
  freezeMoment: MutationResponse;
  login: LoginResult;
  readAlarm: MutationResponse;
  readMessage: MutationResponse;
  sendMessage: MutationResponse;
  unfollowUser: MutationResponse;
  updateLocation: MutationResponse;
  uploadPhoto?: Maybe<Photo>;
};


export type MutationCreateAccountArgs = {
  avatar?: InputMaybe<Scalars['Upload']['input']>;
  birthDay: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  instaUsername?: InputMaybe<Scalars['String']['input']>;
  interestingSex?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phoneNo?: InputMaybe<Scalars['String']['input']>;
  sex: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationCreateAlarmArgs = {
  msg: Scalars['String']['input'];
};


export type MutationDeleteAlarmArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteFreezeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePhotoArgs = {
  id: Scalars['Int']['input'];
};


export type MutationEditProfileArgs = {
  avatar?: InputMaybe<Scalars['Upload']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  instaUsername?: InputMaybe<Scalars['String']['input']>;
  interestingSex?: InputMaybe<Scalars['String']['input']>;
  introduction?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  sex?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationFollowUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationFreezeMomentArgs = {
  lat: Scalars['Float']['input'];
  lon: Scalars['Float']['input'];
  maxD?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationReadAlarmArgs = {
  id: Scalars['Int']['input'];
};


export type MutationReadMessageArgs = {
  id: Scalars['Int']['input'];
};


export type MutationSendMessageArgs = {
  payload: Scalars['String']['input'];
  roomId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUnfollowUserArgs = {
  username: Scalars['String']['input'];
};


export type MutationUpdateLocationArgs = {
  lat: Scalars['Float']['input'];
  lon: Scalars['Float']['input'];
};


export type MutationUploadPhotoArgs = {
  ufile?: InputMaybe<Scalars['Upload']['input']>;
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  error?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type Photo = {
  __typename?: 'Photo';
  file: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  initMap?: Maybe<Array<Maybe<Location>>>;
  me?: Maybe<User>;
  searchUsers: Array<Maybe<User>>;
  seeFollowers: SeeFollowersResult;
  seeFollowing: SeeFollowingResult;
  seeMatches?: Maybe<Array<Maybe<User>>>;
  seeProfile?: Maybe<User>;
  seeRoom?: Maybe<Room>;
  seeRooms?: Maybe<Array<Maybe<Room>>>;
  selectLocations?: Maybe<LocationRoom>;
  showAlarms?: Maybe<Alarms>;
  validCreateAccount: ValidResponse;
};


export type QueryInitMapArgs = {
  lat: Scalars['Float']['input'];
  lon: Scalars['Float']['input'];
};


export type QuerySearchUsersArgs = {
  keyword: Scalars['String']['input'];
  lastId?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySeeFollowersArgs = {
  page: Scalars['Int']['input'];
};


export type QuerySeeFollowingArgs = {
  page: Scalars['Int']['input'];
};


export type QuerySeeMatchesArgs = {
  lastId?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySeeProfileArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySeeRoomArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySelectLocationsArgs = {
  lat: Scalars['Float']['input'];
  lon: Scalars['Float']['input'];
};


export type QueryValidCreateAccountArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  instaUsername?: InputMaybe<Scalars['String']['input']>;
  nextPage?: InputMaybe<Scalars['String']['input']>;
  phoneNo?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Room = {
  __typename?: 'Room';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  messages?: Maybe<Array<Maybe<Message>>>;
  unreadTotal: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  mapUpdates: Location;
  roomUpdates?: Maybe<Message>;
};


export type SubscriptionMapUpdatesArgs = {
  generalLat: Scalars['Float']['input'];
  generalLon: Scalars['Float']['input'];
};


export type SubscriptionRoomUpdatesArgs = {
  id: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  birthDay: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  followers?: Maybe<Array<Maybe<User>>>;
  followersCount: Scalars['Int']['output'];
  following?: Maybe<Array<Maybe<User>>>;
  followingCount: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  instaUsername?: Maybe<Scalars['String']['output']>;
  interestingAge?: Maybe<Scalars['Int']['output']>;
  interestingSex: Scalars['String']['output'];
  introduction?: Maybe<Scalars['String']['output']>;
  isFollower: Scalars['Boolean']['output'];
  isFollowing: Scalars['Boolean']['output'];
  location?: Maybe<Location>;
  password: Scalars['String']['output'];
  phoneNo: Scalars['String']['output'];
  photos?: Maybe<Array<Maybe<Photo>>>;
  sex: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  userStatus?: Maybe<Scalars['String']['output']>;
  userType: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Freeze = {
  __typename?: 'freeze';
  createdAt: Scalars['String']['output'];
  freezedUsers: Array<Maybe<User>>;
  freezerId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type SeeFollowersResult = {
  __typename?: 'seeFollowersResult';
  error?: Maybe<Scalars['String']['output']>;
  followers?: Maybe<Array<Maybe<User>>>;
  ok: Scalars['Boolean']['output'];
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type SeeFollowingResult = {
  __typename?: 'seeFollowingResult';
  error?: Maybe<Scalars['String']['output']>;
  following?: Maybe<Array<Maybe<User>>>;
  ok: Scalars['Boolean']['output'];
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type ValidResponse = {
  __typename?: 'validResponse';
  error?: Maybe<Scalars['String']['output']>;
  nextPage?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateAccountMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
  sex: Scalars['String']['input'];
  interestingSex?: InputMaybe<Scalars['String']['input']>;
  birthDay: Scalars['String']['input'];
  phoneNo?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  instaUsername?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['Upload']['input']>;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResult', ok: boolean, token?: string | null, error?: string | null } };

export type ReadMessageMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ReadMessageMutation = { __typename?: 'Mutation', readMessage: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } };

export type SendMessageMutationVariables = Exact<{
  payload: Scalars['String']['input'];
  roomId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'MutationResponse', ok: boolean, id?: number | null } };

export type UpdateLocationMutationVariables = Exact<{
  lat: Scalars['Float']['input'];
  lon: Scalars['Float']['input'];
}>;


export type UpdateLocationMutation = { __typename?: 'Mutation', updateLocation: { __typename?: 'MutationResponse', id?: number | null, ok: boolean, error?: string | null } };

export type SeeRoomQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type SeeRoomQuery = { __typename?: 'Query', seeRoom?: { __typename?: 'Room', id: number, messages?: Array<{ __typename?: 'Message', id: number, payload: string, read: boolean, user: { __typename?: 'User', id: number, username: string, avatar?: string | null } } | null> | null } | null };

export type SelectLocationsQueryVariables = Exact<{
  lat: Scalars['Float']['input'];
  lon: Scalars['Float']['input'];
}>;


export type SelectLocationsQuery = { __typename?: 'Query', selectLocations?: { __typename?: 'LocationRoom', id: number, locations?: Array<{ __typename?: 'Location', userId: number, lat?: number | null, lon?: number | null }> | null } | null };

export type ValidCreateAccountQueryVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
  nextPage?: InputMaybe<Scalars['String']['input']>;
}>;


export type ValidCreateAccountQuery = { __typename?: 'Query', validCreateAccount: { __typename?: 'validResponse', ok: boolean, error?: string | null, nextPage?: string | null } };

export type MapUpdatesSubscriptionVariables = Exact<{
  generalLat: Scalars['Float']['input'];
  generalLon: Scalars['Float']['input'];
}>;


export type MapUpdatesSubscription = { __typename?: 'Subscription', mapUpdates: { __typename?: 'Location', userId: number, lat?: number | null, lon?: number | null } };

export type RoomUpdatesSubscriptionVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RoomUpdatesSubscription = { __typename?: 'Subscription', roomUpdates?: { __typename?: 'Message', id: number, payload: string, read: boolean, user: { __typename?: 'User', id: number, username: string, avatar?: string | null } } | null };


export const CreateAccountDocument = gql`
    mutation createAccount($username: String!, $password: String!, $sex: String!, $interestingSex: String, $birthDay: String!, $phoneNo: String, $email: String, $instaUsername: String, $avatar: Upload) {
  createAccount(
    username: $username
    password: $password
    sex: $sex
    interestingSex: $interestingSex
    birthDay: $birthDay
    phoneNo: $phoneNo
    email: $email
    instaUsername: $instaUsername
    avatar: $avatar
  ) {
    ok
    error
  }
}
    `;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      sex: // value for 'sex'
 *      interestingSex: // value for 'interestingSex'
 *      birthDay: // value for 'birthDay'
 *      phoneNo: // value for 'phoneNo'
 *      email: // value for 'email'
 *      instaUsername: // value for 'instaUsername'
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    ok
    token
    error
  }
}
    `;
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
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ReadMessageDocument = gql`
    mutation readMessage($id: Int!) {
  readMessage(id: $id) {
    ok
    error
  }
}
    `;
export type ReadMessageMutationFn = Apollo.MutationFunction<ReadMessageMutation, ReadMessageMutationVariables>;

/**
 * __useReadMessageMutation__
 *
 * To run a mutation, you first call `useReadMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readMessageMutation, { data, loading, error }] = useReadMessageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReadMessageMutation(baseOptions?: Apollo.MutationHookOptions<ReadMessageMutation, ReadMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadMessageMutation, ReadMessageMutationVariables>(ReadMessageDocument, options);
      }
export type ReadMessageMutationHookResult = ReturnType<typeof useReadMessageMutation>;
export type ReadMessageMutationResult = Apollo.MutationResult<ReadMessageMutation>;
export type ReadMessageMutationOptions = Apollo.BaseMutationOptions<ReadMessageMutation, ReadMessageMutationVariables>;
export const SendMessageDocument = gql`
    mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
  sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
    ok
    id
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *      roomId: // value for 'roomId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const UpdateLocationDocument = gql`
    mutation updateLocation($lat: Float!, $lon: Float!) {
  updateLocation(lat: $lat, lon: $lon) {
    id
    ok
    error
  }
}
    `;
export type UpdateLocationMutationFn = Apollo.MutationFunction<UpdateLocationMutation, UpdateLocationMutationVariables>;

/**
 * __useUpdateLocationMutation__
 *
 * To run a mutation, you first call `useUpdateLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLocationMutation, { data, loading, error }] = useUpdateLocationMutation({
 *   variables: {
 *      lat: // value for 'lat'
 *      lon: // value for 'lon'
 *   },
 * });
 */
export function useUpdateLocationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLocationMutation, UpdateLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLocationMutation, UpdateLocationMutationVariables>(UpdateLocationDocument, options);
      }
export type UpdateLocationMutationHookResult = ReturnType<typeof useUpdateLocationMutation>;
export type UpdateLocationMutationResult = Apollo.MutationResult<UpdateLocationMutation>;
export type UpdateLocationMutationOptions = Apollo.BaseMutationOptions<UpdateLocationMutation, UpdateLocationMutationVariables>;
export const SeeRoomDocument = gql`
    query SeeRoom($id: Int!) {
  seeRoom(id: $id) {
    id
    messages {
      id
      payload
      user {
        id
        username
        avatar
      }
      read
    }
  }
}
    `;

/**
 * __useSeeRoomQuery__
 *
 * To run a query within a React component, call `useSeeRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeRoomQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSeeRoomQuery(baseOptions: Apollo.QueryHookOptions<SeeRoomQuery, SeeRoomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeRoomQuery, SeeRoomQueryVariables>(SeeRoomDocument, options);
      }
export function useSeeRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeRoomQuery, SeeRoomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeRoomQuery, SeeRoomQueryVariables>(SeeRoomDocument, options);
        }
export function useSeeRoomSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SeeRoomQuery, SeeRoomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SeeRoomQuery, SeeRoomQueryVariables>(SeeRoomDocument, options);
        }
export type SeeRoomQueryHookResult = ReturnType<typeof useSeeRoomQuery>;
export type SeeRoomLazyQueryHookResult = ReturnType<typeof useSeeRoomLazyQuery>;
export type SeeRoomSuspenseQueryHookResult = ReturnType<typeof useSeeRoomSuspenseQuery>;
export type SeeRoomQueryResult = Apollo.QueryResult<SeeRoomQuery, SeeRoomQueryVariables>;
export const SelectLocationsDocument = gql`
    query SelectLocations($lat: Float!, $lon: Float!) {
  selectLocations(lat: $lat, lon: $lon) {
    id
    locations {
      userId
      lat
      lon
    }
  }
}
    `;

/**
 * __useSelectLocationsQuery__
 *
 * To run a query within a React component, call `useSelectLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelectLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelectLocationsQuery({
 *   variables: {
 *      lat: // value for 'lat'
 *      lon: // value for 'lon'
 *   },
 * });
 */
export function useSelectLocationsQuery(baseOptions: Apollo.QueryHookOptions<SelectLocationsQuery, SelectLocationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SelectLocationsQuery, SelectLocationsQueryVariables>(SelectLocationsDocument, options);
      }
export function useSelectLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SelectLocationsQuery, SelectLocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SelectLocationsQuery, SelectLocationsQueryVariables>(SelectLocationsDocument, options);
        }
export function useSelectLocationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SelectLocationsQuery, SelectLocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SelectLocationsQuery, SelectLocationsQueryVariables>(SelectLocationsDocument, options);
        }
export type SelectLocationsQueryHookResult = ReturnType<typeof useSelectLocationsQuery>;
export type SelectLocationsLazyQueryHookResult = ReturnType<typeof useSelectLocationsLazyQuery>;
export type SelectLocationsSuspenseQueryHookResult = ReturnType<typeof useSelectLocationsSuspenseQuery>;
export type SelectLocationsQueryResult = Apollo.QueryResult<SelectLocationsQuery, SelectLocationsQueryVariables>;
export const ValidCreateAccountDocument = gql`
    query ValidCreateAccount($username: String, $nextPage: String) {
  validCreateAccount(username: $username, nextPage: $nextPage) {
    ok
    error
    nextPage
  }
}
    `;

/**
 * __useValidCreateAccountQuery__
 *
 * To run a query within a React component, call `useValidCreateAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidCreateAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidCreateAccountQuery({
 *   variables: {
 *      username: // value for 'username'
 *      nextPage: // value for 'nextPage'
 *   },
 * });
 */
export function useValidCreateAccountQuery(baseOptions?: Apollo.QueryHookOptions<ValidCreateAccountQuery, ValidCreateAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidCreateAccountQuery, ValidCreateAccountQueryVariables>(ValidCreateAccountDocument, options);
      }
export function useValidCreateAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidCreateAccountQuery, ValidCreateAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidCreateAccountQuery, ValidCreateAccountQueryVariables>(ValidCreateAccountDocument, options);
        }
export function useValidCreateAccountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ValidCreateAccountQuery, ValidCreateAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ValidCreateAccountQuery, ValidCreateAccountQueryVariables>(ValidCreateAccountDocument, options);
        }
export type ValidCreateAccountQueryHookResult = ReturnType<typeof useValidCreateAccountQuery>;
export type ValidCreateAccountLazyQueryHookResult = ReturnType<typeof useValidCreateAccountLazyQuery>;
export type ValidCreateAccountSuspenseQueryHookResult = ReturnType<typeof useValidCreateAccountSuspenseQuery>;
export type ValidCreateAccountQueryResult = Apollo.QueryResult<ValidCreateAccountQuery, ValidCreateAccountQueryVariables>;
export const MapUpdatesDocument = gql`
    subscription MapUpdates($generalLat: Float!, $generalLon: Float!) {
  mapUpdates(generalLat: $generalLat, generalLon: $generalLon) {
    userId
    lat
    lon
  }
}
    `;

/**
 * __useMapUpdatesSubscription__
 *
 * To run a query within a React component, call `useMapUpdatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMapUpdatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMapUpdatesSubscription({
 *   variables: {
 *      generalLat: // value for 'generalLat'
 *      generalLon: // value for 'generalLon'
 *   },
 * });
 */
export function useMapUpdatesSubscription(baseOptions: Apollo.SubscriptionHookOptions<MapUpdatesSubscription, MapUpdatesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MapUpdatesSubscription, MapUpdatesSubscriptionVariables>(MapUpdatesDocument, options);
      }
export type MapUpdatesSubscriptionHookResult = ReturnType<typeof useMapUpdatesSubscription>;
export type MapUpdatesSubscriptionResult = Apollo.SubscriptionResult<MapUpdatesSubscription>;
export const RoomUpdatesDocument = gql`
    subscription roomUpdates($id: Int!) {
  roomUpdates(id: $id) {
    id
    payload
    user {
      id
      username
      avatar
    }
    read
  }
}
    `;

/**
 * __useRoomUpdatesSubscription__
 *
 * To run a query within a React component, call `useRoomUpdatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRoomUpdatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomUpdatesSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRoomUpdatesSubscription(baseOptions: Apollo.SubscriptionHookOptions<RoomUpdatesSubscription, RoomUpdatesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<RoomUpdatesSubscription, RoomUpdatesSubscriptionVariables>(RoomUpdatesDocument, options);
      }
export type RoomUpdatesSubscriptionHookResult = ReturnType<typeof useRoomUpdatesSubscription>;
export type RoomUpdatesSubscriptionResult = Apollo.SubscriptionResult<RoomUpdatesSubscription>;