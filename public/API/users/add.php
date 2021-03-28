<?php
	header('Content-type: application/json');
	require_once("../database.php");
	// Parse the request json
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
	// Prep insert (PDO with sqlite is broken, inserts fail without error, even a simple query will not insert anything, while the same query ran through sqlite works fine! Now with PostgreSQL it works fine tho :)
	$ins = "INSERT INTO users (name, img)
		VALUES (:name, :img);";
	$qry = $db->prepare($ins);
	// Add user to database
	try{
		$qry->execute([
			':name' => $post["name"],
			':img' => isset($post["img"])?$post["img"]:3// Black lotus
		]);
		echo($db->lastInsertId());
	} catch(PDOException $e) {
		http_response_code(500);
		echo($e->getMessage());
	}