extends Character

var player = null
var move_speed = 150
var spawn_position = Vector2(1200, 0)  # Right side of screen

func _ready():
    position = spawn_position
    position.y = rand_range(50, 670)  # Random Y position
    player = get_tree().get_nodes_in_group("player")[0]

func _physics_process(delta):
    if player:
        var direction = (player.global_position - global_position).normalized()
        velocity = direction * move_speed
        move_and_slide(velocity)
        look_at(player.global_position)

func take_damage(amount):
    health -= amount
    if health <= 0:
        queue_free()

func _on_ShootTimer_timeout():
    # Implement shooting behavior here if needed
    pass