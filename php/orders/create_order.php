<?php
require_once '../config/database.php';

$data = json_decode(file_get_contents("php://input"), true);
$table = $data['table'];
$total = $data['total'];

try {
    $stmt = $pdo->prepare("INSERT INTO orders (table_number, total_amount, status) VALUES (?, ?, 'pending')");
    $stmt->execute([$table, $total]);
    echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
