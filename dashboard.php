<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ABBS Cinema | Dashboard</title>
</head>
<body>
    <h1>Welcome, <?php echo htmlspecialchars($_SESSION['user_name']); ?>!</h1>
    <p>You can now book your favorite movie seats.</p>
    <a href="logout.php">Logout</a>
</body>
</html>