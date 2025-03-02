extends Node2D

var bullet_speed = 1000
var bullet_damage = 20
var fire_rate = 0.1
var can_fire = true
var bullet_scene = preload("res://weapons/laser_bullet.tscn")

func _ready():
    $FireRateTimer.wait_time = fire_rate

func fire():
    if can_fire:
        var bullet = bullet_scene.instance()
        bullet.global_position = $BulletSpawn.global_position
        bullet.rotation = global_rotation
        bullet.velocity = Vector2.RIGHT.rotated(rotation) * bullet_speed
        bullet.damage = bullet_damage
        get_tree().get_root().add_child(bullet)
        
        # Visual effect
        $LaserBeam.visible = true
        $LaserBeam/BeamAnimation.play("flash")
        
        can_fire = false
        $FireRateTimer.start()

func _on_FireRateTimer_timeout():
    can_fire = true
