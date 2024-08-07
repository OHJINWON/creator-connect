export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type IBoard = {
  __typename?: 'Board';
  aboutMe?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
  password?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
};

export type ICreateBoardInput = {
  aboutMe?: InputMaybe<Scalars['String']>;
  age?: InputMaybe<Scalars['Int']>;
  birthyear?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  field?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Int']>;
};

export type ICreateUserInput = {
  age?: InputMaybe<Scalars['String']>;
  birthday?: InputMaybe<Scalars['String']>;
  birthyear?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  mobile?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  profile_image?: InputMaybe<Scalars['String']>;
};

export type IMutation = {
  __typename?: 'Mutation';
  createBoard?: Maybe<Scalars['String']>;
  createUser?: Maybe<Scalars['String']>;
};


export type IMutationCreateBoardArgs = {
  createBoardInput?: InputMaybe<ICreateBoardInput>;
};


export type IMutationCreateUserArgs = {
  createUserInput?: InputMaybe<ICreateUserInput>;
};

export type IMyUser = {
  __typename?: 'MyUser';
  age?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  birthyear?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
  profile_image?: Maybe<Scalars['String']>;
};

export type IQuery = {
  __typename?: 'Query';
  fetchBoard?: Maybe<IBoard>;
  fetchBoards: Array<IBoard>;
  fetchUser?: Maybe<IMyUser>;
  fetchUsers?: Maybe<Array<Maybe<IMyUser>>>;
};


export type IQueryFetchBoardArgs = {
  email: Scalars['String'];
};


export type IQueryFetchUserArgs = {
  email: Scalars['String'];
};
