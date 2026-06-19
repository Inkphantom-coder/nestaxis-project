document.addEventListener("DOMContentLoaded", function() {
    // login form elements
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("login-email");
    const emailError = document.getElementById("email-error-message");
    const passwordInput = document.getElementById("login-password");
    const passwordToggle = document.getElementById("password-toggle");
    
    // interface view page wrappers
    const loginPage = document.getElementById("login-page-container");
    const dashboardPage = document.getElementById("dashboard-page");
    const viewRecordsBtn = document.getElementById("view-records-btn");

    // password field visibility switcher
    passwordToggle.addEventListener("click", function() {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            passwordToggle.style.color = "#C9A84C"; // change toggle to gold accent
        } else {
            passwordInput.type = "password";
            passwordToggle.style.color = ""; // reset to default
        }
    });

    // submission form validation control
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // simple check for standard format string
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailPattern.test(emailInput.value);

        if (!isValid) {
            emailInput.style.border = "1.5px solid #FF4D4D";
            emailError.style.display = "block";
        } else {
            emailInput.style.border = "";
            emailError.style.display = "none";

            // break up string to pull profile handle name
            const emailStr = emailInput.value;
            const username = emailStr.split('@')[0];
            
            // set letter casing adjustments
            const formattedName = username.charAt(0).toUpperCase() + username.slice(1);
            const avatarLetter = username.charAt(0).toUpperCase();

            // populate custom greeting text and icon circle initial
            document.getElementById("welcome-heading").textContent = "Welcome back, " + formattedName + "!";
            document.getElementById("user-avatar").textContent = avatarLetter;

            // hide authentication and reveal layout panel
            loginPage.style.display = "none";
            dashboardPage.style.display = "flex";

            // clean form entries
            loginForm.reset();
            passwordToggle.style.color = "";
        }
    });

    // click response handler for view records window alignment
    viewRecordsBtn.addEventListener("click", function() {
        const statsGrid = document.querySelector(".stats-grid-container");
        statsGrid.scrollIntoView({ 
            behavior: "smooth", 
            block: "center" 
        });
    });
    // Check if the user just registered and came from the register page
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('status') === 'registered') {
    const newName = urlParams.get('name') || 'Partner';
    
    // Format name and avatar
    const formattedName = newName.charAt(0).toUpperCase() + newName.slice(1);
    const avatarLetter = newName.charAt(0).toUpperCase();

    // Inject values and swap views instantly
    document.getElementById("welcome-heading").textContent = "Welcome back, " + formattedName + "!";
    document.getElementById("user-avatar").textContent = avatarLetter;
    
    document.getElementById("login-page-container").style.display = "none";
    document.getElementById("dashboard-page").style.display = "flex";
}
});