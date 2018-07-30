String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function renderBulletPoints(container, lst, title, description) {
  var wrapper = document.createElement("div");
  wrapper.className = 'bp';

  var h3 = document.createElement("h3");
  var desc = document.createElement("p");

  var ul = document.createElement("ul");
  lst.forEach(function(l) {
    var li = document.createElement("li");
    li.innerHTML = l.replaceAll('\n', '<br />');
    ul.appendChild(li);
  })

  if (title) h3.innerHTML = title.replaceAll('\n', '<br />');
  if (description) desc.innerHTML = description.replaceAll('\n', '<br />');

  if (title) wrapper.appendChild(h3);
  if (description) wrapper.appendChild(desc);

  wrapper.appendChild(ul);
  container.appendChild(wrapper);
}

function renderRunnable(container, id, code, preview, title, description) {
  var wrapper = document.createElement("div");
  var input = document.createElement("textarea");
  var button = document.createElement("button");
  var pre = document.createElement("pre");
  var results = document.createElement("div");
  var h3 = document.createElement("h3");
  var desc = document.createElement("p");

  wrapper.className = 'code';
  pre.innerHTML = preview;

  input.name = id;
  input.cols = "40";
  input.rows = "6";
  input.value = code;
  input.id = id;

  results.id = id + '-output';

  button.type = 'button';
  button.innerHTML = 'Run';

  button.onclick = function() {
    evaluateClear(id);
  }

  if (title) h3.innerHTML = title.replaceAll('\n', '<br />');
  if (description) desc.innerHTML = description.replaceAll('\n', '<br />');

  if (title) wrapper.appendChild(h3);
  if (description) wrapper.appendChild(desc);
  if (preview) wrapper.appendChild(pre);

  var inputWrapper = document.createElement("div");
  inputWrapper.className = 'inputWrapper';
  inputWrapper.appendChild(input);
  inputWrapper.appendChild(results);
  wrapper.appendChild(inputWrapper);
  wrapper.appendChild(button);

  container.appendChild(wrapper);
}

function renderSpacer() {
  var wrapper = document.createElement("div");
  wrapper.className = 'spacer';
  return wrapper;
}


function renderTest(container, id, code, preview, solution, title, description) {
  var wrapper = document.createElement("div");
  var input = document.createElement("textarea");
  var button = document.createElement("button");
  var pre = document.createElement("pre");
  var results = document.createElement("div");
  var h3 = document.createElement("h3");
  var desc = document.createElement("p");
  var solutionPre = document.createElement("pre");
  var solutionButton = document.createElement("button");

  wrapper.className = 'code';
  pre.innerHTML = preview;

  input.name = id;
  input.cols = "40";
  input.rows = "6";
  input.value = code;
  input.id = id;

  results.id = id + '-output';

  button.type = 'button';
  button.innerHTML = 'Run';

  solutionPre.innerHTML = solution;
  solutionPre.id = id + '-solution';
  solutionPre.className = 'hidden';
  solutionButton.id = id + '-solution-button';
  solutionButton.type = 'button';
  solutionButton.innerHTML = 'Show Solution';

  button.onclick = function() {
    evaluateClear(id);

    setTimeout(function() {
      var resultHTML = document.getElementById(id + '-output').innerHTML;
      var cleanText = resultHTML.replaceAll('<br>','\n').replace(/<\/?[^>]+(>|$)/g, "").trim();
      console.log(cleanText)
      console.log(preview);      
      console.log(cleanText === preview);      
    }, 100)
  }

  solutionButton.onclick = function() {
    console.log(id + '-solution')
    document.getElementById(id + '-solution').className = '';
    document.getElementById(id + '-solution-button').className = 'hidden';
  }

  if (title) h3.innerHTML = title.replaceAll('\n', '<br />');
  if (description) desc.innerHTML = description.replaceAll('\n', '<br />');

  if (title) wrapper.appendChild(h3);
  if (description) wrapper.appendChild(desc);
  if (preview) wrapper.appendChild(pre);

  var inputWrapper = document.createElement("div");
  inputWrapper.className = 'inputWrapper';
  inputWrapper.appendChild(input);
  inputWrapper.appendChild(results);
  wrapper.appendChild(inputWrapper);
  wrapper.appendChild(button);
  if (solution) {
      wrapper.appendChild(renderSpacer());
      wrapper.appendChild(solutionPre);
      wrapper.appendChild(solutionButton);
  }

  container.appendChild(wrapper);
}




