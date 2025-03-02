extends Node2D

var enemy_scene = preload("res://characters/enemy/enemy.tscn")
var spawn_interval = 2.0
var difficulty_increase_rate = 0.95  # Multiply interval by this value every spawn

func _ready():
    $SpawnTimer.wait_time = spawn_interval
    $SpawnTimer.start()

func _on_SpawnTimer_timeout():
    # Spawn enemy
    var enemy = enemy_scene.instance()
    add_child(enemy)
    
    # Increase difficulty by reducing spawn interval
    spawn_interval *= difficulty_increase_rate
    spawn_interval = max(spawn_interval, 0.5)  # Don't go faster than 0.5 seconds
    $SpawnTimer.wait_time = spawn_interval
