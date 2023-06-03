
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


function menu() {
  background(bg, 200)

  push()
  fill(255)
  textSize(50)
  textAlign(CENTER)
  text("Press / to start", width/2, height/2)
  pop()

  if (kb.presses("/")) {
    start()
    option = "single_player"
  }
}

function single_player() {
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
    option = "menu"
  }
  else if (player2Health.health < 0) {
    clear_canvas()
    option = "menu"
  }
}