function insertNewline(ta) {
  if (ta.selectionStart != undefined) {  
    var before = ta.value.substring(0, ta.selectionStart);
    var indent = figureIndent(before);
    var selSave = ta.selectionEnd;
    var after = ta.value.substring(ta.selectionEnd, ta.value.length)       

    
    var tmp = ta.scrollTop;  
    ta.value = before + "\n" + indent + after;
    var pos = selSave + 1 + indent.length;
    ta.selectionStart = pos;
    ta.selectionEnd = pos;
    ta.scrollTop = tmp;
    
    
    return false;
  } else if (document.selection && document.selection.createRange) { 
     var r = document.selection.createRange()
     var dr = r.duplicate()
     dr.moveToElementText(ta)
     dr.setEndPoint("EndToEnd", r)
     var c = dr.text.length - r.text.length
     var b = ta.value.substring(0, c);
     var i = figureIndent(b);
     if (i == "") return true;  
     r.text = "\n" + i;
     return false;
  }
     
  return true;
}



function figureIndent(str) {
  var eol = str.lastIndexOf("\n");
  
  var line = str.substring(eol + 1);  
  var indent="";
  for (i=0; i<line.length && line.charAt(i)==' '; i++) {
    indent = indent + " ";
  }
  return indent;
}

function handleCR(ta, event) {
  if (event.keyCode==13) return insertNewline(ta)
  else {
    return true;
  }
}




function extractLine(e, evalLine) {
  if (e.inhibitLine) return -1;  
  
  
  
  if (e.line && e.line < 50) {
    return e.line;
  }
  
  
  if (e.lineNumber) {
    
    if (e.lineNumber > evalLine) return e.lineNumber - evalLine + 1;  
    return e.lineNumber; 
  }
  
  return -1;
}





function evaluate(inID) {
  var ta = document.getElementById(inID);
  
  
  var preErr = preflightCheck(ta.value);
  if (preErr) {
    
    var e = new Error;
    e.message = preErr;
    return e;
    
  }
  

  var text = sugarCode(ta.value);
  var evalLine = 0;
  var error = new Error;
  if (error.lineNumber) evalLine = error.lineNumber + 3;
  try {
    eval(text);
  }
  catch(e) {
    
    e.userError = true;
    var line = extractLine(e, evalLine)
    if (line != -1) e.userLine = line;
    return e;
  }
  return null;
}





function getSolnText(id) {
  
  var ta = document.getElementById(id + '-soln');
  var text = '';
  if (ta!=null && ta.value) {
    text = ta.value;
  } else {
    
    ta = document.getElementById(id);
    text = ta.getAttribute('meh');
    if (text!=null) text = sugarCode(unescape(text.replace(new RegExp('\\\\', 'g'), '%')));
  }

  if (text) return sugarCode(text);
  else return null;






}




function selectLine(ta, line) {
  if (!ta.setSelectionRange) return;
  
  var count = 0;
  var start = 0;
  var text = ta.value;
  for (var i = 0; i<text.length; i++) {
    if (text[i] == "\n" || (start!=0 && i==text.length-1)) {
      count++;  
      if (count == line - 1) start = i + 1;
      else if (count == line ) {
        ta.focus();
        ta.setSelectionRange(start, i);
        return;
      }
    }
  }
}


function evaluateShow(inID) {
  try {
    var e = evaluate(inID);
    if (e != null) {
      var msg = "<font color=red>Error:</font>" + e.message;  
      if (e.userLine) msg += " line:" + e.userLine;
      print(msg);
      if (e.userLine) {
        var ta = document.getElementById(inID);
        selectLine(ta, e.userLine);
      }
    }
  }
  catch (e) {
    alert("Low level evaluation error:" + e);
  }
}




























function evaluateClear(id) {
  store(id);
  
  window.globalRunId = id;  
  window.globalLastCanvas = null;  
  window.globalLastCanvas2 = null;  
  window.globalSolnName = null;  
  window.globalSolnRun = false;  
  window.globalPrintText = "";

  clearOutput();
  
  var ta = document.getElementById(id);
  var text = ta.value;
  var images = extractImages(text);
  
  window.globalImageNeeded = images.length;
  window.globalImageCount = 0;
  window.globalImageFn = function() { evaluateShow(id); };
  
  setTimeout(function() { preloadImages(images); }, 100);
}



