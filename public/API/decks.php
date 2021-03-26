<?php
	header('Content-type: application/json');
	require_once("database.php");
	// Get the result
	$query = $db->query("SELECT * FROM decks;");
	$rows = $query->fetchAll(PDO::FETCH_ASSOC);
	echo(json_encode($rows));