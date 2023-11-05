const fav = document.querySelectorAll('.in_right');
let isFav = false;
const arrayProducts = document.querySelector('#arrayProducts');

fav.forEach(element => {
    element.addEventListener('click', () => {
        if (isFav) {
            element.innerText = 'heart_plus';
        } else {
            element.innerText = 'favorite';
        }
        isFav = !isFav;
    })
});
