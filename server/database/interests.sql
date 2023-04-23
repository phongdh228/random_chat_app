CREATE TABLE interests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE user_interests (
  user_id INTEGER REFERENCES users(id),
  interest_id INTEGER REFERENCES interests(id),
  PRIMARY KEY (user_id, interest_id)
);

INSERT INTO interests (name) VALUES
  ('Reading'),
  ('Writing'),
  ('Drawing'),
  ('Photograph'),
  ('Playing musical instruments'),
  ('Singing'),
  ('Dancing'),
  ('Haging out'),
  ('Acting'),
  ('Watching films'),
  ('Playing games'),
  ('Playing sports'),
  ('Hiking'),
  ('Camping'),
  ('Fishing'),
  ('Cooking'),
  ('Gardening'),
  ('Traveling'),
  ('Collecting'),
  ('Sewing'),
  ('DIY projects'),
  ('Yoga and meditation'),
  ('Attending social activities')

select * from users

INSERT INTO user_interests (user_id, interest_id) VALUES
(1, 1), -- Alice likes art
(1, 3), -- Alice likes drinks
(1, 4), -- Alice likes food
(1, 6), -- Alice likes movies
(1, 7), -- Alice likes music
(1, 9), -- Alice likes vehicles
(2, 2), -- Bob likes books
(2, 4), -- Bob likes food
(2, 5), -- Bob likes games
(2, 6), -- Bob likes movies
(2, 7), -- Bob likes music
(2, 10), -- Bob likes travel
(3, 1), -- Charlie likes art
(3, 2), -- Charlie likes books
(3, 3), -- Charlie likes drinks
(3, 5), -- Charlie likes games
(3, 6), -- Charlie likes movies
(3, 7), -- Charlie likes music
(4, 2), -- David likes books
(4, 4), -- David likes food
(4, 6), -- David likes movies
(4, 7), -- David likes music
(4, 8), -- David likes songs
(4, 9), -- David likes vehicles
(5, 1), -- Emma likes art
(5, 3), -- Emma likes drinks
(5, 4), -- Emma likes food
(5, 5), -- Emma likes games
(5, 6), -- Emma likes movies
(5, 8), -- Emma likes songs
(6, 1), -- Frank likes art
(6, 2), -- Frank likes books
(6, 5), -- Frank likes games
(6, 7), -- Frank likes music
(6, 9), -- Frank likes vehicles
(6, 10), -- Frank likes travel
(7, 1), -- Grace likes art
(7, 3), -- Grace likes drinks
(7, 4), -- Grace likes food
(7, 6), -- Grace likes movies
(7, 7), -- Grace likes music
(7, 10), -- Grace likes travel
(8, 1), -- Henry likes art
(8, 2), -- Henry likes books
(8, 3), -- Henry likes drinks
(8, 5), -- Henry likes games
(8, 8), -- Henry likes songs
(8, 10); -- Henry likes travel
