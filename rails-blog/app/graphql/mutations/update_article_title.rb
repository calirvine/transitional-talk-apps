module Mutations
    class UpdateArticleTitle < BaseMutation
        argument :id, ID, required: true
        argument :title, String, required: true

        type Types::ArticleType
        
        def resolve(id: , title:)
            article = Article.find(id)
            if article.update(title: title)
                article
            else
                nil
            end
        end
    end
end