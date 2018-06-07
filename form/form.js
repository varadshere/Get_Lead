$( document ).ready( function () {
    var $loading = $('.loader').hide();
    $('#finishBtnWarpper').hide();
    $('#section1').show();
    $('#btnBackWarpper').hide();
    // $('#btnBackWarpper').hide();
    // $('#nxtBtnWarpper').removeClass('text-left');
    var currentSection='section1';
    var lastSection = $('[id^=section]:last').attr('id');

    $('#btnNext').click(function(){
        if(currentSection === 'section1'){
            var selected = false;
            $( ".cube" ).each(function( index ) {

                if($(this).children().children().first().hasClass('check-icon')){
                    selected = true;
                }
            });
            if(!selected){
                $( ".cube" ).each(function( index ) {

                    $(this).addClass('invalid-cube');
                });
                return;
            }else {
                $( ".cube" ).each(function( index ) {
                    $(this).removeClass('invalid-cube');
                });
            }
        }
        if($("#signupForm1").valid()){
                console.log('valid form 1')
            }else {
                console.log('invalid form 2')
                return;
            }

        if(currentSection!=lastSection) {
            // hide all section for id start with section
            $('[id^=section]').hide();
            var nextSection = $('#'+currentSection).next();
            currentSection = $(nextSection).attr('id');
            $(nextSection).show();
            $('#btnBackWarpper').show();
            $('#btnBackWarpper').addClass('text-right');
            $('#nxtBtnWarpper').removeClass('text-center');
            $('#nxtBtnWarpper').addClass('text-left');
        }
        if(currentSection === 'section4'){
            $('#nxtBtnWarpper').hide();
            $('#btnBackWarpper').hide();
            $('#finishBtnWarpper').show();
        }
    });

    $('#btnBack').click(function () {
            $('[id^=section]').hide();
            var prevSection = $('#'+currentSection).prev();
            currentSection = $(prevSection).attr('id');
            $(prevSection).show();
            if(currentSection === 'section1'){
                $('#nxtBtnWarpper').removeClass('text-right');
                $('#nxtBtnWarpper').removeClass('text-left');
                $('#nxtBtnWarpper').addClass('text-center');
                $('#btnBackWarpper').hide();
            }

    });
    $(".cube").on('click', function(event){
        $( ".cube" ).each(function( index ) {
            $(this).removeClass('invalid-cube');
            $(this).children().children().first().removeClass('check-icon');
            $(this).children().children().first().addClass('uncheck-icon');
        });
        $(this).children().children().first().addClass('check-icon');

    });
    var serverURL = 'http://18.188.167.167:5000/api/';
    // var serverURL = 'http://127.0.0.1:5000/api/';
    $( "#signupForm1" ).validate( {
        rules: {
            // cname: "required",
            fname: "required",
            lname: "required",
            password: "required",
            // checky: "required",
            email: {
                required: true,
                email: true,
                remote: {
                    url: serverURL + "checkUser",
                    type: "post",
                    contentType: "application/json; charset=utf-8",
                    processData: false,
                    dataType: "json",
                    beforeSend: function(x, settings) {
                        var data = {
                            email: settings.data.email()
                        };
                        settings.data = JSON.stringify(data);

                    },
                    dataFilter: function(data) {
                        // return JSON.stringify("test");
                        data = JSON.parse(data);
                        if(typeof data.result === "boolean"){
                            if(!data.result){
                                return true;
                            }else {
                                return JSON.stringify("This email is already taken");
                            }
                        }
                    },
                    data: {
                        "email": function() {
                            return  $("#email").val();
                        }
                    }
                }
            },
            phnumnber: {
                required: true,
                phoneUS: true
            }//"required"
        },
        messages: {
            // cname: "Please enter Company Name",
            fname: "Please enter your firstname",
            lname: "Please enter your lastname",
            email: "Please enter a valid email address",
            password: "Please enter a valid password",
            // checky: "Please select the checkbox",
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

    $('#track-time-group').hide();
    $('#empnum-group').hide();
    $('#tell-us-bit').hide();
    var currentPayroll = ['Current Payroll Provider', 'New Business/ Need to Set Up', 'ADP', 'Ceridian', 'iSolved', 'Evolution', 'Paychex', 'Paycom', 'Paycor', 'Kronos', 'PEO', 'TriNet', 'Extensis', 'Oasis', 'Prestige', 'Quickbooks', 'Gusto', 'Ultimate', 'Zenefits', 'Process Payroll in House', 'Other- not listed'];
    var list = $("#payroll");
    $.each(currentPayroll, function(index, item) {
        list.append(new Option(item, item));
    });

    $("#payrollprovider").click(function() {
        // var thisCheck = $(this);
        if (this.checked){
            $('#payrollprovider-lable').text('Yes');
            $('#newsolution-group').fadeOut('slow');
        }else {
            $('#payrollprovider-lable').text('No');
            $('#newsolution-group').fadeIn('slow');
        }
    });

    $("#hremp").click(function() {
        // var thisCheck = $(this);
        if (this.checked){
            $('#hremp-lable').text('Yes');
            $('#track-time-group').fadeIn('slow');
        }else {
            $('#hremp-lable').text('No');
            $('#track-time-group').fadeOut('slow');
        }
    });

    $("#healthins").click(function() {
        // var thisCheck = $(this);
        if (this.checked){
            $('#healthins-lable').text('Yes');
            $('#empnum-group').fadeIn('slow');
        }else {
            $('#healthins-lable').text('No');
            $('#empnum-group').fadeOut('slow');
        }
    });
    $("#interested").click(function() {
        // var thisCheck = $(this);
        if (this.checked){
            $('#interested-lable').text('Yes');
        }else {
            $('#interested-lable').text('No');
        }
    });
    var tellUsBitFlag = true;
    $("#tell-us-bit-button").click(function () {
        if(tellUsBitFlag){
            $('#tell-us-bit').fadeIn('slow');
            $("#tell-us-bit-button").text('Show less');
            tellUsBitFlag = false;
        }else {
            $('#tell-us-bit').fadeOut('slow');
            $("#tell-us-bit-button").text('Tell us a bit more?');
            tellUsBitFlag = true;
        }
    });

    $('#finish').click(function(e) {
        // submit the form
        e.preventDefault();
        // $(this).ajaxSubmit();
        // return false to prevent normal browser submit and page navigation
        console.log($('#cname').val());

            var dataToSend = {
                "cube": getCubeVal(),
                "company_name": $('#cname').val(),
                "first_name": $('#fname').val(),
                "password": $('#password').val(),
                "last_name": $('#lname').val(),
                "email": $('#email').val(),
                "phone": $('#phnumnber').val(),
                "emp_count": $('#empcount').val(),
                "pay_frequency": $('#payfreq').val(),
                "current_provider": $('#payroll').val(),
                "satisfied": $('#payrollprovider').is(":checked"),
                "start_new_sol": $('#newsolution').val(),
                "hourly_emp": $('#hremp').is(":checked"),
                "track_time": $('#track-time').val(),
                "explore_options": "",
                "health_insurance": $('#healthins').is(":checked"),
                "emp_health_plan": $('#empnum').val(),
                "monthly_spend": $('#monthlyspend').val(),
                "interested_to_speak": $('#interested').is(":checked"),
            };
            var checkUser = {
                "email":  $('#email').val()
            };
            $.ajaxSetup({
                headers:{
                    "Accept": "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin":"*",
                    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT"
                }
            });
            $loading.show();
            $('.sec4-inner-warapper').hide();
            $('#finish').hide();

            $.post(serverURL + "insert", JSON.stringify(dataToSend), function(data, status){
                if(data.result){
                    $loading.hide();
                    $('.sec4-inner-warapper').show();
                    $('[id^=section]').hide();
                    $('#dataInserted').show();
                    $('#finishBtnWarpper').hide();
                }
            });



        return false;
    });


    function getCubeVal() {
        $( ".cube" ).each(function( index ) {
            if($(this).children().children().first().hasClass('check-icon')){
                val = $(this).children().children().last().text();
            }
        });
        return val;
    }
});