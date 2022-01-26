import { gql } from "@apollo/client";
import faker from "@faker-js/faker";
import { VFC } from "react";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import { Comment } from "../components/Comment";
import { CommentForm } from "../components/CommentForm";
import {
  useAddCommentMutation,
  useBlogArticleQuery,
  useDeleteBlogMutation,
} from "../generated/graphql";
import { client } from "../services/apollo";

export const BLOG_ARTICLE_QUERY = gql`
  query BlogArticle($id: Int!) {
    articleById(id: $id) {
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

export const DELETE_ARTICLE_MUTATION = gql`
  mutation DeleteBlog($id: ID!) {
    deleteArticle(input: { id: $id }) {
      success
    }
  }
`;

export const ADD_COMMENT_MUTATION = gql`
  mutation AddComment($input: AddCommentInput!) {
    addComment(input: $input) {
      id
      commenter
      body
    }
  }
`;

export const BlogArticleScreen: VFC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data,
    loading,
    error,
    refetch: refetchBlog,
  } = useBlogArticleQuery({
    variables: {
      id: parseInt(id!),
    },
    fetchPolicy: "cache-and-network",
  });
  const [deleteMutation] = useDeleteBlogMutation();
  const [addCommentMutation] = useAddCommentMutation();

  if ((!loading && !data) || error) return <Navigate to="/" replace />;
  if (loading && !data)
    return (
      <div className="animate-pulse blur-sm">
        <h1 className="text-5xl self-center mb-6">{faker.random.words(4)}</h1>
        <p className="my-10">{faker.random.words(60)}</p>
        <ul>
          <li>
            <a
              role="presentation"
              onClick={() => {}}
              className="px-6 py-2 mx-12 my-5 block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600 hover:bg-indigo-500 text-center"
            >
              Edit post
            </a>
          </li>
          <li>
            <a
              role="presentation"
              onClick={() => {}}
              className=" px-6 py-2 mx-12 my-5 block rounded-md text-lg font-semibold text-indigo-100 bg-red-600 hover:bg-red-500 text-center"
            >
              Delete post
            </a>
          </li>
        </ul>
        <h2 className="text-3xl my-4">Comments</h2>
        Comments
        <h2 className="text-xl my-4">Add a comment:</h2>
        Comment form
      </div>
    );
  return (
    <div>
      <h1 className="text-5xl self-center mb-6">{data?.articleById?.title}</h1>
      <p
        className="my-10"
        dangerouslySetInnerHTML={{ __html: data?.articleById?.body || "" }}
      />
      <ul>
        <li>
          <Link
            to="edit"
            className="px-6 py-2 mx-12 my-5 block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600 hover:bg-indigo-500 text-center"
          >
            Edit post
          </Link>
        </li>
        <li>
          <a
            role="button"
            onClick={() => {
              deleteMutation({ variables: { id: id! } }).then((res) => {
                if (res.data?.deleteArticle?.success)
                  navigate("/", { replace: true });
              });
            }}
            className="px-6 py-2 mx-12 my-5 block rounded-md text-lg font-semibold text-indigo-100 bg-red-600 hover:bg-red-500 text-center"
          >
            Delete post
          </a>
        </li>
      </ul>
      <h2 className="text-3xl my-4">Comments</h2>
      {data?.articleById?.comments.nodes?.map((comment) => {
        if (!comment) return null;
        return (
          <Comment
            commenter={comment.commenter}
            body={comment.body}
            key={comment.id}
          />
        );
      })}
      <h2 className="text-xl my-4">Add a comment:</h2>
      <CommentForm
        onSubmit={({ commenter, body }) => {
          addCommentMutation({
            variables: {
              input: {
                articleId: parseInt(id!),
                commenter,
                body,
              },
            },
          }).then(() => {
            refetchBlog({ id: parseInt(id!) });
          });
        }}
      />
    </div>
  );
};
