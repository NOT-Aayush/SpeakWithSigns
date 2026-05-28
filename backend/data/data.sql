CREATE TABLE persons(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    face_descriptor JSONB NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appearance_logs (

    id SERIAL PRIMARY KEY,

    user_id INTEGER REFERENCES persons(id),

    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    confidence FLOAT
);