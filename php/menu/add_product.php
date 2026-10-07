<?php
require_once '../config/database.php';

$name = $_POST['name'];
$description = $_POST['description'];
$price = $_POST['price'];
$category = $_POST['category'];
$imageName = null;

if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
    $imageName = time() . '_' . $_FILES['image']['name'];
    move_uploaded_file($_FILES['image']['tmp_name'], '../../images/' . $imageName);
}

try {
    $stmt = $pdo->prepare("INSERT INTO products (name, description, price, category, image, available) VALUES (?, ?, ?, ?, ?, 1)");
    $stmt->execute([$name, $description, $price, $category, $imageName]);
    echo json_encode(["success" => true]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
