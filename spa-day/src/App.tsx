import "./App.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "./services/apollo";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { BlogsScreen } from "./screens";
import { NewBlog } from "./screens/NewBlog";
import { BlogArticleScreen } from "./screens/Blog";
import { EditBlogScreen } from "./screens/EditBlog";

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<BlogsScreen />} index></Route>
          <Route path="blogs">
            <Route index element={<BlogsScreen />} />
            <Route path="new" element={<NewBlog />} />
            <Route path=":id/edit" element={<EditBlogScreen />} />
            <Route path=":id" element={<BlogArticleScreen />} />
          </Route>
        </Route>
      </Routes>
    </ApolloProvider>
  );
}

export default App;
