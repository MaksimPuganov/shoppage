var sliderWidget =(function() {

    var _insertValues = function ($this) {
        var
            container = $this.closest('.filter__slider'),
            from = container.find('.filter__slider_from'),
            to =  container.find('.filter__slider_to');

        var values = $this.slider('option','values');

        from.val(values[0]);
        to.val(values[1]);
    }

    return {
        init: function() {

            $('.filter__slider-element').each(function () {
                var
                    $this = $(this),
                    min = parseInt($this.data('min')),
                    max = parseInt($this.data('max'));


                $this.slider({
                    range: true,
                    min: min,
                    max: max,
                    values: [ min, max ],
                    slide: function( ) {
                        _insertValues($this);
                    },
                    create: function(){
                        _insertValues($this);
                    }
                });
            });
        }
    }
}());


var ratingWidget = (function () {

    var _letTheStars = function (ratingAmount) {
        var
            starsArray = [];

        for (var i = 0; i < 5; i++) {
            var
                starClassName = (i < ratingAmount) ? 'products_rating-stars-item products_rating-stars-item_filled' : 'products_rating-stars-item';

            var
                star = $('<li>', {
                   class: starClassName
                });

            starsArray.push(star);
        }

        return starsArray;
    }

    var _generateMarkup = function (ratingAmount, elemToAppend) {
        var
            ul = $('<ul>', {
                class : 'products_rating-stars',
                html : _letTheStars(ratingAmount)
            });

        var
            ratingDiv = $('<div>', {
                class: 'products_rating-count',
                text: ratingAmount
            });

        elemToAppend.append([ul, ratingDiv]);
    };

    return {
        init: function () {
            $('.products__rating').each(function () {
                var
                    $this = $(this),
                    ratingAmount = parseInt($this.data('rating'));

                _generateMarkup(ratingAmount, $this);
            });
        }
    }
}());

var viewStateChange = (function () {

    var _prevClass = '';
    
    var _changeState = function ($this) {
        var
            item = $this.closest('.sort__view-item'),
            view = item.data('view'),
            listOfItems = $('#products-list'),
            modPrefix = 'products__',
            classOfViewState = modPrefix + view;

        if(_prevClass == '') {
            _prevClass = listOfItems.attr('class');
        }

        _changeActiveClass($this);
        listOfItems.attr('class', _prevClass + ' ' + classOfViewState);
    };

    var _changeActiveClass = function ($this) {
        $this.closest('.sort__view-item').addClass('active')
            .siblings().removeClass('active');
    };

    return {
        init : function () {
            $('.sort__view-link').on('click', function (e) {
                e.preventDefault();
                _changeState($(this));
            })
        }
    }
}());

$(document).ready(function() {

    viewStateChange.init();

    if ($('.products__rating').length) {
        ratingWidget.init();
    }

    if ($('.filter__slider-element').length) {
        sliderWidget.init();
    }

    if ($('.sort__select-elem').length) {
        $('.sort__select-elem').select2({
            minimumResultsForSearch: Infinity
        });
    }

});