import { config } from 'dotenv';
import { Client, TextChannel } from 'discord.js';

config();

const client = new Client();

client.on('ready', () => {
  console.log(`Logged in as ${client?.user?.username ?? ''}`);
});

client.on('message', async (msg) => {
  const lines = msg.content.split('\n');
  if (
    lines[0] === 'oasis status' &&
    msg?.member?.roles.cache.some((role) => role.name === 'status')
  ) {
    const channel = msg.channel;
    const lastMessage = (await channel.messages.fetch({ limit: 2 })).array()[1];
    if (lastMessage.author.id === client?.user?.id) {
      await lastMessage.edit(lines.slice(1).join('\n'));
    } else {
      await msg.channel.send(lines.slice(1).join('\n'));
    }
    await msg.delete();
  }
});

client.login(process.env.BOT_TOKEN);
