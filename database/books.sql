CREATE TABLE book_categories(
    id serial,
    book_category_name varchar(50) NOT NULL,
    description varchar(200),
    primary key (id)
)

CREATE TABLE books(
    id serial,
    book_name varchar(50) NOT NULL,
    book_category_id int NOT NULL REFERENCES book_categories(id),
    author varchar(50) NOT NULL,
    description varchar(200),
    primary key (id)
)

INSERT INTO book_categories (book_category_name, description) VALUES
  ('Fiction', 'Books that are not based on real events'),
  ('Non-fiction', 'Books that are based on real events or facts'),
  ('Romance', 'Books about love and relationships');

INSERT INTO books (book_name, book_category_id, author, description) VALUES
  ('To Kill a Mockingbird', 1, 'Harper Lee', 'A classic novel about racism and injustice'),
  ('The Great Gatsby', 1, 'F. Scott Fitzgerald', 'A novel about the American Dream and the excesses of the wealthy'),
  ('The Catcher in the Rye', 1, 'J.D. Salinger', 'A novel about teenage angst and rebellion'),
  ("The Alchemist', 2, 'Paulo Coelho', 'A philosophical novel about following one's dreams"),
  ('The 7 Habits of Highly Effective People', 2, 'Stephen Covey', 'A self-help book about personal development'),
  ('Becoming', 2, 'Michelle Obama', 'A memoir by former First Lady Michelle Obama'),
  ('Pride and Prejudice', 3, 'Jane Austen', 'A classic novel about love and social class'),
  ('Wuthering Heights', 3, 'Emily Bronte', 'A novel about a doomed love affair'),
  ("The Notebook', 3, 'Nicholas Sparks', 'A romance novel about a couple's enduring love"),
  ("The Time Traveler's Wife', 3, 'Audrey Niffenegger', 'A science fiction romance novel about a time traveler and his wife");
