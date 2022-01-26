import { gql } from "@apollo/client";
import { client } from "~/services/apollo";
import type { BlogScreenQuery, ArticleLinkFragment } from "~/generated/graphql";
import { json, LoaderFunction, useLoaderData } from "remix";
import { Link } from "remix";

export const ARTICLE_LINK_FRAGMENT = gql`
  fragment ArticleLink on Article {
    id
    title
  }
`;

export const BLOG_SCREEN_QUERY = gql`
  query BlogScreen {
    allArticles {
      nodes {
        ...ArticleLink
      }
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
      }
    }
  }
  ${ARTICLE_LINK_FRAGMENT}
`;

export const loader: LoaderFunction = async () => {
  const { data } = await client.query<BlogScreenQuery>({
    query: BLOG_SCREEN_QUERY,
  });
  if (data.allArticles.nodes) {
    return {
      nodes: data.allArticles.nodes.filter(
        (node): node is ArticleLinkFragment => !!node
      ),
    };
  }
  throw json("Not Found", { status: 404 });
};

export default function Index() {
  const data = useLoaderData<{ nodes: ArticleLinkFragment[] }>();
  return (
    <>
      <h1 className="text-5xl self-center mb-6">Hello, SPA!</h1>
      <h2 className="text-3xl mb-4">Blogs</h2>
      <ul>
        {data.nodes.map((article) => {
          if (!article) return null;
          return (
            <li
              className="text-lg no-underline text-blue-500 hover:text-blue-900 ml-2"
              key={article.id}
            >
              <Link to={`/blogs/${article.id}`} prefetch="intent">
                {article.title}
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        to="/blogs/new"
        prefetch="intent"
        className="px-6 py-2 mx-12 my-5 block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600 hover:bg-indigo-500 text-center"
      >
        New Article
      </Link>
    </>
  );
}
