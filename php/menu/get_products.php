<?php
require_once __DIR__ . '/../config/database.php';

header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT * FROM products ORDER BY category, name");
    $products = $stmt->fetchAll();
    
    echo json_encode([
        "success" => true,
        "data" => $products
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
