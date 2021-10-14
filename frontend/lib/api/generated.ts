import { gql } from 'graphql-tag';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AuthenticatedItem = User;

export type CreateInitialUserInput = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<DateTimeFilter>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
};

export type FloatFilter = {
  equals?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  gte?: Maybe<Scalars['Float']>;
  in?: Maybe<Array<Scalars['Float']>>;
  lt?: Maybe<Scalars['Float']>;
  lte?: Maybe<Scalars['Float']>;
  not?: Maybe<FloatFilter>;
  notIn?: Maybe<Array<Scalars['Float']>>;
};

export type IdFilter = {
  equals?: Maybe<Scalars['ID']>;
  gt?: Maybe<Scalars['ID']>;
  gte?: Maybe<Scalars['ID']>;
  in?: Maybe<Array<Scalars['ID']>>;
  lt?: Maybe<Scalars['ID']>;
  lte?: Maybe<Scalars['ID']>;
  not?: Maybe<IdFilter>;
  notIn?: Maybe<Array<Scalars['ID']>>;
};

export enum ImageExtension {
  Gif = 'gif',
  Jpg = 'jpg',
  Png = 'png',
  Webp = 'webp'
}

export type ImageFieldInput = {
  ref?: Maybe<Scalars['String']>;
  upload?: Maybe<Scalars['Upload']>;
};

export type ImageFieldOutput = {
  extension: ImageExtension;
  filesize: Scalars['Int'];
  height: Scalars['Int'];
  id: Scalars['ID'];
  ref: Scalars['String'];
  src: Scalars['String'];
  width: Scalars['Int'];
};

export type Institution = {
  __typename?: 'Institution';
  ageFrom: Scalars['Int'];
  ageTo: Scalars['Int'];
  city: Scalars['String'];
  description?: Maybe<Institution_Description_Document>;
  email?: Maybe<Scalars['String']>;
  gender: InstitutionGenderType;
  homepage?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastUpdated: Scalars['DateTime'];
  logo?: Maybe<ImageFieldOutput>;
  mobilePhone?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  owner?: Maybe<User>;
  phone?: Maybe<Scalars['String']>;
  photo?: Maybe<ImageFieldOutput>;
  placesAvailable: Scalars['Int'];
  placesTotal: Scalars['Int'];
  positionLat: Scalars['Float'];
  positionLng: Scalars['Float'];
  street: Scalars['String'];
  streetNumber: Scalars['String'];
  zip: Scalars['Int'];
};

export type InstitutionCreateInput = {
  ageFrom?: Maybe<Scalars['Int']>;
  ageTo?: Maybe<Scalars['Int']>;
  city?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['JSON']>;
  email?: Maybe<Scalars['String']>;
  gender: InstitutionGenderType;
  homepage?: Maybe<Scalars['String']>;
  lastUpdated?: Maybe<Scalars['DateTime']>;
  logo?: Maybe<ImageFieldInput>;
  mobilePhone?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<UserRelateToOneForCreateInput>;
  phone?: Maybe<Scalars['String']>;
  photo?: Maybe<ImageFieldInput>;
  placesAvailable?: Maybe<Scalars['Int']>;
  placesTotal?: Maybe<Scalars['Int']>;
  positionLat?: Maybe<Scalars['Float']>;
  positionLng?: Maybe<Scalars['Float']>;
  street?: Maybe<Scalars['String']>;
  streetNumber?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['Int']>;
};

export enum InstitutionGenderType {
  F = 'f',
  M = 'm',
  Mixed = 'mixed'
}

export type InstitutionGenderTypeNullableFilter = {
  equals?: Maybe<InstitutionGenderType>;
  in?: Maybe<Array<InstitutionGenderType>>;
  not?: Maybe<InstitutionGenderTypeNullableFilter>;
  notIn?: Maybe<Array<InstitutionGenderType>>;
};

export type InstitutionManyRelationFilter = {
  every?: Maybe<InstitutionWhereInput>;
  none?: Maybe<InstitutionWhereInput>;
  some?: Maybe<InstitutionWhereInput>;
};

