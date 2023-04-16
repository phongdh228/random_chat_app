CREATE TABLE vehicle_categories(
    id serial,
    vehicle_category_name varchar(50) NOT NULL,
    description varchar(200),
    primary key (id)
)

CREATE TABLE vehicles(
    id serial,
    vehicle_name varchar(50) NOT NULL,
    vehicle_category_id int NOT NULL REFERENCES vehicle_categories(id),
    description varchar(200),
    primary key (id)
)

-- Insert sample data for vehicle_categories table
INSERT INTO vehicle_categories (vehicle_category_name, description)
VALUES
    ('Cars', 'Four-wheeled motor vehicles'),
    ('Bikes', 'Two-wheeled motor vehicles'),
    ('Boats', 'Watercraft designed for navigation on lakes, rivers, and oceans'),
    ('Planes', 'Powered, fixed-wing aircraft that are propelled forward by thrust from a jet engine or propeller');

-- Insert sample data for vehicles table
INSERT INTO vehicles (vehicle_name, vehicle_category_id, description)
VALUES
    ('Tesla Model S', 1, 'Electric luxury sedan'),
    ('Honda CBR600RR', 2, 'Sport motorcycle'),
    ('Yamaha R6', 2, 'Supersport motorcycle'),
    ('Bayliner Element E16', 3, 'Bowrider boat'),
    ('Cessna 172 Skyhawk', 4, 'Single-engine piston aircraft');


