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
};

/** Autogenerated input type of AddArticle */
export type AddArticleInput = {
  body: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

/** Autogenerated input type of AddComment */
export type AddCommentInput = {
  articleId: Scalars['Int'];
  body: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  commenter: Scalars['String'];
};

export type Article = {
  __typename?: 'Article';
  body: Scalars['String'];
  comments: CommentConnection;
  id: Scalars['ID'];
  title: Scalars['String'];
};


export type ArticleCommentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** The connection type for Article. */
export type ArticleConnection = {
  __typename?: 'ArticleConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ArticleEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Article>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ArticleEdge = {
  __typename?: 'ArticleEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Article>;
};

export type Comment = {
  __typename?: 'Comment';
  body: Scalars['String'];
  commenter: Scalars['String'];
  id: Scalars['ID'];
};

/** The connection type for Comment. */
export type CommentConnection = {
  __typename?: 'CommentConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CommentEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Comment>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CommentEdge = {
  __typename?: 'CommentEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Comment>;
};

/** Autogenerated input type of DeleteArticle */
export type DeleteArticleInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of DeleteArticle */
export type DeleteArticlePayload = {
  __typename?: 'DeleteArticlePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addArticle?: Maybe<Article>;
  addComment?: Maybe<Comment>;
  deleteArticle?: Maybe<DeleteArticlePayload>;
  updateArticle?: Maybe<Article>;
  updateArticleBody?: Maybe<Article>;
  updateArticleTitle?: Maybe<Article>;
};


export type MutationAddArticleArgs = {
  input: AddArticleInput;
};


export type MutationAddCommentArgs = {
  input: AddCommentInput;
};


export type MutationDeleteArticleArgs = {
  input: DeleteArticleInput;
};


export type MutationUpdateArticleArgs = {
  input: UpdateArticleInput;
};


export type MutationUpdateArticleBodyArgs = {
  input: UpdateArticleBodyInput;
};


export type MutationUpdateArticleTitleArgs = {
  input: UpdateArticleTitleInput;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  allArticles: ArticleConnection;
  articleById?: Maybe<Article>;
};


export type QueryAllArticlesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryArticleByIdArgs = {
  id: Scalars['Int'];
};

/** Autogenerated input type of UpdateArticleBody */
export type UpdateArticleBodyInput = {
  body: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated input type of UpdateArticle */
export type UpdateArticleInput = {
  body: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  title: Scalars['String'];
};

/** Autogenerated input type of UpdateArticleTitle */
export type UpdateArticleTitleInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type ArticleFragment = { __typename?: 'Article', id: string, title: string, body: string, comments: { __typename?: 'CommentConnection', nodes?: Array<{ __typename?: 'Comment', id: string, commenter: string, body: string } | null | undefined> | null | undefined } };

export type BlogArticleQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type BlogArticleQuery = { __typename?: 'Query', articleById?: { __typename?: 'Article', id: string, title: string, body: string, comments: { __typename?: 'CommentConnection', nodes?: Array<{ __typename?: 'Comment', id: string, commenter: string, body: string } | null | undefined> | null | undefined } } | null | undefined };

export type ArticleLinkFragment = { __typename?: 'Article', id: string, title: string };

export type BlogScreenQueryVariables = Exact<{ [key: string]: never; }>;


export type BlogScreenQuery = { __typename?: 'Query', allArticles: { __typename?: 'ArticleConnection', nodes?: Array<{ __typename?: 'Article', id: string, title: string } | null | undefined> | null | undefined, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null | undefined, hasPreviousPage: boolean, startCursor?: string | null | undefined } } };
