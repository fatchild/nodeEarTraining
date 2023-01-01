// VARIABLES
let frequency
let bands
let band
let playing
let score
let total
let scoreDisplay
let lowElem
let midElem
let highElem
let gainNode


// INITIALIZE
const init = () => {
    scoreDisplay = document.getElementById('scoreDisplay')
    lowElem = document.getElementById('low')
    midElem = document.getElementById('mid')
    highElem = document.getElementById('high')
    bands = ['low', 'mid', 'high']
    playing = false
    score = 0 
    total = 0

    resetFrequency()
}
window.onload = init


// LOGIC
window.guess = (bandGuess) => {
    if (bandGuess === band){
        score += 1
    }
    total += 1
    scoreDisplay.textContent = `${score} / ${total}`
    correctAnswerReveal()
    resetFrequency()
}

const correctAnswerReveal = () => {
    switch(band){
        case "low":
            lowElem.classList.remove("btn-danger"); // Remove the normal button design
            lowElem.classList.add("btn-outline-danger"); // Remove the normal button design
            setTimeout(() => {
                lowElem.classList.remove("btn-outline-danger");
                lowElem.classList.add("btn-danger");
            }, 1000)
            break
        case "mid":
            midElem.classList.remove("btn-warning"); // Remove the normal button design
            midElem.classList.add("btn-outline-warning"); // Remove the normal button design
            setTimeout(() => {
                midElem.classList.remove("btn-outline-warning");
                midElem.classList.add("btn-warning");
            }, 1000)
            break
        case "high":
            highElem.classList.remove("btn-success"); // Remove the normal button design
            highElem.classList.add("btn-outline-success"); // Remove the normal button design
            setTimeout(() => {
                highElem.classList.remove("btn-outline-success");
                highElem.classList.add("btn-success");
            }, 1000)
            break
    }
}

window.play = () => {
    if (playing === true) return

    const audioCtx = new AudioContext()
    gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.1;
    gainNode.connect(audioCtx.destination);

    const oscillator = audioCtx.createOscillator()
    // oscillator.connect(audioCtx.destination)
    oscillator.connect(gainNode)
    gainNode.connect(audioCtx.destination)
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    oscillator.start()
    playing = true
    setTimeout(() => {
        oscillator.stop()
        playing = false
    }, 500)
}

window.resetFrequency = () => {
    band = bands[generateRandomNumber(3)-1]
    if (band === "low"){
        frequency = generateRandomNumber(210)+40 // 20 to 250 is a range of 230
    } else if (band === "mid"){
        frequency = generateRandomNumber(3749)+251 // 251 to 4000 is a range of 3749
    } else if (band === "high"){
        frequency = generateRandomNumber(11999)+4001 // 4001 to 16000 is a range of 11999
    }
}

const generateRandomNumber = max =>  Math.floor(Math.random() * max + 1)

const logslider = (position) => {
    if (position < 1) return 0

    // position will be between 0 and 100
    var minp = 0;
    var maxp = 100;
  
    // The result should be between 100 an 10000000
    var minv = 0;
    var maxv = Math.log(100);
  
    // calculate adjustment factor
    var scale = (maxv-minv) / (maxp-minp);
  
    return Math.exp(minv + scale*(position-minp)) / 100;
  }

const gainInput = document.getElementById('gainInput')
gainInput.addEventListener('input', () => {
    gainNode.gain.value = logslider(gainInput.value)
});