
let player
let previous
let player2
let previous2
let direction
let direction2

let playerHealth
let player2Health

function preload() {

  // images
  bg = loadImage('images/bg.png')
  explosion_img = loadImage('images/explosion.png')
  hit_marker = loadImage('images/hit_marker.png')


  // sounds
  gunshot = loadSound('sounds/gunshot.wav')
  // set volume of gunshot
  gunshot.setVolume(0.1)
  
  teleport = loadSound('sounds/teleport.wav')

  explosion = loadSound('sounds/explosion.ogg')

  hit_marker_sound = loadSound('sounds/hit_marker.mp3')

}

function setup() {
  frameRate(60);
  start()
}

function draw() {
  background(bg, 100)

  // print health of players
  print("player1: " + playerHealth.health + " player2: " + player2Health.health)
  print(playerGun.level)
  
  if (kb.presses("/")) {
    start()
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
    alert("💀 blud lost to a bot")
    start()
  }

  if (player2Health.health < 0) {
    alert("Player 1 wins!")
    start()
  }
}

function start() {
  frameCount = 0
  new Canvas(windowWidth, windowHeight)

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

  for (bulletType of Object.keys(bullets)) {
    for (bullet of bullets[bulletType]) {
      print(bullets[bulletType].length)
      bullet.remove()
    }
  }

  bullets = {
    player1: [],
    player2: []
  }

  alert("Player 1: WASD to move, Q/E to rotate gun, F to rewind\
  \nPlayer 2: IJKL to move, O to rotate gun, Backspace to rewind\
  \nPress / to restart")

  player = null
  previous = [];
  player2 = null
  previous2 = []
  separator = null
  direction = ''
  direction2 = ''

  player = new Sprite(width/4, height/2)
  player.r = 25
  player.stroke = "white"
  player.color = "blue"
  player.layer = 2

  playerGun = new Sprite(player.x, player.y, 80, 20)
  playerGun.color = "cyan"
  playerGun.stroke = "black"
  playerGun.layer = 1
  playerGun.note = "player1"
  playerGun.level = 0

  playerHealth = new Sprite(width/4, height/2 - 50, 100, 10, "none")
  playerHealth.color = "red"
  playerHealth.layer = 100
  playerHealth.stroke = "black"
  playerHealth.health = 200

  player2 = new Sprite(width*3/4, height/2,)
  player2.r = 25
  player2.stroke = "white"
  player2.color = "red"
  player2.layer = 2
  player2.cooldown = 0
  
  player2Gun = new Sprite(player2.x, player2.y, 80, 20)
  player2Gun.color = "orange"
  player2Gun.stroke = "black"
  player2Gun.layer = 1
  player2Gun.note = "player2"
  player2Gun.level = 0

  player2Health = new Sprite(width*3/4, height/2 - 50, 100, 10, "none")
  player2Health.color = "red"
  player2Health.layer = 100
  player2Health.stroke = "black"
  player2Health.health = 3000

  separator = new Sprite(width/2, height/2, 0, height/2, "static")
  separator.stroke = "white"
  
}