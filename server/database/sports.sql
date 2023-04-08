CREATE TABLE sport_categories(
    id serial,
    sport_category_name varchar(50) NOT NULL,
    description varchar(200),
    primary key (id)
)

CREATE TABLE sports(
    id serial,
    sport_name varchar(50) NOT NULL,
    sport_category_id int NOT NULL REFERENCES sport_categories(id),
    description varchar(200),
    primary key (id)
)