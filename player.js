
function player_movement() {

    // player shadows
    previous.push([player.x, player.y]);

    push()
    fill(0, 0, 255, 20)
    stroke(0, 0, 255)
    strokeWeight(2)
    if (frameCount > 180) {
        circle(previous[0][0], previous[0][1], 10)
        previous.shift()
    }
    else circle(width/4, height/2, 10)
    pop()

    previous2.push([player2.x, player2.y]);
    push()
    fill(255, 0, 0, 20)
    stroke(255, 0, 0)
    strokeWeight(2)
    if (frameCount > 180) {
        fill(255, 0, 0, 20)
        circle(previous2[0][0], previous2[0][1], 10)
        previous2.shift()
    }
    else circle(width*3/4, height/2, 10)
    pop()

    // player 1 movement
    direction = ''
    if (kb.pressing("w")) direction += 'up'

    if (kb.pressing("s")) {
        if (kb.pressing('w')) direction = ''
        else direction += 'down'
    }

    if (kb.pressing("a")) direction += 'left'
    
    if (kb.pressing("d")) {
        if (kb.pressing('a')) direction = direction.replace('left', '')
        else direction += 'right'
    }

    player.rotation = 0
    if (direction != '') player.move(5, direction, 3)
    
    if (kb.presses('f')) {
        player.x = previous[0][0]
        player.y = previous[0][1]

        teleport.play()

    }

    // player 1 gun rotation
    if (kb.pressing("e")) playerGun.rotate(15, 3)
    
    if (kb.pressing("q")) playerGun.rotate(-15, 3)
    
    if (player.x > width + 25) player.x = -25
    
    if (player.x < -25) player.x = width + 25

    if (player.y > height + 25) player.y = -25

    if (player.y < -25) player.y = height + 25
    
    shoot(playerGun)
    
    playerGun.x = player.x
    playerGun.y = player.y
    
    playerHealth.w = playerHealth.health/1000 * 100
    playerHealth.x = player.x
    playerHealth.y = player.y - 50

    // player 2 movement
    if (option == "two_player") {
        direction2 = ''
        if (kb.pressing("i")) direction2 += 'up'

        if (kb.pressing("k")) {
            if (kb.pressing('i')) direction2 = ''
            else direction2 += 'down'
        }

        if (kb.pressing("j")) direction2 += 'left'
        
        if (kb.pressing("l")) {
            if (kb.pressing('j')) direction2 = direction2.replace('left', '')
            else direction2 += 'right'
        }

        player2.rotation = 0
        if (direction2 != '') player2.move(5, direction2, 3)
        
        if (kb.presses('backspace')) {
            player2.x = previous2[0][0]
            player2.y = previous2[0][1]

            teleport.play()

        }

        // player 1 gun rotation
        if (kb.pressing("o")) player2Gun.rotate(15, 3)
        
        if (kb.pressing("u")) player2Gun.rotate(-15, 3)
    }
    else {
        npc_movement()

        // rewind to dodge bullets
        for (bullet of bullets.player1) {
            if (dist(player2.x, player2.y, bullet.x, bullet.y) < 75 && dist(previous2[0][0], previous2[0][1], bullet.x, bullet.y) > 150) {
                player2.x = previous2[0][0]
                player2.y = previous2[0][1]

                teleport.play()

                break
            }
        }
    }
    
    if (player2.x > width + 25) player2.x = -25;
    
    if (player2.x < -25) player2.x = width + 25;
    
    if (player2.y > height + 25) player2.y = -25;
    
    if (player2.y < -25) player2.y = height + 25;
    
    shoot(player2Gun)
    
    player2Gun.x = player2.x
    player2Gun.y = player2.y

    player2Health.w = player2Health.health / 1000 * 100
    player2Health.x = player2.x
    player2Health.y = player2.y - 50



}
