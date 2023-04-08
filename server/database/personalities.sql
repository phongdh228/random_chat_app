CREATE TABLE personality_categories(
    id serial,
    personality_category_name varchar(50) NOT NULL,
    description varchar(200),
    primary key (id)
)

CREATE TABLE personalities(
    id serial,
    personality_name varchar(50) NOT NULL,
    personality_category_id int NOT NULL REFERENCES personality_categories(id),
    description varchar(200),
    primary key (id)
)

INSERT INTO personality_categories (personality_category_name, description)
VALUES
    ('MBTI', 'Myers-Briggs Type Indicator'),
    ('Enneagram', 'Enneagram Personality Test'),
    ('Big Five', 'Big Five Personality Traits'),
    ('DISC', 'DISC Personality Profile');

INSERT INTO personalities (personality_name, personality_category_id, description)
VALUES
    ('INFJ', 1, 'Introverted, Intuitive, Feeling, Judging'),
    ('ENTP', 1, 'Extraverted, Intuitive, Thinking, Perceiving'),
    ('Type 1: The Reformer', 2, 'Principled, Purposeful, Self-Controlled, and Perfectionistic'),
    ('Type 5: The Investigator', 2, 'Perceptive, Innovative, Secretive, and Isolated'),
    ('Agreeableness', 3, 'Friendly, Compassionate, Cooperative'),
    ('Conscientiousness', 3, 'Organized, Responsible, Hard-working'),
    ('Dominance', 4, 'Direct, Decisive, Results-oriented');
