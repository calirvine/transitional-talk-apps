import { gql } from "@apollo/client";
import { VFC } from "react";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import { BlogForm } from "../components/BlogForm";
import { useBlogArticleQuery, useEditBlogMutation } from "../generated/graphql";

export const EDIT_BLOG_MUTATION = gql`
  mutation EditBlog($input: UpdateArticleInput!) {
    updateArticle(input: $input) {
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
  }
`;

export const EditBlogScreen: VFC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useBlogArticleQuery({
    variables: {
      id: parseInt(id!),
    },
  });
  const [editMutation] = useEditBlogMutation();

  if ((!loading && !data) || error) return <Navigate to="/" replace />;
  if (loading && !data)
    return (
      <div className="animate-pulse blur-sm">
        I am a loading Spinner! I promise.
      </div>
    );
  if (!data || !data.articleById) return null;
  const { title, body } = data.articleById;
  return (
    <div>
      <h1 className="text-5xl self-center mb-6">{title}</h1>
      <BlogForm
        title={title}
        body={body}
        onSubmit={({ title, body }) => {
          editMutation({
            variables: {
              input: {
                id: id!,
                title,
                body,
              },
            },
          }).then(() => navigate(`/blogs/${id}`, { replace: true }));
        }}
      />
    </div>
  );
};
