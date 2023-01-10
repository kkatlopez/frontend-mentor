$(document).ready(function() {
    $(".dropdown-toggle").on("click", function() {
        var toggle = $(this);
        // Current dropdown
        var menu = toggle.next("ul.dropdown-menu");
        // Current dropdown icon
        var icon = toggle.children();
        // Other dropdown
        var dropdownSibMenu = toggle.parent().siblings(".dropdown").children("ul.dropdown-menu");
        // Other dropdown icon
        var dropdownSibIcon = dropdownSibMenu.prev().children("img");

        if (menu.hasClass("show") && !(dropdownSibMenu.hasClass("show"))) {
            icon.attr("src", "./images/icon-arrow-up.svg");
        } else if (!(menu.hasClass("show")) && !(dropdownSibMenu.hasClass("show"))) {
            icon.attr("src", "./images/icon-arrow-down.svg");
        } else if (dropdownSibMenu.hasClass("show")) {
            icon.attr("src", "./images/icon-arrow-up.svg");
            dropdownSibIcon.attr("src", "./images/icon-arrow-down.svg");
        }
    });

});