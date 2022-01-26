module Mutations
    class UpdateArticle < BaseMutation
        argument :id, ID, required: true
        argument :title, String, required: true
        argument :body, String, required: true

        type Types::ArticleType
        
        def resolve(id: , title: , body:)
            article = Article.find(id)
            if article.update(title: title, body: body)
                article
            else
                nil
            end
        end
    end
end