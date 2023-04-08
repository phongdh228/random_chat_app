CREATE TABLE game_categories(
    id serial,
    game_category_name varchar(50) NOT NULL,
    description varchar(200),
    primary key (id)
)

CREATE TABLE games(
    id serial,
    game_name varchar(50) NOT NULL,
    game_category_id int NOT NULL REFERENCES game_categories(id),
    game_publisher varchar(50) NOT NULL,
    description varchar(200),
    primary key (id)
)

INSERT INTO game_categories (game_category_name, description)
VALUES 
    ('Action', 'Games with fast-paced, exciting gameplay'),
    ('Adventure', 'Games with exploration, puzzle-solving, and story elements'),
    ('RPG', 'Role-playing games with deep character customization and progression systems'),
    ('Sports', 'Games that simulate real-world sports'),
    ('Simulation', 'Games that simulate real-world activities'),
    ('Strategy', 'Games with a focus on planning and strategic thinking'),
    ('Puzzle', 'Games with challenging puzzles and brain teasers'),
    ('Casual', 'Games with simple mechanics and easy-to-learn gameplay'),
    ('Horror', 'Games with a focus on creating a frightening atmosphere'),
    ('Multiplayer', 'Games that can be played with multiple players');

INSERT INTO games (game_name, game_category_id, game_publisher, description)
VALUES
    ('Fortnite', 1, 'Epic Games', 'Battle Royale game with cartoonish graphics and building mechanics'),
    ('The Legend of Zelda: Breath of the Wild', 2, 'Nintendo', 'Open-world adventure game with puzzle-solving and exploration elements'),
    ('The Witcher 3: Wild Hunt', 3, 'CD Projekt Red', 'Action RPG with deep character customization and branching storylines'),
    ('FIFA 22', 4, 'Electronic Arts', 'Soccer simulation game with realistic graphics and gameplay'),
    ('Microsoft Flight Simulator', 5, 'Xbox Game Studios', 'Flight simulation game with real-world weather and terrain data'),
    ('Civilization VI', 6, '2K Games', 'Turn-based strategy game with a focus on building a civilization'),
    ('Tetris Effect', 7, 'Enhance Games', 'Puzzle game with immersive audiovisual effects'),
    ('Candy Crush Saga', 8, 'King', 'Match-three puzzle game with colorful graphics'),
    ('Dead Space', 9, 'Electronic Arts', 'Horror game set in a sci-fi universe'),
    ('Among Us', 10, 'Innersloth', 'Multiplayer game where players try to identify impostors on a spaceship');
