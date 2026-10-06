CREATE DATABASE IF NOT EXISTS restaurant_orders CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE restaurant_orders;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50),
    image VARCHAR(255),
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20),
    table_number INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'preparing', 'ready', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Données fictives
INSERT INTO products (name, description, price, category, available) VALUES
('Burger Classic', 'Steak haché, cheddar, salade', 8500, 'Plats', TRUE),
('Pizza Margherita', 'Sauce tomate, mozzarella, basilic', 9500, 'Pizzas', TRUE),
('Coca-Cola', '33cl', 1500, 'Boissons', TRUE);

INSERT INTO orders (customer_name, customer_phone, table_number, total_amount, status) VALUES
('Jean Dupont', '0601020304', 5, 18000, 'pending');

INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES
(1, 1, 1, 8500, 8500),
(1, 3, 3, 1500, 4500);
