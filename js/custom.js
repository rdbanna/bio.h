$(document).ready(function () {
    "use strict";
    /*=========================================================================
     Preloader
     =========================================================================*/
    $(window).on("load", function () {

        /*======== Preloder ===========*/
        setTimeout(function () {
            $('body').addClass('loaded');
        }, 1500);
    });
    /*=========================================================================
            Mobile  Menu 
    =========================================================================*/
    $(".mobile-menu").on( 'click', function() {
        $('nav').toggleClass('animate');
        $('.wrapper').toggleClass('animate');
        $('.bar').toggleClass('animate');
    });


    /*=========================================================================
     Home page auto type
     =========================================================================*/
    var TxtType = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 1e3;
        this.txt = "";
        this.tick();
        this.isDeleting = false
    };
    TxtType.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1)
        }
        else {
            this.txt = fullTxt.substring(0, this.txt.length + 1)
        }
        this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";
        var that = this;
        var delta = 150 - Math.random() * 100;
        if (this.isDeleting) {
            delta /= 2
        }
        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true
        }
        else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500
        }
        setTimeout(function () {
            that.tick()
        }, delta)
    };
    window.onload = function () {
        var elements = document.getElementsByClassName("typewrite");
        for (var i = 0; i < elements.length; i++) {
            var toRotate = elements[i].getAttribute("data-type");
            var period = elements[i].getAttribute("data-period");
            if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period)
            }
        }
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.02em solid #333}";
        document.body.appendChild(css);
    };
    /*=========================================================================
     statistic-number / counter /
     =========================================================================*/
    $(".statistic-number").each(function () {
        $(this).prop("Counter", 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4e3
            , easing: "swing"
            , step: function (now) {
                $(this).text(Math.ceil(now))
            }
        })

    });
    /*=========================================================================
     Portfolio filter
     =========================================================================*/

    $(".grid").imagesLoaded(function () {
		$(".portfolio-menu").on("click", "li", function () {
			var filterValue = $(this).attr("data-filter");
			$grid.isotope({
				filter: filterValue
			})
		});
		var $grid = $(".grid").isotope({
			itemSelector: ".grid-item",
			percentPosition: true,
			masonry: {
				columnWidth: ".grid-item"
			}
		})
	});
	$(".portfolio-menu li").on("click", function (event) {
		$(this).siblings(".active").removeClass("active");
		$(this).addClass("active");
		event.preventDefault()
	});
    /*=========================================================================
     Magnific Popup Functions
     =========================================================================*/
    $(".portfolio-lightbox").magnificPopup({
        type: "image",
        gallery: {
            enabled: true
        }
    });
    /*=========================================================================
     Carousels / Testimonials (Reviews) /
     =========================================================================*/

    $("#testimonial-slider").owlCarousel({
        items: 1,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [1000, 1],
        itemsTablet: [767, 1],
        pagination: false,
        navigation: true,
        navigationText: ["", ""],
        slideSpeed: 1000,
        autoPlay: true
    });


    /* ========================================================================= */
    /*   Contact Form Validating
     /* ========================================================================= */

    $("#contact-submit").on("click", function (e) {
        //stop the form from being submitted
        e.preventDefault();
        var error = false;
        var name = $("#name").val();
        var email = $("#email").val();
        var subject = $("#subject").val();
        var message = $("#message").val();
        if (name.length == 0) {
            var error = true;
            $("#name").css("border-color", "#D8000C")
        }
        else {
            $("#name").css("border-color", "#666")
        }
        if (email.length == 0 || email.indexOf("@") == "-1") {
            var error = true;
            $("#email").css("border-color", "#D8000C")
        }
        else {
            $("#email").css("border-color", "#666")
        }
        if (subject.length == 0) {
            var error = true;
            $("#subject").css("border-color", "#D8000C")
        }
        else {
            $("#subject").css("border-color", "#666")
        }
        if (message.length == 0) {
            var error = true;
            $("#message").css("border-color", "#D8000C")
        }
        else {
            $("#message").css("border-color", "#666")
        }
        if (error == false) {
            $("#contact-submit").attr({
                disabled: "false"
                , value: "Sending..."
            });
            $.post("sendmail.php", $("#contact-form").serialize(), function (result) {
                if (result == "sent") {
                    $("#cf-submit").remove();
                    $("#mail-success").fadeIn(500)
                }
                else {
                    $("#mail-fail").fadeIn(500);
                    $("#contact-submit").removeAttr("disabled").attr("value", "Send The Message")
                }
            })
        }
    });
})