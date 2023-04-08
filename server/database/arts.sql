CREATE TABLE art_categories(
    id serial,
    art_category_name varchar(50) NOT NULL,
    description varchar(200),
    primary key (id)
)

CREATE TABLE arts(
    id serial,
    art_name varchar(50) NOT NULL,
    art_category_id int NOT NULL REFERENCES art_categories(id),
    artist varchar(50),
    description varchar(200),
    primary key (id)
)

INSERT INTO art_categories (art_category_name, description) VALUES 
('Painting', 'Visual art created with pigments and a medium of drying oil'), 
('Sculpture', 'Three-dimensional artwork created by shaping or combining materials'), 
('Photography', 'Art of creating images using a camera and a light-sensitive material'), 
('Printmaking', 'Process of creating artworks by printing, normally on paper'), 
('Drawing', 'Creation of a two-dimensional artwork using pencil, charcoal, or other dry media');

INSERT INTO arts (art_name, art_category_id, artist, description) VALUES 
('The Starry Night', 1, 'Vincent van Gogh', 'Painting of a village with a swirling sky'),
('David', 2, 'Michelangelo', 'Marble sculpture of a biblical hero'),
('Moonrise, Hernandez', 3, 'Ansel Adams', 'Black-and-white photograph of a landscape'),
('The Great Wave off Kanagawa', 4, 'Hokusai', 'Japanese woodblock print of a tsunami'),
('Study for the Head of a Youth', 5, 'Leonardo da Vinci', 'Red chalk drawing of a young man'),
('Water Lilies', 1, 'Claude Monet', 'Series of impressionist paintings of a pond'),
('The Thinker', 2, 'Auguste Rodin', 'Bronze sculpture of a man deep in thought'),
('Migrant Mother', 3, 'Dorothea Lange', 'Photograph of a destitute woman and her children during the Great Depression'),
('Las Meninas', 1, 'Diego Velázquez', 'Painting of a Spanish royal family in a palace'),
('The Ecstasy of Saint Teresa', 2, 'Gian Lorenzo Bernini', 'Marble sculpture of a saint in religious ecstasy'),
('The Kiss', 1, 'Gustav Klimt', 'Painting of a couple locked in an embrace'),
('The Persistence of Memory', 5, 'Salvador Dalí', 'Surrealist painting of melting clocks');
