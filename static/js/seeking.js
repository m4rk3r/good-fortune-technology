var corners = [{'top':0,'left':0},{'top':0,'right':0},{'bottom':0,'left':0},{'bottom':0,'right':0}];
var template;

var fortunes = [];


/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
   https://gist.github.com/gre/1650294
 */
Ease = {
  // no easing, no acceleration
  linear: function (t) { return t },
  // accelerating from zero velocity
  easeInQuad: function (t) { return t*t },
  // decelerating to zero velocity
  easeOutQuad: function (t) { return t*(2-t) },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
  // accelerating from zero velocity
  easeInCubic: function (t) { return t*t*t },
  // decelerating to zero velocity
  easeOutCubic: function (t) { return (--t)*t*t+1 },
  // acceleration until halfway, then deceleration
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
  // accelerating from zero velocity
  easeInQuart: function (t) { return t*t*t*t },
  // decelerating to zero velocity
  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
  // accelerating from zero velocity
  easeInQuint: function (t) { return t*t*t*t*t },
  // decelerating to zero velocity
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
  // acceleration until halfway, then deceleration
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
}

function fit_type(obj){
    var max = 50;
    var words = obj.text().split(' ').length;
    var s = Math.max(15,max - max * words/max);
    obj.css({
        'font-size': s
    });
}

function plot_corners(obj){
    _(corners).each(function (c){
        /* 33% chance not visible */
        if(_.random(2)===2)return;
        var h = _.random(10,30);
        var w = _.random(40,100);
        var o = $('<span class="bleed" />');
        o.css(c);

        /* 20% chance for vertical */
        if(_.random(5)===5)
            o.css({width:h,height:w});
        else
            o.css({width:w,height:h});

        obj.append(o);
    });
}

function transformer(x,y,r,s) {
    return 'translate('+x+'px, '+y+'px) '+
           'rotate('+r+'deg) '+
           'scale('+s+','+s+')';
}

function generate_fortune() {
    var ftn = $(template({fortune:_.sample(fortunes).text.replace('\n','<BR>')}));
    fit_type(ftn.find('p'));
    plot_corners(ftn.find('.container'));
    $('body').append(ftn);

    // appear
    setTimeout(function (){
        ftn.addClass('appear');
    },50);

    var _h = window.innerHeight/2;
    var _w = window.innerWidth/2;
    var x = _.random(-_w,_w); var y = _.random(-_h,_h);
    var r = _.random(-45,45);
    var s = 0.125;
    var s2 = 0.08;


    setTimeout(function (){
        // fall
        setTimeout(function (){
            ftn.css('transform',transformer(x,y,r,s));

            // sink
            ftn.one('transitionend', function (){
                ftn.addClass('sink');
                ftn.one('transitionend', function (){
                    // fully submerge
                    ftn.addClass('sank');

                    // sink to bottom
                    ftn.one('transitionend', function (){
                        setTimeout(function (){
                            ftn.addClass('sunk');
                            ftn.css('transform',transformer(x,y,r,s2));
                        },850);
                    })
                });
            })
        },1000);
    }, 5000);
}


$(function (){
    template = _.template($('#fortune-template').html());
    //$(document).on('click',generate_fortune);

    $.getJSON('/api/fortune/', function (data){
        fortunes = data;
        generate_fortune();
    });

    setInterval(generate_fortune, 20000);

    setInterval(function (){
        $.getJSON('/api/fortune/', function (data){
            fortunes = data;
        });
    }, 1000 * 60);

});