var image = null;
var image1 = null;
var image2 = null;
var image3 = null;
var image4 = null;
var grayImage = null;
var invImage = null;
var redImage = null;
var rainbowImage = null;
var blurredImage = null;
var imagefg = null;
var imagebg = null;
var canvas;
var canvas1;
var canvas2;
var canvas3;
var canvas4;
var canvas5;
var canvas6;
var canvas7;
function upload() {
    var fileInput = document.getElementById("finput");
    canvas = document.getElementById("can");
    image = new SimpleImage(fileInput);
    grayImage = new SimpleImage(fileInput);
    redImage = new SimpleImage(fileInput);
    rainbowImage = new SimpleImage(fileInput);
    blurredImage = new SimpleImage(fileInput);
    hide = new SimpleImage(fileInput);
    image.drawTo(canvas);
}
function upload1() {
    var fileInput1 = document.getElementById("finput1");
    canvas1 = document.getElementById("can1");
    image1 = new SimpleImage(fileInput1);
    start = new SimpleImage(fileInput1);
    image1.drawTo(canvas1);
}
function upload2() {
    var fileInput2 = document.getElementById("finput2");
    canvas3 = document.getElementById("can3");
    image2 = new SimpleImage(fileInput2);
    fromImage = new SimpleImage(fileInput2);
    image2.drawTo(canvas3);
}
function upload3() {
    var fileInput3 = document.getElementById("finput3");
    canvas5 = document.getElementById("can5");
    image3 = new SimpleImage(fileInput3);
    imagefg = new SimpleImage(fileInput3);
    image3.drawTo(canvas5);
}
function upload4() {
    var fileInput4 = document.getElementById("finput4");
    canvas6 = document.getElementById("can6");
    image4 = new SimpleImage(fileInput4);
    imagebg = new SimpleImage(fileInput4);
    image4.drawTo(canvas6);
}

function grayscale() {
    if(grayImage === null) {
        alert("Image unavailable to filter");
    }

    for(var pixel of grayImage.values()) {
        var average = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;

        pixel.setRed(average);
        pixel.setBlue(average);
        pixel.setGreen(average);
    }

    canvas = document.getElementById("can");
    grayImage.drawTo(canvas);
}
function inversion() {
    if(grayImage === null) {
        alert("Image unavailable to filter");
    }

    for(var pixel of grayImage.values()) {
        pixel.setRed(255 - pixel.getRed());
        pixel.setBlue(255 - pixel.getBlue());
        pixel.setGreen(255 - pixel.getGreen());
    }

    canvas = document.getElementById("can");
    grayImage.drawTo(canvas);
}

function redhaze() {
    if(redImage === null) {
        alert("Image unavailable to filter");
    }

    for(var pixel of redImage.values()) {
        var average = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;

        if(average < 128) {
            pixel.setRed(2 * average);
            pixel.setGreen(0);
            pixel.setBlue(0);
        } else {
            pixel.setRed(255);
            pixel.setGreen((2 * average) - 255);
            pixel.setBlue((2 * average) - 255);
        }
    }

    canvas = document.getElementById("can");
    redImage.drawTo(canvas);
}

function rainbow() {
    if(rainbowImage === null) {
        alert("Image unavailable to filter");
    }

    for(var pixel of rainbowImage.values()) {
        var average = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;

        if(pixel.getY() > (rainbowImage.getHeight() / 7)*6) {
            if(average < 128) {
                pixel.setRed(1.6 * average);
                pixel.setGreen(0);
                pixel.setBlue(1.6 * average);
            } else {
                pixel.setRed(0.4 * average + 153);
                pixel.setGreen(2 * average - 255);
                pixel.setBlue(0.4 * average + 153);
            }
        } else if(pixel.getY() > (rainbowImage.getHeight() / 7)*5) {
            if(average < 128) {
                pixel.setRed(0.8 * average);
                pixel.setGreen(0);
                pixel.setBlue(2 * average);
            } else {
                pixel.setRed(1.2 * average - 51);
                pixel.setGreen(2 * average - 255);
                pixel.setBlue(255);
            }
        } else if(pixel.getY() > (rainbowImage.getHeight() / 7)*4) {
            if(average < 128) {
                pixel.setRed(0);
                pixel.setGreen(0);
                pixel.setBlue(2 * average);
            } else {
                pixel.setRed(2 * average - 255);
                pixel.setGreen(2 * average - 255);
                pixel.setBlue(255);
            }
        } else if(pixel.getY() > (rainbowImage.getHeight() / 7)*3) {
            if(average < 128) {
                pixel.setRed(0);
                pixel.setGreen(2 * average);
                pixel.setBlue(0);
            } else {
                pixel.setRed(2 * average - 255);
                pixel.setGreen(255);
                pixel.setBlue(2 * average - 255);
            }
        } else if(pixel.getY() > (rainbowImage.getHeight() / 7)*2) {
            if(average < 128) {
                pixel.setRed(2 * average);
                pixel.setGreen(2 * average);
                pixel.setBlue(0);
            } else {
                pixel.setRed(255);
                pixel.setGreen(255);
                pixel.setBlue(2 * average - 255);
            }
        } else if(pixel.getY() > (rainbowImage.getHeight() / 7)*1) {
            if(average < 128) {
                pixel.setRed(2 * average);
                pixel.setGreen(0.8 * average);
                pixel.setBlue(0);
            } else {
                pixel.setRed(255);
                pixel.setGreen(1.2 * average - 51);
                pixel.setBlue(2 * average - 255);
            }
        } else {
            if(average < 128) {
                pixel.setRed(2 * average);
                pixel.setGreen(0);
                pixel.setBlue(0);
            } else {
                pixel.setRed(255);
                pixel.setGreen(2 * average - 255);
                pixel.setBlue(2 * average - 255);
            }
        }
    }

    canvas = document.getElementById("can");
    rainbowImage.drawTo(canvas);
}

