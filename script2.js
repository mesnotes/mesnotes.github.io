var note = {
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
    note.startPic = {"img":"images/start.png","name":"go","clef":""};
    note.myPic = note.startPic;
    note.myPix = [
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
    note.etime = document.getElementById("note-time");
    note.erst = document.getElementById("note-rst");
    note.ego = document.getElementById("note-go");
    note.etips = document.getElementById("note-tips");
    note.esol = document.getElementById("note-sol");
    note.efa = document.getElementById("note-fa");
    note.esolfa = document.getElementById("note-solfa");
    note.eimg = document.getElementById("myPicture");

    // Attach listeners
    note.erst.addEventListener("click", note.reset);
    note.erst.disabled = false;

    note.ego.addEventListener("click", note.start);
    note.ego.addEventListener("click", note.choosePic);
    note.ego.disabled = false;
    note.ego.style.display="none";

    note.etips.addEventListener("click", note.showTips);
    note.etips.disabled = false;

    note.esol.style.display="inline";
    note.esol.addEventListener("click", note.start);
    note.esol.addEventListener("click", function(){note.myPix=note.myPix.filter(note.removeFa)});
    note.esol.addEventListener("click", note.choosePic);
    note.esol.addEventListener("click", note.hideClefs);
    note.esol.disabled = false;

    note.efa.style.display="inline";
    note.efa.addEventListener("click", note.start);
    note.efa.addEventListener("click", function(){note.myPix=note.myPix.filter(note.removeSol)});
    note.efa.addEventListener("click", note.choosePic);
    note.efa.addEventListener("click", note.hideClefs);
    note.efa.disabled = false;

    note.esolfa.style.display="inline";
    note.esolfa.addEventListener("click", note.start);
    note.esolfa.addEventListener("click", note.choosePic);
    note.esolfa.addEventListener("click", note.hideClefs);
    note.esolfa.disabled = false;

    note.eimg.addEventListener("click", note.start);
    note.eimg.addEventListener("click", note.choosePic);
    note.eimg.addEventListener("click", note.hideClefs);
    note.eimg.disabled = false;

    // preload for jedi players
    note.imagesInMemory = new Array();
    note.myPix.forEach(note.preload);

    // default css for elements
    note.eimg.style.visibility = 'visible';
    note.eimg.src = note.startPic.img;
    note.etime.style.fontSize = 'medium';
    note.etime.style.display = 'inline-block';
    note.etime.style.marginTop = '0px';

    // take shuffle pix
    // note.myRandom();
    note.shuffleArray(note.myPix);
    // document.getElementById("dataForDebug").innerHTML = JSON.stringify(note.myPix);

  },

  /* [ACTIONS] */
  preload : function(item,index){
    // preload() : preload images in memory for jedis

    // alert(item+" "+index);
    var image = new Image();
    image.src = item.img;
    note.imagesInMemory.push(image);
  },

  tick: function() {
    // tick() : update display if stopwatch running

    // Calculate hours, mins, seconds
    note.now++;
    var remain = note.now;
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
    note.etime.innerHTML = mins + ":" + secs;
  },

  start: function() {
    // start() : start the stopwatch

    if (note.timer == null) { // start only if stopwatch was stopped
      note.timer = setInterval(note.tick, 1000);
      note.ego.value = "\u275a\u275a"; //pause icon
      note.ego.removeEventListener("click", note.start);
      note.ego.addEventListener("click", note.stop);
    }
  },

  stop: function() {
    // stop() : stop the stopwatch

    clearInterval(note.timer);
    note.timer = null;
    note.ego.value = "\u25ba"; //start icon
    note.ego.removeEventListener("click", note.stop);
    note.ego.addEventListener("click", note.start);
  },

  reset: function() {
    // reset() : reset the stopwatch

    // Stop if running
    if (note.timer != null) {
      note.stop();
    }

    // Reset time
    note.now = -1;
    note.tick();

    // default init
    note.init();
  },


  choosePic: function() {

    note.eimg.style.visibility = 'visible';
    // document.getElementById("dataForDebug").innerHTML = JSON.stringify(note.myPix);
    //alert(note.myPix.length);
    if (note.myPix.length > 0) {
      //take the last pic
      note.eimg.src = note.myPix[note.myPix.length - 1].img;
      note.myPic = {
        "img":note.myPix[note.myPix.length - 1].img,
        "name":note.myPix[note.myPix.length - 1].name,
        "clef":note.myPix[note.myPix.length - 1].clef
      };
      //remove the last pic from note.myPix
      note.myPix.pop();
    } else {
      note.finishBeautifully();
    }
  },

  // myRandom: function() {
  //   note.myPix.sort(function(a, b) {
  //     // return Math.floor(Math.random() * note.myPix.length)
  //     return 0.5 - Math.random()
  //     // var randomNum = Math.floor(Math.random() * note.myPix.length);
  //   });
  //   document.getElementById("dataForDebug").innerHTML = note.myPix;
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
    note.eimg.style.visibility = 'hidden';
    note.etime.style.fontSize = '100px';
    note.etime.style.display = 'block';
    note.etime.style.marginTop = '100px';
    note.stop();
  },

  showTips : function() {
    note.etips.value = note.myPic.name;
    note.etips.style.fontSize = '3em';
    // note.etips.style.width = '50%';
    setTimeout(note.hideTips, 888);
  },

  hideTips : function(){
    note.etips.value = "?";
    note.etips.style.fontSize = 'medium';
  },

  hideClefs : function(){
    note.esol.style.display="none";
    note.efa.style.display="none";
    note.esolfa.style.display="none";
  },

  removeFa : function(myPix){
    return myPix.clef != "fa";
  },

  removeSol : function(myPix){
    return myPix.clef != "sol";
  }


};

window.addEventListener("load", note.init);

// Based on stopwatch code by Code Boxx
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
