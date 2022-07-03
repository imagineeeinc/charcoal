window.state = {
	set: (s)=>{
		sessionStorage.setItem('state', s)
		document.querySelector(`[${s}]`).scrollIntoView()
	},
	get: ()=>{return sessionStorage.getItem('state')}
}
document.querySelectorAll('.menu-btn').forEach((e)=>{
	e.addEventListener('click', ()=>{
		document.querySelector('.cur-page').classList.remove('cur-page')
		e.classList.add('cur-page')
		state.set(e.id)
	})
})

window.onload = ()=>{
	document.querySelectorAll('.dev').forEach((e)=>{
		e.setAttribute('disabled', '')
	})
}
document.getElementById('develop').onchange = () => {
	if (document.getElementById('develop').checked == true) {
		document.querySelectorAll('.dev').forEach((e)=>{
			e.removeAttribute('disabled')
		})
	} else {
		document.querySelectorAll('.dev').forEach((e)=>{
			e.setAttribute('disabled', '')
		})
	}
}