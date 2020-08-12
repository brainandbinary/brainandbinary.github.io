function explode(){
    $(".block-message").addClass("").removeClass("show-block-valid show-block-error");
}

var timeoutNews = window.setTimeout(function(){explode();},4000);

(function(e) {
    e.fn.notifyMe = function() {

        // Alert messages
        var thvalid        = '<p class="notify-valid"><span><i class="icon ion-checkmark-round"></i></span>Congrats! You are in list.<br>We will inform you as soon as we finish.</p>';
        var thproblem      = '<p class="notify-valid"><span><i class="icon ion-close-round"></i></span>Your e-mail address is incorrect.<br>Please check it and try again.</p>';
        var thoops         = '<p class="notify-valid"><span><i class="icon ion-close-round"></i></span>Looks like something went wrong.<br>Please try again later.</p>';
        var thfake         = '<p class="notify-valid"><span><i class="icon ion-close-round"></i></span>This email address looks fake or invalid.<br>Please enter a real email address.</p>';
        var thavailability = '<p class="notify-valid"><span><i class="icon ion-close-round"></i></span>Service is not available at the moment.<br>Please check your internet connection or try again later.</p>';

        var i = e(this).find("input[name=email]");
        var s = e(this).attr("action");
        var o = e(this).find(".note");
        var thform = document.getElementById("notifyMe");

        e(this).on("submit", function(t) {
            t.preventDefault();

            window.clearTimeout(timeoutNews);
            timeoutNews = window.setTimeout(function(){explode();},4000);
                        
            var h = i.val();
            var p = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (p.test(h)) {
                $(".message").removeClass("error bad-email success-full");
                $(".message").hide().html('').fadeIn();
                $('#submit-form').html('Submitting <i class="fa fa-spinner fa-pulse fa-fw"></i>'); // Message displayed in the submit button during the sending
                o.show();
                e.ajax({
                    type: "POST",
                    url: s,
                    data: {
                        email: h
                    },
                    dataType: "json",
                    error: function(e) {
                        o.hide();
                        $('#submit-form').html('Subscribe Now!'); // Message displayed in the submit button if an error has occured
                        $(".block-message").addClass("show-block-error").removeClass("show-block-valid");
                        if (e.status === 404) {
                            $(".message").html(thavailability).fadeIn();

                            // window.clearTimeout(timeoutNews);
                            // timeoutNews = window.setTimeout(function(){explode();},4000);

                        } else {
                            $(".message").html(thoops).fadeIn();

                            // window.clearTimeout(timeoutNews);
                            // timeoutNews = window.setTimeout(function(){explode();},4000);
                        }
                    }
                }).done(function(e) {
                    o.hide();
                    if (e.status === "success") {
                        $('#submit-form').html('Sent!'); // Message displayed in the submit button during the sending
                        $(".message").removeClass("bad-email").addClass("success-full");
                        $(".block-message").addClass("show-block-valid").removeClass("show-block-error");
                        $(".message").html(thvalid).fadeIn();
                        thform.reset();

                        // window.clearTimeout(timeoutNews);
                        // timeoutNews = window.setTimeout(function(){explode();},4000);

                    } else {
                        if (e.type === "ValidationError") {
                            $('#submit-form').html('Subscribe Now!'); // Message displayed in the submit button if an error has occured
                            $(".block-message").addClass("show-block-error").removeClass("show-block-valid");
                            $(".message").html(thfake).fadeIn();

                            // window.clearTimeout(timeoutNews);
                            // timeoutNews = window.setTimeout(function(){explode();},4000);

                        } else {
                            $('#submit-form').html('Subscribe Now!'); // Message displayed in the submit button if an error has occured
                            $(".block-message").addClass("show-block-error").removeClass("show-block-valid");
                            $(".message").html(thoops).fadeIn();

                            // window.clearTimeout(timeoutNews);
                            // timeoutNews = window.setTimeout(function(){explode();},4000);

                        }
                    }

                    // window.clearTimeout(timeoutNews);
                    //     timeoutNews = window.setTimeout(function(){explode();},4000);
                });

            } else {
                $('#submit-form').html('Subscribe Now!'); // Message displayed in the submit button if an error has occured
                $(".message").addClass("bad-email").removeClass("success-full");
                $(".block-message").addClass("show-block-error").removeClass("show-block-valid");
                $(".message").html(thproblem).fadeIn();

                // window.clearTimeout(timeoutNews);
                // timeoutNews = window.setTimeout(function(){explode();},4000);

                o.hide();
            }

            $("#block-answer").addClass("").removeClass("show-block-valid show-block-error");

            // Reset and hide all messages on .keyup()
            // $("#notifyMe input").on('keyup keypress', function(e) {
            //     var code = e.keyCode || e.which;

            //     if (code === 13) { 
            //         e.preventDefault();
            //         $("#notifyMe").submit();
            //       } else {

            //         clearTimeout(myTimeout);

            //         $(".block-message").addClass("").removeClass("show-block-valid show-block-error");
            //         $(".message").fadeOut();
            //     }
            // });
        });
    };

})(jQuery);