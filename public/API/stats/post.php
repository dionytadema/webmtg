<?php
	header('Content-type: application/json');
	require_once("../database.php");
	// Parse the request json
	$post = json_decode(file_get_contents('php://input'), true);
	// Validate deck
	if (!isset($post["format"])) {
		echo('"game had no format"');
		http_response_code(400);
		return;
	}
	$formats = array("casual", "teams", "commander", "archenemy", "event");
	if (!in_array($post["format"], $formats)) {
		echo('"invalid format"');
		http_response_code(400);
		return;
	}
	$ins = "INSERT INTO games (format)
		VALUES (:format);";
	$qry = $db->prepare($ins);
	// Add game to database
	try{
		$qry->execute([
			':format' => $post["format"]
		]);
		$game_id = $db->lastInsertId();
		if (!isset($post["stats"])) {return;}
		if (!is_array($post["stats"])) {
			echo('"game stats are corrupted"');
			http_response_code(400);
			return;
		}
		// Loop over stats and insert
		$ins = "INSERT INTO stats (game_id, user_id, deck_id, result)
			VALUES (:game, :user, :deck, :result);";
		$qry = $db->prepare($ins);
		foreach ($post["stats"] as $stat) {
			$qry->execute([
				':game' => $game_id,
				':user' => $stat["user"],
				':deck' => $stat["deck"],
				':result' => $stat["result"],
			]);
		}
		echo($game_id);
	} catch(PDOException $e) {
		http_response_code(500);
		echo($e->getMessage());
	}