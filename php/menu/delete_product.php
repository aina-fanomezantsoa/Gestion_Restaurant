<?php
require_once '../config/database.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
try {
    $stmt = $pdo->prepare("DELETE FROM products WHERE id=?");
    $stmt->execute([$data['id']]);
    echo json_encode(["success" => true]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
