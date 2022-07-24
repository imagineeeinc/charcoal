export function createQueueItem(id, img, dur, title) {
	document.getElementById('queue-empty').classList.add('hide')
	let temp = document.getElementById('queue-item-temp')
	temp = temp.content.querySelector('.queue-item')
	let d = document.importNode(temp, true)
	d.querySelector('img').src = img
	d.querySelector('.queue-item-data').querySelector('.queue-item-txt').querySelector('.queue-item-title').innerHTML = title.substr(0,30)+'...'
	d.querySelector('.queue-item-data').querySelector('.queue-item-txt').querySelector('.queue-item-len').innerHTML = dur
	d.setAttribute('video-id', id)
	d.setAttribute('video-img', img)
	d.setAttribute('video-duration', dur)
	d.setAttribute('video-title', title)
	d.querySelector('.queue-item-data').querySelector('.queue-item-btns > .play-in-queue').addEventListener('click', ()=>{
		window.state.play(d.getAttribute('video-id'), d.getAttribute('video-img'), d.getAttribute('video-duration'), d.getAttribute('video-title'))
	})
	d.querySelector('.queue-item-data').querySelector('.queue-item-btns > .del-in-queue').addEventListener('click', ()=>{
		window.state.remove(d.getAttribute('video-id'))
		let e = document.getElementById('queue-content').querySelector(`*[video-id=${d.getAttribute('video-id')}]`)
		e.parentElement.removeChild(e)
	})
	document.getElementById('queue-content').append(d)
}