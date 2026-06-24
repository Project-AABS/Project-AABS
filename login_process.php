<?php
session_start();
require_once 'db.php';

if (isset($_POST['login'])) {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // Verify hashed password
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['fullname'];
            
            // Redirect straight to web_page_mreinfo.html on success
            echo "<script>alert('Welcome back, " . $user['fullname'] . "!'); window.location.href='web_page.html';</script>";
        } else {
            echo "<script>alert('Incorrect password.'); window.location.href='login.html';</script>";
        }
    } else {
        echo "<script>alert('No account found with this email.'); window.location.href='login.html';</script>";
    }
}
?>