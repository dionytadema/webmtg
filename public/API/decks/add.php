<?php
	header('Content-type: application/json');
	require_once("../database.php");
	// Parse the request json
	$post = json_decode(file_get_contents('php://input'), true);
	
	// Validate deck owner
	if (!isset($post["owner"])) {
		echo('"deck must have owner"');
		http_response_code(400);
		return;
	}
	if ($post["owner"]==0) {
		// We should do a query to check if this user exists
		echo('"owner does not exits"');
		http_response_code(400);
		return;
	}
	// Validate deck name
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
	$ins = "INSERT INTO decks (owner, name, color, format, img)
		VALUES (:owner, :name, :color, :format, :img);";
	$qry = $db->prepare($ins);
	// Add deck to database
	try{
		$qry->execute([
			':owner' => $post["owner"],
			':name' => $post["name"],
			':color' => isset($post["color"])?$post["color"]:'',
			':format' => isset($post["format"])?$post["format"]:'casual',
			':img' => isset($post["img"])?$post["img"]:3// Black lotus
		]);
		echo($db->lastInsertId());
	} catch(PDOException $e) {
		http_response_code(500);
		echo($e->getMessage());
	}