<?php
$host = "localhost";
$username = "root";
$password = "";
$dbname = "cinema_db";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}
?>