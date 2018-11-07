var resource = '/api/fortune/';
var corners = [{'top':-2,'left':-2},{'top':-2,'right':-2},{'bottom':-2,'left':-2},{'bottom':-2,'right':-2}];
var init = true;
var ftn; var input; var screen;


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

/* randomly plot the blue bleed things =^ . ^= */
function plot_corners(){
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

        ftn.append(o);
    });
}

function reset(){
    screen.removeClass('on');
    screen.one('transitionend', function (){
        screen.css('display','none');
    });

    ftn.find('span').remove();
    plot_corners();
    input.val('');
    input.focus();
    input.css({
     'font-size': ''
    });
}

$(function (){
    ftn = $('#fortune');
    input = $('#input');
    screen = $('#screen');

    var max = 50;
    input.on('keydown', function (evt){
        var words = input.val().split(' ').length;
        var s = Math.max(20, max - max * words/max);

        // scale down for mobile
        if (window.innerWidth <= 400) {
          s *= 0.75;
        }

        input.css({
            'font-size': s
        });

        if(evt.keyCode === 13 && !evt.shiftKey){
            evt.preventDefault();

            if (!window.confirm("Ready to submit?! \n(use shift + enter if you were trying to add new lines to your message)")) {
              return;
            }

            $.post(resource, {text:input.val()}, function (e){
                input.blur();
                screen.css('display','block');
                screen.addClass('on');
                var offset = 40;
                var pos = 0;
                var f=0;
                var animate = function (){
                    screen.css('background','linear-gradient(45deg, #FFF '+(f*100)+'%, rgba(255,255,255,0) '+((100*f)+offset)+'%)');

                    f = Ease.easeInOutQuad(pos/100);
                    pos+=1.25;

                    if(pos<100)
                        window.requestAnimationFrame(animate);
                    else
                        reset();

                }
                window.requestAnimationFrame(animate);
            });
        }
    });

    plot_corners();

    input.on('focus', function (){
        if(init)
            input.val('');
        init = false;
    })

    $(document).on('click',function (){
        input.focus();
    });
})