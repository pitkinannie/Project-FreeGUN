extends Player

slave var slave_pos = Vector2()
slave var slave_velocity = Vector2()
slave var slave_rotation = 0
slave var slave_health = 100

func make_gui():
	if is_network_master():
		$"Camera2D".make_current()
		$"CanvasLayer/GUI".visible = true

func get_input():
	#Create controlable Vector2 for player movement input
	velocity = Vector2()
	if is_network_master():
		#Change movement Vector2 variables on player input
		if Input.is_action_pressed('player_move_right'):
			velocity.x += 1
		if Input.is_action_pressed('player_move_left'):
			velocity.x -= 1
		if Input.is_action_pressed('player_move_down'):
			velocity.y += 1
		if Input.is_action_pressed('player_move_up'):
			velocity.y -= 1
		
		rset("slave_velocity", velocity)
		rset("slave_pos", position)
	else:
		position = slave_pos
		velocity = slave_velocity
	#Normalize player movement input to make sure speed is constant
	velocity = velocity.normalized() * speed
	move_and_slide(velocity)
	#Player looks at mouse
	if is_network_master():
		self.look_at(get_global_mouse_position())
		
		rset("slave_rotation", rotation)
	else:
		self.rotation = slave_rotation
		slave_pos = position # To avoid jitter

func set_player_name(new_name):
	get_node("CanvasLayer/Label").set_text(new_name)