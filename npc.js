
let food = []

function npc_movement() {
    if (player2.cooldown > 0) player2.cooldown -= 1
    else {
        player2.cooldown = random(0, 300)
        directionx = random(0, width)
        directiony = random(0, height)
        player2Gun.rotateTo(directionx, directiony, 3)
        player2.moveTo(directionx, directiony, 3)
    }
}

function spawn_food() {
    if (frameCount % 30 == 0 && food.length < 60) {
        food.push(new Sprite(random(0, width), random(0, height), 15, 15))
        food[food.length - 1].color = "lime"
        food[food.length - 1].layer = 1
        food[food.length - 1].note = "food"
        food[food.length - 1].life = 1000
    }

    for (let i = 0; i < food.length; i++) {
        if (food[i].life <= 0) {
            food.splice(i, 1)
        }
        else {
            if (food[i].collides(player)) {
                playerHealth.health += 100
                playerGun.level += 1
                food[i].life = 0
            }
            else if (food[i].collides(player2)) {
                player2Health.health += 200
                player2Gun.level += 2
                food[i].life = 0
            }
        }
    }
}