function evaluateClearSoln(id) {
  
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
}


















function evaluateGrade(id, localtest) {
  
  var ta = document.getElementById(id);
  var re = ta.getAttribute('re');
  if (re) {
    
    if (!window.globalPrintText) {
      
      if (localtest) alert("error: no printout to grade");
      else throw {"name": "Waitfor Exception", "message":"Nothing to grade. Run and print before grading."};
      return false;
    }
    
    re = unescape(re.replace(new RegExp('\\\\', 'g'), '%'))
    var regex = new RegExp(re, "g");
    var grade = window.globalPrintText.search(regex) > -1;
    if (localtest) print("grade:" + grade);
    return(grade);
  }

  
  if (!window.globalLastCanvas) {
    if (localtest) alert("Run to produce an image before grading");
    
    else throw {"name": "Waitfor Exception", "message":"No image to grade. Run to produce an image before grading."};
  }
  
  window.globalRunId = id;  
  window.globalPrintCount = 5000;
  
  
  window.globalLastCanvas2 = null;  
  window.globalSolnRun = true;  
  
  var text = getSolnText(id);
  
  
  
  
  

  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  
  
  evaluateSoln(id);  

  var diff = gradering();
  
  var tol = ta.getAttribute('tol');
  if (!tol) tol = 1.0;
  var grade = (diff <= tol);
  if (localtest) print("grade:" + grade + " diff:" + diff);
  return(grade);
}








function evaluateSoln(inID) {
  var text = getSolnText(inID);
  try {
    eval(text);
  }
  catch(e) {
    alert('problem eval-of-soln:' + e);  
    return e;
  }
  return null;
}


function preGrade() {
  throw {"name": "Waitfor Exception", "message":"Message!"};
}






function saveParent(id) {
  var output = document.getElementById(id + "-output");
  window.parent.window.document.hackoutput = output.cloneNode(true);
  
  var children = output.childNodes;
  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    if (child.hasAttribute("imdata")) {  
      var canvas = child;
      var imdata = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
      
      
      if (!window.parent.window.document.hackimdata) window.parent.window.document.hackimdata = {};
      window.parent.window.document.hackimdata[canvas.getAttribute("id")] = imdata;
    }
  }
}



function restoreParent(id) {
  if (!window.parent.window.document.hackoutput) {
    alert("hackoutput not present");
    return;
  }
  var hackoutput = window.parent.window.document.hackoutput;

  var output = document.getElementById(id + "-output");
  var parent = output.parentNode;
  parent.removeChild(output);
  parent.appendChild(hackoutput);
  
  var children = hackoutput.childNodes;
  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    if (child.hasAttribute("imdata")) {  
      var canvas = child;
      var imdata = window.parent.window.document.hackimdata[canvas.getAttribute("id")];
      canvas.getContext("2d").putImageData(imdata, 0, 0);
    }
  }
  
  
}











function gradering() {
  var studentCanvas = window.globalLastCanvas;
  if (!studentCanvas) {
    print("error: no student canvas");
    return(999);
  }
  
  var solnCanvas = window.globalLastCanvas2;
  if (!solnCanvas) {
    print("error: no soln canvas");
    return(999);
  }
  
    
  var studentData = studentCanvas.getContext("2d")
      .getImageData(0, 0, studentCanvas.width, studentCanvas.height).data;

  var solnData = solnCanvas.getContext("2d")
      .getImageData(0, 0, solnCanvas.width, solnCanvas.height).data;
      
  return(imageDiff(studentData, solnData));
}




function jsinput_getgrade() {
  var grade = evaluateGrade('jsinputid');
  console.log("eek getgrade:" + grade);
  return JSON.stringify(grade);
}

function jsinput_getstate() {
  var ta = document.getElementById('jsinputid');
  var text = ta.value;
  var state = JSON.stringify(text);
  console.log("eek getstate:" + state);
  return state;
}

function jsinput_setstate(stateStr) {
  var state = JSON.parse(stateStr);
  console.log("eek setstate:" + state);
  var ta = document.getElementById('jsinputid');
  ta.value = state;
}





var appendCount = 0;




function isAuxUrl(url) {
  return (url.length >= 3 && url.substring(0, 3) == "aux");
}



var globalCustomImages = { };


function addCustomImage(filename, data) {
  window.globalCustomImages[filename.toLowerCase()] = data;
}



