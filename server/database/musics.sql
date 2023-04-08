CREATE TABLE musics(
    id serial,
    music_type varchar(50) NOT NULL,
    description varchar(200),
    primary key (id)
)

CREATE TABLE songs(
    id serial,
    song_name varchar(50) NOT NULL,
    music_type_id integer NOT NULL REFERENCES songs(id),
    music_region varchar(50),
    artist varchar(50),
    description varchar(200),
    primary key (id)
)

-- Insert sample data into the `musics` table
INSERT INTO musics (music_type, description) VALUES
    ('Rock', 'A genre of popular music that originated as rock and roll in the United States in the 1950s.'),
    ('Pop', 'A genre of popular music that originated in the mid-1950s in the United States and the United Kingdom.'),
    ('Hip hop', 'A genre of popular music that originated in African American communities in the United States in the 1970s.'),
    ('Jazz', 'A music genre that originated in the African-American communities of New Orleans, United States, in the late 19th and early 20th centuries.'),
    ('Classical', 'A music genre that encompasses various styles and periods from the Middle Ages to the present day.');

-- Insert sample data into the `songs` table
INSERT INTO songs (song_name, music_type_id, music_region, artist, description) VALUES
    ('Bohemian Rhapsody', 1, 'United Kingdom', 'Queen', 'A classic rock song and one of the most popular songs in the world.'),
    ('Billie Jean', 2, 'United States', 'Michael Jackson', 'A pop song that was one of the biggest hits of the 1980s.'),
    ('The Message', 3, 'United States', 'Grandmaster Flash and the Furious Five', 'A hip hop song that was one of the first rap songs with a social commentary.'),
    ('Take Five', 4, 'United States', 'Dave Brubeck Quartet', 'A jazz instrumental composition that is one of the best-known jazz tunes of all time.'),
    ('Symphony No. 9', 5, 'Germany', 'Ludwig van Beethoven', 'A classical composition and one of the best-known works in the Western classical repertoire.');
