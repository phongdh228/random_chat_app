create TABLE users(
	id serial,
	username varchar(50) not null,
	password varchar(200) not null,
	email varchar(50) not null,
	fullname varchar(50) not null,
	birthday date not null,
	is_male boolean not null,
	is_active boolean DEFAULT true,
	place_of_birth varchar(20),
	current_place varchar(20),
	zodiac_sign varchar(10),
	create_at timestamp NOT NULL DEFAULT NOW(),
	update_at timestamp NOT NULL DEFAULT NOW(),

	primary key(id)
)

select * from users

INSERT INTO users (username, password, email, fullname, birthday, is_male, place_of_birth, current_place, zodiac_sign)
VALUES 
('user1', '$2b$10$u8NBaE2LAL5qUI80Sv5aAOCJGva.Tmty13i4EFBO4HDqrWfIH/1dG', 'user1@example.com', 'User One', '1990-01-01', true, 'Place 1', 'Place 2', 'Capricorn'),
('user2', '$2b$10$yfEgOcOIViHlgxM6RSEc0eWXlr/PJ0rVVfLl6ysyQdDq3X9dpU6bW', 'user2@example.com', 'User Two', '1991-02-02', true, 'Place 3', 'Place 4', 'Aquarius'),
('user3', '$2b$10$twNFF1yfct1E64Of/9oLGOjJ/OGgpgdZJYhZACMbgjl8GJwL0F7Ty', 'user3@example.com', 'User Three', '1992-03-03', true, 'Place 5', 'Place 6', 'Pisces'),
('user4', '$2b$10$zGeowWRR5Z5EKSLY5Yql9OKv4mW.s4GnMmPULoHZ.Q7Fk8w/15/7i', 'user4@example.com', 'User Four', '1993-04-04', true, 'Place 7', 'Place 8', 'Aries'),
('user5', '$2b$10$Z30wBZJGzRukopN6IjK6OuU6XxBQ6PU0Ud3I/WTIVWZJ6hP76Iuam', 'user5@example.com', 'User Five', '1994-05-05', true, 'Place 9', 'Place 10', 'Taurus'),
('user6', '$2b$10$ndjK7VnvvruZ/SwCFg32HOJpOVOVsFtHjy/K0XmOvFh1J/p0Q2O8G', 'user6@example.com', 'User Six', '1995-06-06', true, 'Place 11', 'Place 12', 'Gemini'),
('user7', '$2b$10$KjhrBcfiRwhD83mcT9YvBefPfhbOIxskpD1r.7ghnru2msM89J1K2', 'user7@example.com', 'User Seven', '1996-07-07', true, 'Place 13', 'Place 14', 'Cancer'),
('user8', '$2b$10$f7.BRZKwWZ7GzO3e/Vzy0us04y/8Ua9.hU1R5/OcgnxRapEnJGzGC', 'user8@example.com', 'User Eight', '1997-08-08', true, 'Place 15', 'Place 16', 'Leo')