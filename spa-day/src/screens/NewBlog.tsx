import { gql } from "@apollo/client";
import { VFC } from "react";
import { useNavigate } from "react-router-dom";
import { BlogForm } from "../components/BlogForm";
import { useNewBlogMutation } from "../generated/graphql";

export const NEW_BLOG_MUTATION = gql`
  mutation NewBlog($input: AddArticleInput!) {
    addArticle(input: $input) {
      id
      title
      body
    }
  }
`;

export const NewBlog: VFC = () => {
  const navigate = useNavigate();
  const [mutateFunction, { data, loading, error }] = useNewBlogMutation();

  return (
    <>
      <h1 className="text-5xl self-center mb-6">New Article</h1>
      {!!error && <p>Something went wrong :(</p>}
      {loading ? (
        <div>I'm a loading spinner</div>
      ) : (
        <BlogForm
          onSubmit={({ title, body }) => {
            mutateFunction({
              variables: {
                input: {
                  title,
                  body,
                },
              },
            }).then((res) => {
              if (res.data?.addArticle?.id)
                return navigate(`/blogs/${res.data.addArticle.id}`, {
                  replace: true,
                });
            });
            console.log({ title, body });
          }}
        />
      )}
    </>
  );
};
