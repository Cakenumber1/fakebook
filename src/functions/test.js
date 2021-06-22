const button = document.querySelector('#dropdown');
const x = document.querySelector('.news__options__content');
button.addEventListener('click', event => {
	event.stopPropagation();
	if (x.style.display === 'none') {
		x.style.display = 'block';
	} else {
		x.style.display = 'none';
	}
});

// eslint-disable-next-line no-unused-vars
window.addEventListener('click', event => {
	x.style.display = 'none';
});

// Idk
