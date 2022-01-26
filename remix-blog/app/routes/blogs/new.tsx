import { gql } from "@apollo/client";
import { ActionFunction, Form, json, redirect, useTransition } from "remix";
import { BlogForm } from "~/components/BlogForm";
import { client } from "~/services/apollo";
import type { MutationAddArticleArgs, Mutation } from "~/generated/graphql";
import { BLOG_ARTICLE_FRAGMENT } from "./$blogId";

export const NEW_BLOG_MUTATION = gql`
  mutation NewBlog($input: AddArticleInput!) {
    addArticle(input: $input) {
      ...Article
    }
  }
  ${BLOG_ARTICLE_FRAGMENT}
`;

export const action: ActionFunction = async ({ request }) => {
  console.log("Attempting to process form action");
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");

  if (!title || !body) throw json("Malformed data", { status: 401 });
  const { data } = await client.mutate<
    { addArticle: Mutation["addArticle"] },
    MutationAddArticleArgs
  >({
    mutation: NEW_BLOG_MUTATION,
    variables: {
      input: {
        body: body as string,
        title: title as string,
      },
    },
  });
  if (!data || !data.addArticle)
    throw json("Something went wrong", { status: 500 });
  return redirect(`/blogs/${data.addArticle.id}`);
};

export default function NewBlog() {
  const error = false;
  const transition = useTransition();
  return (
    <>
      <h1 className="text-5xl self-center mb-6">New Article</h1>
      {!!error && <p>Something went wrong :(</p>}
      <Form method="post">
        <BlogForm transition={transition} onSubmit={() => {}} />
      </Form>
    </>
  );
}
