$(document).ready(function() {
    const form = $("#cc-form");
    const cardName = $(".cc-name");
    const formName = $("#form-cc-name");
    const cardNum = $(".cc-num");
    const formNum = $("#form-cc-num");
    const cardExpMonth = $(".cc-exp-month");
    const formExpMonth = $("#form-cc-exp-month");
    const cardExpYear = $(".cc-exp-year");
    const formExpYear = $("#form-cc-exp-year");
    const cardSec = $(".cc-sec-code");
    const formSec = $("#form-cc-sec-code");
    const submit = $("#cc-submit-form");
    const success = $("#success");
    const cont = $("#continue");

    // Change values on CC images when input changes in form
    formName.on("input", function() {
        var name = formName.val();
        cardName.text(name);
    });
    formNum.on("input", function() {
        var num = formNum.val().split(" ").join("");
        if (num.length > 0) {
            num = num.match(new RegExp('.{1,4}', 'g')).join(" ");
        }
        formNum.val(num);
        cardNum.text(num);
    });
    formExpMonth.on("input", function() {
        var month = formExpMonth.val();
        cardExpMonth.text(month);
    });
    formExpYear.on("input", function() {
        var year = formExpYear.val();
        cardExpYear.text(year);
    });
    formSec.on("input", function() {
        var sec = formSec.val();
        cardSec.text(sec);
    });

    // Custom method for validating credit card number
    jQuery.validator.addMethod("checkCC", function(value) {
        const regExp = /^[0-9\s]*$/;
        if (regExp.test(value)) {
            return true;
        } else {
            return false;
        }
    }, "Incorrect format, numbers only");

    // Custom method for validating exp month
    jQuery.validator.addMethod("checkExpMonth", function(value) {
        return value <= 12;
    }, "Invalid month");
    
    // Validate form
    form.validate({
        groups: {
            expdate: "expmonth expyear"
        },
        rules: {
            name: "required",
            cardnum: {
                required: true,
                minlength: 19,
                checkCC: true
            },
            expmonth: {
                required: true,
                minlength: 2,
                checkExpMonth: true
            },
            expyear: {
                required: true,
                minlength: 2,
            },
            cvc: {
                required: true,
                number: true,
                rangelength: [3, 4]
            }
        },
        errorPlacement: function(error, element) {
            if (element.attr("name") == "expmonth" || element.attr("name") == "expyear") {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        messages: {
            name: "Cannot be blank",
            cardnum: {
                required: "Cannot be blank",
                minlength: "Invalid credit card length"
            },
            expmonth: {
                required: "Cannot be blank",
                minlength: "Invalid month"
            },
            expyear: {
                required: "Cannot be blank",
            },
            cvc: {
                required: "Cannot be blank",
                rangelength: "Invalid CVC length"
            }
        },
    });

    // Show success page
    submit.on("click", function() {
        if (form.valid()) {
            form.parent().addClass("d-none");
            success.removeClass("d-none");
        }
    });

    // Reload page and clear inputs + URL params on continue
    cont.on("click", function() {
        location.reload();
        form[0].reset();
        window.location = window.location.href.replace(window.location.search, '');
    });
});