// array of words to be guessed
const words = ['zim', 'gir', 'dib', 'gaz', 'nickelodeon', 'tallestred', 'tallestpurple', 'irk', 'doom', 'invader', 'foodcourtia', 'irken']

// to make a random word from array be chosen
const getRandomWord = function () {
    return words[Math.floor(Math.random() * words.length)]
    .toLowerCase()
}

// counters being defined
let wins = 0
let losses = 0
let guesses = 10

// starting values
let lettersGuessed = []
let word = getRandomWord()

// resets game to original
const reset = _ => {
    word = getRandomWord()
    lettersGuessed = []
    guesses = 10
    displayWord()
    document.getElementById('guesses').textContent = guesses
    document.getElementById('wins').textContent = wins
    document.getElementById('losses').textContent = losses
    document.getElementById('letters').textContent = lettersGuessed.join(', ')
}

// displays word with blanks
const displayWord = _ => {
    // build string of letters and blanks
    let wordStr = ''
    // tracks if they win
    let winStatus = true
    // loop and build string
    word.split('').forEach(letter => {
        // if letter is in word and they guessed
        if (lettersGuessed.indexOf(letter) != -1) {
            wordStr += `${letter} `
        } else {
            // adds blanks for letters not guessed
            wordStr += "_ "
            // indicates game is lost
            winStatus = false
        }
    })

    // current state
    document.getElementById('word').textContent = wordStr

    // if no blanks
    if (winStatus) {
        wins++
        // if the user wins, what will happen*****************
        // attempting to get audio to play

            var winSounds = ["./assets/audio/anotherWin.mp3",
                         "./assets/audio/thatGameWasEasy.mp3", 
                         "./assets/audio/thatWasEasy.mp3", 
                         "./assets/audio/victoryIsMine.mp3"]
            
            var soundFile = winSounds[Math.floor(Math.random()*winSounds.length)];

            var audioElement = document.createElement('audio');
            audioElement.setAttribute('src', soundFile);
            console.log(audioElement);
        
            // document.getElementById("player").innerHTML="<embed src=\""+soundFile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
            // document.getElementById('player').play
            // console.log(document.getElementById('player'));
        
        alert(`congrats human! the word was ${word}`)
        // resets
        reset()
        
    }
    
}

// confirm letter is in word
const checkLetter = letter => {
    
    lettersGuessed.push(event.key)
    document.getElementById('letters').textContent = lettersGuessed.join(', ')
    // if letter is in word
    if (word.includes(event.key)) {
        // update display
        displayWord()
    } else {
        // guesses goes down
        guesses--
        document.getElementById('guesses').textContent = guesses
        // if they're out of guesses
        if (guesses <= 0) {
            losses++
            alert(`you suck human! the word was ${word}`)
            // reset game
            reset()
            // if the user loses, what will happen*****************
            
            }
        }
     }

// locked to letters not guessed
document.onkeyup = event => event.keyCode >= 65 && event.keyCode <= 90 && lettersGuessed.indexOf(event.key) === -1 ? checkLetter(event.key) : null

// starts game
reset()



// testing audio

// var loseSounds = ["./assets/audio/fools.mp3", 
//                   "./assets/audio/poorDoomedChild.mp3", 
//                   "./assets/audio/never.mp3", 
//                   "./assets/audio/pitifulHuman.mp3"]

