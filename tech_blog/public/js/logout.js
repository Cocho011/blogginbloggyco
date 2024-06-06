// Event listener for the logout button
document.querySelector("#logout").addEventListener("click", event => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Make a POST request to log out the user
    fetch("/api/users/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Set the content type to JSON
        }
    }).then(response => {
        if (response.ok) {
            document.location.replace("/"); // Redirect to the homepage on successful logout
        } else {
            alert("Failed to log out.");
        }
    });
});
