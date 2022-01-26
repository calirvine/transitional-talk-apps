module Types
  class MutationType < Types::BaseObject
    field :add_article, mutation: Mutations::AddArticle
    field :update_article, mutation: Mutations::UpdateArticle
    field :update_article_title, mutation: Mutations::UpdateArticleTitle
    field :update_article_body, mutation: Mutations::UpdateArticleBody
    field :delete_article, mutation: Mutations::DeleteArticle
    field :add_comment, mutation: Mutations::AddComment
  end
end
