CREATE TABLE drink_categories(
    id serial,
   drink_category_name varchar(50) NOT NULL,
    description varchar(200),
    primary key (id)
)

CREATE TABLE drinks(
    id serial,
    drink_name varchar(50) NOT NULL,
    drink_category_id int NOT NULL REFERENCES drink_categories(id),
    description varchar(200),
    primary key (id)
)

-- Insert sample data for drink_categories table
INSERT INTO drink_categories (drink_category_name, description)
VALUES
    ('Coffee', 'Beverage made from roasted coffee beans'),
    ('Tea', 'Aromatic beverage commonly prepared by pouring hot or boiling water over cured or fresh leaves of Camellia sinensis'),
    ('Beer', 'Alcoholic beverage made from cereal grains');

-- Insert sample data for drinks table
INSERT INTO drinks (drink_name, drink_category_id, description)
VALUES
    ('Latte', 1, 'Espresso with steamed milk and a layer of froth on top'),
    ('Green tea', 2, 'Camellia sinensis leaves brewed without oxidation'),
    ('IPA', 3, 'India Pale Ale, a hoppy beer style');
