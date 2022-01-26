import { VFC } from "react";

export const Comment: VFC<{ commenter: string; body: string }> = ({
  commenter,
  body,
}) => {
  return (
    <>
      <p>
        <span className="font-bold">{commenter}</span>
      </p>

      <p className="mb-6">{body}</p>
    </>
  );
};
