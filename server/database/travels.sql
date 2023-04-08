CREATE TABLE travel_categories(
    id serial,
    travel_category_name varchar(50) NOT NULL,
    description varchar(200),
    primary key (id)
)

CREATE TABLE travels(
    id serial,
    travel_name varchar(50) NOT NULL,
    travel_category_id int NOT NULL REFERENCES travel_categories(id),
    description varchar(200),
    primary key (id)
)