var sw = {
  /* [INIT] */
  etime: null, // holds HTML time display
  erst: null, // holds HTML reset button
  ego: null, // holds HTML start/stop button
  etips: null, // holds HTML tips button
  esol: null, // holds HTML sol button
  efa: null, // holds HTML fa button
  esolfa: null, // holds HTML solfa button
  eimg: null, // holds HTML img
  timer: null, // timer object
  now: 0, // current timer
  myPix: null,
  startPic: null,
  imagesInMemory : null,
  myPic: null,


  init: function() {
    // Prepare pictures
    sw.startPic = {"img":"images/start.png","name":"go","clef":""};
    sw.myPic = sw.startPic;
    sw.myPix = [
      {"img":"images/notes/note001.png","name":"sol","clef":"sol"},
      {"img":"images/notes/note002.png","name":"la","clef":"sol"},
      {"img":"images/notes/note003.png","name":"si","clef":"sol"},
      {"img":"images/notes/note004.png","name":"do","clef":"sol"},
      {"img":"images/notes/note005.png","name":"ré","clef":"sol"},
      {"img":"images/notes/note006.png","name":"mi","clef":"sol"},
      {"img":"images/notes/note007.png","name":"fa","clef":"sol"},
      {"img":"images/notes/note008.png","name":"sol","clef":"sol"},
      {"img":"images/notes/note009.png","name":"la","clef":"sol"},
      {"img":"images/notes/note010.png","name":"si","clef":"sol"},
      {"img":"images/notes/note011.png","name":"do","clef":"sol"},
      {"img":"images/notes/note012.png","name":"ré","clef":"sol"},
      {"img":"images/notes/note013.png","name":"mi","clef":"sol"},
      {"img":"images/notes/note014.png","name":"fa","clef":"sol"},
      {"img":"images/notes/note015.png","name":"sol","clef":"sol"},
      {"img":"images/notes/note016.png","name":"la","clef":"sol"},
      {"img":"images/notes/note017.png","name":"si","clef":"sol"},
      {"img":"images/notes/note018.png","name":"do","clef":"sol"},
      {"img":"images/notes/note019.png","name":"do","clef":"fa"},
      {"img":"images/notes/note020.png","name":"ré","clef":"fa"},
      {"img":"images/notes/note021.png","name":"mi","clef":"fa"},
      {"img":"images/notes/note022.png","name":"fa","clef":"fa"},
      {"img":"images/notes/note023.png","name":"sol","clef":"fa"},
      {"img":"images/notes/note024.png","name":"la","clef":"fa"},
      {"img":"images/notes/note025.png","name":"si","clef":"fa"},
      {"img":"images/notes/note026.png","name":"do","clef":"fa"},
      {"img":"images/notes/note027.png","name":"ré","clef":"fa"},
      {"img":"images/notes/note028.png","name":"mi","clef":"fa"}
    ];

    // Get HTML elements
    sw.etime = document.getElementById("sw-time");
    sw.erst = document.getElementById("sw-rst");
    sw.ego = document.getElementById("sw-go");
    sw.etips = document.getElementById("sw-tips");
    sw.esol = document.getElementById("sw-sol");
    sw.efa = document.getElementById("sw-fa");
    sw.esolfa = document.getElementById("sw-solfa");
    sw.eimg = document.getElementById("myPicture");

    // Attach listeners
    sw.erst.addEventListener("click", sw.reset);
    sw.erst.disabled = false;

    sw.ego.addEventListener("click", sw.start);
    sw.ego.addEventListener("click", sw.choosePic);
    sw.ego.disabled = false;
    sw.ego.style.display="none";

    sw.etips.addEventListener("click", sw.showTips);
    sw.etips.disabled = false;

    sw.esol.style.display="inline";
    sw.esol.addEventListener("click", sw.start);
    sw.esol.addEventListener("click", function(){sw.myPix=sw.myPix.filter(sw.removeFa)});
    sw.esol.addEventListener("click", sw.choosePic);
    sw.esol.addEventListener("click", sw.hideClefs);
    sw.esol.disabled = false;

    sw.efa.style.display="inline";
    sw.efa.addEventListener("click", sw.start);
    sw.efa.addEventListener("click", function(){sw.myPix=sw.myPix.filter(sw.removeSol)});
    sw.efa.addEventListener("click", sw.choosePic);
    sw.efa.addEventListener("click", sw.hideClefs);
    sw.efa.disabled = false;

    sw.esolfa.style.display="inline";
    sw.esolfa.addEventListener("click", sw.start);
    sw.esolfa.addEventListener("click", sw.choosePic);
    sw.esolfa.addEventListener("click", sw.hideClefs);
    sw.esolfa.disabled = false;

    sw.eimg.addEventListener("click", sw.start);
    sw.eimg.addEventListener("click", sw.choosePic);
    sw.eimg.addEventListener("click", sw.hideClefs);
    sw.eimg.disabled = false;

    // preload for jedi players
    sw.imagesInMemory = new Array();
    sw.myPix.forEach(sw.preload);

    // default css for elements
    sw.eimg.style.visibility = 'visible';
    sw.eimg.src = sw.startPic.img;
    sw.etime.style.fontSize = 'medium';
    sw.etime.style.display = 'inline-block';
    sw.etime.style.marginTop = '0px';

    // take shuffle pix
    // sw.myRandom();
    sw.shuffleArray(sw.myPix);
    // document.getElementById("dataForDebug").innerHTML = JSON.stringify(sw.myPix);

  },

  /* [ACTIONS] */
  preload : function(item,index){
    // preload() : preload images in memory for jedis

    // alert(item+" "+index);
    var image = new Image();
    image.src = item.img;
    sw.imagesInMemory.push(image);
  },

  tick: function() {
    // tick() : update display if stopwatch running

    // Calculate hours, mins, seconds
    sw.now++;
    var remain = sw.now;
    var hours = Math.floor(remain / 3600);
    remain -= hours * 3600;
    var mins = Math.floor(remain / 60);
    remain -= mins * 60;
    var secs = remain;

    // Update the display timer
    if (mins < 10) {
      mins = "0" + mins;
    }
    if (secs < 10) {
      secs = "0" + secs;
    }
    sw.etime.innerHTML = mins + ":" + secs;
  },

  start: function() {
    // start() : start the stopwatch

    if (sw.timer == null) { // start only if stopwatch was stopped
      sw.timer = setInterval(sw.tick, 1000);
      sw.ego.value = "\u275a\u275a"; //pause icon
      sw.ego.removeEventListener("click", sw.start);
      sw.ego.addEventListener("click", sw.stop);
    }
  },

  stop: function() {
    // stop() : stop the stopwatch

    clearInterval(sw.timer);
    sw.timer = null;
    sw.ego.value = "\u25ba"; //start icon
    sw.ego.removeEventListener("click", sw.stop);
    sw.ego.addEventListener("click", sw.start);
  },

  reset: function() {
    // reset() : reset the stopwatch

    // Stop if running
    if (sw.timer != null) {
      sw.stop();
    }

    // Reset time
    sw.now = -1;
    sw.tick();

    // default init
    sw.init();
  },


  choosePic: function() {

    sw.eimg.style.visibility = 'visible';
    // document.getElementById("dataForDebug").innerHTML = JSON.stringify(sw.myPix);
    //alert(sw.myPix.length);
    if (sw.myPix.length > 0) {
      //take the last pic
      sw.eimg.src = sw.myPix[sw.myPix.length - 1].img;
      sw.myPic = {
        "img":sw.myPix[sw.myPix.length - 1].img,
        "name":sw.myPix[sw.myPix.length - 1].name,
        "clef":sw.myPix[sw.myPix.length - 1].clef
      };
      //remove the last pic from sw.myPix
      sw.myPix.pop();
    } else {
      sw.finishBeautifully();
    }
  },

  // myRandom: function() {
  //   sw.myPix.sort(function(a, b) {
  //     // return Math.floor(Math.random() * sw.myPix.length)
  //     return 0.5 - Math.random()
  //     // var randomNum = Math.floor(Math.random() * sw.myPix.length);
  //   });
  //   document.getElementById("dataForDebug").innerHTML = sw.myPix;
  // },
  shuffleArray : function(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
  },

  finishBeautifully: function() {
    sw.eimg.style.visibility = 'hidden';
    sw.etime.style.fontSize = '100px';
    sw.etime.style.display = 'block';
    sw.etime.style.marginTop = '100px';
    sw.stop();
  },

  showTips : function() {
    sw.etips.value = sw.myPic.name;
    sw.etips.style.fontSize = '3em';
    // sw.etips.style.width = '50%';
    setTimeout(sw.hideTips, 888);
  },

  hideTips : function(){
    sw.etips.value = "?";
    sw.etips.style.fontSize = 'medium';
  },

  hideClefs : function(){
    sw.esol.style.display="none";
    sw.efa.style.display="none";
    sw.esolfa.style.display="none";
  },

  removeFa : function(myPix){
    return myPix.clef != "fa";
  },

  removeSol : function(myPix){
    return myPix.clef != "sol";
  }


};

window.addEventListener("load", sw.init);

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// LICENSE
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//
// Copyright 2018 by Code Boxx
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
