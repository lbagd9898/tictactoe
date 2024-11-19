// The Gameboard represents the state of the board 
// Each square can hold and x or o 
// we can expose mark method to add an x or o

function Gameboard()  {
    // Create a 2d array that will represent state of the game
    // Each cell has a number that players can choose from
    const rows = 3
    const columns = 3 
    const board = []  
    const availableSpaces = []

    for (let j = 1; j < 10; j++) {
        availableSpaces.push(j)
    }

    console.log(availableSpaces)


    let counter = 1
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j=0; j < columns; j++) {
            board[i].push(counter);
            counter ++
        }
    }

    const checkChoice = (number) => {
        if (availableSpaces.includes(number)) {
            return true
        } else {
            return false
        }

    }

    const printBoard = () => {
        console.log(JSON.parse(JSON.stringify(board)))
    }

    const changeBoard = (number, token) => {
        for (let i=0; i < rows; i++) {
            for (let j=0; j< columns; j++) {
                if (board[i][j] === number) {
                    board[i][j] = token;
                    index = availableSpaces.indexOf(number)
                    availableSpaces.splice(index, 1)
                }
            }
        }
    }

    

    return { printBoard, changeBoard, checkChoice };


}

function Player(name, token) {
    name = name
    token = token 
    spacesOccupied = []
    return { name, token, spacesOccupied };
}

function gameConsole () {
    const board = Gameboard()

    const lydia = Player('lydia', 'x')

    const chaz = Player('chaz', 'o')

    const players = [lydia, chaz]

    let index = Math.floor(Math.random()  * (1 - 0 +1) + 0)

    let activePlayer = players[index];


    const playRound = (number) => {
        if (board.checkChoice(number)) {
            board.changeBoard(number, activePlayer.token)
            activePlayer.spacesOccupied.push(number)
            console.log(activePlayer)
            checkWin()
            return true
        } else {
            alert("space already Taken")
            return false
        }
    }

    const changePlayer = () => {
        index += 1
        activePlayer = players[index % 2]
        return activePlayer
    }

    const checkWin = () => {
        const winningCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]
        for (i=0; i < winningCombos.length; i++) {
            let combo = winningCombos[i]
            let result = combo.every(token => activePlayer.spacesOccupied.includes(token))
            if (result) {
                alert(`${activePlayer.name} won! A new game will begin.`)
                window.location.reload()
            }
        }
    }

    return { playRound, activePlayer, changePlayer, checkWin }

}

function gameDisplay () {
    const header2 = document.querySelector('h2')

    const buttons = document.querySelectorAll('button')

    const game = gameConsole()

    let player = game.activePlayer

    header2.textContent = `It's ${player.name}'s turn!`

    function clickHandler(btn) {
        spaceNumber = Number(this.id)
        let round = game.playRound(spaceNumber)
        if (round) {
            this.textContent = player.token 
            player = game.changePlayer()
            changeHeader(player)
        }
    }

    buttons.forEach(function (btn) {
        btn.addEventListener('click', clickHandler)
    })

    const changeHeader = (player) => {
        header2.textContent = `It's ${player.name}'s turn`
    }

    return { changeHeader }
}

game = gameDisplay()








