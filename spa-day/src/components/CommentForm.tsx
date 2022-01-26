import { useState, VFC } from "react";

export const CommentForm: VFC<{
  onSubmit: ({ commenter, body }: { commenter: string; body: string }) => void;
}> = ({ onSubmit }) => {
  const [commenter, setCommenter] = useState("");
  const [body, setBody] = useState("");
  const [commenterErrors, setCommenterErrors] = useState<string[]>([]);
  const [bodyErrors, setBodyErrors] = useState<string[]>([]);
  const validateTitle = () => {
    const errors: string[] = [];
    if (commenter.length < 3 && commenter.length > 0)
      errors.push("Commenter must be at least 3 characters");
    if (commenter.length === 0) errors.push("Title is required");
    if (errors.length) setCommenterErrors(errors);

    return !errors.length;
  };

  const validateBody = () => {
    const errors: string[] = [];
    if (body.length < 5 && body.length > 0)
      errors.push("Body must be at least 5 characters");
    if (body.length === 0) errors.push("Body is required");
    if (errors.length) setBodyErrors(errors);

    return !errors.length;
  };

  return (
    <>
      <div>
        <label className="block mb-2 text-lg" htmlFor="title">
          Commenter
        </label>
        <input
          id="title"
          value={commenter}
          onChange={(e) => setCommenter(e.target.value)}
          onBlur={validateTitle}
          onFocus={() => setCommenterErrors([])}
          className="outline-none py-1 px-2 text-md border-2 rounded-md focus:bg-indigo-50 mb-3"
        />
        {commenterErrors.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </div>

      <div>
        <label className="block mb-2 text-lg" htmlFor="body">
          Body
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onBlur={validateBody}
          onFocus={() => setBodyErrors([])}
          className="w-full border-2 p-4 text-gray-600 bg-white focus:bg-indigo-50 outline-none rounded-md"
        />
        {bodyErrors.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </div>

      <div>
        <button
          onClick={() => {
            if (validateBody() && validateTitle()) {
              onSubmit({ commenter, body });
              setCommenter("");
              setBody("");
            }
          }}
          className="cursor-pointer px-6 py-2 my-5 bor block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600 hover:bg-indigo-500 text-center"
        >
          Submit
        </button>
      </div>
    </>
  );
};
