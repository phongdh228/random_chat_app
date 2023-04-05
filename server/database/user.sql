create TABLE users(
	id serial,
	username varchar(50) not null,
	password varchar(50) not null,
	email varchar(50) not null,
	fullname varchar(50) not null,
	birthday date,
	is_male boolean,
	is_active boolean,
	create_at timestamp NOT NULL DEFAULT NOW(),
	update_at timestamp NOT NULL DEFAULT NOW(),
	primary key(id)
)

select * from users

INSERT INTO users (username, password, email, fullname, birthday, is_male, is_active)
VALUES
('user1', 'password1', 'user1@example.com', 'John Smith', '1990-01-01', true, true),
('user2', 'password2', 'user2@example.com', 'Jane Doe', '1992-05-10', false, true),
('user3', 'password3', 'user3@example.com', 'Bob Johnson', '1991-07-15', true, false),
('user4', 'password4', 'user4@example.com', 'Alice Brown', '1993-12-20', false, true),
('user5', 'password5', 'user5@example.com', 'David Lee', '1994-02-28', true, true),
('user6', 'password6', 'user6@example.com', 'Maria Garcia', '1990-09-06', false, false),
('user7', 'password7', 'user7@example.com', 'Paul Rodriguez', '1995-03-15', true, true),
('user8', 'password8', 'user8@example.com', 'Cindy Nguyen', '1993-06-28', false, true),
('user9', 'password9', 'user9@example.com', 'James Kim', '1992-11-11', true, false),
('user10', 'password10', 'user10@example.com', 'Karen Smith', '1991-04-25', false, true),
('user11', 'password11', 'user11@example.com', 'Tom Brown', '1990-12-01', true, true),
('user12', 'password12', 'user12@example.com', 'Mary Johnson', '1993-07-03', false, false),
('user13', 'password13', 'user13@example.com', 'Andy Davis', '1992-09-15', true, true),
('user14', 'password14', 'user14@example.com', 'Angela Lee', '1995-01-20', false, true),
('user15', 'password15', 'user15@example.com', 'Michael Brown', '1994-03-05', true, false),
('user16', 'password16', 'user16@example.com', 'Jenny Kim', '1991-08-08', false, true),
('user17', 'password17', 'user17@example.com', 'Chris Johnson', '1990-11-30', true, true),
('user18', 'password18', 'user18@example.com', 'Kathy Nguyen', '1993-04-12', false, false),
('user19', 'password19', 'user19@example.com', 'Samuel Rodriguez', '1992-06-15', true, true),
('user20', 'password20', 'user20@example.com', 'Sophie Davis', '1994-12-31', false, true);
