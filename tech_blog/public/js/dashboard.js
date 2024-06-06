// Event listener for the new blog submission form
document.querySelector("#newBlog").addEventListener("submit", event => {
    event.preventDefault(); // Prevent the default form submission behavior

    const title = document.querySelector("#title").value.trim(); // Get the blog title from the input
    const content = document.querySelector("#content").value.trim(); // Get the blog content from the textarea

    if (title && content) {
        // Make a POST request to create a new blog
        fetch("/api/blogs", {
            method: "POST",
            body: JSON.stringify({ title, content }), // Convert the blog object to a JSON string
            headers: { "Content-Type": "application/json" } // Set the content type to JSON
        })
            .then(response => {
                if (response.ok) {
                    document.location.reload(); // Reload the page to display the new blog
                } else {
                    alert("Failed to create blog post.");
                }
            })
            .catch(err => console.error(err));
    }
});

// Event listener for the new post button
document.querySelector("#newpost").addEventListener("submit", event => {
    event.preventDefault(); // Prevent the default form submission behavior
    document.querySelector("#existingblogs").hidden = true; // Hide the existing blogs section
    document.querySelector("#newpost").hidden = true; // Hide the new post button
    document.querySelector("#createNew").hidden = false; // Show the create new blog form
});
