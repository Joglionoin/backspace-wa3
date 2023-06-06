
function clear_canvas() {
  // remove player sprites
  if (player) {
    player.remove()
    playerGun.remove()
    player2.remove()
    player2Gun.remove()
    separator.remove()
    playerHealth.remove()
    player2Health.remove()
  }

  for (foodItem of food) {
    foodItem.remove()
  }

  food = []

  for (bulletType of Object.keys(bullets)) {
    for (bullet of bullets[bulletType]) {
      bullet.remove()
    }
  }

  bullets = {
    player1: [],
    player2: []
  }

  player = null
  previous = []
  player2 = null
  previous2 = []
  direction = ''
  direction2 = ''
  playerHealth = null
  player2Health = null
}

let alpha1 = 128
let alpha2 = 128

let winner

function menu() {
  background(bg, 200)

  push()
  fill(0, 255, 0)
  textSize(width/50)
  textAlign(CENTER)
  // controls
  text("Player 1:\n WASD to move\nEQ to rotate\nF to rewind\nPlayer 2:\n\
IJKL to move\nUO to rotate\nBackspace to rewind\n\
/ to return to menu", width/2, height/3)
  pop()

  if (winner) {
    push()
    stroke(255)
    strokeWeight(10)
    textSize(width/20)
    textAlign(CENTER)
    text(winner + " wins!", width/2, height/5)
    pop()
  }

  push()
  fill(255, 0, 0, alpha1)
  rect(width/8, height/4, width/4, height/2)
  fill(255)
  textSize(width/30)
  textAlign(CENTER)
  text("Single-Player\nvs A.I", width/4, height/2)
  pop()

  if (mouseX > width/8 && mouseX < width/8 + width/4 && mouseY > height/4 && mouseY < height/4 + height/2) {
    alpha1 = 64
    if (mouseIsPressed) {
      option = "single_player"
      start()
    }
  }
  else alpha1 = 128

  push()
  fill(0, 0, 255, alpha2)
  rect(5*width/8, height/4, width/4, height/2)
  fill(255)
  textSize(width/30)
  textAlign(CENTER)
  text("2-Player", 3*width/4, height/2)
  pop()

  if (mouseX > 5*width/8 && mouseX < 5*width/8 + width/4 && mouseY > height/4 && mouseY < height/4 + height/2) {
    alpha2 = 64
    if (mouseIsPressed) {
      option = "two_player"
      start()
    }
  }
  else alpha2 = 128
}

function game() {
  background(bg, 100)

  // print health of players
  print("player1: " + playerHealth.health + " player2: " + player2Health.health)
  print(playerGun.level)
  
  if (kb.presses("/")) {
    clear_canvas()
    option = "menu"
    return
  }

  push()
  fill(255)
  text(frameCount + " frames", 50, 50);
  pop()

  player_movement()

  bullet_interaction()
  
  spawn_food()

  player.overlaps(playerGun)
  player2.overlaps(player2Gun)

  for (bulletType of Object.keys(bullets)) {
    for (bullet of bullets[bulletType]) {
      if (bulletType == "player1") {
        bullet.overlaps(playerGun)
        bullet.overlaps(player)
      }
      else if (bulletType == "player2") {
        bullet.overlaps(player2Gun)
        bullet.overlaps(player2)
      }

      for (otherBullet of bullets[bulletType]) {
        if (bullet != otherBullet) bullet.overlaps(otherBullet)
      }
    }
  }

  
  if (playerHealth.health < 0) {
    clear_canvas()
    winner = "Player 2"
    option = "menu"
  }
  else if (player2Health.health < 0) {
    clear_canvas()
    winner = "Player 1"
    option = "menu"
  }
}
