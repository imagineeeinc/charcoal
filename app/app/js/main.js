import '../styles/main.css'
import {play} from './modules/play.js'
window.state = {
	set(s){
		sessionStorage.setItem('state', s)
		document.querySelector(`[${s}]`).scrollIntoView()
	},
	get(){return sessionStorage.getItem('state')},
	queue: [],
	curPlay: false,
	playing: false,
	defaultSongServer: 'https://charcoal-song-server.up.railway.app/',
	songServer: 'https://charcoal-song-server.up.railway.app/',
	curDuration: [0,0],
	add(id, img, duration, title) {
		state.queue.push([id, img, duration, title])
	},
	play(id, img, duration, title){
		if(state.curPlay === false){
			state.curPlay = 0
		}
		if (id == null) {
			play(id)
			state.curPlay = null
			state.curDuration = [0,0]
		} else {
			let dur = duration.split(':')
			state.curDuration = duration
			play(id, img, dur, title)
		}
	},
	next() {
		if (state.queue.length == state.curPlay+1) {
		} else {
			let song = window.state.queue[window.state.curPlay+1]
			state.curPlay += 1
			state.play(...song)
		}
	},
	back() {
		if (!state.queue[state.curPlay-1]) {
		} else {
			let song = state.queue[state.curPlay-1]
			state.curPlay -= 1
			state.play(...song)
		}
	}
}
import './modules/dev.js'
import './modules/search.js'
//init
state.set('home')
state.songServer = localStorage.getItem('songServer') || state.defaultSongServer
localStorage.setItem('songServer', state.songServer)
fetch(state.songServer)
.then((res) => {
	if (res.status == 200) {
		res.text().then((txt) => {
			if (!txt == 'server online: charcoal') {
				alert('Not connected to a charcoal song server. Try again in a few minutes. Please contact developer if problem persists.')
			} else {
				console.log('Song server connected!')
			}
		})
	} else {
		alert('Charcoal song server is offline. Try again in a few minutes. Please contact developer if problem persists.')
	}
})
window.onresize = () => {
	document.querySelector(`[${sessionStorage.getItem('state')}]`).scrollIntoView()
}

document.querySelectorAll('.menu-btn').forEach((e)=>{
	e.addEventListener('click', ()=>{
		document.querySelector('.cur-page').classList.remove('cur-page')
		e.classList.add('cur-page')
		state.set(e.id)
	})
})
/* document.onclick = ()=> {
	var audio = new Audio('http://localhost:3000/api/stream?id=<id>');
	audio.play();
} */