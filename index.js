#!/usr/bin/env node

(function() {

  // Requires
  var ansi = require('ansi')
    , cursor = ansi(process.stdout)
    ;



    
  //// Main Canvas Object ////////////////////////////////////////////////////
  function Canvas2D(){


    // Draw a pixel if it's within rows/cols of the console/terminal
    // 1-indexed (no 0-indexed), checks actual console output to nothing gets
    // mangled in the display
    function pixel (x, y, char, r, g, b){
      if(!(
          x < 1             || y < 1          ||
          x > stdo.columns  || y > stdo.rows  ||
          x < 1             || y < 1          ||
          x > stdo.columns  || y > stdo.rows
      )){

          cursor.bg.rgb(r, g, b)
            .fg.rgb(r, g, b)
              .goto(parseInt(x), parseInt(y))
                .write(char || defaultChar)
                ;
      }
    }      


    // Draw a point to the pixel array (pixel arry gets flushed to screen)
    // 0-indexed because its an array of pixels (1D ary)
    // have to make sure the pixel is within the array
    function point (x, y){
      x = parseInt(x);
      y = parseInt(y);

      if(!(
          x < 0     || y < 0    ||
          x > cols  || y > rows ||
          x < 0     || y < 0    ||
          x > cols  || y > rows
      )){

       pixels[y*cols+x] = color;
      }
    }


    // Get in interpolation point between two points at a given magnitude
    function lerp (p1, p2, m) {
      return ((p2 - p1) * m) + p1;
    };



    // Get the distance between two points
    function dist (x1, y1, x2, y2){
      return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
    }



    // Get all the points along a line and draw them
    function line (x1, y1, x2, y2) {
      var D = dist(x1, y1, x2, y2);

      for(var i=0; i< D; i++){
        var m = 1 / D * i
          , x = lerp(x1, x2, m)
          , y = lerp(y1, y2, m)
          ;
        point(x, y);
      }
    }


    // Flush the pixel array to the console
    function draw(){
      var x, y, i, iPixel, r, g, b;
      
      for (i=0; i< pixels.length; i++) {
        x = i%cols;
        y = Math.floor(i/cols);
        iPixel = pixels[i];

        if (iPixel){
          r = iPixel.r;
          g = iPixel.g;
          b = iPixel.b;
          console.log(r, g, b);
        } else {
          r = g = b = 0;
        }
        
        pixel(x, y, defaultChar, r, g, b);
      }

      cursor.reset();
    }



    //
    var stdo = process.stdout
      , cols = stdo.columns
      , rows = stdo.rows
      , cursorX = 0
      , cursorY = 0
      , defaultChar = '█'
      , pixels = new Array(cols*rows)
      , color = {
          r: 255,
          g: 255,
          b: 255 
        }
      ;

    // console.log(cols, rows);


    // Return the Canvas Context Interface
    return {

      width: process.stdout.columns,
      height: process.stdout.rows,
      fillStyle: "#000",
      strokeStyle: "#F00",
      
      moveTo: function(x, y){
        cursorX = x;
        cursorY = y;
      },

      lineTo: function(x, y){
        line(cursorX, cursorY, x, y);
        this.moveTo(x, y);
        draw();
      },

      pixels: pixels

    }
  };


  //// Export Canvas Object //////////////////////////////////////////////////
  module.exports.getContext = function(contextType){
    return new Canvas2D();
  }

}());


  // // Globals
  // var cols = process.stdout.columns
  //   , rows = process.stdout.rows
  //   , cos = Math.cos
  //   , sin = Math.sin
  //   ;



  


  


