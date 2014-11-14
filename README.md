#Console-Canvas

Console-Canvas allows you to use HTML5 Canvas commands to draw in your terminal/console. Outputs color ASCII characters instead of pixels.

##Example

    var canvas = require('console-canvas')
      , ansi = require('ansi')
      , ctx = canvas.getContext('2d')
      ;

    ctx.moveTo(0,0);
    ctx.lineTo(100,48);
