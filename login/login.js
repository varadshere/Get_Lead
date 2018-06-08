$( document ).ready( function () {
    $.getScript('../config/config.js', function() {
        $('#profile-section').hide();
        var $loading = $('.loader').hide();
        var currentPayroll = ['Current Payroll Provider', 'New Business/ Need to Set Up', 'ADP', 'Ceridian', 'iSolved', 'Evolution', 'Paychex', 'Paycom', 'Paycor', 'Kronos', 'PEO', 'TriNet', 'Extensis', 'Oasis', 'Prestige', 'Quickbooks', 'Gusto', 'Ultimate', 'Zenefits', 'Process Payroll in House', 'Other- not listed'];
        var list = $("#payroll");
        $.each(currentPayroll, function(index, item) {
            list.append(new Option(item, item));
        });

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
            if($("#login-form").valid()){
                console.log('valid form 1')
            }else {
                console.log('invalid form 2')
                return;
            }
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
            };
            $('#login-section').hide();
            $loading.show();
            $.post(config.serverURL + "login", JSON.stringify(dataToSend), function(data, status){
                if(data.result){
                    $loading.hide();
                    $('#login-section').hide();
                    $('#profile-section').show();

                }
            }).fail(function(error) {
                $('#login-section').show();
                $loading.hide();
                // alert(error.responseJSON)
            });

            
        });
    });
});