CREATE TABLE food_categories(
    id serial,
    food_category_name varchar(50) NOT NULL,
    description varchar(200),
    primary key (id)
)

CREATE TABLE foods(
    id serial,
    food_name varchar(50) NOT NULL,
    food_category_id int NOT NULL REFERENCES food_categories(id),
    description varchar(200),
    primary key (id)
)

-- Insert sample data for food_categories table
INSERT INTO food_categories (food_category_name, description)
VALUES
    ('Italian', 'Cuisine originating from Italy'),
    ('Japanese', 'Cuisine originating from Japan'),
    ('Mexican', 'Cuisine originating from Mexico');

-- Insert sample data for foods table
INSERT INTO foods (food_name, food_category_id, description)
VALUES
    ('Pizza Margherita', 1, 'Tomato sauce, mozzarella cheese, and basil on thin crust'),
    ('Sushi', 2, 'Japanese dish made of specially prepared vinegared rice with various ingredients, such as seafood, vegetables, and sometimes fruits'),
    ('Taco', 3, 'Mexican dish consisting of a corn or wheat tortilla filled with various ingredients, such as meat, beans, and vegetables');
