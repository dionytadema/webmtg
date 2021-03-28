<?php
	function connect() {
		static $db = null;
		if ($db === null) {
			// Open our database =
			$db = new PDO("pgsql:host=localhost;port=5432;dbname=postgres;user=postgres");
			$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			// Create users table
			$db->exec("CREATE TABLE IF NOT EXISTS users (
				id serial PRIMARY KEY,
				name text,
				img integer,
				img_scale real,
				img_x real,
				img_y real);"
			);
			// Create decks table
			$db->exec("CREATE TABLE IF NOT EXISTS decks (
				id serial PRIMARY KEY,
				owner int,
				name text,
				color text,
				format text,
				img integer,
				img_scale real,
				img_x real,
				img_y real);"
			);
			// Create games table
			// This table holds generic data about games
			$db->exec("CREATE TABLE IF NOT EXISTS games (
				id serial PRIMARY KEY,
				format text,
				date timestamp NOT NULL DEFAULT CURRENT_DATE);"
			);
			// Create stats table
			// This table holds deck specific data about game results
			$db->exec("CREATE TABLE IF NOT EXISTS stats (
				id serial PRIMARY KEY,
				game_id int,
				user_id int,
				deck_id int,
				result text);"
			);
		}
		return $db;
	}
	$db = connect();