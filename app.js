const text = document.querySelector('#text');
const about = document.querySelector('#about');

text.addEventListener('mouseover', () => {
    about.classList.remove('transparent');
})

text.addEventListener('mouseout', () => {
    about.classList.add('transparent');
})