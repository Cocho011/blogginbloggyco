// Event listener for the login form
document.querySelector("#login").addEventListener("submit", async event => {
    event.preventDefault(); // Prevent the default form submission behavior

    const username = document.querySelector("#loginUsername").value.trim(); // Get the username from the input
    const password = document.querySelector("#loginPassword").value.trim(); // Get the password from the input

    if (username && password) {
        // Make a POST request to log in the user
        const response = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({ username, password }), // Convert the login object to a JSON string
            headers: { "Content-Type": "application/json" } // Set the content type to JSON
        });

        if (response.ok) {
            document.location.replace("/dashboard"); // Redirect to the dashboard on successful login
        } else {
            alert("Failed to log in. Please try again.");
        }
    }
});
