const ytsearch = require('youtube-search-without-api-key');
const express = require('express')
const { Innertube, UniversalCache } = require('youtubei.js');
const { streamToIterable } = require('youtubei.js/dist/src/utils/Utils')
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
    res.set('Cache-control', 'public, max-age='+60*60*24*7*30*12)
    const youtube = await Innertube.create({ gl: 'US',  cache: new UniversalCache() })
    let stream = await youtube.download(id,{format:'mp4',type:'audio',quality: '144p'})
    for await (const chunk of streamToIterable(stream)) {
      res.write(chunk);
    }
    res.end()
  } catch (err) {
    console.error(err)
    if (!res.headersSent) {
      res.writeHead(500)
      res.end('internal system error\n\n'+err)
    }
  }
  /* try {
    res.set('Cache-control', 'public, max-age='+60*60*24*7*30*12)
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
  } */
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