export type InstitutionOrderByInput = {
  ageFrom?: Maybe<OrderDirection>;
  ageTo?: Maybe<OrderDirection>;
  city?: Maybe<OrderDirection>;
  email?: Maybe<OrderDirection>;
  gender?: Maybe<OrderDirection>;
  homepage?: Maybe<OrderDirection>;
  id?: Maybe<OrderDirection>;
  lastUpdated?: Maybe<OrderDirection>;
  mobilePhone?: Maybe<OrderDirection>;
  name?: Maybe<OrderDirection>;
  phone?: Maybe<OrderDirection>;
  placesAvailable?: Maybe<OrderDirection>;
  placesTotal?: Maybe<OrderDirection>;
  positionLat?: Maybe<OrderDirection>;
  positionLng?: Maybe<OrderDirection>;
  street?: Maybe<OrderDirection>;
  streetNumber?: Maybe<OrderDirection>;
  zip?: Maybe<OrderDirection>;
};

export type InstitutionRelateToManyForCreateInput = {
  connect?: Maybe<Array<InstitutionWhereUniqueInput>>;
  create?: Maybe<Array<InstitutionCreateInput>>;
};

export type InstitutionRelateToManyForUpdateInput = {
  connect?: Maybe<Array<InstitutionWhereUniqueInput>>;
  create?: Maybe<Array<InstitutionCreateInput>>;
  disconnect?: Maybe<Array<InstitutionWhereUniqueInput>>;
  set?: Maybe<Array<InstitutionWhereUniqueInput>>;
};

export type InstitutionUpdateArgs = {
  data: InstitutionUpdateInput;
  where: InstitutionWhereUniqueInput;
};

export type InstitutionUpdateInput = {
  ageFrom?: Maybe<Scalars['Int']>;
  ageTo?: Maybe<Scalars['Int']>;
  city?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['JSON']>;
  email?: Maybe<Scalars['String']>;
  gender?: Maybe<InstitutionGenderType>;
  homepage?: Maybe<Scalars['String']>;
  lastUpdated?: Maybe<Scalars['DateTime']>;
  logo?: Maybe<ImageFieldInput>;
  mobilePhone?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<UserRelateToOneForUpdateInput>;
  phone?: Maybe<Scalars['String']>;
  photo?: Maybe<ImageFieldInput>;
  placesAvailable?: Maybe<Scalars['Int']>;
  placesTotal?: Maybe<Scalars['Int']>;
  positionLat?: Maybe<Scalars['Float']>;
  positionLng?: Maybe<Scalars['Float']>;
  street?: Maybe<Scalars['String']>;
  streetNumber?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['Int']>;
};

export type InstitutionWhereInput = {
  AND?: Maybe<Array<InstitutionWhereInput>>;
  NOT?: Maybe<Array<InstitutionWhereInput>>;
  OR?: Maybe<Array<InstitutionWhereInput>>;
  ageFrom?: Maybe<IntFilter>;
  ageTo?: Maybe<IntFilter>;
  city?: Maybe<StringFilter>;
  email?: Maybe<StringFilter>;
  gender?: Maybe<InstitutionGenderTypeNullableFilter>;
  homepage?: Maybe<StringFilter>;
  id?: Maybe<IdFilter>;
  lastUpdated?: Maybe<DateTimeFilter>;
  mobilePhone?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  owner?: Maybe<UserWhereInput>;
  phone?: Maybe<StringFilter>;
  placesAvailable?: Maybe<IntFilter>;
  placesTotal?: Maybe<IntFilter>;
  positionLat?: Maybe<FloatFilter>;
  positionLng?: Maybe<FloatFilter>;
  street?: Maybe<StringFilter>;
  streetNumber?: Maybe<StringFilter>;
  zip?: Maybe<IntFilter>;
};

export type InstitutionWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

export type Institution_Description_Document = {
  __typename?: 'Institution_description_Document';
  document: Scalars['JSON'];
};


export type Institution_Description_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean'];
};

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  not?: Maybe<IntFilter>;
  notIn?: Maybe<Array<Scalars['Int']>>;
};

export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta';
  enableSessionItem: Scalars['Boolean'];
  enableSignout: Scalars['Boolean'];
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};


export type KeystoneAdminMetaListArgs = {
  key: Scalars['String'];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta';
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars['Int']>;
  fieldMeta?: Maybe<Scalars['JSON']>;
  isFilterable: Scalars['Boolean'];
  isOrderable: Scalars['Boolean'];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars['String'];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars['String'];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars['Int'];
};


export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView';
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden'
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView';
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
  Read = 'read'
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView';
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = 'hidden',
  Read = 'read'
}

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta';
  description?: Maybe<Scalars['String']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  hideCreate: Scalars['Boolean'];
  hideDelete: Scalars['Boolean'];
  initialColumns: Array<Scalars['String']>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars['Boolean'];
  itemQueryName: Scalars['String'];
  key: Scalars['String'];
  label: Scalars['String'];
  labelField: Scalars['String'];
  listQueryName: Scalars['String'];
  pageSize: Scalars['Int'];
  path: Scalars['String'];
  plural: Scalars['String'];
  singular: Scalars['String'];
};

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort';
  direction: KeystoneAdminUiSortDirection;
  field: Scalars['String'];
};

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta';
  adminMeta: KeystoneAdminMeta;
};

