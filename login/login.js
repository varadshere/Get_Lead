$( document ).ready( function () {
    $.getScript('../config/config.js', function() {
        $( "#login-form" ).validate( {
            rules: {
                password: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                email: "Please enter a valid email address",
                password: "Please enter a valid password"
            },
            errorElement: "em",
            errorPlacement: function ( error, element ) {
                // Add the `help-block` class to the error element
                error.addClass( "help-block" );
                if ( element.prop( "type" ) === "checkbox" ) {
                    error.insertAfter( element.parent( "label" ) );
                } else {
                    error.insertAfter( element );
                }
            },
            highlight: function ( element, errorClass, validClass ) {
                $( element ).parents( ".ip-validation" ).addClass( "has-error" ).removeClass( "has-success" );
            },
            unhighlight: function (element, errorClass, validClass) {
                $( element ).parents( ".ip-validation" ).addClass( "has-success" ).removeClass( "has-error" );
            }
        } );
    
        $('#btnLogin').click(function(e) {
            $.ajaxSetup({
                headers:{
                    "Accept": "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin":"*",
                    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT"
                }
            });
            var dataToSend = {
                "email": $('#email').val(),
                "password": $('#password').val()
            }

            $.post(config.serverURL + "login", JSON.stringify(dataToSend), function(data, status){
                if(data.result){
                    $('#login-section').hide();
                }
            });

            
        });
    });
});