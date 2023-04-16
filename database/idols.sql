CREATE TABLE idol_categories(
    id serial,
    idol_category_name varchar(50) NOT NULL,
    description varchar(200),
    primary key (id)
)

CREATE TABLE idols(
    id serial,
    idol_name varchar(50) NOT NULL,
    idol_category_id int NOT NULL REFERENCES idol_categories(id),
    description varchar(200),
    primary key (id)
)