function getCustomImage(filename) {
  filename = filename.toLowerCase();
  if (filename in window.globalCustomImages) return window.globalCustomImages[filename];
  return null;
}



function postImage(img) {
  console.log('post image called');
  window.globalImageCount++;
  if (window.globalImageCount == window.globalImageNeeded)
    window.globalImageFn();
}


function errorImage(img) {
  alert('problem loading image:' + img.src);
}


function lastElement(path) {
  var i = path.lastIndexOf('/');
  if (i > 0) return path.substr(i+1);
  else return path;
}



function getImageBySrc(filename) {
  var output = getOutput();
  var children = output.childNodes;
  for (var i=0; i<children.length; i++) {
    
    
    
    var imgsrc = children[i].getAttribute("src");  
    if (imgsrc && imgsrc.length < 1000 && lastElement(imgsrc) == filename) return children[i];
  }
  return null;
}



function preloadImages(names) {
  
  
  if (names.length == 0) {
     window.globalImageFn();
     return;
  }
  for (var i=0; i<names.length; i++) {
    loadImage(names[i]);
  }
}





function loadImage(filename) {
  
  var img0 = getImageBySrc(filename);
  if (img0) return img0;
  
  

  
  var output = getOutput();
  var id = "img" + appendCount;
  appendCount++;

  
  var orig_filename = filename;
  var custom = getCustomImage(filename);
  if (custom) {
    console.log('filename found in global custom image:' + filename);
    filename = custom;  
  }

  
  
  
  else if (window.globalPathPrefix && filename.length>0 && filename[0] != '/') {
    filename = window.globalPathPrefix + filename;
  }

  console.log('loadImage image:' + id + ' ' + orig_filename);

  var img = new Image();
  img.setAttribute('id', id);
  img.setAttribute('src', filename);
  img.setAttribute('style', 'display:none');
  img.setAttribute('onLoad','postImage(this);');
  img.setAttribute('onError','errorImage(this);');
  output.appendChild(img);
  
  return img;
}




































































function print() {
  
  if (window.globalPrintCount <= 0) {
    if (window.globalPrintCount == 0) {
      printOne("***print output limited***");
      printOne("<br>");
      window.globalPrintCount--;
    }
    return;
  }
  window.globalPrintCount--;
    

 for (var i=0; i<arguments.length; i++) {
   printOne(arguments[i], i==arguments.length-1);
 }
 printOne("<br>");
}


function printStart() {
 for (var i=0; i<arguments.length; i++) {
   printOne(arguments[i]);
 }
}




function getOutput() {
  return document.getElementById(window.globalRunId + "-output");
}



function printOne(something) {
  var output = getOutput();

  
  
  if (something.getString) {
    something = something.getString();
  }
  
  
  if (something instanceof Array) {
    something = "[" + something.join(", ") + "]";
  }
  
  if (typeof something == "string" || typeof something == "number") {  
    var p = document.createElement("text");
    var spacer = " ";
    if (something == "<br>") spacer = "";
    p.innerHTML = something + spacer;  
    output.appendChild(p);
    
    if (something == "<br>") {
        something = "\n";
        spacer = "";
    }
    if (arguments.length == 2 && arguments[1]) spacer = ""; 
    window.globalPrintText += something + spacer;
  }
  else if (something instanceof HTMLImageElement) {
    var copy = something.cloneNode(true);
    copy.setAttribute("style", "");
    copy.setAttribute("id", "");

    
    
    
    output.appendChild(copy);
  }
  else if (something instanceof SimpleImage) {
    
    
    var id = "canvas" + appendCount;
    appendCount++;
    
    
    var canvas = document.createElement("canvas");
    canvas.setAttribute('id', id);
    something.drawTo(canvas);

    
    if (window.globalSolnRun) {
      window.globalLastCanvas2 = canvas;
      
    }
    else {
      window.globalLastCanvas = canvas;
      output.appendChild(canvas);
      
      
      canvas.setAttribute("imdata", true);
    }
  }
  else {
    alert("bad print with:" + something);
  }
}


function clearOutput() {
  var output = getOutput();
  output.innerHTML = "";
}




function clearOutputId(id) {
  var output = document.getElementById(id + "-output");
  if (!output) {
    var err = new Error;
    err.message = "clearOutput() with bad id " + id;
    err.inhibitLine = true;  
    throw(err);
  }
  output.innerHTML = "";
}









