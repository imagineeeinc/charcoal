let server = localStorage.getItem('songServer')
document.getElementById('search-box').onchange = ()=>{
	let s = document.getElementById('search-box').value
	fetch(server + 'api/search/?q=' + encodeURIComponent(s))
	.then(response => response.json())
	.then(data => {
		console.log(data)
	})
}