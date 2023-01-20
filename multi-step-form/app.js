$(document).ready(function() {
    const next = $(".next");
    const prev = $(".prev");
    const tabs = $(".tab");
    const steps = $(".step");
    const billing = $("input:radio[name=billing]");
    console.log(billing);

    billing.on("change", function() {
        if (billing.is(":checked")) {
            console.log('yes');
            billing.closest().addClass("checked");
        } else {
            console.log('no');
        }
    });

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
        var jsonArray = {};
        for (var i = 0; i < formData.length; i++){
            jsonArray[formData[i]['name']] = formData[i]['value'];
        }
        return jsonArray;
    }

    next.on("click", function() {
        var formData = JSON.stringify(getFormData());
        nextPrev(next);
        // Save data in session
        if (window.sessionStorage) {
            sessionStorage.setItem('formData', JSON.stringify(formData));
            formData = JSON.parse(formData);
        }
    });

    prev.on("click", function() {
        nextPrev(prev);
    });
});