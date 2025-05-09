-- Create types
-- Album condition grades
DO $$ BEGIN
	CREATE TYPE condition AS ENUM ('M', 'NM', 'VGP', 'VG', 'G', 'P');
EXCEPTION
	WHEN duplicate_object THEN null;
END $$;

-- Create tables
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
CREATE TABLE IF NOT EXISTS albums_t (
	id SERIAL PRIMARY KEY,
	name VARCHAR(256) NOT NULL,
	description TEXT,
	release_date DATE,
	length INTEGER,
	rating REAL
);

-- Owned Albums table
CREATE TABLE IF NOT EXISTS owned_albums_t (
	id SERIAL PRIMARY KEY,
	album_id INTEGER NOT NULL,
	condition condition,
	CONSTRAINT fk_album
		FOREIGN KEY(album_id) 
		REFERENCES albums_t(id)
		ON DELETE CASCADE
);

-- Wishlist Albums table
CREATE TABLE IF NOT EXISTS wishlist_albums_t (
	id SERIAL PRIMARY KEY,
	album_id INTEGER NOT NULL,
	listings VARCHAR(256)[],
	ranking INTEGER,
	CONSTRAINT fk_album
		FOREIGN KEY(album_id) 
		REFERENCES albums_t(id)
		ON DELETE CASCADE
);

-- Tracks table
CREATE TABLE IF NOT EXISTS tracks (
	id SERIAL PRIMARY KEY,
	name varchar(256) NOT NULL,
	length INTEGER,
	side SMALLINT,
	album_id INT NOT NULL,
	position INT NOT NULL,
	CONSTRAINT fk_album
		FOREIGN KEY(album_id) 
		REFERENCES albums_t(id)
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
		REFERENCES albums_t(id)
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
		REFERENCES albums_t(id)
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
		REFERENCES albums_t(id)
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
		REFERENCES albums_t(id)
		ON DELETE CASCADE
);

-- Create views
DROP VIEW IF EXISTS albums CASCADE;

CREATE VIEW albums AS
SELECT
	a_t.*,

	COALESCE((
		SELECT json_agg(row_to_json(a))
		FROM (
			SELECT a.*
			FROM artists AS a
			JOIN artists_albums AS aa ON a.id = aa.artist_id
			WHERE aa.album_id = a_t.id
		) a
	), '[]') AS artists,

	COALESCE((
		SELECT json_agg(row_to_json(p))
		FROM (
			SELECT p.*
			FROM producers AS p
			JOIN producers_albums AS pa ON p.id = pa.producer_id
			WHERE pa.album_id = a_t.id
		) p
	), '[]') AS producers,

	COALESCE((
		SELECT json_agg(row_to_json(g))
		FROM (
			SELECT g.*
			FROM genres AS g
			JOIN genres_albums AS ga ON g.id = ga.genre_id
			WHERE ga.album_id = a_t.id
		) g
	), '[]') AS genres,

	COALESCE((
		SELECT json_agg(row_to_json(l))
		FROM (
			SELECT l.*
			FROM labels AS l
			JOIN labels_albums AS la ON l.id = la.label_id
			WHERE la.album_id = a_t.id
		) l
	), '[]') AS labels,

	COALESCE((
		SELECT json_agg(row_to_json(t))
		FROM (
			SELECT t.*
			FROM tracks AS t
			WHERE t.album_id = a_t.id
		) t
	), '[]') AS tracks
FROM
	albums_t AS a_t;

-- Owned Album view
DROP VIEW IF EXISTS owned_albums;
CREATE VIEW owned_albums AS
SELECT
	oa_t.*,
	row_to_json(albums) AS album
FROM
	owned_albums_t AS oa_t
	INNER JOIN albums ON albums.id = oa_t.album_id;

-- Wishlist Album view
DROP VIEW IF EXISTS wishlist_albums;
CREATE VIEW wishlist_albums AS
SELECT
	wa_t.*,
	row_to_json(albums) AS album
FROM
	wishlist_albums_t AS wa_t
	INNER JOIN albums ON albums.id = wa_t.album_id;

-- Create triggers
-- Albums instead of trigger
CREATE OR REPLACE FUNCTION trg_albums_upsert()
RETURNS trigger AS $$
DECLARE
	result RECORD;
