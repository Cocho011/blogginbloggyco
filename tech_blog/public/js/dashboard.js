document.querySelector("#newBlog").addEventListener("submit", event => {
    event.preventDefault();
    const title = document.querySelector("#title").value.trim();
    const content = document.querySelector("#content").value.trim();

    if (title && content) {
        fetch("/api/blogs", {
            method: "POST",
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => {
                if (response.ok) {
                    document.location.reload();
                } else {
                    alert("Failed to create blog post.");
                }
            })
            .catch(err => console.error(err));
    }
});

document.querySelector("#newpost").addEventListener("submit", event => {
    event.preventDefault();
    document.querySelector("#existingblogs").hidden = true;
    document.querySelector("#newpost").hidden = true;
    document.querySelector("#createNew").hidden = false;
});
