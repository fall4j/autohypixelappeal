const mineflayer = require('mineflayer');
const proxyAgent = require('proxy-agent');
const readline = require('readline');

console.log("fall#3972");

// Replace the email and password with environment variables
const email = process.env.email;
const password = process.env.password;

// Replace the proxy URL with an environment variable
const proxy = process.env.proxy || '';

// Create a new proxy agent if a proxy is provided
const agent = proxy ? new proxyAgent(proxy) : null;

// Create the Mineflayer bot instance
const bot = mineflayer.createBot({
  host: 'forum.hypixel.net',
  port: 25565,
  version: '1.8.9',
  username: email,
  password: password,
  auth: 'microsoft',
  agent: agent,
});

// Listen for the "kicked" event and extract the verification code if one is provided
bot.on("kicked", (reason) => {
  if (typeof reason === "string") {
    const parsedData = JSON.parse(reason);
    if (parsedData.extra) {
      parsedData.extra.forEach((extra) => {
        if (extra.text && extra.text.includes("is")) {
          if (extra.text.includes("code, please contact")) {
            return;
          }
          const verificationCode = extra.text.split("is ")[1].split(".")[0];
          console.log(email + "'s Verification Code:", verificationCode);
        }
      });
    }
  }
});

// Keep the process running indefinitely
setInterval(() => {}, Number.MAX_SAFE_INTEGER);