BEGIN
	-- INSERT
	IF TG_OP = 'INSERT' THEN
		-- Insert into base table
		INSERT INTO albums_t (name, description, release_date, length, rating)
		VALUES (NEW.name, NEW.description, NEW.release_date, NEW.length, NEW.rating);

		-- Return full view row
		SELECT
			a_t.*,

			COALESCE((
				SELECT json_agg(row_to_json(a))
				FROM (
					SELECT a.*
					FROM artists AS a
					JOIN artists_albums AS aa ON a.id = aa.artist_id
					WHERE aa.album_id = a_t.id
				) a
			), '[]') AS artists,

			COALESCE((
				SELECT json_agg(row_to_json(p))
				FROM (
					SELECT p.*
					FROM producers AS p
					JOIN producers_albums AS pa ON p.id = pa.producer_id
					WHERE pa.album_id = a_t.id
				) p
			), '[]') AS producers,

			COALESCE((
				SELECT json_agg(row_to_json(g))
				FROM (
					SELECT g.*
					FROM genres AS g
					JOIN genres_albums AS ga ON g.id = ga.genre_id
					WHERE ga.album_id = a_t.id
				) g
			), '[]') AS genres,

			COALESCE((
				SELECT json_agg(row_to_json(l))
				FROM (
					SELECT l.*
					FROM labels AS l
					JOIN labels_albums AS la ON l.id = la.label_id
					WHERE la.album_id = a_t.id
				) l
			), '[]') AS labels,

			COALESCE((
				SELECT json_agg(row_to_json(t))
				FROM (
					SELECT t.*
					FROM tracks AS t
					WHERE t.album_id = a_t.id
				) t
			), '[]') AS tracks
		INTO result
		FROM
			albums_t AS a_t
		ORDER BY a_t.id DESC  -- assumes latest inserted has highest ID
		LIMIT 1;

		RETURN result;

	-- UPDATE
	ELSIF TG_OP = 'UPDATE' THEN
		UPDATE albums_t
		SET
			name = NEW.name, 
			description = NEW.description, 
			release_date = NEW.release_date, 
			length = NEW.length, 
			rating = NEW.rating
		WHERE id = OLD.id;

		-- Return full view row
		SELECT
			a_t.*,

			COALESCE((
				SELECT json_agg(row_to_json(a))
				FROM (
					SELECT a.*
					FROM artists AS a
					JOIN artists_albums AS aa ON a.id = aa.artist_id
					WHERE aa.album_id = a_t.id
				) a
			), '[]') AS artists,

			COALESCE((
				SELECT json_agg(row_to_json(p))
				FROM (
					SELECT p.*
					FROM producers AS p
					JOIN producers_albums AS pa ON p.id = pa.producer_id
					WHERE pa.album_id = a_t.id
				) p
			), '[]') AS producers,

			COALESCE((
				SELECT json_agg(row_to_json(g))
				FROM (
					SELECT g.*
					FROM genres AS g
					JOIN genres_albums AS ga ON g.id = ga.genre_id
					WHERE ga.album_id = a_t.id
				) g
			), '[]') AS genres,

			COALESCE((
				SELECT json_agg(row_to_json(l))
				FROM (
					SELECT l.*
					FROM labels AS l
					JOIN labels_albums AS la ON l.id = la.label_id
					WHERE la.album_id = a_t.id
				) l
			), '[]') AS labels,

			COALESCE((
				SELECT json_agg(row_to_json(t))
				FROM (
					SELECT t.*
					FROM tracks AS t
					WHERE t.album_id = a_t.id
				) t
			), '[]') AS tracks
		INTO result
		FROM
			albums_t AS a_t
		WHERE a_t.id = OLD.id;

		RETURN result;
	
	-- DELETE
	ELSIF TG_OP = 'DELETE' THEN
		-- Return full view row
		SELECT
			a_t.*,

			COALESCE((
				SELECT json_agg(row_to_json(a))
				FROM (
					SELECT a.*
					FROM artists AS a
					JOIN artists_albums AS aa ON a.id = aa.artist_id
					WHERE aa.album_id = a_t.id
				) a
			), '[]') AS artists,

			COALESCE((
				SELECT json_agg(row_to_json(p))
				FROM (
					SELECT p.*
					FROM producers AS p
					JOIN producers_albums AS pa ON p.id = pa.producer_id
					WHERE pa.album_id = a_t.id
				) p
			), '[]') AS producers,

			COALESCE((
				SELECT json_agg(row_to_json(g))
				FROM (
					SELECT g.*
					FROM genres AS g
					JOIN genres_albums AS ga ON g.id = ga.genre_id
					WHERE ga.album_id = a_t.id
				) g
			), '[]') AS genres,

			COALESCE((
				SELECT json_agg(row_to_json(l))
				FROM (
					SELECT l.*
					FROM labels AS l
					JOIN labels_albums AS la ON l.id = la.label_id
					WHERE la.album_id = a_t.id
				) l
			), '[]') AS labels,

			COALESCE((
				SELECT json_agg(row_to_json(t))
				FROM (
					SELECT t.*
					FROM tracks AS t
					WHERE t.album_id = a_t.id
				) t
			), '[]') AS tracks
		INTO result
		FROM
			albums_t AS a_t
		WHERE a_t.id = OLD.id;
		
		DELETE FROM albums_t
		WHERE id = OLD.id;

		RETURN result;
	END IF;

	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_albums_modification
