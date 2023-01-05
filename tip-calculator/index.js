$(document).ready(function() {
    // Function to calculate total and tip per person
    function billMath($amount, $people, $tip) {
        var totalPerPerson = (((1 + $tip) * $amount) / $people).toFixed(2);
        var tipPerPerson = (($amount * $tip) / $people).toFixed(2);
        var totalWithTip = ($amount * (1 + $tip)).toFixed(2);
        var totalTip = ($amount * $tip).toFixed(2);
        return [totalPerPerson, tipPerPerson, totalWithTip, totalTip];
    }

    // Get tip based on button click
    var tip;
    $("#bill-pct .tip").on("click", function() {
        var label = $(this);
        label.parents().find(".selected-tip").removeClass("selected-tip");
        tip = label.data('pct') / 100;
        if (!isNaN(label.data('pct'))) {
            label.toggleClass('selected-tip');
        } else {
            $("#cust").on("input", function() {
                tip = label.val() / 100;
            });
        }
    });
    
    // Update amounts every time a change is made to an input and calculates bill
    $("#reset-form").attr("disabled", true);
    $("#bill-form").on('.bill-data input', function() {
        var amount = $("#bill-amt").val();
        var people = $("#bill-people").val();
        if (amount.length != 0 && amount < 1) {
            $(".input-group#bill").addClass("error");
            $("#bill-error").text("Enter an amount greater than 0");
        } else {
            $(".input-group#bill").removeClass("error");
            $("#bill-error").empty();
        }
        if (people.length != 0 && people < 1) {
            $(".input-group#num-people").addClass("error").removeClass("input-focus");
            $("#people-error").text("Enter quantity greater than 0");
        } else {
            $(".input-group#num-people").removeClass("error");
            $("#people-error").empty();
        }

        var totalPer, tipPer, totalWithTip, totalTip;
        if (amount && people && tip) {
            $("#reset-form").attr("disabled", false);
            var bill = billMath(amount, people, tip);
            totalPer = bill[0];
            tipPer = bill[1];
            totalWithTip = bill[2];
            totalTip = bill[3];
            $("#total-per").text("$" + totalPer);
            $("#tip-per").text("$" + tipPer);
            $("#total-with-tip").text("$" + totalWithTip);
            $("#tip-total").text("$" + totalTip);
        }
    });

    // Do not allow non-number values
    $('input').on('keypress', function(key) {
        var charC = (key.which) ? key.which : key.keyCode;
        if (charC == 46) {
            if ($(this).val().indexOf('.') === -1) {
                return true;
            } else {
                return false;
            }
        } else {
            if (charC > 31 && (charC < 48 || charC > 57))
                return false;
            }
        return true;
    });

    // Add class for focus state on bill amount and number of people
    var inputGroup = $(".input-group");
    inputGroup.focusin(function() {
        $(this).addClass("input-focus");
    });
    inputGroup.focusout(function() {
        $(this).removeClass("input-focus");
    });

    // Add class for focus state on custom tip
    var customTipButton = $("#cust");
    customTipButton.focusin(function() {
        $(this).addClass("input-focus").attr("placeholder", "");
        $(this).parents().find(".selected-tip").removeClass("selected-tip");
    });
    customTipButton.focusout(function() {
        $(this).attr("placeholder", "Custom").removeClass("input-focus");
    });

    // Reset the form
    $("#reset-form").on("click", function() {
        $("#bill-form").find('input').val('');
        $("#total-per").empty();
        $("#tip-per").empty();
        $("#bill-pct").find(".selected-tip").removeClass("selected-tip");
        $("#reset-form").attr("disabled", true);
    });
});