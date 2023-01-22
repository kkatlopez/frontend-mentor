$(document).ready(function() {
    var formData;
    const next = $(".next");
    const prev = $(".prev");
    const tabs = $(".tab");
    const steps = $(".step");
    const billing = $("input:radio[name=billing]");
    const planToggle = $(".form-switch input");
    const planPayment = planToggle.parent();    
    var planType = $(".plan-switch").find(".selected-plan").data("type");

    // -- -- STEP 2 -- -- //
    billing.on("change", function() {
        var selected = $(this);
        for (var i = 0; i < billing.length; i++) {
            billing.eq(i).parent().removeClass("checked");
        }
        if (billing.is(":checked")) {
            selected.parent().addClass("checked");
        }
    });

    // Handle plan type toggle
    planToggle.on("change", function() {
        planPayment.prev().toggleClass("selected-plan");
        planPayment.next().toggleClass("selected-plan");
        planType = $(".plan-switch").find(".selected-plan").data("type");
        // If user selected yearly plan:
        if (planType == "yearly") {
            $("p.yearly-price").text("2 months free");
            // Arcade price
            $("span#arcade-price").text("$90/yr");
            $("input#arcade").val("90");
            // Advanced price
            $("span#advanced-price").text("$120/yr");
            $("input#advanced").val("120");
            // Pro price
            $("span#pro-price").text("$150/yr");
            $("input#pro").val("150");
        // If user selected montly plan:
        } else {
            $("p.yearly-price").text("");
            // Arcade price
            $("span#arcade-price").text("$9");
            $("input#arcade").val("9");
            // Advanced price
            $("span#advanced-price").text("$12");
            $("input#advanced").val("12");
            // Pro price
            $("span#pro-price").text("$15");
            $("input#pro").val("15");
        }
    });

    // -- -- STEP 3 -- -- //
    console.log(formData);
    if (formData) {
        if (formData.plan == monthly) {
            console.log("monthly")
        } else {
            console.log("yearly");
        }
    }

    var currentTab = 0;
    showTab(currentTab);

    function showTab(n) {
        tabs.eq(currentTab).removeClass("d-none");
        // Determine if "Go Back" button needs to be shown
        if (n == 0) {
            prev.addClass("d-none");
        } else {
            prev.removeClass("d-none");
        }
        // Show submit on last step
        if (n == (tabs.length - 1)) {
            next.text("Submit");
        } else {
            next.text("Next Step")
        }
        // Display correct step
        stepIndicator(n);
    }

    function nextPrev(btn) {
        tabs.eq(currentTab).addClass("d-none");
        var n = btn.data("tabnum");
        currentTab += n;         // Increase current tab
        // If the end of the form is reached, submit form
        if (currentTab >= tabs.length) {
            next.submit();
            return false;
        }
        showTab(currentTab);
    }

    // Change which step is active
    function stepIndicator(n) {
        for (var i = 0; i < steps.length; i++) {
            steps.eq(i).removeClass("active");
        }
        steps.eq(n).addClass("active");
    }

    // Convert form data into JSON for storage
    function getFormData() {
        var formData = $("form").serializeArray();
        console.log(formData);
        var jsonArray = {};
        for (var i = 0; i < formData.length; i++) {
            jsonArray[formData[i]['name']] = formData[i]['value'];
        }
        return jsonArray;
    }

    // Handle next step click
    next.on("click", function() {
        formData = JSON.stringify(getFormData());
        nextPrev(next);
        // Save data in session
        if (window.sessionStorage) {
            sessionStorage.setItem('formData', JSON.stringify(formData));
            formData = JSON.parse(formData);
            // Change plan in formData object
            if ("plan" in formData) {
                formData.plan = "yearly";

            } else {
                formData.plan = "monthly";
            }
        }
        console.log(formData);
    });

    // Handle back click
    prev.on("click", function() {
        nextPrev(prev);
    });
});