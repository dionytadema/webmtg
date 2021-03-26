<?php
	function connect() {
		static $db = null;
		if ($db === null) {
			// Open our database =
			$db = new PDO("pgsql:host=localhost;port=5432;dbname=postgres;user=postgres");
			$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			// Create decks table if we didn't yet
			$query = $db->exec("CREATE TABLE IF NOT EXISTS decks (
				id serial PRIMARY KEY,
				name text,
				color text,
				format text,
				img integer,
				img_scale real,
				img_x real,
				img_y real);"
			);
		}
		return $db;
	}
	$db = connect();