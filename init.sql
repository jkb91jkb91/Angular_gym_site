
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'testing_db') THEN
        CREATE DATABASE testing_db;
    END IF;
END $$;


-- Użycie utworzonej bazy danych
\c testing_db;

-- Tworzenie tabeli
CREATE TABLE angular (
    name text,
    description text,
    imagePath text
);

-- Wstawianie danych
INSERT INTO angular (name, description, imagePath) VALUES ('kot', 'cos', 'kots');

