document.getElementById('dl-song').addEventListener('click', async ()=>{
	let id = window.state.queue[window.state.curPlay][0]
	let url = `${window.state.songServer}api/stream?id=${id}`
	document.getElementById('dl-song').innerHTML = 'downloading'
	//TODO: Thumbnail Dl
	/* fetch(document.getElementById('thumbnail').src)
	.then((data)=>{
		if (data.status == 200) {
			return data.blob()
		}
	})
	.then((img)=>{
		
	})
	.catch((err)=>{
		throw Error(err)
	}) */

	fetch(url)
	.then((data)=>{
		if (data.status == 200) {
			return data.blob()
		}
	})
	.then((blob)=>{
		let obj = {
			data: blob,
			thumb: null,
			id: id,
			title: window.state.queue[window.state.curPlay][3]
		}
		let transaction = window.state.db.transaction(['songs'], 'readwrite');
		let addRequest = transaction.objectStore('songs').add(obj);

		addRequest.onerror = (e) => {
			throw Error(e)
		}

		transaction.oncomplete = function(e) {
			document.getElementById('dl-song').innerHTML = 'download_done'
		}
	})
	.catch((err)=>{
		throw Error(err)
	})
})