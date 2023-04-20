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

DECLARE @secret_key VARCHAR(100) = 'confidential_key_that_you_never_know';

INSERT INTO users (username, password, email, fullname, birthday, is_male, place_of_birth, current_place, zodiac_sign)
VALUES
  ('user1', dbo.BCRYPT_HASH(@secret_key + 'P@ssword1', 10), 'user1@example.com', 'User One', '1990-01-01', 1, 'City A', 'City B', 'Capricorn'),
  ('user2', dbo.BCRYPT_HASH(@secret_key + 'P@ssword2', 10), 'user2@example.com', 'User Two', '1991-01-01', 0, 'City B', 'City C', 'Aquarius'),
  ('user3', dbo.BCRYPT_HASH(@secret_key + 'P@ssword3', 10), 'user3@example.com', 'User Three', '1992-01-01', 1, 'City C', 'City D', 'Pisces'),
  ('user4', dbo.BCRYPT_HASH(@secret_key + 'P@ssword4', 10), 'user4@example.com', 'User Four', '1993-01-01', 0, 'City D', 'City E', 'Aries'),
  ('user5', dbo.BCRYPT_HASH(@secret_key + 'P@ssword5', 10), 'user5@example.com', 'User Five', '1994-01-01', 1, 'City E', 'City F', 'Taurus'),
  ('user6', dbo.BCRYPT_HASH(@secret_key + 'P@ssword6', 10), 'user6@example.com', 'User Six', '1995-01-01', 0, 'City F', 'City G', 'Gemini'),
  ('user7', dbo.BCRYPT_HASH(@secret_key + 'P@ssword7', 10), 'user7@example.com', 'User Seven', '1996-01-01', 1, 'City G', 'City H', 'Cancer'),
  ('user8', dbo.BCRYPT_HASH(@secret_key + 'P@ssword8', 10), 'user8@example.com', 'User Eight', '1997-01-01', 0, 'City H', 'City I', 'Leo'),
  ('user9', dbo.BCRYPT_HASH(@secret_key + 'P@ssword9', 10), 'user9@example.com', 'User Nine', '1998-01-01', 1, 'City I', 'City J', 'Virgo'),
  ('user10', dbo.BCRYPT_HASH(@secret_key + 'P@ssword10', 10), 'user10@example.com', 'User Ten', '1999-01-01', 0, 'City J', 'City K', 'Libra'),
  ('user11', dbo.BCRYPT_HASH(@secret_key + 'P@ssword11', 10), 'user11@example.com', 'User Eleven', '2000-01-01', 1, 'City K', 'City L', 'Scorpio'),
  ('user12', dbo.BCRYPT_HASH(@secret_key + 'P@ssword12', 10), 'user12@example.com', 'User Twelve', '2001-01-01', 0, 'City L', 'City M', 'Sagittarius'),
