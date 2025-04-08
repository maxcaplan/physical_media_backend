-- Album condition grades
DO $$ BEGIN
	CREATE TYPE condition AS ENUM ('M', 'NM', 'VGP', 'VG', 'G', 'P');
EXCEPTION
	WHEN duplicate_object THEN null;
END $$;

-- Artists table
CREATE TABLE IF NOT EXISTS artists (
	id SERIAL PRIMARY KEY,
	name VARCHAR(256) NOT NULL,
	description TEXT,
	origin VARCHAR(256)
);

-- Genres table
CREATE TABLE IF NOT EXISTS genres (
	id SERIAL PRIMARY KEY,
	name VARCHAR(256) NOT NULL
);

-- Labels table
CREATE TABLE IF NOT EXISTS labels (
	id SERIAL PRIMARY KEY,
	name VARCHAR(256) NOT NULL
);

-- Producers table
CREATE TABLE IF NOT EXISTS producers (
	id SERIAL PRIMARY KEY,
	name varchar(256) NOT NULL
);

-- Albums table
CREATE TABLE IF NOT EXISTS albums (
	id SERIAL PRIMARY KEY,
	name VARCHAR(256) NOT NULL,
	description TEXT,
	release_date DATE,
	length INTEGER,
	rating REAL
);

-- Owned Albums table
CREATE TABLE IF NOT EXISTS owned_albums (
	id SERIAL PRIMARY KEY,
	album_id INTEGER NOT NULL,
	condition condition,
	CONSTRAINT fk_album
		FOREIGN KEY(album_id) 
		REFERENCES albums(id)
		ON DELETE CASCADE
);

-- Wishlist Albums table
CREATE TABLE IF NOT EXISTS wishlist_albums (
	id SERIAL PRIMARY KEY,
	album_id INTEGER NOT NULL,
	listings VARCHAR(256)[],
	ranking INTEGER,
	CONSTRAINT fk_album
		FOREIGN KEY(album_id) 
		REFERENCES albums(id)
		ON DELETE CASCADE
);

-- Tracks table
CREATE TABLE IF NOT EXISTS tracks (
	id SERIAL PRIMARY KEY,
	name varchar(256) NOT NULL,
	length INTEGER,
	side SMALLINT,
	album_id INT NOT NULL,
	CONSTRAINT fk_album
		FOREIGN KEY(album_id) 
		REFERENCES albums(id)
		ON DELETE CASCADE
);

-- Artists Albums many to many table
CREATE TABLE IF NOT EXISTS artists_albums (
	id SERIAL PRIMARY KEY,
	artist_id INT NOT NULL,
	album_id INT NOT NULL,
	CONSTRAINT fk_artist
		FOREIGN KEY(artist_id)
		REFERENCES artists(id)
		ON DELETE CASCADE,
	CONSTRAINT fk_album
		FOREIGN KEY(album_id)
		REFERENCES albums(id)
		ON DELETE CASCADE
);

-- Genres Albums many to many table
CREATE TABLE IF NOT EXISTS genres_albums (
	id SERIAL PRIMARY KEY,
	genre_id INT NOT NULL,
	album_id INT NOT NULL,
	CONSTRAINT fk_genre
		FOREIGN KEY(genre_id)
		REFERENCES genres(id)
		ON DELETE CASCADE,
	CONSTRAINT fk_album
		FOREIGN KEY(album_id)
		REFERENCES albums(id)
		ON DELETE CASCADE
);

-- Labels Albums many to many table
CREATE TABLE IF NOT EXISTS labels_albums (
	id SERIAL PRIMARY KEY,
	label_id INT NOT NULL,
	album_id INT NOT NULL,
	CONSTRAINT fk_label
		FOREIGN KEY(label_id)
		REFERENCES labels(id)
		ON DELETE CASCADE,
	CONSTRAINT fk_album
		FOREIGN KEY(album_id)
		REFERENCES albums(id)
		ON DELETE CASCADE
);

-- Producers Albums many to many table
CREATE TABLE IF NOT EXISTS producers_albums (
	id SERIAL PRIMARY KEY,
	producer_id INT NOT NULL,
	album_id INT NOT NULL,
	CONSTRAINT fk_producer
		FOREIGN KEY(producer_id)
		REFERENCES producers(id)
		ON DELETE CASCADE,
	CONSTRAINT fk_album
		FOREIGN KEY(album_id)
		REFERENCES albums(id)
		ON DELETE CASCADE
);

