$(function() {
    particlesJS("network-background", {
        "particles": {
            "number": {
                "value": 120
            },
            "color": {
                "value": "#ffffff"
            },
            "opacity": {
                "value": 0.3,
                "random": true
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.1,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "bounce"
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                    "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.2
                    }
                },
                "push": {
                    "particles_nb": 1
                }
            }
        },
        "retina_detect": true
    });
});