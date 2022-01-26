import { VFC } from "react";
import { Link } from "remix";

export const Navbar: VFC = () => {
  return (
    <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 mb-4 bg-white shadow sm:items-baseline w-full">
      <div className="mb-2 sm:mb-0">
        <Link
          prefetch="intent"
          to="/"
          className="text-2xl no-underline text-grey-darkest hover:text-blue-dark"
        >
          Transitional Blog
        </Link>
      </div>
      <div>
        <Link
          prefetch="intent"
          to="/blogs/new"
          className="text-lg no-underline text-gray-900 hover:text-gray-500 ml-2"
        >
          New article
        </Link>
        <Link
          prefetch="intent"
          to="https://google.ca"
          className="text-lg no-underline text-gray-900 hover:text-gray-500 ml-2"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
};
