$(document).ready(function(){
    $('#carousel').carousel({
        dist: -300,
        padding: 300,
        onCycleTo: function(slide) {
            currentIndex = $(slide).index();
            updateText();
        }
    });

    var currentIndex = 0;

    function updateText() {
        var text = '';

        switch (currentIndex) {
            case 0:
                text = 'Friches';
                break;
            case 1:
                text = 'Montagnes';
                break;
            case 2:
                text = 'Villes';
                break;
        }

        $('#carousel-text').html(text);
    }
});
