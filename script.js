document.addEventListener("DOMContentLoaded", function() {
    
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("login-email");
    const emailError = document.getElementById("email-error-message");
    const passwordInput = document.getElementById("login-password");
    
    const loginPage = document.getElementById("login-page-container");
    const dashboardPage = document.getElementById("dashboard-page");
    const viewRecordsBtn = document.getElementById("view-records-btn");

    window.togglePassword = function(inputId) {
        let passwordField = document.getElementById(inputId);
        let toggleBtn = event.currentTarget;
        let svg = toggleBtn.querySelector('svg');
        
        if (passwordField.type === "password") {
            passwordField.type = "text";
            
            svg.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
            svg.setAttribute('class', 'eye-icon eye-open');
            toggleBtn.style.color = "#C9A84C"; 
        } else {
            passwordField.type = "password";
            
            svg.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
            svg.setAttribute('class', 'eye-icon eye-slash');
            toggleBtn.style.color = ""; 
        }
    };

    
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailPattern.test(emailInput.value);

        if (!isValid) {
            emailInput.style.border = "1.5px solid #FF4D4D";
            emailError.style.display = "block";
        } else {
            emailInput.style.border = "";
            emailError.style.display = "none";

            const emailStr = emailInput.value;
            const username = emailStr.split('@')[0];
            
            const formattedName = username.charAt(0).toUpperCase() + username.slice(1);
            const avatarLetter = username.charAt(0).toUpperCase();

            document.getElementById("welcome-heading").textContent = "Welcome back, " + formattedName + "!";
            document.getElementById("user-avatar").textContent = avatarLetter;

            loginPage.style.display = "none";
            dashboardPage.style.display = "flex";

            loginForm.reset();
            

            let toggleBtn = document.querySelector('.toggle-password');
            if (toggleBtn) toggleBtn.style.color = "";
        }
    });

    
    viewRecordsBtn.addEventListener("click", function() {
        const statsGrid = document.querySelector(".stats-grid-container");
        statsGrid.scrollIntoView({ 
            behavior: "smooth", 
            block: "center" 
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'registered') {
        const newName = urlParams.get('name') || 'Partner';
    
        const formattedName = newName.charAt(0).toUpperCase() + newName.slice(1);
        const avatarLetter = newName.charAt(0).toUpperCase();

        document.getElementById("welcome-heading").textContent = "Welcome back, " + formattedName + "!";
        document.getElementById("user-avatar").textContent = avatarLetter;
        
        document.getElementById("login-page-container").style.display = "none";
        document.getElementById("dashboard-page").style.display = "flex";
    }
});
