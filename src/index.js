const stream = require('youtube-audio-stream')
const ytsearch = require('youtube-search-without-api-key');
const express = require('express')
const path = require('path')

const app = express()

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', req.get('origin'))
  next()
})
// API
app.get('/', (req, res) => {
  res.send('server online: charcoal')
})

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

app.get('/api/search/', async (req, res) => {
	let q = req.query.q
  res.json(await ytsearch.search(q))
});

var port = process.env.PORT || 3000
app.listen(port, ()=> {
	console.log(`Listening on port ${port}`)
});