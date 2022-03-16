const express = require('express');
const app = express();
const port = 3000;

app.get('/', (request, response) => {
    console.log(`URL: ${request.url}`);
    response.send('Hello, Server!');
});