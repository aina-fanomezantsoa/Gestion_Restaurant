<?php
require_once '../config/database.php';

header('Content-Type: application/json');

if (!isset($_GET['id'])) {
    echo json_encode(["success" => false, "message" => "ID requis"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM orders WHERE id = ?");
    $stmt->execute([$_GET['id']]);
    $order = $stmt->fetch();

    if ($order) {
        $stmtItems = $pdo->prepare("SELECT oi.*, p.name FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE order_id = ?");
        $stmtItems->execute([$_GET['id']]);
        $items = $stmtItems->fetchAll();
        
        echo json_encode([
            "success" => true,
            "order" => $order,
            "items" => $items
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Commande non trouvée"]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
