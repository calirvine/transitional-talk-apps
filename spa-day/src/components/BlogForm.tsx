import { useState, VFC } from "react";

export const BlogForm: VFC<{
  title?: string;
  body?: string;
  onSubmit: ({ title, body }: { title: string; body: string }) => void;
}> = ({ title: initialTitle, body: initialBody, onSubmit }) => {
  const [title, setTitle] = useState(initialTitle ?? "");
  const [body, setBody] = useState(initialBody ?? "");
  const [titleErrors, setTitleErrors] = useState<string[]>([]);
  const [bodyErrors, setBodyErrors] = useState<string[]>([]);
  const validateTitle = () => {
    const errors: string[] = [];
    if (title.length < 5 && title.length > 0)
      errors.push("Title must be at least 5 characters");
    if (title.length === 0) errors.push("Title is required");
    if (errors.length) setTitleErrors(errors);

    return !!errors.length;
  };

  const validateBody = () => {
    const errors: string[] = [];
    if (body.length < 5 && body.length > 0)
      errors.push("Body must be at least 5 characters");
    if (body.length === 0) errors.push("Body is required");
    if (errors.length) setBodyErrors(errors);

    return !!errors.length;
  };

  return (
    <>
      <div>
        <label className="block mb-2 text-lg" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={validateTitle}
          onFocus={() => setTitleErrors([])}
          className="outline-none py-1 px-2 text-md border-2 rounded-md focus:bg-indigo-50 mb-3"
        />
        {titleErrors.map((error) => (
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
            onSubmit({ title, body });
          }}
          className="cursor-pointer px-6 py-2 my-5 bor block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600 hover:bg-indigo-500 text-center"
        >
          Submit
        </button>
      </div>
    </>
  );
};
