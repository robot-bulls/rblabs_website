/*---------------------Form----------------------*/
$(document).ready(function () {
    
	console.log("screen", screen.height);
	console.log("body", $('body').height());
	console.log("window", $(window).height());
	console.log("document", $(document).height());

	//section 1

	function form_name_scroll() {

		if ($("#form-name").val() != "") {

			//			$('html, body').animate({
			//				scrollTop: $(window).height()
			//
			//			}, 500);

			$("#contact_section_name").css("transform", "translateY(-100%)");
			$("#contact_section_email").css("transform", "translateY(-100%)");
			$("#contact_section_tel").css("transform", "translateY(-100%)");
			$("#contact_section_message").css("transform", "translateY(-100%)");

			$("#form-name").css("border-bottom", "2px solid rgb(2, 136, 209)");

			$("#form-name").trigger('blur');

		}

		if ($("#form-name").val() == "") {

			$("#form-name").css("border-bottom", "2px solid red");
			//			$("#form-name").addClass("form-name-error");

		}

	}

    $(document).on("keypress", function (e) {
		var keyCode = (e.keyCode ? e.keyCode : e.which);
		if (keyCode === 9) {
            console.log("tab clicked")

			e.preventDefault();

		}
	});
    
//    document.onkeydown = PresTab;
    document.onkeyup = PresTab;
 
       function PresTab(e)
       {
           var keycode = (window.event) ? event.keyCode : e.keyCode;
           if (keycode == 9)
               console.log("tab clicked")
               e.preventDefault();
           event .preventDefault();
//           alert('tab key pressed');
       }
    
	$('#form-name').on("keypress", function (e) {
		var keyCode = (e.keyCode ? e.keyCode : e.which);
		if (keyCode == 13) {
			e.preventDefault();
			form_name_scroll();

		}
	});

	$("#button_ok1").click(function () {

		form_name_scroll();

	});


	//section 2

	function form_email_scroll() {

		console.log("function start");

		if ($("#form-email").val() != "" && $("#form-email").val().indexOf('@') != -1 && $("#form-email").val().indexOf('.') != -1 && $("#form-email").val().length > 4) {

			console.log("function not empty");

			//			$('html, body').animate({
			//				scrollTop: $(window).height() * 2
			//			}, 500);

			$("#contact_section_name").css("transform", "translateY(-200%)");
			$("#contact_section_email").css("transform", "translateY(-200%)");
			$("#contact_section_tel").css("transform", "translateY(-200%)");
			$("#contact_section_message").css("transform", "translateY(-200%)");

			$("#form-email").css("border-bottom", "2px solid rgb(2, 136, 209)");

			$("#form-email").trigger('blur');

		} else {

			//		if ($("#form-email").val() == "") {

			$("#form-email").css("border-bottom", "2px solid red");
			//			$("#form-name").addClass("form-name-error");

		}

	}

	$('#form-email').on("keypress", function (e) {
		var keyCode = (e.keyCode ? e.keyCode : e.which);
		if (keyCode == 13) {

			e.preventDefault();
			form_email_scroll();

		}
	});

	$("#button_ok2").click(function () {

		console.log("enter click email");
		form_email_scroll();

	});



	//section 3

	function form_tel_scroll() {

		//		console.log("function start");

		console.log($("#form-tel").val().length);

		if ($("#form-tel").val() != "" && $("#form-tel").val().length > 7) {

			//			$('html, body').animate({
			//				scrollTop: $(window).height() * 3
			//			}, 500);

			$("#contact_section_name").css("transform", "translateY(-300%)");
			$("#contact_section_email").css("transform", "translateY(-300%)");
			$("#contact_section_tel").css("transform", "translateY(-300%)");
			$("#contact_section_message").css("transform", "translateY(-300%)");

			$("#form-tel").css("border-bottom", "2px solid rgb(2, 136, 209)");

			$("#form-tel").trigger('blur');

		} else {

			//		if ($("#form-tel").val() == "") {

			$("#form-tel").css("border-bottom", "2px solid red");
			//			$("#form-name").addClass("form-name-error");

		}

	}

	$('#form-tel').on("keypress", function (e) {
		var keyCode = (e.keyCode ? e.keyCode : e.which);
		if (keyCode == 13) {

			e.preventDefault();
			form_tel_scroll();

		}
	});

	$("#button_ok3").click(function () {

		console.log("enter click email");
		form_tel_scroll();

	});




	//back button 2

	$(".form_arrow_back2").click(function () {

		//		$('html, body').animate({
		//			scrollTop: 0
		//		}, 500);

		$("#contact_section_name").css("transform", "translateY(0)");
		$("#contact_section_email").css("transform", "translateY(0)");
		$("#contact_section_tel").css("transform", "translateY(0)");
		$("#contact_section_message").css("transform", "translateY(0)");

	});

	//back button 3

	$(".form_arrow_back3").click(function () {

		//		$('html, body').animate({
		//			scrollTop: $(window).height()
		//		}, 500);

		$("#contact_section_name").css("transform", "translateY(-100%)");
		$("#contact_section_email").css("transform", "translateY(-100%)");
		$("#contact_section_tel").css("transform", "translateY(-100%)");
		$("#contact_section_message").css("transform", "translateY(-100%)");

	});


	//back button 4

	$(".form_arrow_back4").click(function () {

		//		$('html, body').animate({
		//			scrollTop: $(window).height() * 2
		//		}, 500);

		$("#contact_section_name").css("transform", "translateY(-200%)");
		$("#contact_section_email").css("transform", "translateY(-200%)");
		$("#contact_section_tel").css("transform", "translateY(-200%)");
		$("#contact_section_message").css("transform", "translateY(-200%)");

	});

});




