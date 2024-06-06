document.querySelector("#signup").addEventListener("submit", async event => {
    event.preventDefault();
    const username = document.querySelector("#signupUsername").value.trim();
    const password = document.querySelector("#signupPassword").value.trim();

    if (username && password) {
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Failed to sign up. Please try again.");
        }
    }
});
