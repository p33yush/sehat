// Kerala Health Records - Admin Login JavaScript
document.addEventListener("DOMContentLoaded", function () {

  // Language selector functionality
  const languageSelect = document.getElementById("language");
  languageSelect.addEventListener("change", function () {
    const selectedLanguage = this.value;
    console.log("Language changed to:", selectedLanguage);
    // Here you would implement language switching logic
    // For now, we'll just show an alert
    switch (selectedLanguage) {
      case "ml":
        alert("മലയാളം ഭാഷ തിരഞ്ഞെടുത്തു");
        break;
      case "hi":
        alert("हिन्दी भाषा चुनी गई");
        break;
      default:
        alert("English language selected");
    }
  });

  // Form validation functions
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validateWorkerID(id) {
    // Assuming worker ID format: KER-XXXX-XXXX or similar
    const workerIdRegex = /^[A-Z]{3}-\d{4}-\d{4}$/;
    return workerIdRegex.test(id) || id.length >= 6;
  }

  function validatePhone(phone) {
    // Indian phone number validation (10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  }

  function validatePassword(password) {
    // Minimum 8 characters, at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  }

  // Show error message
  function showError(element, message) {
    // Remove any existing error
    const existingError = element.parentNode.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    // Create and show new error
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.style.color = "#dc2626";
    errorDiv.style.fontSize = "12px";
    errorDiv.style.marginTop = "4px";
    errorDiv.textContent = message;
    element.parentNode.appendChild(errorDiv);

    // Add error styling to input
    element.style.borderColor = "#dc2626";
    element.style.boxShadow = "0 0 0 2px rgba(220, 38, 38, 0.1)";
  }

  // Clear error message
  function clearError(element) {
    const errorMessage = element.parentNode.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.remove();
    }
    element.style.borderColor = "";
    element.style.boxShadow = "";
  }

  // Admin Login form handling
  const loginBtn = document.getElementById("loginBtn");
  const userId = document.getElementById("userId");
  const pwd = document.getElementById("pwd");

  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();

    let isValid = true;

    // Clear previous errors
    [userId, pwd].forEach(clearError);

    // Validate user ID/email
    if (!userId.value.trim()) {
      showError(userId, "Please enter your admin username or email");
      isValid = false;
    } else {
      const userIdValue = userId.value.trim();
      // Check if it's an email or valid admin ID
      if (!validateEmail(userIdValue) && userIdValue.length < 3) {
        showError(userId, "Please enter a valid admin username or email");
        isValid = false;
      }
    }

    // Validate password
    if (!pwd.value) {
      showError(pwd, "Please enter your password");
      isValid = false;
    } else if (pwd.value.length < 6) {
      showError(pwd, "Password must be at least 6 characters long");
      isValid = false;
    }

    if (isValid) {
      // Show loading state
      loginBtn.textContent = "Signing In...";
      loginBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        // Here you would make an actual API call to authenticate
        console.log("Admin login attempt:", {
          userId: userId.value,
          password: pwd.value,
        });

        // For demo purposes, simulate successful admin login
        alert("Welcome Admin! Redirecting to admin dashboard...");
        
        // Redirect to admin dashboard
        window.location.href = "../admin/admin-dashboard-new.html";

        // Reset button state (this won't execute due to redirect)
        loginBtn.textContent = "Access Admin Dashboard";
        loginBtn.disabled = false;
      }, 2000);
    }
  });


  // Add input event listeners to clear errors on user input
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", function () {
      clearError(this);
    });

    input.addEventListener("change", function () {
      clearError(this);
    });
  });

  // Handle Enter key for login
  const loginPanel = document.getElementById("loginPanel");
  loginPanel.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      loginBtn.click();
    }
  });

  console.log("Kerala Health Records login system initialized");
});
