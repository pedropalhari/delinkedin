export type Maybe<T> = T | null;
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
};

export type CommentType = {
  __typename?: 'CommentType';
  content: Scalars['String'];
  id: Scalars['ID'];
  post?: Maybe<PostType>;
  postId: Scalars['String'];
  upvoteCount?: Maybe<Scalars['Int']>;
  upvotes?: Maybe<Array<Maybe<UpvoteType>>>;
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment?: Maybe<CommentType>;
  toggleUpvoteOnComment?: Maybe<CommentType>;
};


export type MutationCreateCommentArgs = {
  content: Scalars['String'];
  postId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationToggleUpvoteOnCommentArgs = {
  commentId: Scalars['String'];
  userId: Scalars['String'];
};

export type PostType = {
  __typename?: 'PostType';
  comments?: Maybe<Array<Maybe<CommentType>>>;
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  getPostById?: Maybe<PostType>;
};


export type QueryGetPostByIdArgs = {
  postId: Scalars['String'];
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type UpvoteType = {
  __typename?: 'UpvoteType';
  comment?: Maybe<CommentType>;
  commentId: Scalars['String'];
  id: Scalars['ID'];
  userId: Scalars['String'];
};

export type GetAllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPostsQuery = { __typename?: 'Query', getPostById?: { __typename?: 'PostType', comments?: Array<{ __typename?: 'CommentType', id: string, content: string, upvoteCount?: number | null | undefined, userId: string } | null | undefined> | null | undefined } | null | undefined };
