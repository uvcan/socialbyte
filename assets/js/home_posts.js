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
                }, error: function(error){
                    console.log(error.responseText);
                }
            });    
        
        });
    
    }
    //Method to show post in DOM
    let newPostDom=function(post){
        return $(`<li id="post-${post._id}>
                        <p>
                            <small>
                                <a class="delete-post-button"  href="/posts/destroy/${ post._id }">X</a>
                            </small>
                            ${post.content}
                            <br>
                            <small>
                            ${post.user.name}
                            </small>
                        </p>
                        <div>
                            <form action="/comments/create" id="new-comment-form" method="post">
                                <input type="text" name="content" placeholder="Type hear to add comment.." required>
                                <input type="hidden" name="post" value="${post._id}">
                                <input type="submit" value="Comment">
                            </form>
                            <div>
                                <ul>
                                
                                </ul>
                            </div>    
                        </div>
                        
                    </li>
                `)}
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

    createPost();
    
}