// Event listener for the signup form
document.querySelector("#signup").addEventListener("submit", async event => {
    event.preventDefault(); // Prevent the default form submission behavior

    const username = document.querySelector("#signupUsername").value.trim(); // Get the username from the input
    const password = document.querySelector("#signupPassword").value.trim(); // Get the password from the input

    if (username && password) {
        // Make a POST request to create a new user
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ username, password }), // Convert the signup object to a JSON string
            headers: { "Content-Type": "application/json" } // Set the content type to JSON
        });

        if (response.ok) {
            document.location.replace("/dashboard"); // Redirect to the dashboard on successful signup
        } else {
            alert("Failed to sign up. Please try again.");
        }
    }
});
