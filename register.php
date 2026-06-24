<?php
require_once 'db.php';

if (isset($_POST['signup'])) {
    $fullname = mysqli_real_escape_string($conn, $_POST['fullname']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = $_POST['password'];

    // Check if email already exists
    $check_email = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($check_email);

    if ($result->num_rows > 0) {
        echo "<script>alert('Email already registered!'); window.location.href='login.html';</script>";
    } else {
        // Securely hash the password
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);
        
        $sql = "INSERT INTO users (fullname, email, password) VALUES ('$fullname', '$email', '$hashed_password')";
        
        if ($conn->query($sql) === TRUE) {
            echo "<script>alert('Registration successful! Please login.'); window.location.href='login.html';</script>";
        } else {
            echo "Error: " . $conn->error;
        }
    }
}
?>