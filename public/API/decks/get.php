<?php
	header('Content-type: application/json');
	require_once("../database.php");
	// Get the result
	$query = $db->query("SELECT 
		decks.id,
		users.name as owner,
		decks.name,
		decks.color,
		decks.format,
		decks.img,
		decks.img_scale,
		decks.img_x,
		decks.img_y
		FROM decks INNER JOIN users ON decks.owner=users.id;");
	$rows = $query->fetchAll(PDO::FETCH_ASSOC);
	// Return json array
	echo(json_encode($rows));