<?php
	header('Content-type: application/json');
	require_once("../database.php");
	// Get the result
	$query = $db->query("SELECT 
		users.*,
		(SELECT count(*) FROM decks WHERE decks.owner=users.id) as deck_count,
		(SELECT count(*) FROM stats WHERE stats.user_id=users.id AND stats.result='won') as win_count,
		(SELECT count(*) FROM stats WHERE stats.user_id=users.id AND stats.result='lost') as lost_count
			FROM users;");
	$rows = $query->fetchAll(PDO::FETCH_ASSOC);
	// Return json array
	echo(json_encode($rows));