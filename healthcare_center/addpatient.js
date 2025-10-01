const modal = document.getElementById('modalOverlay');
        const addPatientBtn = document.getElementById('addPatientBtn');
        const closeModal = document.getElementById('closeModal');
        const cancelBtn = document.getElementById('cancelBtn');
        const pageContent = document.getElementById('pageContent');
        const patientForm = document.getElementById('patientForm');
        const savePatientBtn = document.getElementById('savePatientBtn');

        // Open modal
        function openModal() {
            modal.classList.add('active');
            pageContent.classList.add('blur-background');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }

        // Close modal
        function closeModalFunction() {
            modal.classList.remove('active');
            pageContent.classList.remove('blur-background');
            document.body.style.overflow = 'auto'; // Restore scrolling
            resetForm();
        }

        // Reset form
        function resetForm() {
            patientForm.reset();
            clearErrors();
            document.getElementById('successMessage').style.display = 'none';
        }

        // Event listeners
        addPatientBtn.addEventListener('click', openModal);
        closeModal.addEventListener('click', closeModalFunction);
        cancelBtn.addEventListener('click', closeModalFunction);

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModalFunction();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModalFunction();
            }
        });

        // Form validation
        function validateForm() {
            const requiredFields = [
                'firstName', 'lastName', 'dateOfBirth', 'gender', 
                'phone', 'emergencyName', 'emergencyRelation', 'emergencyPhone'
            ];
            
            let isValid = true;
            clearErrors();

            requiredFields.forEach(fieldName => {
                const field = document.getElementById(fieldName);
                if (!field.value.trim()) {
                    showError(field, 'This field is required');
                    isValid = false;
                }
            });

            // Validate phone numbers
            const phoneRegex = /^[6-9]\d{9}$/;
            const phone = document.getElementById('phone').value.replace(/\s/g, '');
            const emergencyPhone = document.getElementById('emergencyPhone').value.replace(/\s/g, '');

            if (phone && !phoneRegex.test(phone)) {
                showError(document.getElementById('phone'), 'Enter valid 10-digit phone number');
                isValid = false;
            }

            if (emergencyPhone && !phoneRegex.test(emergencyPhone)) {
                showError(document.getElementById('emergencyPhone'), 'Enter valid 10-digit phone number');
                isValid = false;
            }

            // Validate email if provided
            const email = document.getElementById('email').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email)) {
                showError(document.getElementById('email'), 'Enter valid email address');
                isValid = false;
            }

            return isValid;
        }

        function showError(field, message) {
            field.closest('.form-group').classList.add('error');
            
            // Remove existing error message
            const existingError = field.closest('.form-group').querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }

            // Add new error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            field.closest('.form-group').appendChild(errorDiv);
        }

        function clearErrors() {
            document.querySelectorAll('.form-group.error').forEach(group => {
                group.classList.remove('error');
            });
            document.querySelectorAll('.error-message').forEach(error => {
                error.remove();
            });
        }

        // Phone number formatting
        function formatPhoneNumber(input) {
            let value = input.value.replace(/\D/g, ''); // Remove non-digits
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            
            // Format as XXXXX XXXXX
            if (value.length > 5) {
                value = value.substring(0, 5) + ' ' + value.substring(5);
            }
            
            input.value = value;
        }

        // Add phone formatting to phone inputs
        document.getElementById('phone').addEventListener('input', function() {
            formatPhoneNumber(this);
        });

        document.getElementById('emergencyPhone').addEventListener('input', function() {
            formatPhoneNumber(this);
        });

        // Clear errors on input
        document.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', function() {
                if (this.closest('.form-group').classList.contains('error')) {
                    this.closest('.form-group').classList.remove('error');
                    const errorMsg = this.closest('.form-group').querySelector('.error-message');
                    if (errorMsg) errorMsg.remove();
                }
            });
        });

        // Handle form submission
        savePatientBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }

            // Show loading state
            const loadingSpinner = document.getElementById('loadingSpinner');
            const saveButtonText = document.getElementById('saveButtonText');
            
            loadingSpinner.classList.add('active');
            saveButtonText.textContent = 'Saving...';
            savePatientBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Collect form data
                const formData = new FormData(patientForm);
                const patientData = Object.fromEntries(formData);
                
                console.log('Patient data to save:', patientData);

                // Show success message
                document.getElementById('successMessage').style.display = 'block';
                
                // Reset loading state
                loadingSpinner.classList.remove('active');
                saveButtonText.textContent = 'Save Patient';
                savePatientBtn.disabled = false;

                // Close modal after short delay
                setTimeout(() => {
                    closeModalFunction();
                    // Here you would typically refresh the patient list or redirect
                    alert('Patient record created successfully! 🎉');
                }, 1500);

            }, 2000); // Simulate 2 second API call
        });

        console.log('Add Patient Modal initialized');