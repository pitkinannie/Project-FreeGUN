extends Character
class_name Player

var current_weapon
var weapons = []
var player_position = Vector2(100, 360)  # Left side of screen

"""
Base player class. Gives the player the ability to move
"""

func _ready() -> void:
	make_gui()
	position = player_position
	
	# Load weapons
	var laser_gun = preload("res://weapons/laser_gun.tscn").instance()
	weapons.append(laser_gun)
	add_child(laser_gun)
	current_weapon = laser_gun


func make_gui() -> void:
	$"Camera2D".make_current()
	$"CanvasLayer/GUI".visible = true


func _process(delta: float) -> void:
	if Input.is_action_pressed("fire_gun"):
		current_weapon.fire()


func get_input() -> void:
	#Create controlable Vector2 for player movement input
	velocity = Vector2()
	#Change movement Vector2 variables on player input
	if Input.is_action_pressed('player_move_right'):
		velocity.x += 1
	if Input.is_action_pressed('player_move_left'):
		velocity.x -= 1
	if Input.is_action_pressed('player_move_down'):
		velocity.y += 1
	if Input.is_action_pressed('player_move_up'):
		velocity.y -= 1
	#Normalize player movement input to make sure speed is constant
	velocity = velocity.normalized() * speed
	move_and_slide(velocity)
	
	# Keep player on left side of screen
	if position.x > 300:  # Limit rightward movement
		position.x = 300
	
	#Player looks at mouse
	self.look_at(get_global_mouse_position())


func _physics_process(delta: float) -> void:
	get_input()