INSTEAD OF INSERT OR UPDATE OR DELETE ON albums
FOR EACH ROW
EXECUTE FUNCTION trg_albums_upsert();

-- Owned albums instead of trigger
CREATE OR REPLACE FUNCTION trg_owned_albums_upsert()
RETURNS trigger AS $$
DECLARE
	result RECORD;
BEGIN
	-- INSERT
	IF TG_OP = 'INSERT' THEN
		-- Insert into base table
		INSERT INTO owned_albums_t (album_id, condition)
		VALUES (NEW.album_id, NEW.condition);

		-- Return full view row
		SELECT
			oa_t.*,
			row_to_json(a) AS album
		INTO result
		FROM
			owned_albums_t oa_t
			JOIN albums a ON a.id = oa_t.album_id
		ORDER BY oa_t.id DESC  -- assumes latest inserted has highest ID
		LIMIT 1;

		RETURN result;

	-- UPDATE
	ELSIF TG_OP = 'UPDATE' THEN
		UPDATE owned_albums_t
		SET album_id = NEW.album_id,
			condition = NEW.condition
		WHERE id = OLD.id;

		-- Return full view row
		SELECT
			oa_t.*,
			row_to_json(a) AS album
		INTO result
		FROM
			owned_albums_t oa_t
			JOIN albums a ON a.id = oa_t.album_id
		WHERE oa_t.id = OLD.id;

		RETURN result;
	
	-- DELETE
	ELSIF TG_OP = 'DELETE' THEN
		-- Return full view row
		SELECT
			oa_t.*,
			row_to_json(a) AS album
		INTO result
		FROM
			owned_albums_t wa_t
			JOIN albums a ON a.id = oa_t.album_id
		WHERE oa_t.id = OLD.id;
		
		DELETE FROM owned_albums_t
		WHERE id = OLD.id;

		RETURN result;
	END IF;

	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_owned_albums_modification
INSTEAD OF INSERT OR UPDATE OR DELETE ON owned_albums
FOR EACH ROW
EXECUTE FUNCTION trg_owned_albums_upsert();

-- Wishlist albums instead of trigger
CREATE OR REPLACE FUNCTION trg_wishlist_albums_upsert()
RETURNS trigger AS $$
DECLARE
	result RECORD;
BEGIN
	-- INSERT
	IF TG_OP = 'INSERT' THEN
		-- Insert into base table
		INSERT INTO wishlist_albums_t (album_id, listings, ranking)
		VALUES (NEW.album_id, NEW.listings, NEW.ranking);

		-- Return full view row
		SELECT
			wa_t.*,
			row_to_json(a) AS album
		INTO result
		FROM
			wishlist_albums_t wa_t
			JOIN albums a ON a.id = wa_t.album_id
		ORDER BY wa_t.id DESC  -- assumes latest inserted has highest ID
		LIMIT 1;

		RETURN result;

	-- UPDATE
	ELSIF TG_OP = 'UPDATE' THEN
		UPDATE wishlist_albums_t
		SET album_id = NEW.album_id,
			listings = NEW.listings,
			ranking = NEW.ranking
		WHERE id = OLD.id;

		-- Return full view row
		SELECT
			wa_t.*,
			row_to_json(a) AS album
		INTO result
		FROM
			wishlist_albums_t wa_t
			JOIN albums a ON a.id = wa_t.album_id
		WHERE wa_t.id = OLD.id;

		RETURN result;
	
	-- DELETE
	ELSIF TG_OP = 'DELETE' THEN
		-- Return full view row
		SELECT
			wa_t.*,
			row_to_json(a) AS album
		INTO result
		FROM
			wishlist_albums_t wa_t
			JOIN albums a ON a.id = wa_t.album_id
		WHERE wa_t.id = OLD.id;
		
		DELETE FROM wishlist_albums_t
		WHERE id = OLD.id;

		RETURN result;
	END IF;

	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_wishlist_albums_modification
INSTEAD OF INSERT OR UPDATE OR DELETE ON wishlist_albums
FOR EACH ROW
EXECUTE FUNCTION trg_wishlist_albums_upsert();
