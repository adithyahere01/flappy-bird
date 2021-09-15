const bird = document.querySelector('.bird')
const gameDisplay = document.querySelector('.game-container')
const ground = document.querySelector('.ground')
const score = document.querySelector('.number')
const notify = document.querySelector('.game-over')
const displayScore = document.querySelector('.score')//
const finalScore = document.querySelector('.final-score')

let birdLeft = 220
let birdBottom = 100
let gravity = 2
let isGameOver = false
let gap = 430
let number = 0//

function startGame(){
    birdBottom -= gravity
   bird.style.bottom = birdBottom + 'px'
   bird.style.left = birdLeft + 'px'
}
let gameTimerId = setInterval(startGame, 20)

//clearInterval(timerId)
function control(e){
  if(e.keyCode === 32){
      jump()
      countScore()
  }
}

function jump(){
    if(birdBottom < 500) birdBottom += 50
    bird.style.bottom = birdBottom + 'px'
}
document.addEventListener('keyup',control)

function generateObstacle(){
    let obstacleLeft = 500
    let randomHeight = Math.random() * 60
    let obstacleBottom = randomHeight
 
   const obstacle = document.createElement('div')
   const topObstacle = document.createElement('div')
   if(!isGameOver){ obstacle.classList.add('obstacle')
   topObstacle.classList.add('topObstacle')
   }
   gameDisplay.appendChild(obstacle)
   gameDisplay.appendChild(topObstacle)

   obstacle.style.left = obstacleLeft + 'px'
   topObstacle.style.left = obstacleLeft + 'px'
   obstacle.style.bottom = obstacleBottom + 'px'
   topObstacle.style.bottom = obstacleBottom + gap + 'px'

   function moveObstacle(){
       obstacleLeft -= 2
       obstacle.style.left = obstacleLeft + 'px'
       topObstacle.style.left = obstacleLeft + 'px'

       if(obstacleLeft === 0){
        clearInterval(timerId)
        //removing child
        gameDisplay.removeChild(obstacle)
        gameDisplay.removeChild(topObstacle)
       }
       if(
           obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && 
           (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200)||
           birdBottom === 0  //bird reached bottom 
       ){
           gameOver()
           clearInterval(timerId)
       }
   }
   let timerId = setInterval(moveObstacle, 20)

   if(!isGameOver) setTimeout(generateObstacle, 3000)
}
generateObstacle()



//**********Game Over */
function gameOver(){
    clearInterval(gameTimerId)
    isGameOver = true
    document.removeEventListener('keyup', control)
    
    let Result = score.innerHTML
    finalScore.innerHTML = Result

    displayScore.classList.add('hide-score')
    notify.classList.add('notify')
}

//***************SCORE */
function countScore(){
    number++
    score.innerHTML = number 
}

//RESTART
function restart(){
    window.location.reload()
}