import { VFC } from "react";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import faker from "@faker-js/faker";

import { useBlogScreenQuery } from "../generated/graphql";
import { BLOG_ARTICLE_QUERY } from "./Blog";
import { client } from "../services/apollo";

export const BlogScreen = gql`
  query BlogScreen {
    allArticles {
      nodes {
        id
        title
      }
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
      }
    }
  }
`;

const prefetchArticle = (id: string) => {
  client.query({ query: BLOG_ARTICLE_QUERY, variables: { id: parseInt(id) } });
};

export const BlogsScreen: VFC = () => {
  const { data, loading, error } = useBlogScreenQuery({
    fetchPolicy: "cache-and-network",
  });
  return (
    <>
      <h1 className="text-5xl self-center mb-6">Hello, SPA!</h1>
      <h2 className="text-3xl mb-4">Blogs</h2>
      {loading && !data ? (
        <LoadingList />
      ) : (
        <ul>
          {data?.allArticles.nodes?.map((article) => {
            if (!article) return null;
            return (
              <li
                className="text-lg no-underline text-blue-500 hover:text-blue-900 ml-2"
                key={article.id}
                onMouseEnter={() => prefetchArticle(article.id)}
              >
                <Link to={`/blogs/${article.id}`}>{article.title}</Link>
              </li>
            );
          })}
        </ul>
      )}

      <Link
        to="/blogs/new"
        className="px-6 py-2 mx-12 my-5 block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600 hover:bg-indigo-500 text-center"
      >
        New Article
      </Link>
    </>
  );
};

const LoadingList: VFC = () => {
  return (
    <ul className="animate-pulse">
      <li className="text-lg no-underline text-blue-500 hover:text-blue-900 ml-2 blur-sm">
        {faker.random.randomWords(5)}
      </li>
      <li className="text-lg no-underline text-blue-500 hover:text-blue-900 ml-2 blur-sm">
        {faker.random.randomWords(3)}
      </li>
      <li className="text-lg no-underline text-blue-500 hover:text-blue-900 ml-2 blur-sm">
        {faker.random.randomWords(7)}
      </li>
      <li className="text-lg no-underline text-blue-500 hover:text-blue-900 ml-2 blur-sm">
        {faker.random.randomWords(6)}
      </li>
      <li className="text-lg no-underline text-blue-500 hover:text-blue-900 ml-2 blur-sm">
        {faker.random.randomWords(5)}
      </li>
    </ul>
  );
};
