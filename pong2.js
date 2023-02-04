let userPaddle = document.querySelector('#user-paddle')
let compPaddle = document.querySelector('#comp-paddle')
let ball = document.querySelector('#ball')
let compWin = document.querySelector('#compWin')
let restartbtn = document.querySelector('#restartbtn')

userPaddle.style.marginLeft = '30px'
userPaddle.style.marginTop = '0px'
compPaddle.style.marginLeft = '1048px'
compPaddle.style.marginTop = '0px'
ball.style.marginLeft = '534px'
ball.style.marginTop = '70px'

let UW_Pressed = false
let US_Pressed = false

let CW_Pressed = false
let CS_Pressed = false

let Vx = -1
let Vy = -1
let V = Math.sqrt(Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2)))
ly = 40;
lr = 40;

document.addEventListener('keydown', (e) => {
    if (e.keyCode == '87') {
        UW_Pressed = true
    }
    else if (e.keyCode == '83') {
        US_Pressed = true
    }
})

document.addEventListener('keyup', (e) => {
    if (e.keyCode == '87') {
        UW_Pressed = false
    }
    else if (e.keyCode == '83') {
        US_Pressed = false
    }
})

document.addEventListener('keydown', (e) => {
    if (e.keyCode == '38') {
        CW_Pressed = true
    }
    else if (e.keyCode == '40') {
        CS_Pressed = true
    }
})

document.addEventListener('keyup', (e) => {
    if (e.keyCode == '38') {
        CW_Pressed = false
    }
    else if (e.keyCode == '40') {
        CS_Pressed = false
    }
})

function userWin() {
    document.getElementById('compWin').style = "display: block;"
    document.getElementById('game-container').style = " filter: blur(15px);"
    document.getElementById('restartbtn').style = "display: inline-flex; "
}

function compppWin() {
    document.getElementById('userWin').style = "display: block;"
    document.getElementById('game-container').style = " filter: blur(15px);"
    document.getElementById('restartbtn').style = "display: inline-flex; "
}

function restartgame() {
    location.reload()
}

gameLoop()
let i = 0;
function reset() {
    clearInterval(ID)
    let Vx = -1
    let Vy = -1
    let V = Math.sqrt(Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2)))
    ball.style.marginLeft = '534px'
    ball.style.marginTop = '262px'
    gameLoop()
    i = i + 1
}
function gameLoop() {
    setTimeout(() => {
        ID = setInterval(() => {
            if (marginLeft(ball) < 0) {
                document.querySelector('#compScore').innerHTML = Number(document.querySelector('#compScore').innerHTML) + 1
                if (i == 6) {
                    userWin()
                }
                reset()
                return
            }
            if ((marginLeft(ball) + 20) > 1088) {
                document.querySelector('#userScore').innerHTML = Number(document.querySelector('#userScore').innerHTML) + 1
                if (i == 6) {
                    compppWin()
                }
                reset()
                return
            }
            if (marginTop(ball) < 0 || (marginTop(ball) + 20) > 544) {
                Vy = -Vy
            }

            let paddle = (marginLeft(ball) + 10 < 544) ? userPaddle : compPaddle
            if (collisionDatected(paddle)) {
                let angle
                let type = (marginLeft(paddle) == 30) ? 'user' : 'comp'
                console.log(type)
                if (ball.centerY < paddle.centerY) {
                    angle = (type == 'user' ? -Math.PI / 4 : (-3 * Math.PI) / 4)
                }
                else if (ball.centerY > paddle.centerY) {
                    angle = (type == 'user' ? Math.PI / 4 : (3 * Math.PI) / 4)
                }
                else if (ball.centerY == paddle.centerY) {
                    angle = (type == 'user' ? 0 : Math.PI)
                }
                V += 0.3
                Vx = V * Math.cos(angle)
                Vy = V * Math.sin(angle)
            }
            //auto computer paddle
            // let comLevel = 0.05
            // compPaddle.style.marginTop = `${marginTop(compPaddle) + ((ball.centerY - (marginTop(compPaddle) + 36))) * comLevel}px`
            ///////
            ball.style.marginLeft = `${marginLeft(ball) + Vx}px`
            ball.style.marginTop = `${marginTop(ball) + Vy}px`
            if (UW_Pressed && marginTop(userPaddle) > 0) {
                userPaddle.style.marginTop = `${marginTop(userPaddle) - 3}px`
            }
            else if (US_Pressed && marginTop(userPaddle) < 445) {
                userPaddle.style.marginTop = `${marginTop(userPaddle) + 3}px`
            }
            if (CW_Pressed && marginTop(compPaddle) > 0) {
                compPaddle.style.marginTop = `${marginTop(compPaddle) - 3}px`
            }
            else if (CS_Pressed && marginTop(compPaddle) < 445) {
                compPaddle.style.marginTop = `${marginTop(compPaddle) + 3}px`
            }
        }, 5);
    }, 500);
}

function collisionDatected(paddle) {
    ball.top = marginTop(ball)
    // console.log(ball.top)
    ball.bottom = marginTop(ball) + 20
    // console.log(ball.bottom)
    ball.left = marginLeft(ball)
    // console.log(ball.left)
    ball.right = marginLeft(ball) + 20
    // console.log(ball.right)
    ball.centerX = marginLeft(ball) + 10
    ball.centerY = marginTop(ball) + 10
    paddle.top = marginTop(paddle) - 10
    // console.log(paddle.top)
    paddle.bottom = marginTop(paddle) + 72
    // console.log(paddle.bottom)
    paddle.left = marginLeft(paddle) - 10
    // console.log(paddle.left)
    paddle.right = marginLeft(paddle) + 10
    paddle.centerX = marginLeft(paddle) + 5
    paddle.centerY = marginTop(paddle) + 50
    // console.log(paddle.centerY)
    // console.log(ball.centerY)
    return ball.left < paddle.right && ball.top < paddle.bottom && ball.right > paddle.left && ball.bottom > paddle.top

}
// let paddle = (marginLeft(ball) + 10 < 544) ? userPaddle : compPaddle
// if (collisionDatected(paddle)) {
//     console.log("aa")
// }

function marginTop(elem) {
    return Number(elem.style.marginTop.split('p')[0])
}
function marginLeft(elem) {
    return Number(elem.style.marginLeft.split('p')[0])
}

// var paddle_l = document.getElementById('paddle-l');
// var paddle_r = document.getElementById('paddle-r');
// document.addEventListener('keydown', function (e) {

//     if (e.keyCode == 38) {
//         if (ly > 0) {
//             ly = ly - 25;
//             // W_Pressed = true
//         }
//     }
//     if (e.keyCode == 40) {
//         if (ly < 420) {
//             ly = ly + 25;
//         }
//     }
//     if (e.keyCode == 83) {
//         if (lr < 420) {
//             lr = lr + 25;
//         }
//     }
//     if (e.keyCode == 87) {
//         if (lr > 20) {
//             lr = lr - 25;
//         }
//     }
// })
// function move_r() {
//     document.getElementById('paddle-r').setAttribute("style", "top:" + ly + "px")
// }
// function move_l() {
//     document.getElementById('paddle-l').setAttribute("style", "top:" + lr + "px")
// }

// setInterval(() => {
//     move_r();
// }, 10)

// setInterval(() => {
//     move_l();
// }, 10)
