const bestScore = document.getElementById('bestScore')


if(localStorage.getItem('best')){
    bestScore.innerHTML = localStorage.getItem('best')
} else {
    bestScore.innerHTML = 0
}