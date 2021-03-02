!function () {
    const startGame = document.getElementById('startgame');
    const gameControl = document.getElementById('gamecontrol');
    const game = document.getElementById('game');
    const score = document.getElementById('score');
    const score1 =document.getElementById('score1');
    const actionArea = document.getElementById('actions');
    const rollSound = new Audio('sound/roll.mp3');
    

    var gameData = {
	dice: ['1die.png', '2die.png', '3die.png', 
		   '4die.png', '5die.png', '6die.png'],
	players: ['player 1', 'player 2'],
	score: [0, 0],
	roll1: 0,
	roll2: 0,
	rollSum: 0,
	index: 0,
	gameEnd: 29
};

startGame.addEventListener("click",function(){
    gameData.index = Math.round(Math.random());
    gameControl.innerHTML = '<h2>The Game Has Started</2>';
    gameControl.innerHTML +='<button id="quit">Wanna Quit?</button>';

    document.getElementById('quit').addEventListener("click",function(){
        location.reload();
    });
    console.log(gameData.index);
    setUpTurn();
});
function setUpTurn(){
    game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
    actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';
    document.getElementById('roll').addEventListener('click',function(){
        throwDice();
        rollSound.play();
    })
};
    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p>Roll the dice for the ${ gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<img src="${gameData.dice[gameData.roll1 - 1]}">
                            <img src="${gameData.dice[gameData.roll2 - 1]}">`;
                        gameData.rollSum = gameData.roll1 + gameData.roll2;
        console.log(gameData);
        if( gameData.rollSum === 2 ){
            // console.log("Snake Eyes!");
            game.innerHTML +='<p>Oh snap! snake eyes!</p>';
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            showCurrentScore();
            setTimeout(setUpTurn, 2000);
        }
        else if( gameData.roll1 === 1 || gameData.roll2 === 1 ){
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p>Sorry one of your rolls was a one. Switching to ${gameData.players
            [gameData.index]}</p>`;
            setTimeout(setUpTurn,2000);
        }
        else {
            gameData.score[gameData.index] = gameData.score[gameData.index]+ gameData.rollSum;
            actionArea.innerHTML = '<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>';

            document.getElementById('rollagain').addEventListener('click', function(){   
                throwDice();
            });
            document.getElementById('rollagain').addEventListener('click', function(){
                gameData.index ? (gameData.index = 0) : (gameData.index=1);
                setUpTurn();
            });
            checkWinningCondition();
        }
        
    };
    function checkWinningCondition(){
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            // score.innerHTML = `<h2>${gameData.players[gameData.index]}
            //     wins with ${gameData.score[gameData.index]} points!</h2>`;
            score.innerHTML = `<h1 id="player1">Player 1</h1> <p id="scre"><strong>Score:</strong></p> 
            <h2 id="scoreOne"><strong>${gameData.score[0]}</strong></h2>`;
        score1.innerHTML = `<h1 id="player2">Player 2</h1> <p id="scre"><strong>Score:</strong></p> 
            <h2 id="scoreTwo"><strong>${gameData.score[1]}</strong></h2>` ;
         actionArea.innerHTML = "";
         document.getElementById('quit').innerHTML = "Start a New Game"       
        }
        else{
            showCurrentScore();
        }
    }
    function showCurrentScore(){
        // score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]}
        //         ${gameData.score[0]}</strong> and <strong>${gameData.players[1]}
        //             ${gameData.score[1]}</strong></p>`;
        score.innerHTML = `<h1 id="player1">Player 1</h1> <p id="scre"><strong>Score:</strong></p> 
        <h2 id="scoreOne"><strong>${gameData.score[0]}</strong></h2>`;
        score1.innerHTML = `<h1 id="player1">Player 2</h1> <p id="scre"><strong>Score:</strong></p> 
        <h2 id="scoreTwo"><strong>${gameData.score[1]}</strong></h2>` ;
    }
}();