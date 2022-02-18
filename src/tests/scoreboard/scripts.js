import  gsap from 'gsap'
import Filter from 'bad-words';
const body = document.querySelector("body")
const form = document.querySelector(".form")
const scoreSubmit = document.querySelector(".submit-wrapper")
const scoreDisplay = document.querySelector(".scoreboard-wrapper")
const scoreUI = document.querySelector(".score-display")
const scoreList = document.querySelector(".scoreboard-list")

var filter = new Filter()

const score = 575
scoreUI.innerHTML = score

let records

fetch('/api')
    .then(response => response.json())
    .then(data => {
        records = data
        const recordCount = data.length
        const lowScore = data[recordCount -1].score
        if(score > lowScore){
            scoreSubmit.style.display = 'flex'
            gsap.fromTo(scoreSubmit, {
                opacity: 0,
                y: 10,
            },{
                opacity: 1,
                y: 0,
                delay: 1,
                duration: 1.25,
            })
        }else {
            records = data 
            scoreDisplay.style.display = 'block'
            gsap.fromTo(scoreDisplay, {
                opacity: 0,
                y: 10,
            },{
                opacity: 1,
                y: 0,
                delay: 1,
                duration: 1.25,
            })
        }
    })
    .catch(err => console.log(err))

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let submission = form.querySelector('input[name="name"]').value

    if(submission.length == 0){
        confirm('You must provide a name')
        return
    }

    if(filter.isProfane(submission)){
        confirm('The name you provided contains profanity. Try again.')
        return
    }

    fetch('/api', {
        method: 'POST',
        body: JSON.stringify({name: submission, score: score}),
    })

    gsap.to(scoreSubmit, {
        opacity: 0,
        y: 10,
        duration: 1,
    })
    .then(()=>{
        records.map((record) => {
            scoreList.appendChild = `<li>${record.name}: ${record.score}</li>`
        })
        scoreSubmit.style.display = 'none'
        scoreDisplay.style.display = 'block'
    })


    gsap.fromTo(scoreDisplay, {
        opacity: 0,
        y: 10,
    },{
        delay: 1,
        opacity: 1,
        y: 0,
        duration: 1.25,
    })
})