<?php
	header('Content-type: application/json');
	require_once("../database.php");
	// Parse the request json
	$post = json_decode(file_get_contents('php://input'), true);
	// Validate deck
	if (!isset($post["id"]) || !is_int($post["id"])) {
		echo('"invalid ID"');
		http_response_code(404);
		return;
	}
	// Prep delete
	$ins = "DELETE FROM decks WHERE id=:id;";
	$qry = $db->prepare($ins);
	// Add deck to database
	try{
		$qry->execute([':id' => $post["id"]]);
		if(!$qry->rowCount()) {
			http_response_code(404);
		}
	} catch(PDOException $e) {
		http_response_code(500);
		echo($e->getMessage());
	}