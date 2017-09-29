/**
 * Created by Digital Awesome
 * https://digitalaweso.me
 * User: Oren Reuveni
 * Date: 15/07/2017
 * Time: 6:27
 */
$(document).ready(function () {

    /*
     * This is where you set up the location of the pin on the map
     * Enter your office's longtitude and latitude in the line below:
     */
    var office = {lat: 40.748541, lng: -73.985758};

    //Send email
    $('.contact-form').on('submit', function (e) {
        e.preventDefault()
        $('.message-status ').text("")
        $('.spinner-overlay').addClass('loading')
        var data = $('.contact-form').serialize()


        $.post("/mail/index.php", data, function (response) {
            if(response.success) {
                $('.message-status ').text("Your message was sent successfuly")
                $('.contact-form').find("input[type=text], textarea").val("");
            } else  {
                $('.message-status ').text("There was a problem sending your message, please try again later.")
            }
            $('.spinner-overlay').removeClass('loading')

            }, 'json')
            .fail(function (error) {
                $('.message-status ').text("There was a problem sending your message, please try again later.")
                $('.spinner-overlay').removeClass('loading')
            })
        ;
    })


    //Toggle mobile menu
    $('.hamburger').on('click', function () {
        $(this).toggleClass('is-active');

        if ($('#navbar').hasClass('roll-out')) {
            $('#navbar').removeClass('roll-out').addClass('roll-in');
            setTimeout(function () {
                $('#navbar').removeClass('open')
            }, 290)
        } else {
            $('#navbar').removeClass('roll-in').addClass('open roll-out');
        }
    })

    //Close menu when nav-items are clicked
    $('#navbar .navbar-nav .nav-item').on('click', function() {
        $('.hamburger').removeClass('is-active')
        $('#navbar').removeClass('roll-out').addClass('roll-in');
        setTimeout(function () {
            $('#navbar').removeClass('open')
        }, 290)
    })



    // init Isotope
    var $grid = $('.grid').isotope();
    $grid.imagesLoaded().progress( function() {
        $grid.isotope('layout');
    });

    // filter items on button click
    $('.filter-button-group').on('click', 'button', function () {
        $('.filter-button-group button').removeClass('active');
        $(this).addClass('active');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({filter: filterValue});
    });


    //Initialize Testimonials Carousel
    $('.testimonials-div').slick({
        dots: true,
        arrows: false,
        autoplay: true
    });


    initMap(office);
})


//Initialize Google Maps
function initMap(office) {
    var center;
    if (window.screen.width > 450) {
        center = {lat: office.lat + 0.003, lng: office.lng - 0.007};
    } else {
        center = {lat: office.lat + 0.007, lng: office.lng};
    }
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: center,
        styles: mapStyle,
        disableDefaultUI: true,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false
    });
    var marker = new google.maps.Marker({
        position: office,
        icon: '/images/map-pin.png',
        map: map
    });
}

var mapStyle = [
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e9e9e9"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#333333"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    }
]

//Smooth Scrolling
$('a[href*="#"]')
// Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });