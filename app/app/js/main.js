import '../styles/main.css'
import {play, playBtn} from './modules/play.js'
window.state = {
	set(s){
		sessionStorage.setItem('state', s)
		document.querySelector(`[${s}]`).scrollIntoView()
	},
	get(){return sessionStorage.getItem('state')},
	queue: [],
	curPlay: false,
	playing: false,
	loopMode: false,
	defaultSongServer: 'https://charcoal-song-server.up.railway.app/',
	songServer: 'https://charcoal-song-server.up.railway.app/',
	curDuration: [0,0],
	add(id, img, duration, title) {
		if (state.queue.find((e) => e[0] == id)) {
			alert("Music already in queue. Cannot add.")
		} else {
			state.queue.push([id, img, duration, title])
		}
	},
	remove(id) {
		if (state.queue.findIndex((e) => e[0] == id) == state.curPlay) {
			if (state.next() == false) {
				if (state.back() == false) {
					state.play(null)
				}
			}
		}
		state.queue.splice(state.queue.findIndex((e) => e[0] == id), 1)
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
			state.curPlay = state.queue.findIndex((e) => e[0] == id)
			let dur = duration.split(':')
			state.curDuration = duration
			play(id, img, dur, title)
		}
	},
	next() {
		//if (state.queue.length-1 == state.curPlay) {
		if (!state.queue[state.curPlay+1]){
			return false
		} else {
			let song = window.state.queue[window.state.curPlay+1]
			state.curPlay += 1
			state.play(...song)
			return true
		}
	},
	back() {
		if (!state.queue[state.curPlay-1]) {
			return false
		} else {
			let song = state.queue[state.curPlay-1]
			state.curPlay -= 1
			state.play(...song)
			return true
		}
	},
	db: null,
	dbRequest: null,
	dlSongs: [] 
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
window.onunload = () => {
	localStorage.setItem('page-state', sessionStorage.getItem('state'))
}
window.onload = () => {
	/* state.dbRequest = indexedDB.open('dl-songs', 1);
	state.dbRequest.onerror = (e) => {
		throw Error(e.message)
	}
	state.dbRequest.onsuccess = (e) => {
		state.db = e.target.result
		console.log('dl-db opened')
		setInterval(()=>{
			let transaction = state.db.transaction(['songs'], 'readonly')
			let obj = transaction.objectStore('songs')
			let request = obj.openCursor()
			request.onerror = function(event) {
				console.err("error fetching data");
			};
			state.dlSongs = []
			request.onsuccess = (event) => {
				let cursor = event.target.result
				if (cursor) {
						let key = cursor.primaryKey
						let value = cursor.value
						state.dlSongs.push({id: value.id, title: value.title, thumb: value.thumb})
						cursor.continue()
				}
				else {
						// no more results
				}
			}
			state.dlSongs.forEach((e)=>{
				//TODO: list of dl songs
			})
		}, 1000)
	}
	state.dbRequest.onupgradeneeded = (e) => {
		state.db = e.target.result;
		state.db.createObjectStore('songs', {keyPath:'id', autoIncrement: true})
		let dbReady = true
	} */
	setTimeout(() => {
		state.set(localStorage.getItem('page-state'))
		document.querySelector('.cur-page').classList.remove('cur-page')
		document.getElementById(localStorage.getItem('page-state')).classList.add('cur-page')
	}, 100)
}

document.querySelectorAll('.menu-btn').forEach((e)=>{
	e.addEventListener('click', ()=>{
		document.querySelector('.cur-page').classList.remove('cur-page')
		e.classList.add('cur-page')
		state.set(e.id)
		if (e.id == 'search') {
			document.getElementById('search-box').focus()
		}
	})
})
import './modules/queue.js'
//import './modules/dl.js'
/* document.onclick = ()=> {
	var audio = new Audio('http://localhost:3000/api/stream?id=<id>');
	audio.play();
} */
document.onkeydown = (e) => {
	if (state.get() == "now-playing") {
		let key = e.key.toLowerCase()
		if (key == " " && e.target != document.getElementById('play-btn')) {
			//playBtn(!state.playing)
			document.getElementById('play-btn').focus()
			document.getElementById('play-btn').click()
		}
		if (key == "arrowleft") {
			document.getElementById('backward-btn').click()
		}
		if (key == "arrowright") {
			document.getElementById('forward-btn').click()
		}
	}
}