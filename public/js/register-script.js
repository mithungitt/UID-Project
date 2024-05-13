$(document).ready(function() {
    $('#registerForm').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        
        // Serialize form data to JSON
        const formData = {
            username: $('input[name=username]').val(),
            password: $('input[name=password]').val()
        };

        // Send form data to the server via AJAX
        $.ajax({
            type: 'POST',
            url: '/register',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                window.location.href = '/';
                // Optionally, redirect the user to another page after successful registration
            },
            error: function(xhr, status, error) {
                console.error('Error registering user:', error);
                // Handle error response from the server
            }
        });
    });
});
