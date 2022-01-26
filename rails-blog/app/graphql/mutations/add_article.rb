module Mutations
    class AddArticle < BaseMutation
        argument :title, String, required: true
        argument :body, String, required: true

        type Types::ArticleType
        
        def resolve(title: , body:)
            Article.create!(
                title: title,
                body: body
            )
        end
    end
end