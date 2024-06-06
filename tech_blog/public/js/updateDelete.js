// Event listener for the update blog button
document.querySelector("#update").addEventListener("click", event => {
    event.preventDefault(); // Prevent the default form submission behavior

    const blogId = document.querySelector("#hiddenBlogId").value; // Get the blog ID from the hidden input
    const editBlog = {
        title: document.querySelector("#editedTitle").value, // Get the updated blog title from the input
        content: document.querySelector("#editedContent").value // Get the updated blog content from the textarea
    };

    // Make a PUT request to update the blog
    fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        body: JSON.stringify(editBlog), // Convert the updated blog object to a JSON string
        headers: {
            "Content-Type": "application/json" // Set the content type to JSON
        }
    }).then(res => {
        if (res.ok) {
            console.log("blog updated");
            location.href = "/dashboard"; // Redirect to the dashboard on successful update
        } else {
            alert("please try again");
        }
    });
});

// Event listener for the delete blog button
document.querySelector("#delete").addEventListener("click", event => {
    event.preventDefault(); // Prevent the default form submission behavior

    const blogId = document.querySelector("#hiddenBlogId").value; // Get the blog ID from the hidden input

    // Make a DELETE request to delete the blog
    fetch(`/api/blogs/${blogId}`, {
        method: "DELETE"
    }).then(res => {
        if (res.ok) {
            console.log("blog deleted");
            location.href = "/dashboard"; // Redirect to the dashboard on successful deletion
        } else {
            alert("please try again");
        }
    });
});