SimpleImage = function(image) {
  var htmlImage = null;
  if (typeof image == "string") {
    htmlImage = loadImage(image);
  } else if (image instanceof HTMLImageElement) {
    htmlImage = image;
  } else {
    var err = new Error;
    err.message = "new SimpleImage(...) requires a htmlImage.";
    err.inhibitLine = true;  
    throw(err);
  }
    
  
  var output = getOutput();
  var id = "canvas" + appendCount;
  appendCount++;
  
  var canvas = document.createElement("canvas");
  canvas.setAttribute('id', id);
  canvas.setAttribute('style', 'display:none');
  
  output.appendChild(canvas);
  
  
  
  
  if (!htmlImage.complete) {
    alert("Image loading -- may need to run again");
  }
  
  this.width = htmlImage.width;
  this.height = htmlImage.height;
  
  

  this.canvas = canvas;
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  
  this.context = canvas.getContext("2d");  

  this.drawFrom(htmlImage);

  
  this.imageData = this.context.getImageData(0, 0, this.width, this.height);
}


SimpleImage.prototype.canvas;
SimpleImage.prototype.context;
SimpleImage.prototype.width;
SimpleImage.prototype.height;
SimpleImage.prototype.imageData;
SimpleImage.prototype.zoom;
SimpleImage.prototype.mimicZoom;



SimpleImage.prototype.setZoom = function(n) {
  this.zoom = n;
};


SimpleImage.prototype.mimicZoom = function() {
  if (window.globalLastCanvas && window.globalLastCanvas.hasOwnProperty("zoom")) {
    this.zoom = window.globalLastCanvas.zoom;
  }
};




SimpleImage.prototype.setSize = function(newWidth, newHeight) {
  
  var output = getOutput();
  var id = "canvas" + appendCount;
  appendCount++;
  
  var canvasNew = document.createElement("canvas");
  canvasNew.width = newWidth;
  canvasNew.height = newHeight;
  canvasNew.setAttribute('id', id);
  canvasNew.setAttribute('style', 'display:none');
  
  var p = document.createElement("text");
  p.appendChild(canvasNew);
  output.appendChild(p);
  
  
  this.flush();
  var contextNew = canvasNew.getContext("2d");  
  contextNew.drawImage(this.canvas, 0, 0, newWidth, newHeight);

  
  this.width = canvasNew.width;
  this.height = canvasNew.height;

  this.canvas = canvasNew;
  this.context = canvasNew.getContext("2d");  

  
  this.imageData = this.context.getImageData(0, 0, this.width, this.height);
}






SimpleImage.prototype.setSameSize = function(otherImage) {
  if (!this.width) return;

  var wscale = otherImage.width / this.width;
  var hscale = otherImage.height / this.height;

  var scale = Math.max(wscale, hscale);

  if (scale != 1) {
    this.setSize(this.width * scale, this.height * scale);
  }
}



SimpleImage.prototype.drawFrom = function(htmlImage) {
  
  this.context.drawImage(htmlImage, 0, 0);
};



SimpleImage.prototype.drawTo = function(toCanvas) {
  if (!this.zoom) {
    toCanvas.width = this.width;
    toCanvas.height = this.height;
  }
  else {
    toCanvas.width = this.width * this.zoom;
    toCanvas.height = this.height * this.zoom;
    toCanvas.zoom = this.zoom;  
  }
  
  this.flush();
  var toContext = toCanvas.getContext("2d");
  
  if (!this.zoom) {
    toContext.drawImage(this.canvas, 0, 0);
  }
  else {
    
    

    
    
    var toData = toContext.createImageData(toCanvas.width, toCanvas.height);
    for (var x = 0; x < toCanvas.width; x++) {
      for (var y = 0; y < toCanvas.height; y++) {
        var iNew =  (x + y * toCanvas.width) * 4;
        var iOld = (Math.floor(x / this.zoom) + Math.floor(y / this.zoom) * this.width) * 4;
        for (var j = 0; j < 4; j++) {
          toData.data[iNew + j] = this.imageData.data[iOld + j];
        }
      }
    }
    toContext.putImageData(toData, 0, 0);
    
    
  }
}

SimpleImage.prototype.getWidth = function() {
  return this.width;
}

SimpleImage.prototype.getHeight = function() {
  return this.height;
}


