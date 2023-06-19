
let player
let previous
let player2
let previous2
let direction
let direction2
let playerHealth
let player2Health

let option = "menu"

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

  // musics
  bg_music = loadSound('sounds/main_menu.wav')
  bg_music.setVolume(0.1)

  lost = loadSound('sounds/sad.wav')

  win = loadSound('sounds/win.wav')

}

function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight)
}

function draw() {
  if (option == "menu") menu()
  else if (option == "single_player" || option == "two_player") game()
}

function start() {
  frameCount = 0

  clear_canvas()

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
  if (option == "single_player") playerHealth.health = 200
  else if (option == "two_player") playerHealth.health = 3000

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