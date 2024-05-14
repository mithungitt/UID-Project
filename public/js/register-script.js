$(document).ready(function() {
    $('#registerForm').submit(function(event) {
        event.preventDefault(); 
        
        const formData = {
            username: $('input[name=username]').val(),
            password: $('input[name=password]').val()
        };

        $.ajax({
            type: 'POST',
            url: '/register',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                window.location.href = '/';
            },
            error: function(xhr, status, error) {
                console.error('Error registering user:', error);
            }
        });
    });
});
