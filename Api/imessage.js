const imessage = require('osa-imessage');

imessage.send('+9907487359', 'Hello World!');

imessage.listen().on('message', (msg) => {
    if (!msg.fromMe) console.log(`'${msg.text}' from ${msg.handle}`)
})