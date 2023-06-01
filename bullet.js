
let bullets = {
    "player1": [],
    "player2": []
}

function hit_indicator(locationx, locationy) {
    hit_marker_sound.play()

    let hitMarker = new Sprite(locationx, locationy, 50, 50, "static")
    hitMarker.image = hit_marker
    hitMarker.life = 10
    hitMarker.layer = 10
}

function bullet_interaction() {
    for (let bulletType of Object.keys(bullets)) {
        for (let bullet of bullets[bulletType]) {
            if (bullet.life <= 0) {
                bullets[bulletType].splice(bullets[bulletType].indexOf(bullet), 1)
            }
            else {
                if (bullet.collides(separator)) {
                    bullet.collider = "dynamic"
                    separator.stroke = "black"
                    separator.collider = "none"
                }

                // detect opponent collision
                if (bulletType == "player1") {
                    if (bullet.collides(player2)) {
                        player2Health.health -= 100
                        hit_indicator(bullet.x, bullet.y)
                        bullet.life = 0
                    }
                }

                if (bulletType == "player2") {
                    if (bullet.collides(player)) {
                        playerHealth.health -= 100
                        hit_indicator(bullet.x, bullet.y)
                        bullet.life = 0
                    }
                }
                
                // detect opposite bullet type collision
                for (otherBulletType of Object.keys(bullets)) {
                    if (otherBulletType != bulletType) {
                        for (otherBullet of bullets[otherBulletType]) {
                            if (bullet.collides(otherBullet)) {

                                // deal damage depending on the distance between player and explosion
                                let distance = dist(player.x, player.y, bullet.x, bullet.y)
                                let damage = 200 - distance
                                if (damage < 0) damage = 0
                                playerHealth.health -= damage*3

                                // deal damage depending on the distance between player2 and explosion
                                let distance2 = dist(player2.x, player2.y, bullet.x, bullet.y)
                                let damage2 = 200 - distance2
                                if (damage2 < 0) damage2 = 0
                                player2Health.health -= damage2*3

                                otherBullet.life = 0
                                bullet.life = 0

                                // bullet collision sound
                                explosion.play()

                                // bullet collision explosion image using explosion_img
                                let explosionImage = new Sprite(bullet.x, bullet.y, 100, 100, "static")
                                explosionImage.life = 10
                                explosionImage.layer = 10
                                explosionImage.image = explosion_img
                            }
                        }
                    }
                }
            }
    
        }
    }
}

