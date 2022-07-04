window.state = {
	set: (s)=>{
		sessionStorage.setItem('state', s)
		document.querySelector(`[${s}]`).scrollIntoView()
	},
	get: ()=>{return sessionStorage.getItem('state')}
}
import './modules/dev.js'
import './modules/search.js'
//init
state.set('home')
state.songServer = localStorage.getItem('songServer') || ''
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