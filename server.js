const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');

const config = {
  channelAccessToken: "UE18Kx9j/lLGya6JcnWicKQ0E3NGfG8wdUUekF08n3H3dovX3iBUIIsat8KpQzAGk6YgXqYjEAyC0xfnV/xtr1K5LBShcexP6lAvj3HyWGfYa7KHbVMBQD9hGj7KuznitDO0PzdKYChxS0g+vDiJXAdB04t89/1O/w1cDnyilFU=",
  channelSecret: "fd0d6cb094c3d89f111cd6f12e50825a",
};

// create LINE SDK client
const client = new line.Client(config);
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((e)=>{
      console.log(e);
    });

});

function handleEvent(event) {
  
    if(event.message.text == "hai"){
      const echo = { type: 'text', text: "Halo juga :)·" };
      return client.replyMessage(event.replyToken, echo);
    }

    const echo = { type: 'text', text: "Saya tidak mengerti, saya simpan dulu" };
    return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});