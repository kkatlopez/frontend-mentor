$(document).ready(function() {
    // API call to Advice Slip
    function getAdvice(callback) {
        $.getJSON("https://api.adviceslip.com/advice", function(data) {
            response = data;
            callback(response);
            $.ajaxSetup({ cache: false });
        });
    }

    getAdvice(function(data) {
        id = data.slip["id"];
        advice = data.slip["advice"];
        $("#advice-id").text(id);
        $("#advice span").text(advice);
    });

    // Function call to get the advice
    $("#reroll").on("click", function() {
        var id, advice;
        getAdvice(function(data) {
            id = data.slip["id"];
            advice = data.slip["advice"];
            $("#advice-id").text(id);
            $("#advice span").text(advice);
        });
    });
});