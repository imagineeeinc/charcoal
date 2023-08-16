const ytsearch = require('youtube-search-without-api-key');
const express = require('express')
const { video_basic_info, stream } = require('play-dl');
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
    //res.set('Cache-control', 'public, max-age='+60*60*24*7*30*12)
    var audio = await stream(`https://youtube.com/watch?v=${id}`, {discordPlayerCompatibility: true})
    //res.setHeader("content-disposition",`attachment; filename="${id}.webm"`)
    res.setHeader('type', audio.type)
    for await (const chunk of audio.stream) {
      res.write(chunk)
    }
    res.end()
  } catch (err) {
    console.error(err)
    if (!res.headersSent) {
      res.writeHead(500)
      res.end('internal system error\n\n'+err)
    }
  }
});

app.get('/api/search/', async (req, res) => {
  // TODO: Switch over to yt music search
	let q = req.query.q
  let data = await ytsearch.search(q)
  let response = []
  data.forEach(item => {
    let info = {
      thumbnail: item.snippet.thumbnails.url,
      title: item.title,
      views: item.views,
      duration: item.duration_raw,
      video_id: item.id.videoId
    }
    response.push(info)
  })
  res.json(response)
});

var port = process.env.PORT || 3000
var host = process.env.HOST || '0.0.0.0'
app.listen(port, host, ()=> {
	console.log(`Listening on port ${port}`)
});