SimpleImage.prototype.getIndex = function(x, y) {
  if (x == null || y == null) {
    var e = new Error("need x and y values passed to this function");
    e.inhibitLine = true;
    throw e;
  }
  else if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
    var e = new Error("x/y out of bounds x:" + x + " y:" + y);
    e.inhibitLine = true;
    throw e;
  }
  else return (x + y * this.width) * 4;
}




SimpleImage.prototype.setRed = function(x, y, value) {
  funCheck("setRed", 3, arguments.length);
  var index = this.getIndex(x, y);
  this.imageData.data[index] = clamp(value);
  
  
  
  
  
};


SimpleImage.prototype.setGreen = function(x, y, value) {
  funCheck("setGreen", 3, arguments.length);
  var index = this.getIndex(x, y);
  this.imageData.data[index + 1] = clamp(value);
};


SimpleImage.prototype.setBlue = function(x, y, value) {
  funCheck("setBlue", 3, arguments.length);
  var index = this.getIndex(x, y);
  this.imageData.data[index + 2] = clamp(value);
};


SimpleImage.prototype.setAlpha = function(x, y, value) {
  funCheck("setAlpha", 3, arguments.length);
  var index = this.getIndex(x, y);
  this.imageData.data[index + 3] = clamp(value);
};




SimpleImage.prototype.getRed = function(x, y) {
  funCheck("getRed", 2, arguments.length);
  var index = this.getIndex(x, y);
  return this.imageData.data[index];
};

SimpleImage.prototype.getGreen = function(x, y) {
  funCheck("getGreen", 2, arguments.length);
  var index = this.getIndex(x, y);
  return this.imageData.data[index + 1];
};

SimpleImage.prototype.getBlue = function(x, y) {
  funCheck("getBlue", 2, arguments.length);
  var index = this.getIndex(x, y);
  return this.imageData.data[index + 2];
};

SimpleImage.prototype.getAlpha = function(x, y) {
  funCheck("getAlpha", 2, arguments.length);
  var index = this.getIndex(x, y);
  return this.imageData.data[index + 3];
};



SimpleImage.prototype.getPixel = function(x, y) {
  funCheck("getPixel", 2, arguments.length);

  return new SimplePixel(this, x, y);
};



SimpleImage.prototype.flush = function() {
  this.context.putImageData(this.imageData, 0, 0);  
};



SimpleImage.prototype.toArray = function() {
  var array = new Array();  
  
  
  
  
  for (var y = 0; y < this.getHeight(); y++) {
    for (var x = 0; x < this.getWidth(); x++) {
      
      array.push(new SimplePixel(this, x, y));  
    }
  }
  return array;
};




function getArray(obj) {
  if (obj && typeof(obj) == 'object') {
    if (obj instanceof Array) {
      return obj;
    } else if ('toArray' in obj) {
      return obj.toArray();
    }
  } else {
    throwError("'for (part: composite)' used, but composite is wrong.");
  }
}


SimplePixel = function(simple_image, x, y) {
  this.simple_image = simple_image;
  this.x = x;
  this.y = y;
};


SimplePixel.prototype.simple_image;
SimplePixel.prototype.x;
SimplePixel.prototype.y;

SimplePixel.prototype.getRed = function() {
  funCheck("getRed", 0, arguments.length);
  return this.simple_image.getRed(this.x, this.y);
};
SimplePixel.prototype.setRed = function(val) {
  funCheck("setRed", 1, arguments.length);
  this.simple_image.setRed(this.x, this.y, val);
};
SimplePixel.prototype.getGreen = function() {
  funCheck("getGreen", 0, arguments.length);
  return this.simple_image.getGreen(this.x, this.y);
};
SimplePixel.prototype.setGreen = function(val) {
  funCheck("setGreen", 1, arguments.length);
  this.simple_image.setGreen(this.x, this.y, val);
};
SimplePixel.prototype.getBlue = function() {
  funCheck("getBlue", 0, arguments.length);
  return this.simple_image.getBlue(this.x, this.y);
};
SimplePixel.prototype.setBlue = function(val) {
  funCheck("setBlue", 1, arguments.length);
  this.simple_image.setBlue(this.x, this.y, val);
};

SimplePixel.prototype.getX = function() {
  funCheck("getX", 0, arguments.length);
  return this.x;
};
SimplePixel.prototype.getY = function() {
  funCheck("getY", 0, arguments.length);
  return this.y;
};


SimplePixel.prototype.getString = function() {
  return "r:" + this.getRed() + " g:" + this.getGreen() + " b:" + this.getBlue();
};




