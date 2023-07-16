const createCommentFormHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#comment_text').value.trim();
    const element = document.querySelector('#comment_text')
    const post_id = element.getAttribute('data-post-id');


    console.log("comment create");
    console.log(element);
    console.log(comment_text);
    console.log(post_id);


    if (comment_text) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ comment_text, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(response);
        // document.location.reload();
        if(response.url.includes('/login'))
        {
            document.location.replace('/login')
        }
        else{
            document.location.reload();

        }
    }
};

document
    .querySelector('#submitBtn')
    .addEventListener('click', createCommentFormHandler);