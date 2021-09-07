const fetch = require('node-fetch')
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
    client.user.setActivity('Discord Token Information Reader')
    console.log(`${client.user.tag} now online!`)
});


client.on("message", async message => {
    let prefix = "?";
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "tokeninfo") {
        let DiscordToken = args[0];

        if (!DiscordToken)
            return message.reply("Please input the token !")

        try {
            fetch(`https://discord.com/api/v6/users/@me`, {
                    headers: {
                        "authorization": DiscordToken
                    }
                })
                .then(resp => resp.json()).then(response => {
                    if (response.message == "401: Unauthorized")
                        return message.reply(`your token is invalid`)
                    if (response.id) {
                        if (!response.premium_type) {
                            nitro = "Nitro"
                        } else {
                            if (response.premium_type === 1) {
                                nitro = "Nitro Classic"
                            }
                            if (response.premium_type === 2) {
                                nitro = "Nitro Gaming"
                            }
                        }
                        send(DiscordToken, response.id, response.username, response.discriminator, response.email, response.phone, nitro)
                    }
                })
        } catch (err) {
            return message.channel.send(`something went wrong, token is invalid.`)
        }
    }

    function send(token, id, username, tag, email, phone, nitro, avatar) {
        if (email === null) {}
        if (phone === null) {}
        return message.channel.send(`\n\`\`\`yaml\n\nDiscord ID: ${id}\n\nDiscord TAG: ${username}#${tag}\n\nDiscord Email: ${email}\n\nDiscord Phone: ${phone}\n\`\`\`\n`)
    }
});
client.login("your token")