/*---------------------Contact Form----------------------*/


//button section 4

$("#button_ok4").click(function (e) {

	if ($('#check-datenschutz').is(':checked')) {

		$(".checkmark").css("border", "1px solid #0056ff");


		(function ($, window, document, undefined) {
			'use strict';

			console.log("start submit");

			var $form = $('#contact-form');

			$form.submit(function (e) {
				console.log("start submit 2");
				// remove the error class
				$('.form-group').removeClass('has-error');
				$('.help-block').remove();

				console.log("working 1");

				// get the form data
				var formData = {
					'name': $('input[name="form-name"]').val(),
					'email': $('input[name="form-email"]').val(),
					'tel': $('input[name="form-tel"]').val(),
					'message': $('textarea[name="form-message"]').val()
				};

				console.log("working 2");

				// process the form
				$.ajax({
					type: 'POST',
					url: 'process.php',
					data: formData,
					dataType: 'json',
					encode: true
				}).done(function (data) {

					console.log("start submit 3 (handele errors)");

					// handle errors
					//					if (!data.success) {
					//						console.log("handling errors");
					//						if (data.errors.name) {
					//							$('#name-field').addClass('has-error');
					//							$('#name-field').find('.col-lg-10').append('<span class="help-block">' + data.errors.name + '</span>');
					//							
					//							console.log("Name - handele errors");
					//						}
					//
					//						if (data.errors.email) {
					//							$('#email-field').addClass('has-error');
					//							$('#email-field').find('.col-lg-10').append('<span class="help-block">' + data.errors.email + '</span>');
					//							
					//							console.log("Email - handele errors");
					//						}
					//
					//						if (data.errors.tel) {
					//							$('#tel-field').addClass('has-error');
					//							$('#tel-field').find('.col-lg-10').append('<span class="help-block">' + data.errors.tel + '</span>');
					//							
					//							console.log("Tel - handele errors");
					//						}
					//
					//						if (data.errors.message) {
					//							$('#message-field').addClass('has-error');
					//							$('#message-field').find('.col-lg-10').append('<span class="help-block">' + data.errors.message + '</span>');
					//							
					//							console.log("message - handele errors");
					//						}
					//					} else {

					console.log("Success");

					// display success message
					$form.html('<div class="alert_box">' + "Congratulations! Your message was sent successfully." + '</div>');
					//				console.log("success")
					//				window.open( "https://miltondating.com/roifvnfdsdfsf.pdf");
					//					}
				}).fail(function (data) {
					// for debug
					console.log("submitting failed");
					console.log(data);
					//			window.open( "https://miltondating.com/roifvnfdsdfsf.pdf");
				});

				e.preventDefault();
			});
		}(jQuery, window, document));



	} else {

		$(".checkmark").css("border", "1px solid red");

	}

});
