{
    //method to submit form data using Ajax
    let createPost = function(){
        
        let newPostForm =$('#new-post-form');
        
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                        let newPost=newPostDom(data.data.post);
                        $('#posts-list-container>ul').prepend(newPost);
                        deleatPost($(' .delete-post-button',newPost));
                         // call the create comment class
                        new PostComments(data.data.post._id);

                        // CHANGE :: enable the functionality of the toggle like button on the new post
                        new ToggleLike($(' .toggle-like-button', newPost));
                        
                }, error: function(error){
                    console.log(error.responseText);
                }
            });    
        
        });
    
    }
    //Method to show post in DOM
    let newPostDom=function(post){
        return $(`<li id="post-${post._id}">
                    <p>
                        
                        <small>
                            <a class="delete-post-button"  href="/posts/destroy/${ post._id }">X</a>
                        </small>
                    
                        ${ post.content }
                        <br>
                        <small>
                        ${ post.user.name }
                        </small>
                        <br>
                        <small>
                        <a class="toggle-like-button" data-likes="0"="" href="/likes/toggle/?id=${post._id}&type=Post">
                            0 Likes
                        </a>
                        </small>
                    </p>
                    <div class="post-comments">
                        
                            <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                <input type="hidden" name="post" value="${ post._id }" >
                                <input type="submit" value="Add Comment">
                            </form>
            
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id }">
                                
                            </ul>
                        </div>
                    </div>
        
                </li>`)}
        //Deleat post in DOM
        let deleatPost=function(deletLink){
            $(deletLink).click(function(e){
                e.preventDefault();
                $.ajax({
                    type:'get',
                    url:$(deletLink).prop('href'),
                    success:function(data){
                        $(`#post-${data.data.post_id}`).remove();
                    },error:function(error){
                        console.log(error.responseText);
                    }
                });
            });
        }


    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletPost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }
    convertPostsToAjax();
    createPost();
    
}