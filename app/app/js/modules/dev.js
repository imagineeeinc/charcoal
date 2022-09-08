window.onload = ()=>{
	document.getElementById('server').value = localStorage.getItem('songServer')
}

document.getElementById('server').onchange = () => {
	let s = document.getElementById('server').value.substr(document.getElementById('server').value.length-1) == '/' ? document.getElementById('server').value : document.getElementById('server').value+'/'
	if (s == '/') {
		localStorage.setItem('songServer', window.state.defaultSongServer)
		window.state.songServer = window.state.defaultSongServer
		return null
	}
	fetch(s)
	.then((res) => {
		if (res.status == 200) {
			res.text().then((txt) => {
				if (txt == 'server online: charcoal') {
					localStorage.setItem('songServer', s)
					alert('Song server avalible, reload app to use it.')
				} else {
					alert('not a charcoal song server')
				}
			})
		} else {
			alert('Server error: ' + res.status)
		}
	})
}