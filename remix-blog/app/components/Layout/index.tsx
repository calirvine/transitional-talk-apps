import { VFC } from "react";
import { Outlet } from "remix";
import { Navbar } from "./Navbar";

export const Layout: VFC = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[800px] max-w-2xl mx-auto p-10 bg-white flex flex-col">
        <Outlet />
      </main>
    </>
  );
};
