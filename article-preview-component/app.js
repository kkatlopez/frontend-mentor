// $(document).tooltip();
$(document).ready(function() {
    $(".share-icon").on("click", function() {
        const share = $("#share");
        const icons = $(this).children();
        icons.toggleClass("active");
        if ($(window).width() < 768) {
            share.children().toggleClass("d-none");
            share.toggleClass("share-media-parent");
        } else {
            $(".share-media-lg").toggleClass("d-md-flex");
            $("button.btn.btn-primary").toggleClass("btn-padding");
        }
    });
});
