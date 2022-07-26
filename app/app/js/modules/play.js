let progress = document.getElementById('progress')
let thumb = document.getElementById('thumbnail')
let audio = new Audio()
let progression = 0
let length = 0
let songTitle = 'Nothing Playing'
let roll = ["◐","◓","◑","◒"]
let rollNum = 0

document.getElementById('play-btn').onclick = () => {
	playBtn(!window.state.playing)
}
navigator.mediaSession.setActionHandler('pause', ()=>playBtn(false))
navigator.mediaSession.setActionHandler('play', ()=>playBtn(true))
document.getElementById('forward-btn').onclick = () => {
	audio.currentTime += 10
}
navigator.mediaSession.setActionHandler('seekforward', ()=>audio.currentTime+=10)
document.getElementById('backward-btn').onclick = () => {
	audio.currentTime -= 10
}
navigator.mediaSession.setActionHandler('seekbackward', ()=>audio.currentTime-=10)
document.getElementById('next-song').onclick = () => {
	window.state.next()
}
navigator.mediaSession.setActionHandler('nexttrack', ()=>window.state.next())
document.getElementById('last-song').onclick = () => {
	window.state.back()
}
navigator.mediaSession.setActionHandler('nexttrack', ()=>window.state.back())

let mouseOnProgress = false
progress.addEventListener('mousedown', (e) => {
	mouseOnProgress = true
	seek(e)
})
progress.addEventListener('mousemove', seek)
progress.addEventListener('mouseup', () => {
	mouseOnProgress = false
})
function seek(e){
	if (mouseOnProgress) {
		let x = e.clientX-progress.getBoundingClientRect().x
		audio.currentTime = length*(x/progress.getBoundingClientRect().width)
	}
}

audio.addEventListener("timeupdate", function() {
	progression = audio.currentTime/length
});
setInterval(()=>{
	if (progress.value >= progression-1 && progress.value <= progression+1) {
		progress.value = progression
	} else {
		progression = Number(progress.value)
	}
	
	let se = Number(progression)*length
	let so = [Math.floor(se/60), Math.floor(se%60)]
	document.getElementById('duration-passed').innerHTML = so[0]+':'+so[1]

	if (progression*length+1 >= length && window.state.playing) {
		playBtn(false)
		audio.src = audio.src
		progress.value = 0
		if (window.state.loopMode == true) {
			setTimeout(()=>playBtn(true), 500)
		} else {
			window.state.next()
		}
	}

	if (window.state.playing) {
		document.title = roll[rollNum] + ' | ' + songTitle
		rollNum++
		if (rollNum >= roll.length) {
			rollNum = 0
		}
	} else {
		document.title = '⏵︎' + ' | ' + songTitle
	}
	progression = Number(progress.value)
}, 1)
function playBtn(play) {
	if (play == true) {
		document.getElementById('play-btn').innerHTML = 'pause'
		window.state.playing = true
		audio.play()
		navigator.mediaSession.playbackState = 'playing'
	} else {
		document.getElementById('play-btn').innerHTML = 'play_arrow'
		window.state.playing = false
		audio.pause()
		navigator.mediaSession.playbackState = 'paused'
  }
}
export function play(id, thumbnail, duration, title) {
	if (!id) {
		thumb.src = ''
		progress.value = 0
		progress.setAttribute('disabled', '')
		document.getElementById('title').innerHTML = ''
		songTitle = 'Nothing Playing'
		playBtn(false)
		return null
	}
	progress.value = 0
	progress.removeAttribute('disabled')
	progression = 0
	thumb.src = thumbnail
	document.getElementById('title').innerHTML = title
	songTitle = title
	audio.src = `${window.state.songServer}api/stream?id=${id}`
	if (duration.length == 3) {
		length = Number(duration[0])*60*60 + Number(duration[1])*60 + Number(duration[2])
	} else {
		length = Number(duration[0])*60 + Number(duration[1])
	}
	document.getElementById('duration').innerHTML = window.state.curDuration
	playBtn(true)
	if ("mediaSession" in navigator){
		navigator.mediaSession.metadata = new MediaMetadata({
			title: title,
			artwork: [{src: thumbnail}]
		});
	}
}

document.getElementById('loop-mode').addEventListener('click', ()=>{
	if (window.state.loopMode == false) {
		window.state.loopMode = true
		document.getElementById('loop-mode').innerHTML = 'repeat_on'
	} else if (window.state.loopMode == true) {
		window.state.loopMode = false
		document.getElementById('loop-mode').innerHTML = 'repeat'
	}
})