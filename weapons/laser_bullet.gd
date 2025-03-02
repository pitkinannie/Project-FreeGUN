extends Area2D

var velocity = Vector2()
var damage = 20

func _physics_process(delta):
    position += velocity * delta

func _on_LaserBullet_body_entered(body):
    if body.has_method("take_damage"):
        body.take_damage(damage)
    queue_free()

func _on_VisibilityNotifier2D_screen_exited():
    queue_free()
