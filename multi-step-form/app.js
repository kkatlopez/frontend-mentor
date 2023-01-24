$(document).ready(function() {
    var formData;
    const step1 = $("form#step1");
    const name = $("input#form-name");
    const email = $("input#form-email")
    const phone = $("input#form-phone");
    const next = $(".next");
    const prev = $(".prev");
    const tabs = $(".tab");
    const steps = $(".step");
    const billing = $("input:radio[name=billing]");
    const planToggle = $(".form-switch input");
    const planPayment = planToggle.parent();    
    var planType = $(".plan-switch").find(".selected-plan").data("type");
    const addons = $("input.addon");

    // -- -- FORM CONTROLLERS -- -- //
    
    // Handle which is price plan is selected
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
            
            // Online services price
            $("span#online-price").text("+$10/yr");
            $("input#addon-online").val("10");
            // Larger storage price
            $("span#storage-price").text("+$20/yr");
            $("input#addon-storage").val("20");
            // Customizable profile price
            $("span#prof-price").text("+$20/yr");
            $("input#addon-prof").val("20");
        
        // If user selected montly plan:
        } else {
            $("p.yearly-price").text("");
            // Arcade price
            $("span#arcade-price").text("$9/mo");
            $("input#arcade").val("9");
            // Advanced price
            $("span#advanced-price").text("$12/mo");
            $("input#advanced").val("12");
            // Pro price
            $("span#pro-price").text("$15/mo");
            $("input#pro").val("15");

            // Online services price
            $("span#online-price").text("+$1/mo");
            $("input#addon-online").val("1");
            // Larger storage price
            $("span#storage-price").text("+$2/mo");
            $("input#addon-storage").val("2");
            // Customizable profile price price
            $("span#prof-price").text("+$2/mo");
            $("input#addon-prof").val("2");
        }
    });

    // Add class on click of addon
    addons.on("click", function() {
        for (var i = 0; i < addons.length; i++) {
            if (addons.eq(i).is(":checked")) {
                addons.eq(i).parent().parent().addClass("checked");
            } else {
                addons.eq(i).parent().parent().removeClass("checked");
            }
        }
    });

    // -- -- APP CONTROLLERS -- -- //
    var currentTab = 0;
    showTab(currentTab);

    // Figure out which tab to hide/show
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
            next.text("Confirm");
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
        var addonPrice = 0;
        var billingPrice = 0;
        for (var i = 0; i < formData.length; i++) {
            // Add add-on prices together
            if (formData[i]['name'] == "addon") {
                var addon = parseInt(formData[i]['value']);
                addonPrice += addon;
                jsonArray[formData[i]["name"]] = addonPrice;
            // Convert billing price to int
            } else if (formData[i]['name'] == "billing") {
                billingPrice = parseInt(formData[i]['value']);
                jsonArray[formData[i]['name']] = billingPrice;
            } else {
                jsonArray[formData[i]['name']] = formData[i]['value'];
            }
        }
        jsonArray["total"] = addonPrice + billingPrice;
        return jsonArray;
    }

    step1.validate({
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                phoneUS: true
            }
        },
        errorPlacement: function(error, element) {
            error.insertAfter(element.prev());
        },
        messages: {
            name: "This field is required",
            email: {
                required: "This field is required",
                email: "Invalid email address"
            },
            phone: {
                required: "This field is required",
                phoneUS: "Invalid US phone number"
            }
        },
        onkeyup: false,
        onclick: false
    });

    // Handle next step click
    next.on("click", function() {
        formData = JSON.stringify(getFormData());
        if (step1.valid() || currentTab != 0) {
            nextPrev(next);
        }
        // Save data in session
        if (window.sessionStorage) {
            sessionStorage.setItem('formData', JSON.stringify(formData));
            formData = JSON.parse(formData);
            // Change plan in formData object
            if ("plan" in formData) {
                formData.plan = "Yearly";
                formData.planAbbr = "/yr";
                formData.planAbbr2 = "per year";
            } else {
                formData.plan = "Monthly";
                formData.planAbbr = "/mo";
                formData.planAbbr2 = "per month";
            }
        }

        // Step 4 values
        $("p#total-type").text("Arcade (" + formData.plan + ")");
        $("p#total-billing-price").text("$" + formData.billing + formData.planAbbr);
        $("p#grandtotal").text("Total (" + formData.planAbbr2 + ")");
        $("p#grandtotal-price").text("$" + formData.total + formData.planAbbr);

        // Determine which addons are shown
        for (var i = 0; i < addons.length; i++) {
            // Monthly payment plan
            if (formData.plan == "Monthly") {
                if (addons.eq(i).is(":checked")) {
                    let addonData = addons.eq(i).data("addon");
                    $("hr").removeClass("d-none");
                    if (addonData == "online") {
                        $("p#total-online").text("Online service");
                        $("p#total-online-price").text("+$1/mo");
                    }
                    if (addonData == "storage") {
                        $("p#total-storage").text("Larger storage");
                        $("p#total-storage-price").text("+$2/mo");
                    }
                    if (addonData == "prof") {
                        $("p#total-prof").text("Customizable profile");
                        $("p#total-prof-price").text("+$2/mo");
                    }
                } else {
                    $("hr").addClass("d-none");
                }
            // Yearly payment plan
            } else {
                if (addons.eq(i).is(":checked")) {
                    let addonData = addons.eq(i).data("addon");
                    $("hr").removeClass("d-none");
                    if (addonData == "online") {
                        $("p#total-online").text("Online service");
                        $("p#total-online-price").text("+$10/yr");
                    }
                    if (addonData == "storage") {
                        $("p#total-storage").text("Larger storage");
                        $("p#total-storage-price").text("+$20/yr");
                    }
                    if (addonData == "prof") {
                        $("p#total-prof").text("Customizable profile");
                        $("p#total-prof-price").text("+$20/yr");
                    }
                } else {
                    $("hr").addClass("d-none");
                }
            }
        }
    });

    // Handle back click
    prev.on("click", function() {
        nextPrev(prev);
    });
});