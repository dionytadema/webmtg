<?php
	header('Content-type: application/json');
	// Open our database and create decks table
	$db = new PDO("sqlite:magic.db");
	$query = $db->exec("CREATE table IF NOT EXISTS decks (
		ID CHAR(16) PRIMARY KEY,
		name TEXT,
		type INT,
		image INT,
		image_scale REAL,
		image_x REAL,
		image_y REAL);"
	);
	$post = json_decode(file_get_contents('php://input'), true);
	// Validate deck
	if (!isset($post["name"])) {
		echo('"no name given"');
		http_response_code(400);
		return;
	}
	if (!preg_match('/\S/',$post["name"])) {
		echo('"name is blank"');
		http_response_code(400);
		return;
	}
	// Add deck to database
	$keys = implode("', '", array_map('addslashes', array_keys($post)));
    $values = implode("', '", array_map('addslashes', array_values($post)));
    try{
		$query = $db->exec("INSERT INTO decks ('$keys') VALUES ('$values');");
	} catch(PDOException $e) {
		echo("INSERT INTO decks ('$keys') VALUES ('$values');");;
		echo($e->getMessage());
	}