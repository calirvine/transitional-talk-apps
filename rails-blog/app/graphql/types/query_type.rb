module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :all_articles, ArticleType.connection_type, null: false
    field :article_by_id, ArticleType, null: true do
      argument :id, Int, required: true
    end

    # this method is invoked, when `all_link` fields is being resolved
    def all_articles
      Article.order(:created_at)
    end
    def article_by_id(id:)
      Article.find_by(id: id)
    end
  end
end
