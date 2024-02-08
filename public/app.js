const apiUrl = 'http://localhost:3000/blogs'; // Adjust the API URL as necessary

window.onload = function() {
    fetchPosts();
};

function fetchPosts() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById('postsContainer');
            postsContainer.innerHTML = '';
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <div class="post-title">${post.title}</div>
                    <div class="post-body">${post.body}</div>
                    <div class="post-author">Author: ${post.author || 'Anonymous'}</div>
                    <span class="edit-btn" onclick="editPost('${post._id}')">Edit</span>
                    <span class="delete-btn" onclick="deletePost('${post._id}')">Delete</span>
                `;
                postsContainer.appendChild(postElement);
            });
        });
}

function submitPost() {
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const author = document.getElementById('author').value;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body, author }),
    })
    .then(response => response.json())
    .then(() => {
        clearForm();
        fetchPosts();
    });
}

function editPost(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(post => {
            document.getElementById('postId').value = post._id;
            document.getElementById('title').value = post.title;
            document.getElementById('body').value = post.body;
            document.getElementById('author').value = post.author;
            document.querySelector('button[onclick="submitPost()"]').style.display = 'none';
            document.querySelector('button[onclick="updatePost()"]').style.display = 'inline';
        });
}

function updatePost() {
    const id = document.getElementById('postId').value;
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const author = document.getElementById('author').value;

    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body, author }),
    })
    .then(response => response.json())
    .then(() => {
        clearForm();
        fetchPosts();
        document.querySelector('button[onclick="submitPost()"]').style.display = 'inline';
        document.querySelector('button[onclick="updatePost()"]').style.display = 'none';
    });
}

function deletePost(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        fetchPosts(); // Refresh the list of posts
    })
    .catch(error => console.error('There has been a problem with your fetch operation:', error));
}


function clearForm() {
    document.getElementById('postId').value = '';
    document.getElementById('title').value = '';
    document.getElementById('body').value = '';
    document.getElementById('author').value = '';
}