function sugarCode(code) {
  var reWeak = /for *\([ \w+().-]*:[ \w+().-]*\) *\{/g;
  
  
  
  var reStrong = /for\s*\(\s*(?:var\s+)?(\w+)\s*:\s*(\w+(\(.*?\))?)\s*\)\s*\{/;
  

  
  
  var result;
  while ((result = reWeak.exec(code)) != null) {
    
    var matched = result[0];
    
    if (matched.search(reStrong) == -1) {
      throwError("Attempt to use 'for(part: composite)' form, but it looks wrong: " + result[0]);
      
      
    }
  }
  
  
  var gensym = 0;
  while (1) {
    var temp = code;
    var pvar = "pxyz" + gensym;
    var ivar = "ixyz" + gensym;
    gensym++;
    var replacement = "var " + pvar + " = getArray($2); " +
      "for (var " + ivar + "=0; " + ivar + "<" + pvar + ".length; " + ivar + "++) {" +
      "var $1 = " + pvar + "[" + ivar + "];";
    code = code.replace(reStrong, replacement);
    if (code == temp) break;
  }
  return(code);
  
  
  
  
  
  
  
  
  
}





function throwError(message) {
    var err = new Error;
    err.message = message;
    err.inhibitLine = true;  
    throw err;
}


function funCheck(funName, expectedLen, actualLen) {
  if (expectedLen != actualLen) {
    var s1 = (actualLen == 1)?"":"s";  
    var s2 = (expectedLen == 1)?"":"s";
    var message = funName + "() called with " + actualLen + " value" + s1 + ", but expected " +
      expectedLen + " value" + s2 + ".";
    
    
    throwError(message);
  }
}




















function extractImages(code) {
  var re = /SimpleImage\(\s*("|')(.*?)("|')\s*\)/g;
  var result = [];
  while (ar = re.exec(code)) {
    
    result.push(ar[2]);
  }
  return result;
}



function clamp(value) {
  
  
  if (value < 0) return 0;
  if (value > 255) return 255;
  return value;
}







var storeprefix = "cs101.";










function store(id) {
  
  
  if (!localStorage) return; 
  if (window.storeinhibit) return;

  
  

  var ta = document.getElementById(id);
  var text = ta.value;
  var trimmed = text.replace(/\s/g,"");  
  if (trimmed.length > 0) {  
    if (trimmed == "del") text = "";  
    localStorage.setItem(storeprefix + id, text);
  }
}



function retrieve(id) {
  if (!localStorage) return "";
  if (window.storeinhibit) return "";

  var val = localStorage.getItem(storeprefix + id);
  if (!val) val = "";  
  return val;
}







function retrieveCodeText(outputid, id_re) {
  if (!localStorage) return;
  if (window.storeinhibit) return;

  var keys = new Array();
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key.indexOf(storeprefix) == 0 && (!id_re || id_re.test(key))) {
      keys.push(key);
    }
  }
  keys.sort();

  var text = "";
  for (var i in keys) {
    var key = keys[i];
    var val = localStorage.getItem(key);
    var keyshort = key.substring(storeprefix.length)
    text = text + "----------\n" + keyshort + "\n\n" + val + "\n";
  }

  if (outputid) {
    var output = document.getElementById(outputid);
    output.innerHTML = "<pre>" + text + "</pre>";
  }

  return text;
}









function retrieveCodeTextIds(outputid, ids, do_sel, do_domain) {
  if (!localStorage) return;
  if (window.storeinhibit) return;

  
  if (do_domain) {
    var url = document.URL.toLowerCase();
    if (url.indexOf(do_domain.toLowerCase())==-1 && url.indexOf('file:')==-1) {
      alert('Warning: work saving should be on "' + do_domain + '", but this page url is different');
    }
  }
  ids.sort();
  var text = "";
  for (var i in ids) {
    var val = retrieve(ids[i]);
    if (text.length > 0) text += "\n";
    text = text + "----------\n" + ids[i] + "\n\n" + val + "\n";
  }

  if (outputid) {
    var output = document.getElementById(outputid);
    output.innerHTML = "<pre>" + text + "</pre>";
    if (do_sel && window.getSelection) {  
      var range = document.createRange();
      range.selectNode(output);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
    }
    selectText(outputid);
    
    
  }

  return text;
}









function preflightCheck(code) {
  
  if (window.nocodecheck) return "";

  
  var reIf1 = /^\s*if\s*(.*)$/mg; 
  
  
  
  
  var result;
  while ((result = reIf1.exec(code)) != null) {
    var line = result[1];
    var check = "";
    var found = "";
    if (line.match(/\{\s*($|\/\/)/)) { 
      check = line;
      found = line;
    }
    else {
      
      
      
      var text = code.substring(result.index);
      var reIf2 = /^\s*if\s*((.*(\r?\n?)){1,3}.*\{\s*($|\/\/))/m;
      if ((result2 = reIf2.exec(text)) != null) {
        
        check = result2[1];
        found = result2[0];
      }
    }
    
    
    if (check) {
      
      if (!check.match(/^\s*\(/)) return "<b>if</b> should be immediately followed by <b>(</b>test<b>)</b> but found:<br>" + found;
      if (!check.match(/\)\s*\{\s*($|\/\/)/)) return "<b>if test</b> should end with <b>)</b> but found:<br>" + found;
      if (check.match(/[^<>=!]\=[^=]/)) return "<b>if test</b> should not contain single = (use == &lt;= &gt;=), but found:<br>" + found;
      if (check.match(/[^&]&[^&]/)) return "<b>if test</b> should not contain single & (use double &&), but found:<br>" + found;
      if (check.match(/[^|]\|[^|]/)) return "<b>if test</b> should not contain single | (use double ||), but found:<br>" + found;
    }
    else {
      
      
      return "<b>if-statement</b> cannot find end of line <br>left curly brace <b>{</b> <br>Form should be " +
             "<br><b>if (test) {</b><br>&nbsp;..code..<br>but found:" + result[0];  
    }
  }

  
  var reFor = /^\s*for\s(.*)$/mg; 
  
  while ((result = reFor.exec(code)) != null) {
    
    var line = result[1];
    if (!line.match(/^\s*\(/)) return "<b>for</b> should be immediately followed by <b>(</b> but found:<br>" + result[0];
    if (!line.match(/\{\s*($|\/\/)/)) return "<b>for</b> line should end with curly brace <b>{</b> but found:<br>" + result[0];
    if (!line.match(/\)\s*\{\s*($|\/\/)/)) return "<b>for</b> should be followed by <b>(</b>part: whole<b>)</b> but found:<br>" + result[0];
  }

  
  
  var reFn =  /(getRed|getGreen|getBlue|setRed|setGreen|setBlue|getX|getY|getPixel|setZoom|mimicZoom|setSize|setSameSize|getField|startsWith|endsWith)(.)/g
  var reFnI = /(getRed|getGreen|getBlue|setRed|setGreen|setBlue|getX|getY|getPixel|setZoom|mimicZoom|setSize|setSameSize|getField|startsWith|endsWith)(.)/gi
  

  
  while ((result = reFnI.exec(code)) != null) {
    if (!result[0].match(reFn)) {
      return "<b>" + result[1] + "</b> appears to have some wrong capitalization";
    }
  }

  
  
  while ((result = reFn.exec(code)) != null) {
    
    var paren = result[2];
    if (paren != "(") {
      return "<b>" + result[1] + "</b> should be immediately followed by <b>(</b>"
    }
  }
  return "";
}

function unhide(first) {
  first.style.display = "none";
  first.nextElementSibling.style.display = "block";
}





function imageDiff(studentData, ansData) {
  if (studentData.length != ansData.length) throw("image array lengths don't match " + studentData.length + " " + ansData.length);

  var diff = 0;
  
  
  
  for (var i = 0; i < studentData.length; i+=4) {
      diff += Math.abs(studentData[i] - ansData[i]);  
      diff += Math.abs(studentData[i + 1] - ansData[i + 1]);  
      diff += Math.abs(studentData[i + 2] - ansData[i + 2]);  
      
      
      
      
      
      
  }
  diff = diff / (studentData.length/4.0);  
  
  
  return diff;  
}


function refAvg(name) {
  var refImage = new SimpleImage(name);
  var data = refImage.imageData.data;
  var r = 0;
  var g = 0;
  var b = 0;
  for (var i = 0; i < data.length; i+=4) {
      r += data[i];
      g += data[i+1];
      b += data[i+2];
  }
  var len = data.length/4.0;
  return [r/len, g/len, b/len];
}



window.globalPathPrefix = "/c4x/Engineering/CS101/asset/";
window.globalPathPrefix = "/c4x/NickX/CSTEST101/asset/";
