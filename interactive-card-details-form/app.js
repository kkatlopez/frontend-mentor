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

    // Change values on CC images when input changes in form
    formName.on("input", function() {
        var name = formName.val();
        cardName.text(name);
    });
    formNum.on("input", function() {
        var num = formNum.val().replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
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


});