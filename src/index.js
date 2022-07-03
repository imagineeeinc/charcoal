const stream = require('youtube-audio-stream')
const express = require('express')
const path = require('path')

const app = express()

// API
app.get('/api/stream/', async (req, res) => {
	let id = req.query.id
  try {
    for await (const chunk of stream(`http://youtube.com/watch?v=${id}`)) {
      res.write(chunk)
    }
    res.end()
  } catch (err) {
    console.error(err)
    if (!res.headersSent) {
      res.writeHead(500)
      res.end('internal system error')
    }
  }
});

var port = process.env.PORT || 3000
app.listen(port, ()=> {
	console.log(`Listening on port ${port}`)
});