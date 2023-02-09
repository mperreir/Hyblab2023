DROP TABLE IF EXISTS vote;

CREATE TABLE vote (
    id TEXT PRIMARY KEY,
    nbVote INTEGER,
    sumNote INTEGER
);

INSERT INTO vote (id, nbVote, sumNote) VALUES
    ('Solution 1', 0, 0),
    ('Solution 2', 0, 0),
    ('Solution 3', 0, 0);
