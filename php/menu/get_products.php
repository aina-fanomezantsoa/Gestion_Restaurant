<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);

try {
    require_once __DIR__ . '/../config/database.php';
    
    if (!isset($pdo)) {
        throw new Exception("La connexion à la base de données a échoué.");
    }

    $stmt = $pdo->query("SELECT * FROM products ORDER BY category, name");
    $products = $stmt->fetchAll();
    
    header('Content-Type: application/json');
    echo json_encode([
        "success" => true,
        "data" => $products
    ]);
} catch (Exception $e) {
    header('Content-Type: application/json');
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