export type LocalImageFieldOutput = ImageFieldOutput & {
  __typename?: 'LocalImageFieldOutput';
  extension: ImageExtension;
  filesize: Scalars['Int'];
  height: Scalars['Int'];
  id: Scalars['ID'];
  ref: Scalars['String'];
  src: Scalars['String'];
  width: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateUserWithPassword: UserAuthenticationWithPasswordResult;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  createInstitution?: Maybe<Institution>;
  createInstitutions?: Maybe<Array<Maybe<Institution>>>;
  createUser?: Maybe<User>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  deleteInstitution?: Maybe<Institution>;
  deleteInstitutions?: Maybe<Array<Maybe<Institution>>>;
  deleteUser?: Maybe<User>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  endSession: Scalars['Boolean'];
  updateInstitution?: Maybe<Institution>;
  updateInstitutions?: Maybe<Array<Maybe<Institution>>>;
  updateUser?: Maybe<User>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
};


export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput;
};


export type MutationCreateInstitutionArgs = {
  data: InstitutionCreateInput;
};


export type MutationCreateInstitutionsArgs = {
  data: Array<InstitutionCreateInput>;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};


export type MutationDeleteInstitutionArgs = {
  where: InstitutionWhereUniqueInput;
};


export type MutationDeleteInstitutionsArgs = {
  where: Array<InstitutionWhereUniqueInput>;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};


export type MutationUpdateInstitutionArgs = {
  data: InstitutionUpdateInput;
  where: InstitutionWhereUniqueInput;
};


export type MutationUpdateInstitutionsArgs = {
  data: Array<InstitutionUpdateArgs>;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};

export type NestedStringFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PasswordState = {
  __typename?: 'PasswordState';
  isSet: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  authenticatedItem?: Maybe<AuthenticatedItem>;
  institution?: Maybe<Institution>;
  institutions?: Maybe<Array<Institution>>;
  institutionsCount?: Maybe<Scalars['Int']>;
  keystone: KeystoneMeta;
  /** Return institutions within `radius` km distance from `cityOrZip` */
  nearbyInstitutions: Array<Institution>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']>;
};


export type QueryInstitutionArgs = {
  where: InstitutionWhereUniqueInput;
};


export type QueryInstitutionsArgs = {
  orderBy?: Array<InstitutionOrderByInput>;
  skip?: Scalars['Int'];
  take?: Maybe<Scalars['Int']>;
  where?: InstitutionWhereInput;
};


export type QueryInstitutionsCountArgs = {
  where?: InstitutionWhereInput;
};


export type QueryNearbyInstitutionsArgs = {
  cityOrZip: Scalars['String'];
  orderBy?: Array<InstitutionOrderByInput>;
  radius: Scalars['Int'];
  skip?: Scalars['Int'];
  take?: Maybe<Scalars['Int']>;
  where?: InstitutionWhereInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int'];
  take?: Maybe<Scalars['Int']>;
  where?: UserWhereInput;
};


export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type StringFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  institutions?: Maybe<Array<Institution>>;
  institutionsCount?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<PasswordState>;
};


export type UserInstitutionsArgs = {
  orderBy?: Array<InstitutionOrderByInput>;
  skip?: Scalars['Int'];
  take?: Maybe<Scalars['Int']>;
  where?: InstitutionWhereInput;
};


export type UserInstitutionsCountArgs = {
  where?: InstitutionWhereInput;
};

export type UserAuthenticationWithPasswordFailure = {
  __typename?: 'UserAuthenticationWithPasswordFailure';
  message: Scalars['String'];
};

export type UserAuthenticationWithPasswordResult = UserAuthenticationWithPasswordFailure | UserAuthenticationWithPasswordSuccess;

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: 'UserAuthenticationWithPasswordSuccess';
  item: User;
  sessionToken: Scalars['String'];
};

export type UserCreateInput = {
  email?: Maybe<Scalars['String']>;
  institutions?: Maybe<InstitutionRelateToManyForCreateInput>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type UserOrderByInput = {
  email?: Maybe<OrderDirection>;
  id?: Maybe<OrderDirection>;
  name?: Maybe<OrderDirection>;
};

export type UserRelateToOneForCreateInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateInput>;
};

export type UserRelateToOneForUpdateInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  email?: Maybe<Scalars['String']>;
  institutions?: Maybe<InstitutionRelateToManyForUpdateInput>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type UserWhereInput = {
  AND?: Maybe<Array<UserWhereInput>>;
  NOT?: Maybe<Array<UserWhereInput>>;
  OR?: Maybe<Array<UserWhereInput>>;
  email?: Maybe<StringFilter>;
  id?: Maybe<IdFilter>;
  institutions?: Maybe<InstitutionManyRelationFilter>;
  name?: Maybe<StringFilter>;
};

export type UserWhereUniqueInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

export type NearbyInstitutionsQueryVariables = Exact<{
  cityOrZip: Scalars['String'];
  radius: Scalars['Int'];
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type NearbyInstitutionsQuery = { __typename?: 'Query', nearbyInstitutions: Array<{ __typename?: 'Institution', id: string, name: string, city: string, gender: InstitutionGenderType, ageFrom: number, ageTo: number, placesAvailable: number, placesTotal: number, lastUpdated: any, photo?: { __typename?: 'LocalImageFieldOutput', src: string } | null | undefined }> };

export type InstitutionsQueryVariables = Exact<{
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type InstitutionsQuery = { __typename?: 'Query', institutionsCount?: number | null | undefined, institutions?: Array<{ __typename?: 'Institution', id: string, name: string, city: string, gender: InstitutionGenderType, ageFrom: number, ageTo: number, placesAvailable: number, placesTotal: number, lastUpdated: any, photo?: { __typename?: 'LocalImageFieldOutput', src: string } | null | undefined }> | null | undefined };


export const NearbyInstitutionsDocument = gql`
    query nearbyInstitutions($cityOrZip: String!, $radius: Int!, $skip: Int, $take: Int) {
  nearbyInstitutions(
    cityOrZip: $cityOrZip
    radius: $radius
    skip: $skip
    take: $take
  ) {
    id
    name
    city
    gender
    ageFrom
    ageTo
    photo {
      src
    }
    placesAvailable
    placesTotal
    lastUpdated
  }
}
    `;

/**
 * __useNearbyInstitutionsQuery__
 *
 * To run a query within a React component, call `useNearbyInstitutionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNearbyInstitutionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNearbyInstitutionsQuery({
 *   variables: {
 *      cityOrZip: // value for 'cityOrZip'
 *      radius: // value for 'radius'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useNearbyInstitutionsQuery(baseOptions: Apollo.QueryHookOptions<NearbyInstitutionsQuery, NearbyInstitutionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NearbyInstitutionsQuery, NearbyInstitutionsQueryVariables>(NearbyInstitutionsDocument, options);
      }
export function useNearbyInstitutionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NearbyInstitutionsQuery, NearbyInstitutionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NearbyInstitutionsQuery, NearbyInstitutionsQueryVariables>(NearbyInstitutionsDocument, options);
        }
export type NearbyInstitutionsQueryHookResult = ReturnType<typeof useNearbyInstitutionsQuery>;
export type NearbyInstitutionsLazyQueryHookResult = ReturnType<typeof useNearbyInstitutionsLazyQuery>;
export type NearbyInstitutionsQueryResult = Apollo.QueryResult<NearbyInstitutionsQuery, NearbyInstitutionsQueryVariables>;
export const InstitutionsDocument = gql`
    query institutions($skip: Int, $take: Int) {
  institutionsCount
  institutions(skip: $skip, take: $take) {
    id
    name
    city
    gender
    ageFrom
    ageTo
    photo {
      src
    }
    placesAvailable
    placesTotal
    lastUpdated
  }
}
    `;

/**
 * __useInstitutionsQuery__
 *
 * To run a query within a React component, call `useInstitutionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstitutionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstitutionsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useInstitutionsQuery(baseOptions?: Apollo.QueryHookOptions<InstitutionsQuery, InstitutionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InstitutionsQuery, InstitutionsQueryVariables>(InstitutionsDocument, options);
      }
export function useInstitutionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InstitutionsQuery, InstitutionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InstitutionsQuery, InstitutionsQueryVariables>(InstitutionsDocument, options);
        }
export type InstitutionsQueryHookResult = ReturnType<typeof useInstitutionsQuery>;
export type InstitutionsLazyQueryHookResult = ReturnType<typeof useInstitutionsLazyQuery>;
export type InstitutionsQueryResult = Apollo.QueryResult<InstitutionsQuery, InstitutionsQueryVariables>;