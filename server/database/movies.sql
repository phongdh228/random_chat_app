CREATE TABLE movie_categories(
    id serial,
    movie_category_name varchar(50) NOT NULL,
    description varchar(200),
    primary key (id)
)

CREATE TABLE movies(
    id serial,
    movie_name varchar(50) NOT NULL,
    movie_category_id int NOT NULL REFERENCES movie_categories(id),
    description varchar(200),
    primary key (id)
)

-- Insert sample data into movie_categories
INSERT INTO movie_categories (movie_category_name, description) VALUES
    ('Action', 'Movies with high intensity, fast-paced action scenes.'),
    ('Comedy', 'Movies with a humorous or light-hearted tone.'),
    ('Drama', 'Movies that focus on the emotional development of the characters.'),
    ('Horror', 'Movies that aim to scare and frighten the audience.'),
    ('Romance', 'Movies that focus on romantic relationships.'),
    ('Science Fiction', 'Movies that explore futuristic or scientific concepts.'),
    ('Thriller', 'Movies that build suspense and tension.'),
    ('Animation', 'Movies that are animated.'),
    ('Adventure', 'Movies that feature exotic locations and exciting quests.'),
    ('Documentary', 'Movies that present factual information.');

-- Insert sample data into movies
INSERT INTO movies (movie_name, movie_category_id, description) VALUES
    ('The Avengers', 1, 'A team of superheroes band together to save the world.'),
    ('Bridesmaids', 2, 'A group of women prepare for a wedding and deal with their own personal issues.'),
    ('The Shawshank Redemption', 3, 'A man in prison forms a bond with his fellow inmates.'),
    ('The Shining', 4, 'A man and his family experience terrifying events while staying at an isolated hotel.'),
    ('The Notebook', 5, 'A couple falls in love but is separated by circumstances.'),
    ('Inception', 6, 'A thief enters people''s dreams to steal their secrets.'),
    ('Psycho', 7, 'A woman checks into a motel and meets a disturbed proprietor.'),
    ('Up', 8, 'An old man and a young boy go on an adventure together in a flying house.'),
    ('Indiana Jones and the Raiders of the Lost Ark', 9, 'Indiana Jones goes on a quest to find the Ark of the Covenant.'),
    ('Planet Earth', 10, 'A documentary series that explores the natural world.');
