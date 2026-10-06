<?php
$pdo = new PDO('mysql:host=localhost;dbname=restaurant_orders;charset=utf8mb4', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$sql = file_get_contents('database/restaurant_orders.sql');
$statements = explode(';', $sql);

foreach ($statements as $statement) {
    $statement = trim($statement);
    if ($statement !== '') {
        try {
            $pdo->exec($statement);
            echo "Executed: " . substr($statement, 0, 50) . "...\n";
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage() . "\n";
        }
    }
}

echo "Database import complete!\n";