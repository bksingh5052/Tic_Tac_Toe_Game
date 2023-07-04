const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
let o_counter = document.querySelector(".winner-count-o");
let x_counter = document.querySelector(".winner-count-x");

let currentPlayer;
let gameGrid;
const winningPosition = [
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        boxes[index].innerText = "";
        boxes[index].classList.remove("win");
        boxes[index].style.pointerEvents = "all";

    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}



initGame();



function swapTurn(){
    if(currentPlayer == "X"){
        currentPlayer = "O";
        gameInfo.innerText = `Current Player - ${currentPlayer}`;

    }
    else{
        currentPlayer = "X"
        gameInfo.innerText = `Current Player - ${currentPlayer}`;
    }
}

let x_win = 0;
let o_win = 0;

function checkGameOver(){
    let answer = "";
    winningPosition.forEach((postion) =>{
        if( (gameGrid[postion[0]] !== "" || gameGrid[postion[1]] !== "" || gameGrid[postion[2]] !== "") 
            && (gameGrid[postion[0]] === gameGrid[postion[1]]) 
            && (gameGrid[postion[1]] === gameGrid[postion[2]]) ){

            if(gameGrid[postion[0]] === "X"){
                answer = "X";
            }
            else{
                answer = "O";
            }


            boxes.forEach((box, index) =>{
                boxes[index].style.pointerEvents = "none"
            })

            boxes[postion[0]].classList.add("win");
            boxes[postion[1]].classList.add("win");
            boxes[postion[2]].classList.add("win");
        }
    });


    


    if(answer === "X")
    {
        x_win++;
        x_counter.innerText = `X-Win : ${x_win}`;

    }
    if(answer === "O")
    {
        o_win++;
        o_counter.innerText = `O-Win : ${o_win}`;

    }

    // we have a winner
    if(answer !== ""){
        newGameBtn.classList.add("active");
        gameInfo.innerText = `Winner Player - ${answer}`;
        return;
    }




    // when game is tie

    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !== ""){
            fillCount++;
        }
    })

    if(fillCount ===9){
        gameInfo.innerText = `Game tied`;
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        gameGrid[index] = currentPlayer;

        // Turn The Swap
        swapTurn();
        // Check Is Game Over?
        checkGameOver();
    }
}
boxes.forEach((box, index) =>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
})
newGameBtn.addEventListener("click", initGame);