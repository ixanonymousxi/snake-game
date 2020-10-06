//Scene variables

const gameContainer = document.getElementById("game-box");
const beginContainer = document.getElementById("begin-box");
const loseContainer = document.getElementById("lose-box");

const containHeight = document.getElementById("container").offsetHeight;
const containWidth = document.getElementById("container").offsetWidth;

// Numbers from css box width, height, and border sizes

const border = 12;

const height = (containHeight * .75) + border;
const width = (containWidth * .65) + border;

beginContainer.style.display = "block";
gameContainer.style.display = "none";
loseContainer.style.display = "none";


//Win or lose variables

let score = 0;
let gameloss = false;


//Movement variables

const moveControls = {
    leftTrigger: false,
    rightTrigger: false,
    upTrigger: false,
    downTrigger: false,
    gameBegin: false
}

//Snake property variables

const snake = {
    snakeHead: document.getElementById("snake-head"),
    bodyAddTest: false,
    snakeBody: [],
    x: width/2,
    y: height/2,
    bodyX: [],
    bodyY: [],
    difficulty:"",
    snakeSpeed: [3,5,7],
    distance:[5,3,2],
    class: "snakeBody",
    size:15 //css width & height
};


//Egg variables

const eggs = {
    eggsArray: [],
    x: [],
    y: [],
    class: "eggs",
    size: 12 //css width & height
}

const badEggs = {
    badEggsArray: [],
    x: [],
    y: [],
    class: "badEggs",
    size: 12 //css width & height
}


//Begin code

function begin(string) {
    snake.difficulty = string;
    beginContainer.style.display = "none";
    loseContainer.style.display = "none";
    gameContainer.style.display = "block";
    snakeAnimation();
}


//Restart code

function restart() {
    beginContainer.style.display = "block";
    loseContainer.style.display = "none";
    gameContainer.style.display = "none";
    
    //Remove snake body divs from the game-box div

    snake.snakeBody.forEach( ele => ele.parentNode.removeChild(ele));
    snake.snakeBody = [];

    //Remove egg divs from the game-box div

    eggs.eggsArray.forEach(ele => ele.parentNode.removeChild(ele));
    eggs.eggsArray = [];

    //Remove bad egg divs from the game-box div

    badEggs.badEggsArray.forEach(ele => ele.parentNode.removeChild(ele));
    badEggs.badEggsArray = [];

    snake.bodyX = [];
    snake.bodyY = [];

    moveControls.leftTrigger = false;
    moveControls.rightTrigger = false;
    moveControls.upTrigger = false;
    moveControls.downTrigger = false;
    moveControls.gameBegin = false;

    snake.bodyAddTest = false;
    gameloss = false;
    snake.x = width/2;
    snake.y = height/2;
    score = 0;

    //snakeAnimation();
}


//Lose code

function lose() {
    gameContainer.style.display = "none";
    loseContainer.style.display = "block";
    gameloss = true;
}


//Random Number Generator

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};


//Get position of egg

function getPosition(){

    let xEgg = getRandomInt(width - 25);
    let yEgg = getRandomInt(height - 25);
    let pos = [xEgg,yEgg];

    if (badEggs.badEggsArray.length >= 1) {
        let doesHitEgg = false;

        badEggs.badEggsArray.forEach(function (ele, i) {
            if (xEgg >= badEggs.x[i] - badEggs.size && xEgg <= badEggs.x[i] + badEggs.size &&
                yEgg >= badEggs.y[i] - badEggs.size && yEgg <= badEggs.y[i] + badEggs.size) {

                doesHitEgg = true;
            }
        });
        pos = doesHitEgg ? getPosition() : pos;

    }

    return pos; 

}

//Eggs code

function createEgg() {

    const newDiv = document.createElement("div");
    newDiv.classList.add(eggs.class);

    const img = document.createElement("img");
    img.src = "images/egg.png";
    newDiv.appendChild(img);

    eggs.eggsArray.unshift(newDiv);
    gameContainer.appendChild(eggs.eggsArray[0]);

    const pos = getPosition();

    eggs.x.unshift(pos[0]);
    eggs.y.unshift(pos[1]);

    eggs.eggsArray[0].style.left = eggs.x[0] + "px";
    eggs.eggsArray[0].style.top = eggs.y[0] + "px";

};

