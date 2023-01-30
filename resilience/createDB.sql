DROP TABLE IF EXISTS vote;

CREATE TABLE vote (
    id TEXT PRIMARY KEY,
    nb INTEGER
);

INSERT INTO vote (id, nb) VALUES
    ('Solution 1', 0),
    ('Solution 2', 0),
    ('Solution 3', 0);
