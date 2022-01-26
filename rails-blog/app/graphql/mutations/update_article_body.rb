module Mutations
    class UpdateArticleBody < BaseMutation
        argument :id, ID, required: true
        argument :body, String, required: true

        type Types::ArticleType
        
        def resolve(id: , body:)
            article = Article.find(id)
            if article.update(body: body)
                article
            else
                nil
            end
        end
    end
end