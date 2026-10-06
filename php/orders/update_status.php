<?php
require_once '../config/database.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id']) || !isset($data['status'])) {
    echo json_encode(["success" => false, "message" => "Données manquantes"]);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE orders SET status = ? WHERE id = ?");
    $stmt->execute([$data['status'], $data['id']]);
    
    echo json_encode(["success" => true]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
