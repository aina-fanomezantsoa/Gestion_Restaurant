<?php
require_once '../config/database.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
try {
    $stmt = $pdo->prepare("UPDATE products SET name=?, description=?, price=?, category=?, image=? WHERE id=?");
    $stmt->execute([$data['name'], $data['description'], $data['price'], $data['category'], $data['image'], $data['id']]);
    echo json_encode(["success" => true]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
