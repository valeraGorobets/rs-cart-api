-- Insert test data into 'carts' table with manually generated UUIDv4 values
INSERT INTO carts (id, user_id, created_at, updated_at, status)
VALUES
    ('d04a10d1-91e7-4d57-a47f-74f4c88f2a6e', '2e0c53d8-89a4-4b5b-b8e3-20a74d173f63', '2024-05-01', '2024-05-01', 'OPEN'),
    ('25c9a4c1-10cf-4c61-895d-05e42e7079b7', '5d5e9a38-4b97-4b20-aaf7-d40c16502989', '2024-05-02', '2024-05-02', 'ORDERED');

-- Insert test data into 'cart_items' table with manually generated UUIDv4 values for product_id and cart_id from 'carts' table
INSERT INTO cart_items (cart_id, product_id, count)
VALUES
    ('d04a10d1-91e7-4d57-a47f-74f4c88f2a6e', '581f64a2-bc06-4d9e-9b2b-25b7de07c4a4', 3),
    ('d04a10d1-91e7-4d57-a47f-74f4c88f2a6e', '23cc1a5c-4f65-426b-8493-3f6aa46eb041', 1),
    ('25c9a4c1-10cf-4c61-895d-05e42e7079b7', '9a1727d3-d585-46ec-b22e-8d17413f9cd0', 2);
