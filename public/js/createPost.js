const createPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const post_text = document.querySelector('#post_text').value.trim();

    if (title && post_text) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ title, post_text }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            const errorMessage = await response.text();
            alert(`Post creation failed: ${errorMessage}`);  }
    }
};

document
    .querySelector('#submitBtn')
    .addEventListener('click', createPostFormHandler);