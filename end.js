const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const endText = document.querySelector('#end-text')

const MAX_HIGH_SCORES = 5

finalScore.innerText = `${mostRecentScore}/20`
if (mostRecentScore > 13) {
    endText.innerText ='Congrats! You got more than 14 correct answers. Keep it up!'}