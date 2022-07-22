import {createQueueItem} from './queue.js'
var typing = false
document.getElementById('search-box').onkeyup = () => {
	typing = true
	setTimeout(()=>{
		if (typing == true) {
			search()
			typing = false
		}
	}, 2000)
}
document.getElementById('search-box').onchange = search
function search(){
	let server = state.songServer
	let s = document.getElementById('search-box').value
	fetch(server + 'api/search/?q=' + encodeURIComponent(s))
	.then(response => response.json())
	.then(data => {
		let temp = document.getElementById('search-res-temp')
		temp = temp.content.querySelector('.search-res')
		document.getElementById('search-results').innerHTML = ''
		data.forEach(e => {
			let d = document.importNode(temp, true)
			d.querySelector('img').src = e.snippet.thumbnails.url
			d.querySelector('.search-res-txt').querySelector('.search-res-title').innerHTML = e.title.substr(0,30)+'...'
			d.querySelector('.search-res-txt').querySelector('.search-res-views').innerHTML = e.views + ' views'
			d.querySelector('.search-res-txt').querySelector('.search-res-len').innerHTML = e.duration_raw
			d.setAttribute('video-id', e.id.videoId)
			d.setAttribute('video-img', e.snippet.thumbnails.url)
			d.setAttribute('video-duration', e.duration_raw)
			d.setAttribute('video-title', e.title)
			d.addEventListener('click', ()=>{
				window.state.add(d.getAttribute('video-id'), d.getAttribute('video-img'), d.getAttribute('video-duration'), d.getAttribute('video-title'))
				if(window.state.curPlay === false){
					window.state.play(d.getAttribute('video-id'), d.getAttribute('video-img'), d.getAttribute('video-duration'), d.getAttribute('video-title'))
				}
				createQueueItem(d.getAttribute('video-id'), d.getAttribute('video-img'), d.getAttribute('video-duration'), d.getAttribute('video-title'))
				/* let c = d.cloneNode(true)
				c.removeEventListener('click', ()=>{})
				document.getElementById('queue-content').append(c) */
			})
			document.getElementById('search-results').append(d)
		});
	})
}
document.getElementById('search-box').onemptied = ()=>document.getElementById('search-results').innerHTML = ''