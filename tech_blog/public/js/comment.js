// Event listener for the comment submission form
document.querySelector("#newComment").addEventListener("submit", event => {
    event.preventDefault(); // Prevent the default form submission behavior

    const comment = {
        body: document.querySelector("#comment").value, // Get the comment body from the textarea
        blogId: document.querySelector("#hiddenCommentId").value // Get the blog ID from the hidden input
    };

    // Make a POST request to create a new comment
    fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify(comment), // Convert the comment object to a JSON string
        headers: {
            "Content-Type": "application/json" // Set the content type to JSON
        }
    }).then(res => {
        if (res.ok) {
            console.log("comment posted");
            location.reload(); // Reload the page to display the new comment
        } else {
            alert("please try again");
        }
    });
});
