import { json, LoaderFunction, useLoaderData } from "remix";
import { gql } from "@apollo/client";
import { client } from "~/services/apollo";
import { Comment } from "~/components/Comment";
import type {
  ArticleFragment,
  BlogArticleQuery,
  BlogArticleQueryVariables,
} from "~/generated/graphql";

export const BLOG_ARTICLE_FRAGMENT = gql`
  fragment Article on Article {
    id
    title
    body
    comments {
      nodes {
        id
        commenter
        body
      }
    }
  }
`;

export const BLOG_ARTICLE_QUERY = gql`
  query BlogArticle($id: Int!) {
    articleById(id: $id) {
      ...Article
    }
  }
  ${BLOG_ARTICLE_FRAGMENT}
`;

export const loader: LoaderFunction = async ({ params: { blogId } }) => {
  if (!blogId) throw json("Bad request", { status: 403 });
  const { data } = await client.query<
    BlogArticleQuery,
    BlogArticleQueryVariables
  >({ query: BLOG_ARTICLE_QUERY, variables: { id: parseInt(blogId) } });
  if (data.articleById) {
    return data.articleById;
  }
  console.log({ data });
  throw json("Not found", { status: 404 });
};

export default function BlogArticle() {
  const data = useLoaderData<ArticleFragment>();
  return (
    <div>
      <h1 className="text-5xl self-center mb-6">{data.title}</h1>
      <p className="my-10" dangerouslySetInnerHTML={{ __html: data.body }} />
      <h2 className="text-3xl my-4">Comments</h2>
      {data.comments.nodes?.map((comment) => {
        if (!comment) return null;
        return (
          <Comment
            commenter={comment.commenter}
            body={comment.body}
            key={comment.id}
          />
        );
      })}
    </div>
  );
}