function createBadEgg() {

    const newDiv = document.createElement("div");
    newDiv.classList.add(badEggs.class);

    const img = document.createElement("img");
    img.src = "images/badEgg.png";
    newDiv.appendChild(img);

    badEggs.badEggsArray.unshift(newDiv);
    gameContainer.appendChild(badEggs.badEggsArray[0]);

    const pos = getPosition();

    badEggs.x.unshift(pos[0]);
    badEggs.y.unshift(pos[1]);

    badEggs.badEggsArray[0].style.left = badEggs.x[0] + "px";
    badEggs.badEggsArray[0].style.top = badEggs.y[0] + "px";
};


//Snake body code

function addToBody() {
    const newDiv = document.createElement("div");
    newDiv.classList.add(snake.class);

    const img = document.createElement("img");
    img.src = "images/body.png";
    newDiv.appendChild(img);

    snake.snakeBody.unshift(newDiv);
    gameContainer.appendChild(snake.snakeBody[0]);

    snake.bodyAddTest = true;
};


//Keyboard code

window.addEventListener("keydown", arrowKey);

function firstEgg(){
    if (!moveControls.gameBegin) {
        createEgg();
        moveControls.gameBegin = true;
    }
}

function arrowKey(e) {

    switch (e.keyCode) {
        case 37:
            //left key is pressed
            firstEgg();
            if (!moveControls.rightTrigger) {
                moveControls.leftTrigger = true;
                moveControls.rightTrigger = false;
                moveControls.upTrigger = false;
                moveControls.downTrigger = false;
            }
            break;
        case 38:
            //up key is pressed
            firstEgg();
            if (!moveControls.downTrigger) {
                moveControls.leftTrigger = false;
                moveControls.rightTrigger = false;
                moveControls.upTrigger = true;
                moveControls.downTrigger = false;
            }
            break;
        case 39:
            //right key is pressed
            firstEgg();
            if (!moveControls.leftTrigger) {
                moveControls.leftTrigger = false;
                moveControls.rightTrigger = true;
                moveControls.upTrigger = false;
                moveControls.downTrigger = false;
            }
            break;
        case 40:
            //down key is pressed  
            firstEgg();
            if (!moveControls.upTrigger) {
                moveControls.leftTrigger = false;
                moveControls.rightTrigger = false;
                moveControls.upTrigger = false;
                moveControls.downTrigger = true;
            }
            break;
    }

    e.preventDefault();

};

//Movement code

function moveSnakeHead(){

    let speedIndex;
    if (snake.difficulty == "hard"){
        speedIndex = 2;
    }
    else if(snake.difficulty == "medium"){
        speedIndex = 1;
    }else{
        speedIndex = 0;
    }

    if (moveControls.leftTrigger) {
        snake.x -= snake.snakeSpeed[speedIndex];
    }

    if (moveControls.rightTrigger) {
        snake.x += snake.snakeSpeed[speedIndex];
    }

    if (moveControls.upTrigger) {
        snake.y -= snake.snakeSpeed[speedIndex];
    }

    if (moveControls.downTrigger) {
        snake.y += snake.snakeSpeed[speedIndex];
    }

    snake.snakeHead.style.top = snake.y + "px";
    snake.snakeHead.style.left = snake.x + "px";

    snake.bodyX.unshift(snake.x);
    snake.bodyY.unshift(snake.y);

}

//Check Edges

function checkEdges() {
    const border = 7; //css box border thickness
    const snakeHeadTop = snake.y;
    const snakeHeadLeft = snake.x;

    if (snakeHeadLeft < 0 || snakeHeadLeft > (width - snake.size - border) || 
        snakeHeadTop < 0 || snakeHeadTop > (height - snake.size - border)) {
        lose();
    }
}

