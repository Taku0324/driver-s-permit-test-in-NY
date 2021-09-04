const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const icon = document.querySelector('.icon');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Which of the following is used on some highways to direct drivers into the proper lanes for turning?",
        choice1: "Flashing red lights",
        choice2: "Flashing yellow lights",
        choice3: "White lines on the side of the road",
        choice4: "White arrows in the middle of the lanes",
        answer: 4,
    },
    {
        question: "A diamond-shaped sign is a:?",
        choice1: "Road hazard sign",
        choice2: "Interstate route site",
        choice3: "School crossing sign",
        choice4: "Speed limit sign",
        answer: 1,
    },
    {
        question: "What are the colors of a sign which tells you the distance to the next exit of a highway?",
        choice1: "Yellow with black letters",
        choice2: "Black with white letters",
        choice3: "Red with white letters",
        choice4: "Green with white letters",
        answer: 4,
    },
    {
        question: "You may cross a double solid yellow line:",
        choice1: "To pass a slow moving truck",
        choice2: "To turn into a driveway",
        choice3: "To pass a car if traffic permits",
        choice4: "Under no conditions",
        answer: 2,
    },
    {
        question: "You come to an intersection which has a flashing red light.  You should:?",
        choice1: "Come to a full stop, then go when safe to do so",
        choice2: "Stop only if cars are approaching the intersection",
        choice3: "Stop only if cars are already in the intersection",
        choice4: "Slow down and be prepared to stop if necessary",
        answer: 1,
    },
    {
        question: "The law that requires every driver to exercise care to avoid colliding with an authorized emergency or hazard vehicle is called:",
        choice1: "Brianna’s Law",
        choice2: "The Green Light Law",
        choice3: "Move Over Law",
        choice4: "Right of Way",
        answer: 3,
    },
    {
        question: "What should you do when you are going to enter a roadway from a private road?",
        choice1: "Blow your horn to warn cars you are entering the roadway",
        choice2: "Stop with part of the car on the roadway to warn other drivers",
        choice3: "Drive out fast to merge smoothly with the traffic",
        choice4: "Yield the right-of-way to pedestrians and roadway traffic",
        answer: 4,
    },
    {
        question: "When you want to make a right turn, your car must be:",
        choice1: "Near the center of the street",
        choice2: "Close to the left side of the street",
        choice3: "Close to the right side of the street",
        choice4: "Past the center of the intersection when you begin to turn",
        answer: 3,
    },
    {
        question: "You have the right of way when you are:",
        choice1: "Entering a traffic circle",
        choice2: "Backing out of a driveway",
        choice3: "Leaving a parking space",
        choice4: "Already in a traffic circle",
        answer: 4,
    },
    {
        question: "When two vehicles enter an intersection from different highways at the same time, which vehicle must yield the right-of-way?",
        choice1: "Either one",
        choice2: "Vehicle on the left",
        choice3: "Vehicle on the right",
        choice4: "Neither one",
        answer: 2,
    },
    {
        question: "After you have passed a car you should return to the right lane when you:",
        choice1: "See the front bumper of the other car in your mirror",
        choice2: "Have put your turn signal on",
        choice3: "Have turned your headlights on",
        choice4: "See the other car's headlights come on",
        answer: 1,
    },
    {
        question: "What does it mean when a school bus is stopped and its red lights are flashing?",
        choice1: "You may pass if no children are on the road",
        choice2: "You may not pass while the red lights are flashing",
        choice3: "You may pass if you are facing the front of the bus",
        choice4: "You may pass if it is on the other side of a divided highway",
        answer: 2,
    },
    {
        question: "In which of the following situations is passing always forbidden?",
        choice1: "The vehicle ahead is making a left turn",
        choice2: "You are on a one-way street which has two lanes",
        choice3: "The vehicle ahead is stopped for a pedestrian in a crosswalk",
        choice4: "The vehicle ahead is going to park parallel to the curb",
        answer: 3,
    },
    {
        question: "When you want to overtake and pass another vehicle you should:",
        choice1: "Wait for a signal from the other driver",
        choice2: "Change lanes quickly so the other driver will see you",
        choice3: "Signal and pass when safe to do so",
        choice4: "Stay close behind so you need less time to pass",
        answer: 3,
    },
    {
        question: "You may pass another vehicle on the right if it is waiting to:",
        choice1: "Turn right",
        choice2: "Turn left",
        choice3: "Park at the curb",
        choice4: "Turn into a driveway on the right",
        answer: 2,
    },
    {
        question: "A blind person legally has the right-of-way when crossing the street when he is:",
        choice1: "Wearing light-colored clothing",
        choice2: "Led by a guide dog, or using a white or metallic cane",
        choice3: "helped by another person",
        choice4: "Wearing dark-colored glasses",
        answer: 2,
    },
    {
        question: "A motorist approaching a bicyclist should:",
        choice1: "Speed up to pass him",
        choice2: "Proceed as usual",
        choice3: "Swerve into the opposite lane",
        choice4: "Exercise extreme caution",
        answer: 4,
    },
    {
        question: "A motorist should know that a bicyclist operating on a roadway must:",
        choice1: "Ride on the right side of the road",
        choice2: "Ride on the side of the road facing traffic",
        choice3: "Ride on either side of the road",
        choice4: "Ride on the side of the road with the least traffic",
        answer: 1,
    },
    {
        question: "On a road which has no sidewalks a pedestrian should walk on the:",
        choice1: "Side of the road which has the lightest traffic",
        choice2: "Same side of the road in which traffic is moving",
        choice3: "Side of the road facing oncoming traffic",
        choice4: "Side of the road which has the heaviest traffic",
        answer: 3,
    },
    {
        question: "A bicyclist differs from a motorist in that he isn't required to:",
        choice1: "Obey the same traffic laws",
        choice2: "Signal all turns",
        choice3: "Report accidents resulting in serious injury",
        choice4: "Insure the bicycle",
        answer: 4,
    }
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 20

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    icon.style.marginLeft = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 100)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()