function shoot(gun) {

    // rocket launcher
    if (gun.level > 16 && frameCount % 120 == 0) {
        bullets[gun.note].unshift(new Sprite(gun.x, gun.y, 20, 20))
        bullets[gun.note][0].r = 30
        bullets[gun.note][0].color = gun.color
        bullets[gun.note][0].stroke = 0
        bullets[gun.note][0].life = 100

        // shoot bullet in direction of gun
        bullets[gun.note][0].direction = gun.rotation
        bullets[gun.note][0].speed = 10
        // make bullet appear below the gun
        bullets[gun.note][0].layer = -1

        bullets[gun.note].unshift(new Sprite(gun.x, gun.y, 20, 20))
        bullets[gun.note][0].r = 30
        bullets[gun.note][0].color = gun.color
        bullets[gun.note][0].stroke = 0
        bullets[gun.note][0].life = 100

        // shoot bullet in direction of gun
        bullets[gun.note][0].direction = gun.rotation
        bullets[gun.note][0].speed = -10
        // make bullet appear below the gun
        bullets[gun.note][0].layer = -1

        // gunshot sound
        gunshot.play()
    }
    // machine gun
    else if (gun.level > 12 && frameCount % 15 == 0) {
        bullets[gun.note].unshift(new Sprite(gun.x, gun.y, 20, 20))
        bullets[gun.note][0].r = 10
        bullets[gun.note][0].color = gun.color
        bullets[gun.note][0].stroke = 0
        bullets[gun.note][0].life = 100

        // shoot bullet in direction of gun
        bullets[gun.note][0].direction = gun.rotation
        bullets[gun.note][0].speed = 10
        // make bullet appear below the gun
        bullets[gun.note][0].layer = -1

        bullets[gun.note].unshift(new Sprite(gun.x, gun.y, 20, 20))
        bullets[gun.note][0].r = 10
        bullets[gun.note][0].color = gun.color
        bullets[gun.note][0].stroke = 0
        bullets[gun.note][0].life = 100

        // shoot bullet in direction of gun
        bullets[gun.note][0].direction = gun.rotation
        bullets[gun.note][0].speed = -10
        // make bullet appear below the gun
        bullets[gun.note][0].layer = -1

        // gunshot sound
        gunshot.play()
    }
    // sniper
    else if (gun.level > 8 && frameCount % 90 == 0) {
        bullets[gun.note].unshift(new Sprite(gun.x, gun.y, 20, 20))
        bullets[gun.note][0].r = 10
        bullets[gun.note][0].color = gun.color
        bullets[gun.note][0].stroke = 0
        bullets[gun.note][0].life = 100

        // shoot bullet in direction of gun
        bullets[gun.note][0].direction = gun.rotation
        bullets[gun.note][0].speed = 20
        // make bullet appear below the gun
        bullets[gun.note][0].layer = -1

        bullets[gun.note].unshift(new Sprite(gun.x, gun.y, 20, 20))
        bullets[gun.note][0].r = 10
        bullets[gun.note][0].color = gun.color
        bullets[gun.note][0].stroke = 0
        bullets[gun.note][0].life = 100

        // shoot bullet in direction of gun
        bullets[gun.note][0].direction = gun.rotation
        bullets[gun.note][0].speed = -20
        // make bullet appear below the gun
        bullets[gun.note][0].layer = -1

        // gunshot sound
        gunshot.play()
    }
    // shotgun
    else if (gun.level > 4 && frameCount % 60 == 0) {
        for (let i = 0; i < 3; i++) {
            bullets[gun.note].unshift(new Sprite(gun.x, gun.y, 20, 20))
            bullets[gun.note][0].r = 10
            bullets[gun.note][0].color = gun.color
            bullets[gun.note][0].stroke = 0
            bullets[gun.note][0].life = 100

            // shoot bullet in direction of gun
            bullets[gun.note][0].direction = gun.rotation + random(-30, 30)
            bullets[gun.note][0].speed = 10
            // make bullet appear below the gun
            bullets[gun.note][0].layer = -1

            bullets[gun.note].unshift(new Sprite(gun.x, gun.y, 20, 20))
            bullets[gun.note][0].r = 10
            bullets[gun.note][0].color = gun.color
            bullets[gun.note][0].stroke = 0
            bullets[gun.note][0].life = 100

            // shoot bullet in direction of gun
            bullets[gun.note][0].direction = gun.rotation + random(-30, 30)
            bullets[gun.note][0].speed = -10
            // make bullet appear below the gun
            bullets[gun.note][0].layer = -1
        }

        // gunshot sound
        gunshot.play()
    }
    // pistol
    else if (frameCount % 60 == 0) {
        bullets[gun.note].unshift(new Sprite(gun.x, gun.y, 20, 20))
        bullets[gun.note][0].r = 10
        bullets[gun.note][0].color = gun.color
        bullets[gun.note][0].stroke = 0
        bullets[gun.note][0].life = 100

        // shoot bullet in direction of gun
        bullets[gun.note][0].direction = gun.rotation
        bullets[gun.note][0].speed = 10
        // make bullet appear below the gun
        bullets[gun.note][0].layer = -1

        bullets[gun.note].unshift(new Sprite(gun.x, gun.y, 20, 20))
        bullets[gun.note][0].r = 10
        bullets[gun.note][0].color = gun.color
        bullets[gun.note][0].stroke = 0
        bullets[gun.note][0].life = 100

        // shoot bullet in direction of gun
        bullets[gun.note][0].direction = gun.rotation
        bullets[gun.note][0].speed = -10
        // make bullet appear below the gun
        bullets[gun.note][0].layer = -1

        // gunshot sound
        gunshot.play()
    }
    
    
    
    


}