//Does head hit bad egg

function checkHitBadEgg(){
    let doesHitEgg = false;

    if (badEggs.badEggsArray.length >= 1) {

        badEggs.badEggsArray.forEach(function (ele, i) {
            if (snake.x >= badEggs.x[i] - badEggs.size && snake.x <= badEggs.x[i] + badEggs.size &&
                snake.y >= badEggs.y[i] - badEggs.size && snake.y <= badEggs.y[i] + badEggs.size) {

                doesHitEgg = true;
            }
        });
    }

    if(doesHitEgg){
        lose();
    }

}

//Body piece movements

function moveBodySegments(){
    let distance;
    if (snake.difficulty == "hard") {
        distance = snake.distance[2];
    }
    else if (snake.difficulty == "medium") {
        distance = snake.distance[1];
    } else {
        distance = snake.distance[0];
    }

    if (snake.bodyAddTest) {
        // snake.bodyX[(i + 1) * 5]  --> This takes the position of where the snake head
        // was at (i+1) * 5 position in the snake.bodyX array.
        // Creating the snake-like body
        snake.snakeBody.forEach(function(ele,i){
            ele.style.left = snake.bodyX[(i + 1) * distance] + "px";
            ele.style.top = snake.bodyY[(i + 1) * distance] + "px";
        });
    }

}

//Does head hit body. Might need edge revisions.

function checkHitBody(){

    let doesHitBody = false;

    snake.snakeBody.forEach(function(ele,i){

        let distance;
        if (snake.difficulty == "hard") {
            distance = snake.distance[2];
        }
        else if (snake.difficulty == "medium") {
            distance = snake.distance[1];
        } else {
            distance = snake.distance[0];
        }

        const padding = 5;
        
        const bodySegTop = snake.bodyY[(i + 1) * distance] - padding;
        const bodySegBottom = snake.bodyY[(i + 1) * distance] + padding;
        const bodySegLeft = snake.bodyX[(i + 1) * distance] - padding;
        const bodySegRight = snake.bodyX[(i + 1) * distance] + padding;

        const snakeHeadTop = snake.y;
        const snakeHeadLeft = snake.x;

        if (snakeHeadTop >= bodySegTop && snakeHeadTop <= bodySegBottom &&
            snakeHeadLeft >= bodySegLeft && snakeHeadLeft <= bodySegRight) {
            doesHitBody = true;
        }
    });

    if (doesHitBody){
        lose();
    }
}


//When head hits good egg

function checkHitGoodEgg(){

        let randomBadEgg = getRandomInt(10);

        const eggTop = eggs.y[0];
        const eggBottom = eggs.y[0] + eggs.size;
        const eggLeft = eggs.x[0];
        const eggRight = eggs.x[0] + eggs.size;

        const padding = snake.size - 3 ;

        const snakeHeadTop = snake.y;
        const snakeHeadLeft = snake.x;

        if ((snakeHeadTop >= eggTop - padding && snakeHeadTop <= eggBottom) &&
            (snakeHeadLeft >= eggLeft - padding && snakeHeadLeft <= eggRight)) {

                eggs.eggsArray[0].style.opacity = 0;
                createEgg();
                addToBody();

                let percentage;
                
                if (snake.difficulty == "hard") {
                    percentage = 2;
                    score += 150;
                }
                else if (snake.difficulty == "medium") {
                    percentage = 4;
                    score += 100;
                } else {
                    percentage = 5;
                    score += 50;
                }

                if (randomBadEgg > percentage) {
                    createBadEgg();
                }
                
            }

            document.getElementById("score").innerHTML = "Score: " + score;
            document.getElementById("final-score").innerHTML = "Your score is: " + score;        
    }

// Animation code

function snakeAnimation() {

    if (!gameloss) {

        checkHitGoodEgg();
        checkHitBadEgg();
        checkEdges();
        moveSnakeHead();
        moveBodySegments();
        checkHitBody();

        //Animate

        requestAnimationFrame(snakeAnimation);

    }
}