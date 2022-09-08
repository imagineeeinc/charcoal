import {createQueueItem} from './queue.js'
var typing = false
var viewFormater = Intl.NumberFormat('en', { notation: 'compact'})
document.getElementById('search-box').onkeyup = () => {
	typing = true
	setTimeout(()=>{
		if (typing == true) {
			search()
			typing = false
		}
	}, 1000)
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
		document.getElementById('search-results').style.visibility = 'hidden'
		data.forEach(e => {
			let d = document.importNode(temp, true)
			d.querySelector('img').src = e.thumbnail
			d.querySelector('.search-res-data').querySelector('.search-res-txt').querySelector('.search-res-title').innerHTML = e.title.substr(0,30)+'...'
			d.querySelector('.search-res-data').querySelector('.search-res-txt').querySelector('.search-res-views').innerHTML = viewFormater.format(e.views) + ' views'
			d.querySelector('.search-res-txt').querySelector('.search-res-len').innerHTML = e.duration
			d.setAttribute('video-id', e.video_id)
			d.setAttribute('video-img', e.thumbnail)
			d.setAttribute('video-duration', e.duration)
			d.setAttribute('video-title', e.title)
			d.querySelector('.search-res-data').querySelector('.search-res-btns').querySelector('.play-now').addEventListener('click', ()=>{
				window.state.add(d.getAttribute('video-id'), d.getAttribute('video-img'), d.getAttribute('video-duration'), d.getAttribute('video-title'))
				window.state.play(d.getAttribute('video-id'), d.getAttribute('video-img'), d.getAttribute('video-duration'), d.getAttribute('video-title'))
				createQueueItem(d.getAttribute('video-id'), d.getAttribute('video-img'), d.getAttribute('video-duration'), d.getAttribute('video-title'))
			})
			d.querySelector('.search-res-data').querySelector('.search-res-btns').querySelector('.add-to-queue').addEventListener('click', ()=>{
				window.state.add(d.getAttribute('video-id'), d.getAttribute('video-img'), d.getAttribute('video-duration'), d.getAttribute('video-title'))
				if(window.state.curPlay === false){
					window.state.play(d.getAttribute('video-id'), d.getAttribute('video-img'), d.getAttribute('video-duration'), d.getAttribute('video-title'))
				}
				createQueueItem(d.getAttribute('video-id'), d.getAttribute('video-img'), d.getAttribute('video-duration'), d.getAttribute('video-title'))
			})
			document.getElementById('search-results').append(d)
		})
		document.getElementById('search-results').style.visibility = 'visible'
	})
}
document.getElementById('search-box').onemptied = ()=>document.getElementById('search-results').innerHTML = ''