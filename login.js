const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const body = document.getElementById('main-body');

signUpButton.addEventListener('click', () => {
    // Both container and body get the class for a synced animation
    container.classList.add("right-panel-active");
    body.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
    body.classList.remove("right-panel-active");
});