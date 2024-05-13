$(document).ready(function(){
    $('#loginForm').submit(function(event){
        event.preventDefault();
        
        const formData={
            username: $('input[name=username]').val(),
            password: $('input[name=password]').val()
        };
        
        $.ajax({
            type:'POST',
            url:'/login',
            contentType:'application/json',
            data: JSON.stringify(formData),
            success: function(response){
                window.location.href = '/index';
            },
            error: function(xhr,status,error){
                console.error("error",error);
            }
        })
    })
})