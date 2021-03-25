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
	// Get the result
	$query = $db->query("SELECT * FROM decks;");
	$rows = $query->fetchAll(PDO::FETCH_ASSOC);
	echo(json_encode($rows));