function reset() {
    canvas = document.getElementById("can");
    image.drawTo(canvas);
    
}
function doBlur() 
{   
    blur();
    blurredImage.drawTo(canvas);
}

function ensureInImage (coordinate, size) 
{
  if (coordinate < 0) 
  {
    return 0;
  }
  if (coordinate >= size) 
  {
    return size - 1;
  }
  return coordinate;
}

function getPixelNearby (blurredImage, x, y, radius) 
{
  var dx = (Math.random() * 2 * radius) - radius;
  var dy = (Math.random() * 2 * radius) - radius;
  var nx = ensureInImage(x + dx, blurredImage.getWidth());
  var ny = ensureInImage(y + dy, blurredImage.getHeight());
  return blurredImage.getPixel(nx, ny);
}

function blur() 
{

  for (var pixel of blurredImage.values()) 
    {
      var x = pixel.getX();
      var y = pixel.getY();
      if (Math.random() > 0.5) 
      {
        var other = getPixelNearby(blurredImage, x, y, 10);
        blurredImage.setPixel(x, y, other);
      }
    }
}
function cropImage(image, width, height) {
    var newImage = new SimpleImage(width, height);
    
    for(var pixel of image.values()) {
        if(pixel.getY() < height && pixel.getX() < width) {
            newImage.setPixel(pixel.getX(), pixel.getY(), pixel);
        }
    }

    return newImage;
}

function chopToHide(image) {
    for(var pixel of image.values()) {
        pixel.setRed(clearBits(pixel.getRed()));
        pixel.setGreen(clearBits(pixel.getGreen()));
        pixel.setBlue(clearBits(pixel.getBlue()));
    }
    
    return image;
}

function clearBits(colorval) {
    var x = Math.floor(colorval/16)*16;
    return x;
}

function shift(image) {
    for(var pixel of image.values()) {
        pixel.setRed(pixel.getRed() / 16);
        pixel.setGreen(pixel.getGreen() / 16);
        pixel.setBlue(pixel.getBlue() / 16);
    }
    
    return image;
}

function combine(show, hide) {
    var answer = new SimpleImage(show.getWidth(), show.getHeight());
    
    for(var pixel of answer.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        
        var showPixel = show.getPixel(x, y);
        var hidePixel = hide.getPixel(x, y);
        
        pixel.setRed(showPixel.getRed() + hidePixel.getRed());
        pixel.setGreen(showPixel.getGreen() + hidePixel.getGreen());
        pixel.setBlue(showPixel.getBlue() + hidePixel.getBlue());
    }
    
    return answer;
}
function test_extract(fromImage){
    var extracted = new SimpleImage(fromImage.getWidth(), fromImage.getHeight());
    for(var px of fromImage.values()){
        var x = px.getX();
        var y = px.getY();
        var newPixel = extracted.getPixel(x,y);
        var oldPixel = fromImage.getPixel(x,y);
        var r1 = oldPixel.getRed();
        var b1 = oldPixel.getBlue();
        var g1 = oldPixel.getGreen();
        newPixel.setRed((r1 & 15) * 16);
        newPixel.setBlue((b1 & 15) * 16);
        newPixel.setGreen((g1 & 15) * 16);
    }
    return extracted;
}
function composite() {
  if (imagebg.getHeight() !== imagefg.getHeight() || imagebg.getWidth()!== imagefg.getWidth()) {
   imagebg.setSize(imagefg.getWidth(), imagefg.getHeight());}
   var result = new SimpleImage (imagefg.getWidth(), imagefg.getHeight()); 
   for (var pixel of imagefg.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
     if (pixel.getGreen() > pixel.getRed()+pixel.getBlue()) {
      var pixelbg = imagebg.getPixel(x,y);
      result.setPixel(x,y,pixelbg);
      }  
     else {
      result.setPixel(x,y,pixel); 
      }
    }
   return result;
  }

function greenscreen() {
 if (imagefg == null||!imagefg.complete()) {
   alert("foreground not loaded");
   return;
   }
 if (imagebg == null|| !imagebg.complete ()) {
   alert ("background not loaded");
   return;
   }  
 else {
   
  var final = composite();
  canvas7 = document.getElementById('can7');
  final.drawTo(canvas7);
 } 
}
    
