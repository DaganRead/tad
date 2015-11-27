/** TAD
* The Apprentice Doctor - Venipuncture course
* www.apprenticeDoctor.co.za
* version 1.0
*Copyright 2014, Apprentice Doctor.
**/
/**************************** Methods/Functions ************************************/
/**************************** Prototype Enhancements *******************************/
String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}
function finishTAD() {
  var html_frag = document.createDocumentFragment(),
    div_elem = document.createElement("div"),
    h3_elem = document.createElement("h3"),
    p_elem = document.createElement("p");

    h3_elem.innerText="Congratulations, you've completed the course!";
    p_elem.innerText="You did it well done.";

    div_elem.id="modalDiv";
    h3_elem.id="modalH3";
                        
    div_elem.appendChild(p_elem);
    html_frag.appendChild(h3_elem);
    html_frag.appendChild(div_elem);
  getModalView(html_frag);
  //modal here
}

/*************************************************************************************/
/***************** Functions ***************************************/
//This API needs review; to be integrated into itself. It has existing methods for class manipulation however is currently sets inline styles.

            // not sure
            function disableOther( button ) {
                if( button !== 'showLeftPush' ) {
                    classie.toggle( showLeftPush, 'disabled' );
                }
            }
            function chapterOptions(values, selectedChapter){
                    if(values && selectedChapter){
                        var chapterOpt = '<h3>';
                        chapterOpt += selectedChapter;
                        chapterOpt +='</h3><a href="#slide-main" class="cn-back">Back</a><nav>';
                        for(var i = 0; i < values.length; i++){
                            if(values[i] == selectedChapter){
                                chapterOpt += '<a class="project_PB" id="';
                                chapterOpt += idCruncher(htmlEntitiesEscape(parsed.projects[i].project));
                                chapterOpt += '"><img src="images/';
                                chapterOpt += parsed.projects[i].project;
                                chapterOpt += '.jpg">';
                                chapterOpt += parsed.projects[i].project;
                                chapterOpt += '</a>';
                            }
                        }
                        chapterOpt += '</nav></div>';
                        chapterOpt = $.parseHTML(chapterOpt);
                        //grab projects for chapter, lock and insert into slide-1
                        $('#slide-1').html(chapterOpt);
                    }else{
                        //Wrapped chapter Options Inject
                        var chapterOpt = '<section class="cn-container" data-scrollable="y"><div class="cn-slide" id="slide-main"><h3>Venipuncture Course</h3><nav>';
                        for(var i = 0; i < chapterMap.length; i++){                                         
                            chapterOpt += '<a class="chapters_PB" id="';
                            chapterOpt += idCruncher(htmlEntitiesEscape(chapterMap[i]));
                            chapterOpt += '">';
                            chapterOpt += chapterMap[i];
                            chapterOpt += '</a>';
                        }
                        chapterOpt +='</nav></div><div class="cn-slide cn-slide-sub" id="slide-1">';
                        chapterOpt += '</div><div class="cn-slide" id="slide-1-1"></div><div class="cn-slide" id="slide-1-2"><h3>Glossary</h3>';
                        chapterOpt += '<section class="si-icons si-icons-default">';
                        chapterOpt +='<div id="searchContainer">';
                        chapterOpt += '<span id="searchIcon" class="si-icon si-icon-plus" data-icon-name="plus"></span><input id="searchInput" type="text" placeholder="Search any term..."/><input id="searchGo" type="image" src="images/btn_search.png" value="Go"/></div></section>';
                        for(var i = 0; i < glossaryTerms.length; i++){
                            chapterOpt += '<div id="';
                            chapterOpt += idCruncher(htmlEntitiesEscape(glossaryTerms[i]));
                            chapterOpt += '"><h4><b>';
                            chapterOpt += glossaryTerms[i];
                            chapterOpt += '</b></h4><p>';
                            chapterOpt += glossaryDescription[i];
                            chapterOpt += '</p></div>';
                            
                        }
                        chapterOpt += '</div></section>';
                        return chapterOpt;
                        //
                    }
            }
            function captureChapter(text){
                if(unlockChapters(text)){
                    getChapterOptions(parsed, text);
                    scrollerDimensions(0, document.getElementById('slide-1').clientWidth, document.getElementById('slide-1').clientHeight+100);
                    scrollReset();
                    location.assign("#slide-1");
                    lockProjects();
                }else{
                    var html_frag = document.createDocumentFragment(),
                        div_elem = document.createElement("div"),
                        h3_elem = document.createElement("h3"),
                        p_elem = document.createElement("p");

                        h3_elem.innerText="Whoops, this chapter is locked!";
                        p_elem.innerText="To unlock, first finish reading the previous chapter.";

                        div_elem.id="modalDiv";
                        h3_elem.id="modalH3";
                        
                        div_elem.appendChild(p_elem);
                        html_frag.appendChild(h3_elem);
                        html_frag.appendChild(div_elem);
                    getModalView(html_frag);
                    //modal here
                }
            }
            function captureProject(text){
                if(unlockProjects(text)){
                    menuResult = projectMap.indexOf(text);
                    //results will be -1 if false or index number of projectMap
                    if (menuResult != -1) {
                        window.chapterCurrent = parsed.projects[menuResult].chapter;
                        $('#slide-1-1').html(projectInject(menuResult));
                        dotOne.className = "";
                        dotTwo.className = "current";
                        dotThree.className = "";
                        scroller.scrollTo(screenWidth, 0, true);
                        pageCurrent = 1;
                        setTimeout(function(){
                            scrollerDimensions(0, document.getElementById('slide-1-1').clientWidth, document.getElementById('slide-1-1').clientHeight+100);
                            scrollReset();
                            location.assign("#slide-1-1");
                            padlockInit();
                        },600);
                    }
                }else{
                    var html_frag = document.createDocumentFragment(),
                        div_elem = document.createElement("div"),
                        h3_elem = document.createElement("h3"),
                        p_elem = document.createElement("p");

                        h3_elem.innerText="Whoops, this project is locked!";
                        p_elem.innerText="To unlock, first finish reading the previous project.";

                        div_elem.id="modalDiv";
                        h3_elem.id="modalH3";

                        div_elem.appendChild(p_elem);
                        html_frag.appendChild(h3_elem);
                        html_frag.appendChild(div_elem);
                    getModalView(html_frag);
                    //modal here
                }
            }
            function getChapterOptions(parsed, selectedChapter){
                var chapterResult = chapterMap.indexOf(selectedChapter);
                if (chapterResult != -1) {
                    window.chapterCurrent=selectedChapter;
                    var values = [];
                    for(var i = 0; i < parsed.projects.length; i++){
                        values.push(parsed.projects[i].chapter);
                    }
                    chapterOptions(values, selectedChapter);
                }
            }
            //project  inject
            function projectInject(indexNumber) {
                //scrollReset();
                window.help_btn.removeAttribute('disabled');
                glossaryOn = false;
                window.projectCurrent = parsed.projects[indexNumber].project;
                window.cellTest = true;
                window.totalProjectCounter = ($("#pageCount").height()/((screenHeight/100)*25));
                document.getElementById('video').setAttribute("src", "videos/"+parsed.projects[indexNumber].project+".webm");
                document.getElementById('iframe').setAttribute("src", "games/"+parsed.projects[indexNumber].chapter+"/index.html");
                Construct2Resize();
                videoBlur;
                var page = '<h3>';
                    page += parsed.projects[indexNumber].project;
                    page += '</h3>';
                    page += '<a href="#slide-1" class="cn-back">Back</a><div class="cn-content">';
                    page += '<h4>';
                    page += parsed.projects[indexNumber].title;
                    page += '</h4>';
                if (parsed.projects[indexNumber].extra) {
                    page += '<div id="extra">';
                    page += parsed.projects[indexNumber].extra;
                    page += '</div>';
                }
                if (parsed.projects[indexNumber].icons) {
                    page += parsed.projects[indexNumber].icons;
                }
                if (parsed.projects[indexNumber].warning) {
                    page += '<br/><div id="warning"><h4>Warning</h4><hr/>';
                    page += parsed.projects[indexNumber].warning;
                    page += '</div>';
                }
                if (parsed.projects[indexNumber].information) {
                    page += '<br/><div id="information"><h4>Information</h4><hr/>';
                    page += parsed.projects[indexNumber].information;
                    page += '</div>';
                }
                if (parsed.projects[indexNumber].requirements) {
                    page += '<br/><div id="requirements"><h4>Requirements</h4><hr/>';
                    page += parsed.projects[indexNumber].requirements;
                    page += '</div>';
                }
                if (parsed.projects[indexNumber].steps) {
                    page += '<br/><div id="steps"><h4>Steps</h4><hr/>';
                    page += parsed.projects[indexNumber].steps;
                    page += '</div>';
                }
                if (parsed.projects[indexNumber].poi) {
                    page += '<br/><div id="poi"><h4>Points of Information</h4><hr/>';
                    page += parsed.projects[indexNumber].poi;
                    page += '</div>';
                }
                if (parsed.projects[indexNumber].notes) {
                    page += '<br/><div id="notes"><h4>Notes</h4><hr/>';
                    page += parsed.projects[indexNumber].notes;
                    page += '</div>';
                }
                page += '</div><br/>';
                if ((indexNumber+1)<parsed.projects.length) {
                    page += '<section class="si-icons si-icons-default"><div class="centerIt">'
                    page += '<h3>Next Up:  ';
                    page += parsed.projects[indexNumber+1].project;
                    page += '</h3>';
                    page += '<h4>';
                    page += parsed.projects[indexNumber+1].title;
                    page += '</h4>';
                    page +='<span id="padlock" class="si-icon si-icon-lock" data-icon-name="padlock">';
                    page += '<img style="float:none!important;" src="images/';
                    page += parsed.projects[indexNumber+1].project;
                    page += '.jpg">';
                    page += parsed.projects[indexNumber+1].project;
                    page += '</span>';
                    page += '</div></section>';
                }else{
                    page += '<input type="button" onclick="finishTAD()" value="Finish up"/>'
                }
                return page;
            }

            function menuBuild(){
                    var menu = '';
                    for(var i = 0; i < chapterMap.length; i++){ 
                        menu += '<li class="mp-cover"><a class="chapters_PB">&nbsp;&nbsp;&#43;&nbsp;';
                        menu += chapterMap[i];
                        menu += '</a><ul class="mp-menu">';
                        menu += menuBuildProjects(chapterMap[i]);
                        menu += '</ul></li>';
                    }
                    return menu
                }
            function menuBuildProjects(currentChapter){
                        var menu ='',
                            ProjectCount = getProjectCounted(currentChapter) -1,
                            projectCounter = window.projectCounter;
                        for(var i = projectCounter; projectCounter < ProjectCount; i++){
                            projectCounter = window.projectCounter;
                            menu += '<li><a class="project_PB">';
                            menu += parsed.projects[projectCounter].project;
                            menu += '</a></li>';
                            window.projectCounter++;
                        }
                        return menu;
            }
            function getProjectCounted(currentChapter){
                var foo = 0;
                for(var i = 0; i < values.length; i++){
                    projectCountHolder = $.inArray(currentChapter, values, i);
                    if(projectCountHolder != -1){foo ++;}else{return foo;}                                       
                }
            }
            function projectHeightSet(){
                var projectHeight = $.trim($('.cn-content').height());
                
            }
/**************************** Scroller Custom Methods ******************************/
function padlockInit(){
  var padlockButton = document.getElementById('padlock');
  var padlockIcon = new svgIcon( padlockButton, svgIconConfig );
  padlockButton.addEventListener("click", function(event) {
      quickSkip(this.innerText);
  });
}
//local storage
var LS = {
    set: function (key, val) {
        return localStorage.setItem(key, JSON.stringify(val));
    },
    get: function (key) {
        return JSON.parse( localStorage.getItem(key) );
    }
};
function buildLSArray(key){
  var array = [];
  for(var i=0; i< LS.get(key).length; i++){
       array.push(LS.get(key)[i]);
  }
  return array;
}

// automatically attach an EasyScroller to elements found with the right data attributes
function scrollerDimensions(bool, contentWidth, contentHeight){
   for (var i = 0; i < (scrollersY.length-1); i++) {
    if (bool) {
      window.scrollersY[i].scroller.setDimensions(screenWidth ,screenHeight ,contentWidth , contentHeight);
    }
  };
  if(!bool){
        window.scrollersY[scrollersY.length-1].scroller.setDimensions(screenWidth ,screenHeight ,contentWidth , contentHeight);
    }
}

function scrollerPosition(bool, left, top, animate){
   for (var i = 0; i < (scrollersY.length-1); i++) {
    if (bool) {
      window.scrollersY[i].scroller.scrollBy(left, top, animate);
    }
  };
  if (!bool){
      window.scrollersY[scrollersY.length-1].scroller.scrollTo(left, top, animate);
    }
}
function attachY () {
  window.scrollersY = Array.prototype.slice.call(document.querySelectorAll('[data-scrollable]'));
  for (var i = 0; i < scrollersY.length; i++) {

    var scrollable = scrollersY[i].dataset.scrollable;
    var zoomable = scrollersY[i].dataset.zoomable || '';
    var zoomOptions = zoomable.split('-');
    var minZoom = zoomOptions.length > 1 && parseFloat(zoomOptions[0]);
    var maxZoom = zoomOptions.length > 1 && parseFloat(zoomOptions[1]);

    window.scrollersY[i] = new EasyScroller(scrollersY[i], {
      scrollingX: scrollable === 'true' || scrollable === 'x',
      scrollingY: scrollable === 'true' || scrollable === 'y',
      zooming: zoomable === 'true' || zoomOptions.length > 1,
      minZoom: minZoom,
      maxZoom: maxZoom
    });
  };
}
/**********************************************************/

function resized(){
  screenWidth = window.innerWidth || document.body.clientWidth;
  screenHeight = window.innerHeight || document.body.clientHeight;
  $('#scrollerContent').css('width', screenWidth * 3);
   $('.cell').css('width', screenWidth);
   window.location.reload();
}
   window.location.assign('#slide-main');


function scrollReset(){
  var cellWidth = $('.cell').width();
  window.scrollersY[scrollersY.length-1].scroller.scrollTo(cellWidth, 0, false);
}
function scrollCurrentCapture(){
  window.scrollCurrent = window.scrollersY[scrollersY.length-1].scroller.__scrollTop;
}
function btn_scrollLeft(){
    if (pageCurrent === 2) {
      dotOne.className = "";
      dotTwo.className = "current";
      dotThree.className = "";
      scroller.scrollTo(screenWidth, 0, true);
      pageCurrent = 1;
    }else if(pageCurrent === 1){
      dotOne.className = "current";
      dotTwo.className = "";
      dotThree.className = "";
      scroller.scrollTo(0, 0, true);
      pageCurrent = 0;
    }
}
function btn_scrollRight(){
    if (pageCurrent === 0) {
      dotOne.className = "";
      dotTwo.className = "current";
      dotThree.className = "";
      scroller.scrollTo(screenWidth, 0, true);
      pageCurrent = 1;
    }else if(pageCurrent === 1){
      dotOne.className = "";
      dotTwo.className = "";
      dotThree.className = "current";
      scroller.scrollTo((screenWidth*2), 0, true);
      pageCurrent = 2;
    }
}
function btn_scrollDown(){
  var cellHeight = $('.cell').height();
  var left1 = window.pageXOffset || document.documentElement.scrollLeft;
  window.totalProjectCounter = ((screenHeight/100)*25);
  window.scrollersY[scrollersY.length-1].scroller.scrollBy(left1, (screenHeight-((screenHeight/100)*25)), true);
  window.pageCounter ++;
  window.pageCount.innerHTML = window.pageCounter+"/"+window.totalProjectCounter;
}
function btn_scrollUp(){
  var cellHeight = $('.cell').height();
  var left1 = window.pageXOffset || document.documentElement.scrollLeft;
  window.scrollersY[scrollersY.length-1].scroller.scrollBy(left1, -(screenHeight-((screenHeight/100)*25)), true);
  window.pageCounter --;
  window.pageCount.innerHTML = window.pageCounter+"/"+window.totalProjectCounter;
}
function videoBlur(){
  if(!(video.paused || video.ended || video.seeking)){
    simulateClick('play-pause');
  }
}
/***************** context menu *****************/
if(document.addEventListener){
  document.addEventListener('contextmenu', function(e){
    $("#contextMenu").css('display', 'block');
    cellTest = true;
    $("#contextMenu").css({'top':(e.pageY-70), 'left': (e.pageX-70), 'opacity':1});
    $("#contextMenu").mouseleave(function(){
        $("#contextMenu").css('opacity', 0);
        setTimeout(function() {
          $("#contextMenu").css('display', 'none');
        }, 650);
    });
    e.preventDefault();
  }, false);
}else{
  document.attachEvent('oncontextmenu', function(){
    $("#contextMenu").css('display', 'block');
    cellTest = true;
     $("#contextMenu").css({'top':(e.pageY-70), 'left': (e.pageX-70), 'opacity':1});
    $("#contextMenu").mouseleave(function(){
        $("#contextMenu").css('opacity', 0);
        setTimeout(function() {
          $("#contextMenu").css('display', 'none');
        }, 650);
    });
    window.event.returnValue = false;
  });
}
/******************** Print ****************************/
function printHTML(input){
  var iframe = document.createElement("iframe");
    document.body.appendChild(iframe);

  iframe.contentWindow.document.write(input);
  iframe.contentWindow.print();
  document.body.removeChild(iframe); 
}

/********************** Event simulation  *********************************/
function simulateClick(ID) {
  var event = new MouseEvent('click', {
    'view': window,
    'bubbles': true,
    'cancelable': true
  });
  var target = document.getElementById(ID); 
  target.dispatchEvent(event);
}

/*************************************************************************/
/*Needs some serious refactoring! Problem all begins with replacing html after search, instead of wrapping the search term (element.create)*/
function regGlossaryFunc(match){
  var output = '<div class="MyGallery'+window.regX+'"><div>' + match + '</div></div>';
      output2 = '<div class="MyGallery'+window.regX+' superbox-active"><div class="superbox-list superbox- superbox-last">';
      output3 = '</div><div class="superbox-float"></div></div>';
  window.glossaryReplace.push(output2);
  window.glossaryReplace.push(output3);
  window.regX++;
  return output;
}
function replaceTextAll(find, str) {
    return str.replace(new RegExp('\\b'+find+'\\b','g'), regGlossaryFunc);
}
function replaceHTMLAll(find, replace, str) {
    return str.replace(new RegExp(find,'g'), replace);
}
/*More bad code! Superbox is being applied after replacement because event listeners are overridden. Too many arrays*/
function applySuperBoxList(){
      for(var idx=0; idx < superBoxListTerm.length; idx++){
        var SBOld = superBoxListOld[idx],
            SBNew = superBoxListNew[idx];
        window.glossaryTermOld = superBoxListTerm[idx];
        window.glossaryDescriptionOld = superBoxListDefinition[idx];
        for(var i=SBOld; i < SBNew; i++){
          $('.MyGallery'+i).SuperBox();
        }      
    }
}
function idCruncher(oldId){
  var newId = oldId.toLowerCase();
  return newId.replace(/^[^a-z]+|[^\w:.-]+/gi, "");
}
function htmlEntitiesEscape(string){
  var div = document.createElement('div');
  div.innerHTML = string;
  return div.firstChild.nodeValue;
}
function glossaryMakeLink(){
  if (!window.glossaryOn) {
  for(var i=0; i<glossaryTerms.length; i++){
    var regXOld = window.regX;
    document.getElementById("slide-1-1").innerHTML = replaceTextAll(htmlEntitiesEscape(glossaryTerms[i]), document.getElementById("slide-1-1").innerHTML);
    if(regXOld != regX){
      /*Here we should wrap and call*/
      superBoxListOld.push(regXOld);
      superBoxListNew.push(regX);
      superBoxListTerm.push(htmlEntitiesEscape(glossaryTerms[i]));
      superBoxListDefinition.push(glossaryDescription[i]);
    }

  }
  /**/
  applySuperBoxList();
  };
}
function glossaryBreakLink(){
  window.glossaryOn = true;
/*
    for(var i=0;i<glossaryReplace.length;i++){    
        document.getElementById("slide-1-1").innerHTML = replaceHTMLAll(glossaryReplace[i], '', document.getElementById("slide-1-1").innerHTML);
    }
    document.getElementById("slide-1-1").innerHTML=document.getElementById("slide-1-1").innerHTML;
    */
}
function glossaryScrollTo(ID){
  window.glossaryClose =1;
  glossary_btn.className = 'right active3';
  scrollCurrentCapture();
  scrollerDimensions(0, document.getElementById('slide-1-2').clientWidth, document.getElementById('slide-1-2').clientHeight+100);
  scrollReset();
  setTimeout(function(){
    var target = document.getElementById(ID);
    var navbarHeight = $('#navbar').height();
    var left1 = window.pageXOffset || document.documentElement.scrollLeft;
    window.scrollersY[scrollersY.length-1].scroller.scrollBy(left1, (target.offsetTop-10-navbarHeight), true);
  },600);
}
function glossaryGoTo(){
  window.glossaryClose =1;
  scrollCurrentCapture();
  window.location.assign('#slide-1-2');
  scrollerDimensions(0, document.getElementById('slide-1-2').clientWidth, document.getElementById('slide-1-2').clientHeight+100);
  scrollReset();
}
function glossaryLeave(){
  if (projectCurrent != "") {
    scrollReset();
    window.location.assign('#slide-1-1');
    setTimeout(function(){
      scrollerDimensions(0, document.getElementById('slide-1-1').clientWidth, document.getElementById('slide-1-1').clientHeight+100);
      var left1 = window.pageXOffset || document.documentElement.scrollLeft;
      window.scrollersY[scrollersY.length-1].scroller.scrollBy(left1, window.scrollCurrent, true);
    },650);
  }else{
    window.location.assign('#slide-main');
    scrollerDimensions(0, document.getElementById('slide-main').clientWidth, document.getElementById('slide-main').clientHeight+100);
    scrollReset();
  }
}
function quickSkip(nextProject){
  var oldChapter = window.chapterCurrent;
  if (nextProject === lockProject[0]) {
    lockProject.shift();
    lockChapterProject.shift();
    LS.set('lockChapterProject', lockChapterProject);
    LS.set('lockProject', lockProject);
  }
  setTimeout(function(){
    scrollReset();
    captureProject(nextProject);
    if (oldChapter != window.chapterCurrent) {
      captureChapter(window.chapterCurrent);
    }
  },400);
}
function Construct2Resize(){
  //var iframe = document.getElementById('iframe'),
  //innerDoc = iframe.contentDocument || iframe.contentWindow.document;
  //window.frames['iframe'].contentDocument.updateCanvasSize();
  //innerDoc.getElementById('c2canvas').style.height = screenHeight - 70+"px";
  //window.frames['bob'].updateCanvasSize();

}
function unlockProjects(newProject){
    var result = $.inArray(newProject, lockProject);
    if(result == -1){
       return true;
    }else{
      return false;
    }
}
function unlockChapters(newChapter){
    var result = $.inArray(newChapter, lockChapter);
    if(result === -1){
        return true;
    }else{
      if (newChapter === lockChapter[0] && newChapter === lockChapterProject[0]) {
        var html_frag = document.createDocumentFragment(),
        div_elem = document.createElement("div"),
        centerIt_elem = document.createElement("div"),
        h3_elem = document.createElement("h3"),
        img_elem = document.createElement("img"),
        audio_elem = document.createElement("audio");

        h3_elem.innerText=lockChapter[0];
        centerIt_elem.className ="centerIt";
        img_elem.src ="images/venipuncture/"+idCruncher(htmlEntitiesEscape(lockChapter[0]))+".jpg";
        img_elem.className ="imgModal";
        audio_elem.src ="audio/venipuncture/"+idCruncher(htmlEntitiesEscape(lockChapter[0]))+".ogg";
        audio_elem.id ="audio"+idCruncher(htmlEntitiesEscape(lockChapter[0]));

        audio_elem.load();
        audio_elem.play();

        div_elem.id="modalDiv";
        h3_elem.id="modalH3";

        div_elem.appendChild(audio_elem);
        centerIt_elem.appendChild(img_elem);
        div_elem.appendChild(centerIt_elem);
        html_frag.appendChild(h3_elem);
        html_frag.appendChild(div_elem);
        getModalView(html_frag);
        //modal here
        lockChapter.shift();
        LS.set('lockChapter', lockChapter);
        return true;
      }
      return false;
    } 
}

function lockProjects(){
  window.help_btn.setAttribute('disabled','disabled');
    projectMap.forEach(function(entry) {
        var project = document.getElementById(idCruncher(htmlEntitiesEscape(entry)));
      if (project) {project.removeAttribute("disabled");}
    });
    lockProject.forEach(function(entry) {
        var project = document.getElementById(idCruncher(htmlEntitiesEscape(entry)));
        if (project) {project.setAttribute("disabled","disabled");}
    });
}
function lockChapters(newChapter){
  window.help_btn.setAttribute('disabled','disabled');
    chapterMap.forEach(function(entry) {
        var chapter = document.getElementById(idCruncher(htmlEntitiesEscape(entry)));
        if (chapter) {chapter.removeAttribute("disabled");}
    });
    lockChapter.forEach(function(entry) {
        var chapter = document.getElementById(idCruncher(htmlEntitiesEscape(entry)));
        if (chapter) {chapter.setAttribute("disabled","disabled");}
    });
}
function getModalView(html){
  var content = document.querySelector('.md-content'),
      header = document.getElementById('modalH3'),
      body = document.getElementById('modalDiv');
      if (header && body) {
          content.removeChild(header);
          content.removeChild(body);
      };
  content.insertBefore(html, content.firstChild);
  simulateClick("md-trigger");
}
/**************************** Plugins ************************************/
/**************************** Classie ***********************************/
/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

window.classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

})( window );

/**************************** Zynga Scroller ****************************/
/*
 * Scroller
 * http://github.com/zynga/scroller
 *
 * Copyright 2011, Zynga Inc.
 * Licensed under the MIT License.
 * https://raw.github.com/zynga/scroller/master/MIT-LICENSE.txt
 *
 * Based on the work of: Unify Project (unify-project.org)
 * http://unify-project.org
 * Copyright 2011, Deutsche Telekom AG
 * License: MIT + Apache (V2)
 */

/**
 * Generic animation class with support for dropped frames both optional easing and duration.
 *
 * Optional duration is useful when the lifetime is defined by another condition than time
 * e.g. speed of an animating object, etc.
 *
 * Dropped frame logic allows to keep using the same updater logic independent from the actual
 * rendering. This eases a lot of cases where it might be pretty complex to break down a state
 * based on the pure time difference.
 */
(function(global) {
  var time = Date.now || function() {
    return +new Date();
  };
  var desiredFrames = 60;
  var millisecondsPerSecond = 1000;
  var running = {};
  var counter = 1;

  // Create namespaces
  if (!global.core) {
    global.core = { effect : {} };

  } else if (!core.effect) {
    core.effect = {};
  }

  core.effect.Animate = {

    /**
     * A requestAnimationFrame wrapper / polyfill.
     *
     * @param callback {Function} The callback to be invoked before the next repaint.
     * @param root {HTMLElement} The root element for the repaint
     */
    requestAnimationFrame: (function() {

      // Check for request animation Frame support
      var requestFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame;
      var isNative = !!requestFrame;

      if (requestFrame && !/requestAnimationFrame\(\)\s*\{\s*\[native code\]\s*\}/i.test(requestFrame.toString())) {
        isNative = false;
      }

      if (isNative) {
        return function(callback, root) {
          requestFrame(callback, root)
        };
      }

      var TARGET_FPS = 60;
      var requests = {};
      var requestCount = 0;
      var rafHandle = 1;
      var intervalHandle = null;
      var lastActive = +new Date();

      return function(callback, root) {
        var callbackHandle = rafHandle++;

        // Store callback
        requests[callbackHandle] = callback;
        requestCount++;

        // Create timeout at first request
        if (intervalHandle === null) {

          intervalHandle = setInterval(function() {

            var time = +new Date();
            var currentRequests = requests;

            // Reset data structure before executing callbacks
            requests = {};
            requestCount = 0;

            for(var key in currentRequests) {
              if (currentRequests.hasOwnProperty(key)) {
                currentRequests[key](time);
                lastActive = time;
              }
            }

            // Disable the timeout when nothing happens for a certain
            // period of time
            if (time - lastActive > 2500) {
              clearInterval(intervalHandle);
              intervalHandle = null;
            }

          }, 1000 / TARGET_FPS);
        }

        return callbackHandle;
      };

    })(),


    /**
     * Stops the given animation.
     *
     * @param id {Integer} Unique animation ID
     * @return {Boolean} Whether the animation was stopped (aka, was running before)
     */
    stop: function(id) {
      var cleared = running[id] != null;
      if (cleared) {
        running[id] = null;
      }

      return cleared;
    },


    /**
     * Whether the given animation is still running.
     *
     * @param id {Integer} Unique animation ID
     * @return {Boolean} Whether the animation is still running
     */
    isRunning: function(id) {
      return running[id] != null;
    },


    /**
     * Start the animation.
     *
     * @param stepCallback {Function} Pointer to function which is executed on every step.
     *   Signature of the method should be `function(percent, now, virtual) { return continueWithAnimation; }`
     * @param verifyCallback {Function} Executed before every animation step.
     *   Signature of the method should be `function() { return continueWithAnimation; }`
     * @param completedCallback {Function}
     *   Signature of the method should be `function(droppedFrames, finishedAnimation) {}`
     * @param duration {Integer} Milliseconds to run the animation
     * @param easingMethod {Function} Pointer to easing function
     *   Signature of the method should be `function(percent) { return modifiedValue; }`
     * @param root {Element ? document.body} Render root, when available. Used for internal
     *   usage of requestAnimationFrame.
     * @return {Integer} Identifier of animation. Can be used to stop it any time.
     */
    start: function(stepCallback, verifyCallback, completedCallback, duration, easingMethod, root) {

      var start = time();
      var lastFrame = start;
      var percent = 0;
      var dropCounter = 0;
      var id = counter++;

      if (!root) {
        root = document.body;
      }

      // Compacting running db automatically every few new animations
      if (id % 20 === 0) {
        var newRunning = {};
        for (var usedId in running) {
          newRunning[usedId] = true;
        }
        running = newRunning;
      }

      // This is the internal step method which is called every few milliseconds
      var step = function(virtual) {

        // Normalize virtual value
        var render = virtual !== true;

        // Get current time
        var now = time();

        // Verification is executed before next animation step
        if (!running[id] || (verifyCallback && !verifyCallback(id))) {

          running[id] = null;
          completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, false);
          return;

        }

        // For the current rendering to apply let's update omitted steps in memory.
        // This is important to bring internal state variables up-to-date with progress in time.
        if (render) {

          var droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1;
          for (var j = 0; j < Math.min(droppedFrames, 4); j++) {
            step(true);
            dropCounter++;
          }

        }

        // Compute percent value
        if (duration) {
          percent = (now - start) / duration;
          if (percent > 1) {
            percent = 1;
          }
        }

        // Execute step callback, then...
        var value = easingMethod ? easingMethod(percent) : percent;
        if ((stepCallback(value, now, render) === false || percent === 1) && render) {
          running[id] = null;
          completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, percent === 1 || duration == null);
        } else if (render) {
          lastFrame = now;
          core.effect.Animate.requestAnimationFrame(step, root);
        }
      };

      // Mark as running
      running[id] = true;

      // Init first step
      core.effect.Animate.requestAnimationFrame(step, root);

      // Return unique animation ID
      return id;
    }
  };
})(this);

/************************************************/
/*
 * Scroller
 * http://github.com/zynga/scroller
 *
 * Copyright 2011, Zynga Inc.
 * Licensed under the MIT License.
 * https://raw.github.com/zynga/scroller/master/MIT-LICENSE.txt
 *
 * Based on the work of: Unify Project (unify-project.org)
 * http://unify-project.org
 * Copyright 2011, Deutsche Telekom AG
 * License: MIT + Apache (V2)
 */

var Scroller;

(function() {
  var NOOP = function(){};

  /**
   * A pure logic 'component' for 'virtual' scrolling/zooming.
   */
  Scroller = function(callback, options) {
    this.callme = "hello";
    this.__callback = callback;

    this.options = {

      /** Enable scrolling on x-axis */
      scrollingX: true,

      /** Enable scrolling on y-axis */
      scrollingY: true,

      /** Enable animations for deceleration, snap back, zooming and scrolling */
      animating: true,

      /** duration for animations triggered by scrollTo/zoomTo */
      animationDuration: 250,

      /** Enable bouncing (content can be slowly moved outside and jumps back after releasing) */
      bouncing: true,

      /** Enable locking to the main axis if user moves only slightly on one of them at start */
      locking: true,

      /** Enable pagination mode (switching between full page content panes) */
      paging: false,

      /** Enable snapping of content to a configured pixel grid */
      snapping: false,

      /** Enable zooming of content via API, fingers and mouse wheel */
      zooming: false,

      /** Minimum zoom level */
      minZoom: 0.5,

      /** Maximum zoom level */
      maxZoom: 3,

      /** Multiply or decrease scrolling speed **/
      speedMultiplier: 1,

      /** Callback that is fired on the later of touch end or deceleration end,
        provided that another scrolling action has not begun. Used to know
        when to fade out a scrollbar. */
      scrollingComplete: NOOP,
      
      /** This configures the amount of change applied to deceleration when reaching boundaries  **/
            penetrationDeceleration : 0.03,

            /** This configures the amount of change applied to acceleration when reaching boundaries  **/
            penetrationAcceleration : 0.08

    };

    for (var key in options) {
      this.options[key] = options[key];
    }

  };


  // Easing Equations (c) 2003 Robert Penner, all rights reserved.
  // Open source under the BSD License.

  /**
   * @param pos {Number} position between 0 (start of effect) and 1 (end of effect)
  **/
  var easeOutCubic = function(pos) {
    return (Math.pow((pos - 1), 3) + 1);
  };

  /**
   * @param pos {Number} position between 0 (start of effect) and 1 (end of effect)
  **/
  var easeInOutCubic = function(pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 3);
    }

    return 0.5 * (Math.pow((pos - 2), 3) + 2);
  };


  var members = {

    /*
    ---------------------------------------------------------------------------
      INTERNAL FIELDS :: STATUS
    ---------------------------------------------------------------------------
    */

    /** {Boolean} Whether only a single finger is used in touch handling */
    __isSingleTouch: false,

    /** {Boolean} Whether a touch event sequence is in progress */
    __isTracking: false,

    /** {Boolean} Whether a deceleration animation went to completion. */
    __didDecelerationComplete: false,

    /**
     * {Boolean} Whether a gesture zoom/rotate event is in progress. Activates when
     * a gesturestart event happens. This has higher priority than dragging.
     */
    __isGesturing: false,

    /**
     * {Boolean} Whether the user has moved by such a distance that we have enabled
     * dragging mode. Hint: It's only enabled after some pixels of movement to
     * not interrupt with clicks etc.
     */
    __isDragging: false,

    /**
     * {Boolean} Not touching and dragging anymore, and smoothly animating the
     * touch sequence using deceleration.
     */
    __isDecelerating: false,

    /**
     * {Boolean} Smoothly animating the currently configured change
     */
    __isAnimating: false,



    /*
    ---------------------------------------------------------------------------
      INTERNAL FIELDS :: DIMENSIONS
    ---------------------------------------------------------------------------
    */

    /** {Integer} Available outer left position (from document perspective) */
    __clientLeft: 0,

    /** {Integer} Available outer top position (from document perspective) */
    __clientTop: 0,

    /** {Integer} Available outer width */
    __clientWidth: 0,

    /** {Integer} Available outer height */
    __clientHeight: 0,

    /** {Integer} Outer width of content */
    __contentWidth: 0,

    /** {Integer} Outer height of content */
    __contentHeight: 0,

    /** {Integer} Snapping width for content */
    __snapWidth: 100,

    /** {Integer} Snapping height for content */
    __snapHeight: 100,

    /** {Integer} Height to assign to refresh area */
    __refreshHeight: null,

    /** {Boolean} Whether the refresh process is enabled when the event is released now */
    __refreshActive: false,

    /** {Function} Callback to execute on activation. This is for signalling the user about a refresh is about to happen when he release */
    __refreshActivate: null,

    /** {Function} Callback to execute on deactivation. This is for signalling the user about the refresh being cancelled */
    __refreshDeactivate: null,

    /** {Function} Callback to execute to start the actual refresh. Call {@link #refreshFinish} when done */
    __refreshStart: null,

    /** {Number} Zoom level */
    __zoomLevel: 1,

    /** {Number} Scroll position on x-axis */
    __scrollLeft: 0,

    /** {Number} Scroll position on y-axis */
    __scrollTop: 0,

    /** {Integer} Maximum allowed scroll position on x-axis */
    __maxScrollLeft: 0,

    /** {Integer} Maximum allowed scroll position on y-axis */
    __maxScrollTop: 0,

    /* {Number} Scheduled left position (final position when animating) */
    __scheduledLeft: 0,

    /* {Number} Scheduled top position (final position when animating) */
    __scheduledTop: 0,

    /* {Number} Scheduled zoom level (final scale when animating) */
    __scheduledZoom: 0,



    /*
    ---------------------------------------------------------------------------
      INTERNAL FIELDS :: LAST POSITIONS
    ---------------------------------------------------------------------------
    */

    /** {Number} Left position of finger at start */
    __lastTouchLeft: null,

    /** {Number} Top position of finger at start */
    __lastTouchTop: null,

    /** {Date} Timestamp of last move of finger. Used to limit tracking range for deceleration speed. */
    __lastTouchMove: null,

    /** {Array} List of positions, uses three indexes for each state: left, top, timestamp */
    __positions: null,



    /*
    ---------------------------------------------------------------------------
      INTERNAL FIELDS :: DECELERATION SUPPORT
    ---------------------------------------------------------------------------
    */

    /** {Integer} Minimum left scroll position during deceleration */
    __minDecelerationScrollLeft: null,

    /** {Integer} Minimum top scroll position during deceleration */
    __minDecelerationScrollTop: null,

    /** {Integer} Maximum left scroll position during deceleration */
    __maxDecelerationScrollLeft: null,

    /** {Integer} Maximum top scroll position during deceleration */
    __maxDecelerationScrollTop: null,

    /** {Number} Current factor to modify horizontal scroll position with on every step */
    __decelerationVelocityX: null,

    /** {Number} Current factor to modify vertical scroll position with on every step */
    __decelerationVelocityY: null,



    /*
    ---------------------------------------------------------------------------
      PUBLIC API
    ---------------------------------------------------------------------------
    */

    /**
     * Configures the dimensions of the client (outer) and content (inner) elements.
     * Requires the available space for the outer element and the outer size of the inner element.
     * All values which are falsy (null or zero etc.) are ignored and the old value is kept.
     *
     * @param clientWidth {Integer ? null} Inner width of outer element
     * @param clientHeight {Integer ? null} Inner height of outer element
     * @param contentWidth {Integer ? null} Outer width of inner element
     * @param contentHeight {Integer ? null} Outer height of inner element
     */
    setDimensions: function(clientWidth, clientHeight, contentWidth, contentHeight) {

      var self = this;

      // Only update values which are defined
      if (clientWidth === +clientWidth) {
        self.__clientWidth = clientWidth;
      }

      if (clientHeight === +clientHeight) {
        self.__clientHeight = clientHeight;
      }

      if (contentWidth === +contentWidth) {
        self.__contentWidth = contentWidth;
      }

      if (contentHeight === +contentHeight) {
        self.__contentHeight = contentHeight;
      }

      // Refresh maximums
      self.__computeScrollMax();

      // Refresh scroll position
      self.scrollTo(self.__scrollLeft, self.__scrollTop, true);

    },


    /**
     * Sets the client coordinates in relation to the document.
     *
     * @param left {Integer ? 0} Left position of outer element
     * @param top {Integer ? 0} Top position of outer element
     */
    setPosition: function(left, top) {

      var self = this;

      self.__clientLeft = left || 0;
      self.__clientTop = top || 0;

    },


    /**
     * Configures the snapping (when snapping is active)
     *
     * @param width {Integer} Snapping width
     * @param height {Integer} Snapping height
     */
    setSnapSize: function(width, height) {

      var self = this;

      self.__snapWidth = width;
      self.__snapHeight = height;

    },


    /**
     * Activates pull-to-refresh. A special zone on the top of the list to start a list refresh whenever
     * the user event is released during visibility of this zone. This was introduced by some apps on iOS like
     * the official Twitter client.
     *
     * @param height {Integer} Height of pull-to-refresh zone on top of rendered list
     * @param activateCallback {Function} Callback to execute on activation. This is for signalling the user about a refresh is about to happen when he release.
     * @param deactivateCallback {Function} Callback to execute on deactivation. This is for signalling the user about the refresh being cancelled.
     * @param startCallback {Function} Callback to execute to start the real async refresh action. Call {@link #finishPullToRefresh} after finish of refresh.
     */
    activatePullToRefresh: function(height, activateCallback, deactivateCallback, startCallback) {

      var self = this;

      self.__refreshHeight = height;
      self.__refreshActivate = activateCallback;
      self.__refreshDeactivate = deactivateCallback;
      self.__refreshStart = startCallback;

    },


    /**
     * Starts pull-to-refresh manually.
     */
    triggerPullToRefresh: function() {
      // Use publish instead of scrollTo to allow scrolling to out of boundary position
      // We don't need to normalize scrollLeft, zoomLevel, etc. here because we only y-scrolling when pull-to-refresh is enabled
      this.__publish(this.__scrollLeft, -this.__refreshHeight, this.__zoomLevel, true);

      if (this.__refreshStart) {
        this.__refreshStart();
      }
    },


    /**
     * Signalizes that pull-to-refresh is finished.
     */
    finishPullToRefresh: function() {

      var self = this;

      self.__refreshActive = false;
      if (self.__refreshDeactivate) {
        self.__refreshDeactivate();
      }

      self.scrollTo(self.__scrollLeft, self.__scrollTop, true);

    },


    /**
     * Returns the scroll position and zooming values
     *
     * @return {Map} `left` and `top` scroll position and `zoom` level
     */
    getValues: function() {

      var self = this;

      return {
        left: self.__scrollLeft,
        top: self.__scrollTop,
        zoom: self.__zoomLevel
      };

    },


    /**
     * Returns the maximum scroll values
     *
     * @return {Map} `left` and `top` maximum scroll values
     */
    getScrollMax: function() {

      var self = this;

      return {
        left: self.__maxScrollLeft,
        top: self.__maxScrollTop
      };

    },


    /**
     * Zooms to the given level. Supports optional animation. Zooms
     * the center when no coordinates are given.
     *
     * @param level {Number} Level to zoom to
     * @param animate {Boolean ? false} Whether to use animation
     * @param originLeft {Number ? null} Zoom in at given left coordinate
     * @param originTop {Number ? null} Zoom in at given top coordinate
     * @param callback {Function ? null} A callback that gets fired when the zoom is complete.
     */
    zoomTo: function(level, animate, originLeft, originTop, callback) {

      var self = this;

      if (!self.options.zooming) {
        throw new Error("Zooming is not enabled!");
      }

      // Add callback if exists
      if(callback) {
        self.__zoomComplete = callback;
      }

      // Stop deceleration
      if (self.__isDecelerating) {
        core.effect.Animate.stop(self.__isDecelerating);
        self.__isDecelerating = false;
      }

      var oldLevel = self.__zoomLevel;

      // Normalize input origin to center of viewport if not defined
      if (originLeft == null) {
        originLeft = self.__clientWidth / 2;
      }

      if (originTop == null) {
        originTop = self.__clientHeight / 2;
      }

      // Limit level according to configuration
      level = Math.max(Math.min(level, self.options.maxZoom), self.options.minZoom);

      // Recompute maximum values while temporary tweaking maximum scroll ranges
      self.__computeScrollMax(level);

      // Recompute left and top coordinates based on new zoom level
      var left = ((originLeft + self.__scrollLeft) * level / oldLevel) - originLeft;
      var top = ((originTop + self.__scrollTop) * level / oldLevel) - originTop;

      // Limit x-axis
      if (left > self.__maxScrollLeft) {
        left = self.__maxScrollLeft;
      } else if (left < 0) {
        left = 0;
      }

      // Limit y-axis
      if (top > self.__maxScrollTop) {
        top = self.__maxScrollTop;
      } else if (top < 0) {
        top = 0;
      }

      // Push values out
      self.__publish(left, top, level, animate);

    },


    /**
     * Zooms the content by the given factor.
     *
     * @param factor {Number} Zoom by given factor
     * @param animate {Boolean ? false} Whether to use animation
     * @param originLeft {Number ? 0} Zoom in at given left coordinate
     * @param originTop {Number ? 0} Zoom in at given top coordinate
     * @param callback {Function ? null} A callback that gets fired when the zoom is complete.
     */
    zoomBy: function(factor, animate, originLeft, originTop, callback) {

      var self = this;

      self.zoomTo(self.__zoomLevel * factor, animate, originLeft, originTop, callback);

    },


    /**
     * Scrolls to the given position. Respect limitations and snapping automatically.
     *
     * @param left {Number?null} Horizontal scroll position, keeps current if value is <code>null</code>
     * @param top {Number?null} Vertical scroll position, keeps current if value is <code>null</code>
     * @param animate {Boolean?false} Whether the scrolling should happen using an animation
     * @param zoom {Number?null} Zoom level to go to
     */
    scrollTo: function(left, top, animate, zoom) {

      var self = this;

      // Stop deceleration
      if (self.__isDecelerating) {
        core.effect.Animate.stop(self.__isDecelerating);
        self.__isDecelerating = false;
      }

      // Correct coordinates based on new zoom level
      if (zoom != null && zoom !== self.__zoomLevel) {

        if (!self.options.zooming) {
          throw new Error("Zooming is not enabled!");
        }

        left *= zoom;
        top *= zoom;

        // Recompute maximum values while temporary tweaking maximum scroll ranges
        self.__computeScrollMax(zoom);

      } else {

        // Keep zoom when not defined
        zoom = self.__zoomLevel;

      }

      if (!self.options.scrollingX) {

        left = self.__scrollLeft;

      } else {

        if (self.options.paging) {
          left = Math.round(left / self.__clientWidth) * self.__clientWidth;
          if(!window.cellTest){
            if (left === 0) {
              dotOne.className = "current";
              dotTwo.className = "";
              dotThree.className = "";
              pageCurrent = 0;
              if (scrollRight.disabled === true) {
                scrollRight.disabled = false;
              }
              if (scrollLeft.disabled === false) {
                scrollLeft.disabled = true;
              }
              if (scrollDown.disabled === false) {
                scrollDown.disabled = true;
              }
              if (scrollUp.disabled === false) {
                scrollUp.disabled = true;
              }
            }else if (left === self.__clientWidth) {
              videoBlur();
              dotOne.className = "";
              dotTwo.className = "current";
              dotThree.className = "";
              pageCurrent = 1;
              if (scrollRight.disabled === true) {
                scrollRight.disabled = false;
              }
              if (scrollLeft.disabled === true) {
                scrollLeft.disabled = false;
              }
              if (scrollDown.disabled === true) {
                scrollDown.disabled = false;
              }
              if (scrollUp.disabled === true) {
                scrollUp.disabled = false;
              }
            } else if (left === self.__clientWidth*2) {
              videoBlur();
              dotOne.className = "";
              dotTwo.className = "";
              dotThree.className = "current";
              pageCurrent = 2;    
              if (scrollRight.disabled === false) {
                scrollRight.disabled = true;
              }
              if (scrollLeft.disabled === true) {
                scrollLeft.disabled = false;
              }
              if (scrollDown.disabled === false) {
                scrollDown.disabled = true;
              }
              if (scrollUp.disabled === false) {
                scrollUp.disabled = true;
              }
            }
            window.cellTest = true;
          }
        } else if (self.options.snapping) {
          left = Math.round(left / self.__snapWidth) * self.__snapWidth;
        }

      }

      if (!self.options.scrollingY) {

        top = self.__scrollTop;

      } else {

        if (self.options.paging) {
          top = Math.round(top / self.__clientHeight) * self.__clientHeight;
        } else if (self.options.snapping) {
          top = Math.round(top / self.__snapHeight) * self.__snapHeight;
        }

      }

      // Limit for allowed ranges
      left = Math.max(Math.min(self.__maxScrollLeft, left), 0);
      top = Math.max(Math.min(self.__maxScrollTop, top), 0);

      // Don't animate when no change detected, still call publish to make sure
      // that rendered position is really in-sync with internal data
      if (left === self.__scrollLeft && top === self.__scrollTop) {
        animate = false;
      }

      // Publish new values
      self.__publish(left, top, zoom, animate);

    },


    /**
     * Scroll by the given offset
     *
     * @param left {Number ? 0} Scroll x-axis by given offset
     * @param top {Number ? 0} Scroll x-axis by given offset
     * @param animate {Boolean ? false} Whether to animate the given change
     */
    scrollBy: function(left, top, animate) {

      var self = this;

      var startLeft = self.__isAnimating ? self.__scheduledLeft : self.__scrollLeft;
      var startTop = self.__isAnimating ? self.__scheduledTop : self.__scrollTop;

      self.scrollTo(startLeft + (left || 0), startTop + (top || 0), animate);

    },



    /*
    ---------------------------------------------------------------------------
      EVENT CALLBACKS
    ---------------------------------------------------------------------------
    */

    /**
     * Mouse wheel handler for zooming support
     */
    doMouseZoom: function(wheelDelta, timeStamp, pageX, pageY) {

      var self = this;
      var change = wheelDelta > 0 ? 0.97 : 1.03;

      return self.zoomTo(self.__zoomLevel * change, false, pageX - self.__clientLeft, pageY - self.__clientTop);

    },


    /**
     * Touch start handler for scrolling support
     */
    doTouchStart: function(touches, timeStamp) {

      // Array-like check is enough here
      if (touches.length == null) {
        throw new Error("Invalid touch list: " + touches);
      }

      if (timeStamp instanceof Date) {
        timeStamp = timeStamp.valueOf();
      }
      if (typeof timeStamp !== "number") {
        throw new Error("Invalid timestamp value: " + timeStamp);
      }

      var self = this;

      // Reset interruptedAnimation flag
      self.__interruptedAnimation = true;

      // Stop deceleration
      if (self.__isDecelerating) {
        core.effect.Animate.stop(self.__isDecelerating);
        self.__isDecelerating = false;
        self.__interruptedAnimation = true;
      }

      // Stop animation
      if (self.__isAnimating) {
        core.effect.Animate.stop(self.__isAnimating);
        self.__isAnimating = false;
        self.__interruptedAnimation = true;
      }

      // Use center point when dealing with two fingers
      var currentTouchLeft, currentTouchTop;
      var isSingleTouch = touches.length === 1;
      if (isSingleTouch) {
        currentTouchLeft = touches[0].pageX;
        currentTouchTop = touches[0].pageY;
      } else {
        currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
        currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
      }

      // Store initial positions
      self.__initialTouchLeft = currentTouchLeft;
      self.__initialTouchTop = currentTouchTop;

      // Store current zoom level
      self.__zoomLevelStart = self.__zoomLevel;

      // Store initial touch positions
      self.__lastTouchLeft = currentTouchLeft;
      self.__lastTouchTop = currentTouchTop;

      // Store initial move time stamp
      self.__lastTouchMove = timeStamp;

      // Reset initial scale
      self.__lastScale = 1;

      // Reset locking flags
      self.__enableScrollX = !isSingleTouch && self.options.scrollingX;
      self.__enableScrollY = !isSingleTouch && self.options.scrollingY;

      // Reset tracking flag
      self.__isTracking = true;

      // Reset deceleration complete flag
      self.__didDecelerationComplete = false;

      // Dragging starts directly with two fingers, otherwise lazy with an offset
      self.__isDragging = !isSingleTouch;

      // Some features are disabled in multi touch scenarios
      self.__isSingleTouch = isSingleTouch;

      // Clearing data structure
      self.__positions = [];

    },


    /**
     * Touch move handler for scrolling support
     */
    doTouchMove: function(touches, timeStamp, scale) {

      // Array-like check is enough here
      if (touches.length == null) {
        throw new Error("Invalid touch list: " + touches);
      }

      if (timeStamp instanceof Date) {
        timeStamp = timeStamp.valueOf();
      }
      if (typeof timeStamp !== "number") {
        throw new Error("Invalid timestamp value: " + timeStamp);
      }

      var self = this;

      // Ignore event when tracking is not enabled (event might be outside of element)
      if (!self.__isTracking) {
        return;
      }


      var currentTouchLeft, currentTouchTop;

      // Compute move based around of center of fingers
      if (touches.length === 2) {
        currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
        currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
      } else {
        currentTouchLeft = touches[0].pageX;
        currentTouchTop = touches[0].pageY;
      }

      var positions = self.__positions;

      // Are we already is dragging mode?
      if (self.__isDragging) {

        // Compute move distance
        var moveX = currentTouchLeft - self.__lastTouchLeft;
        var moveY = currentTouchTop - self.__lastTouchTop;

        // Read previous scroll position and zooming
        var scrollLeft = self.__scrollLeft;
        var scrollTop = self.__scrollTop;
        var level = self.__zoomLevel;

        // Work with scaling
        if (scale != null && self.options.zooming) {

          var oldLevel = level;

          // Recompute level based on previous scale and new scale
          level = level / self.__lastScale * scale;

          // Limit level according to configuration
          level = Math.max(Math.min(level, self.options.maxZoom), self.options.minZoom);

          // Only do further compution when change happened
          if (oldLevel !== level) {

            // Compute relative event position to container
            var currentTouchLeftRel = currentTouchLeft - self.__clientLeft;
            var currentTouchTopRel = currentTouchTop - self.__clientTop;

            // Recompute left and top coordinates based on new zoom level
            scrollLeft = ((currentTouchLeftRel + scrollLeft) * level / oldLevel) - currentTouchLeftRel;
            scrollTop = ((currentTouchTopRel + scrollTop) * level / oldLevel) - currentTouchTopRel;

            // Recompute max scroll values
            self.__computeScrollMax(level);

          }
        }

        if (self.__enableScrollX) {

          scrollLeft -= moveX * this.options.speedMultiplier;
          var maxScrollLeft = self.__maxScrollLeft;

          if (scrollLeft > maxScrollLeft || scrollLeft < 0) {

            // Slow down on the edges
            if (self.options.bouncing) {

              scrollLeft += (moveX / 2  * this.options.speedMultiplier);

            } else if (scrollLeft > maxScrollLeft) {

              scrollLeft = maxScrollLeft;

            } else {

              scrollLeft = 0;

            }
          }
        }

        // Compute new vertical scroll position
        if (self.__enableScrollY) {
          scrollTop -= moveY * this.options.speedMultiplier;
          var maxScrollTop = self.__maxScrollTop;

          if (scrollTop > maxScrollTop || scrollTop < 0) {

            // Slow down on the edges
            if (self.options.bouncing) {

              scrollTop += (moveY / 2 * this.options.speedMultiplier);

              // Support pull-to-refresh (only when only y is scrollable)
              if (!self.__enableScrollX && self.__refreshHeight != null) {

                if (!self.__refreshActive && scrollTop <= -self.__refreshHeight) {

                  self.__refreshActive = true;
                  if (self.__refreshActivate) {
                    self.__refreshActivate();
                  }

                } else if (self.__refreshActive && scrollTop > -self.__refreshHeight) {

                  self.__refreshActive = false;
                  if (self.__refreshDeactivate) {
                    self.__refreshDeactivate();
                  }

                }
              }

            } else if (scrollTop > maxScrollTop) {

              scrollTop = maxScrollTop;

            } else {

              scrollTop = 0;

            }
          }
        }

        // Keep list from growing infinitely (holding min 10, max 20 measure points)
        if (positions.length > 60) {
          positions.splice(0, 30);
        }

        // Track scroll movement for decleration
        positions.push(scrollLeft, scrollTop, timeStamp);

        // Sync scroll position
        self.__publish(scrollLeft, scrollTop, level);

      // Otherwise figure out whether we are switching into dragging mode now.
      } else {

        var minimumTrackingForScroll = self.options.locking ? 3 : 0;
        var minimumTrackingForDrag = 5;

        var distanceX = Math.abs(currentTouchLeft - self.__initialTouchLeft);
        var distanceY = Math.abs(currentTouchTop - self.__initialTouchTop);

        self.__enableScrollX = self.options.scrollingX && distanceX >= minimumTrackingForScroll;
        self.__enableScrollY = self.options.scrollingY && distanceY >= minimumTrackingForScroll;

        positions.push(self.__scrollLeft, self.__scrollTop, timeStamp);

        self.__isDragging = (self.__enableScrollX || self.__enableScrollY) && (distanceX >= minimumTrackingForDrag || distanceY >= minimumTrackingForDrag);
        if (self.__isDragging) {
          self.__interruptedAnimation = false;
        }

      }

      // Update last touch positions and time stamp for next event
      self.__lastTouchLeft = currentTouchLeft;
      self.__lastTouchTop = currentTouchTop;
      self.__lastTouchMove = timeStamp;
      self.__lastScale = scale;

    },


    /**
     * Touch end handler for scrolling support
     */
    doTouchEnd: function(timeStamp) {
      if (timeStamp instanceof Date) {
        timeStamp = timeStamp.valueOf();
      }
      if (typeof timeStamp !== "number") {
        throw new Error("Invalid timestamp value: " + timeStamp);
      }

      var self = this;

      // Ignore event when tracking is not enabled (no touchstart event on element)
      // This is required as this listener ('touchmove') sits on the document and not on the element itself.
      if (!self.__isTracking) {
        return;
      }

      // Not touching anymore (when two finger hit the screen there are two touch end events)
      self.__isTracking = false;

      // Be sure to reset the dragging flag now. Here we also detect whether
      // the finger has moved fast enough to switch into a deceleration animation.
      if (self.__isDragging) {

        // Reset dragging flag
        self.__isDragging = false;

        // Start deceleration
        // Verify that the last move detected was in some relevant time frame
        if (self.__isSingleTouch && self.options.animating && (timeStamp - self.__lastTouchMove) <= 100) {

          // Then figure out what the scroll position was about 100ms ago
          var positions = self.__positions;
          var endPos = positions.length - 1;
          var startPos = endPos;

          // Move pointer to position measured 100ms ago
          for (var i = endPos; i > 0 && positions[i] > (self.__lastTouchMove - 100); i -= 3) {
            startPos = i;
          }

          // If start and stop position is identical in a 100ms timeframe,
          // we cannot compute any useful deceleration.
          if (startPos !== endPos) {

            // Compute relative movement between these two points
            var timeOffset = positions[endPos] - positions[startPos];
            var movedLeft = self.__scrollLeft - positions[startPos - 2];
           window.movedLeftG = self.__scrollLeft - positions[startPos - 2];
            var movedTop = self.__scrollTop - positions[startPos - 1];

            // Based on 50ms compute the movement to apply for each render step
            self.__decelerationVelocityX = movedLeft / timeOffset * (1000 / 60);
            self.__decelerationVelocityY = movedTop / timeOffset * (1000 / 60);

            // How much velocity is required to start the deceleration
            var minVelocityToStartDeceleration = self.options.paging || self.options.snapping ? 4 : 1;

            // Verify that we have enough velocity to start deceleration
            if (Math.abs(self.__decelerationVelocityX) > minVelocityToStartDeceleration || Math.abs(self.__decelerationVelocityY) > minVelocityToStartDeceleration) {

              if(movedLeft>20||movedLeft<-20){
                window.cellTest = false;
              }
              // Deactivate pull-to-refresh when decelerating
              if (!self.__refreshActive) {
                self.__startDeceleration(timeStamp);
              }
            }
          } else {
            self.options.scrollingComplete();
          }
        } else if ((timeStamp - self.__lastTouchMove) > 100) {
          if(window.cellTest){window.cellTest = false;}
          self.options.scrollingComplete();
        }
      }

      // If this was a slower move it is per default non decelerated, but this
      // still means that we want snap back to the bounds which is done here.
      // This is placed outside the condition above to improve edge case stability
      // e.g. touchend fired without enabled dragging. This should normally do not
      // have modified the scroll positions or even showed the scrollbars though.
      if (!self.__isDecelerating) {
        if (self.__refreshActive && self.__refreshStart) {

          // Use publish instead of scrollTo to allow scrolling to out of boundary position
          // We don't need to normalize scrollLeft, zoomLevel, etc. here because we only y-scrolling when pull-to-refresh is enabled
          self.__publish(self.__scrollLeft, - self.__refreshHeight, self.__zoomLevel, true);

          if (self.__refreshStart) {
            self.__refreshStart();
          }

        } else {
          if (self.__interruptedAnimation || self.__isDragging) {
            self.options.scrollingComplete();
          }
          window.cellTest = false;
          self.scrollTo(self.__scrollLeft, self.__scrollTop, true, self.__zoomLevel);

          // Directly signalize deactivation (nothing todo on refresh?)
          if (self.__refreshActive) {

            self.__refreshActive = false;
            if (self.__refreshDeactivate) {
              self.__refreshDeactivate();
            }

          }
        }
      }

      // Fully cleanup list
      self.__positions.length = 0;

    },



    /*
    ---------------------------------------------------------------------------
      PRIVATE API
    ---------------------------------------------------------------------------
    */

    /**
     * Applies the scroll position to the content element
     *
     * @param left {Number} Left scroll position
     * @param top {Number} Top scroll position
     * @param animate {Boolean?false} Whether animation should be used to move to the new coordinates
     */
    __publish: function(left, top, zoom, animate) {

      var self = this;

      // Remember whether we had an animation, then we try to continue based on the current "drive" of the animation
      var wasAnimating = self.__isAnimating;
      if (wasAnimating) {
        core.effect.Animate.stop(wasAnimating);
        self.__isAnimating = false;
      }

      if (animate && self.options.animating) {

        // Keep scheduled positions for scrollBy/zoomBy functionality
        self.__scheduledLeft = left;
        self.__scheduledTop = top;
        self.__scheduledZoom = zoom;

        var oldLeft = self.__scrollLeft;
        var oldTop = self.__scrollTop;
        var oldZoom = self.__zoomLevel;

        var diffLeft = left - oldLeft;
        var diffTop = top - oldTop;
        var diffZoom = zoom - oldZoom;

        var step = function(percent, now, render) {

          if (render) {

            self.__scrollLeft = oldLeft + (diffLeft * percent);
            self.__scrollTop = oldTop + (diffTop * percent);
            self.__zoomLevel = oldZoom + (diffZoom * percent);

            // Push values out
            if (self.__callback) {
              self.__callback(self.__scrollLeft, self.__scrollTop, self.__zoomLevel);
            }

          }
        };

        var verify = function(id) {
          return self.__isAnimating === id;
        };

        var completed = function(renderedFramesPerSecond, animationId, wasFinished) {
          if (animationId === self.__isAnimating) {
            self.__isAnimating = false;
          }
          if (self.__didDecelerationComplete || wasFinished) {
            self.options.scrollingComplete();
          }

          if (self.options.zooming) {
            self.__computeScrollMax();
            if(self.__zoomComplete) {
              self.__zoomComplete();
              self.__zoomComplete = null;
            }
          }
        };

        // When continuing based on previous animation we choose an ease-out animation instead of ease-in-out
        self.__isAnimating = core.effect.Animate.start(step, verify, completed, self.options.animationDuration, wasAnimating ? easeOutCubic : easeInOutCubic);

      } else {

        self.__scheduledLeft = self.__scrollLeft = left;
        self.__scheduledTop = self.__scrollTop = top;
        self.__scheduledZoom = self.__zoomLevel = zoom;

        // Push values out
        if (self.__callback) {
          self.__callback(left, top, zoom);
        }

        // Fix max scroll ranges
        if (self.options.zooming) {
          self.__computeScrollMax();
          if(self.__zoomComplete) {
            self.__zoomComplete();
            self.__zoomComplete = null;
          }
        }
      }
    },


    /**
     * Recomputes scroll minimum values based on client dimensions and content dimensions.
     */
    __computeScrollMax: function(zoomLevel) {

      var self = this;

      if (zoomLevel == null) {
        zoomLevel = self.__zoomLevel;
      }

      self.__maxScrollLeft = Math.max((self.__contentWidth * zoomLevel) - self.__clientWidth, 0);
      self.__maxScrollTop = Math.max((self.__contentHeight * zoomLevel) - self.__clientHeight, 0);

    },



    /*
    ---------------------------------------------------------------------------
      ANIMATION (DECELERATION) SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Called when a touch sequence end and the speed of the finger was high enough
     * to switch into deceleration mode.
     */
    __startDeceleration: function(timeStamp) {

      var self = this;

      if (self.options.paging) {

        var scrollLeft = Math.max(Math.min(self.__scrollLeft, self.__maxScrollLeft), 0);
        var scrollTop = Math.max(Math.min(self.__scrollTop, self.__maxScrollTop), 0);
        var clientWidth = self.__clientWidth;
        var clientHeight = self.__clientHeight;

        // We limit deceleration not to the min/max values of the allowed range, but to the size of the visible client area.
        // Each page should have exactly the size of the client area.
        self.__minDecelerationScrollLeft = Math.floor(scrollLeft / clientWidth) * clientWidth;
        self.__minDecelerationScrollTop = Math.floor(scrollTop / clientHeight) * clientHeight;
        self.__maxDecelerationScrollLeft = Math.ceil(scrollLeft / clientWidth) * clientWidth;
        self.__maxDecelerationScrollTop = Math.ceil(scrollTop / clientHeight) * clientHeight;

      } else {

        self.__minDecelerationScrollLeft = 0;
        self.__minDecelerationScrollTop = 0;
        self.__maxDecelerationScrollLeft = self.__maxScrollLeft;
        self.__maxDecelerationScrollTop = self.__maxScrollTop;

      }

      // Wrap class method
      var step = function(percent, now, render) {
        self.__stepThroughDeceleration(render);
      };

      // How much velocity is required to keep the deceleration running
      var minVelocityToKeepDecelerating = self.options.snapping ? 4 : 0.1;

      // Detect whether it's still worth to continue animating steps
      // If we are already slow enough to not being user perceivable anymore, we stop the whole process here.
      var verify = function() {
        var shouldContinue = Math.abs(self.__decelerationVelocityX) >= minVelocityToKeepDecelerating || Math.abs(self.__decelerationVelocityY) >= minVelocityToKeepDecelerating;
        if (!shouldContinue) {
          self.__didDecelerationComplete = true;
        }
        return shouldContinue;
      };

      var completed = function(renderedFramesPerSecond, animationId, wasFinished) {
        self.__isDecelerating = false;
        if (self.__didDecelerationComplete) {
          self.options.scrollingComplete();
        }

        // Animate to grid when snapping is active, otherwise just fix out-of-boundary positions
        self.scrollTo(self.__scrollLeft, self.__scrollTop, self.options.snapping);
      };

      // Start animation and switch on flag
      self.__isDecelerating = core.effect.Animate.start(step, verify, completed);

    },


    /**
     * Called on every step of the animation
     *
     * @param inMemory {Boolean?false} Whether to not render the current step, but keep it in memory only. Used internally only!
     */
    __stepThroughDeceleration: function(render) {

      var self = this;


      //
      // COMPUTE NEXT SCROLL POSITION
      //

      // Add deceleration to scroll position
      var scrollLeft = self.__scrollLeft + self.__decelerationVelocityX;
      var scrollTop = self.__scrollTop + self.__decelerationVelocityY;


      //
      // HARD LIMIT SCROLL POSITION FOR NON BOUNCING MODE
      //

      if (!self.options.bouncing) {

        var scrollLeftFixed = Math.max(Math.min(self.__maxDecelerationScrollLeft, scrollLeft), self.__minDecelerationScrollLeft);
        if (scrollLeftFixed !== scrollLeft) {
          scrollLeft = scrollLeftFixed;
          self.__decelerationVelocityX = 0;
        }

        var scrollTopFixed = Math.max(Math.min(self.__maxDecelerationScrollTop, scrollTop), self.__minDecelerationScrollTop);
        if (scrollTopFixed !== scrollTop) {
          scrollTop = scrollTopFixed;
          self.__decelerationVelocityY = 0;
        }

      }


      //
      // UPDATE SCROLL POSITION
      //

      if (render) {

        self.__publish(scrollLeft, scrollTop, self.__zoomLevel);

      } else {

        self.__scrollLeft = scrollLeft;
        self.__scrollTop = scrollTop;

      }


      //
      // SLOW DOWN
      //

      // Slow down velocity on every iteration
      if (!self.options.paging) {

        // This is the factor applied to every iteration of the animation
        // to slow down the process. This should emulate natural behavior where
        // objects slow down when the initiator of the movement is removed
        var frictionFactor = 0.95;

        self.__decelerationVelocityX *= frictionFactor;
        self.__decelerationVelocityY *= frictionFactor;

      }


      //
      // BOUNCING SUPPORT
      //

      if (self.options.bouncing) {

        var scrollOutsideX = 0;
        var scrollOutsideY = 0;

        // This configures the amount of change applied to deceleration/acceleration when reaching boundaries
        var penetrationDeceleration = self.options.penetrationDeceleration; 
        var penetrationAcceleration = self.options.penetrationAcceleration; 

        // Check limits
        if (scrollLeft < self.__minDecelerationScrollLeft) {
          scrollOutsideX = self.__minDecelerationScrollLeft - scrollLeft;

        } else if (scrollLeft > self.__maxDecelerationScrollLeft) {
          scrollOutsideX = self.__maxDecelerationScrollLeft - scrollLeft;

        }

        if (scrollTop < self.__minDecelerationScrollTop) {
          scrollOutsideY = self.__minDecelerationScrollTop - scrollTop;
        } else if (scrollTop > self.__maxDecelerationScrollTop) {
          scrollOutsideY = self.__maxDecelerationScrollTop - scrollTop;
        }

        // Slow down until slow enough, then flip back to snap position
        if (scrollOutsideX !== 0) {
          if (scrollOutsideX * self.__decelerationVelocityX <= 0) {
            self.__decelerationVelocityX += scrollOutsideX * penetrationDeceleration;
          } else {
            self.__decelerationVelocityX = scrollOutsideX * penetrationAcceleration;
          }
        }

        if (scrollOutsideY !== 0) {
          if (scrollOutsideY * self.__decelerationVelocityY <= 0) {
            self.__decelerationVelocityY += scrollOutsideY * penetrationDeceleration;
          } else {
            self.__decelerationVelocityY = scrollOutsideY * penetrationAcceleration;
          }
        }
      }
    }
  };

  // Copy over members to prototype
  for (var key in members) {
    Scroller.prototype[key] = members[key];
  }

})();
/*******************************************************/
/* DOM-based rendering (Uses 3D when available, falls back on margin when transform not available) */
var render = (function(global) {
  
  var docStyle = document.documentElement.style;
  
  var engine;
  if (global.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
    engine = 'presto';
  } else if ('MozAppearance' in docStyle) {
    engine = 'gecko';
  } else if ('WebkitAppearance' in docStyle) {
    engine = 'webkit';
  } else if (typeof navigator.cpuClass === 'string') {
    engine = 'trident';
  }
  
  var vendorPrefix = {
    trident: 'ms',
    gecko: 'Moz',
    webkit: 'Webkit',
    presto: 'O'
  }[engine];
  
  var helperElem = document.createElement("div");
  var undef;

  var perspectiveProperty = vendorPrefix + "Perspective";
  var transformProperty = vendorPrefix + "Transform";
  
  if (helperElem.style[perspectiveProperty] !== undef) {
    
    return function(left, top, zoom) {
      content.style[transformProperty] = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')';
    };  
    
  } else if (helperElem.style[transformProperty] !== undef) {
    
    return function(left, top, zoom) {
      content.style[transformProperty] = 'translate(' + (-left) + 'px,' + (-top) + 'px) scale(' + zoom + ')';
    };
    
  } else {
    
    return function(left, top, zoom) {
      content.style.marginLeft = left ? (-left/zoom) + 'px' : '';
      content.style.marginTop = top ? (-top/zoom) + 'px' : '';
      content.style.zoom = zoom || '';
    };
    
  }
})(this);


/****************************************************/

var EasyScroller = function(content, options) {
  
  this.content = content;
  this.container = content.parentNode;
  this.options = options || {};

  // create Scroller instance
  var that = this;
  this.scroller = new Scroller(function(left, top, zoom) {
    that.render(left, top, zoom);
  }, options);

  // bind events
  this.bindEvents();

  // the content element needs a correct transform origin for zooming
  this.content.style[EasyScroller.vendorPrefix + 'TransformOrigin'] = "left top";

  // reflow for the first time
  this.reflow();

};

EasyScroller.prototype.render = (function() {
  
  var docStyle = document.documentElement.style;
  
  var engine;
  if (window.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
    engine = 'presto';
  } else if ('MozAppearance' in docStyle) {
    engine = 'gecko';
  } else if ('WebkitAppearance' in docStyle) {
    engine = 'webkit';
  } else if (typeof navigator.cpuClass === 'string') {
    engine = 'trident';
  }
  
  var vendorPrefix = EasyScroller.vendorPrefix = {
    trident: 'ms',
    gecko: 'Moz',
    webkit: 'Webkit',
    presto: 'O'
  }[engine];
  
  var helperElem = document.createElement("div");
  var undef;
  
  var perspectiveProperty = vendorPrefix + "Perspective";
  var transformProperty = vendorPrefix + "Transform";
  
  if (helperElem.style[perspectiveProperty] !== undef) {
    
    return function(left, top, zoom) {
      this.content.style[transformProperty] = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')';
    };  
    
  } else if (helperElem.style[transformProperty] !== undef) {
    
    return function(left, top, zoom) {
      this.content.style[transformProperty] = 'translate(' + (-left) + 'px,' + (-top) + 'px) scale(' + zoom + ')';
    };
    
  } else {
    
    return function(left, top, zoom) {
      this.content.style.marginLeft = left ? (-left/zoom) + 'px' : '';
      this.content.style.marginTop = top ? (-top/zoom) + 'px' : '';
      this.content.style.zoom = zoom || '';
    };
    
  }
})();

EasyScroller.prototype.reflow = function() {

  // set the right scroller dimensions
  this.scroller.setDimensions(window.screenWidth,window.screenHeight , 0, 0);
  // refresh the position for zooming purposes
  var rect = this.container.getBoundingClientRect();
  this.scroller.setPosition(rect.left + this.container.clientLeft, rect.top + this.container.clientTop);
  
};

EasyScroller.prototype.bindEvents = function() {

  var that = this;

  // reflow handling
  window.addEventListener("resize", function() {
    that.reflow();
  }, false);

  // touch devices bind touch events
  if (0) {

    this.container.addEventListener("touchstart", function(e) {

      // Don't react if initial down happens on a form element
      if (e.touches[0] && e.touches[0].target && e.touches[0].target.tagName.match(/input|textarea|select/i)) {
        return;
      }

      that.scroller.doTouchStart(e.touches, e.timeStamp);
      e.preventDefault();

    }, false);

    document.addEventListener("touchmove", function(e) {
      that.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
    }, false);

    document.addEventListener("touchend", function(e) {
      that.scroller.doTouchEnd(e.timeStamp);
    }, false);

    document.addEventListener("touchcancel", function(e) {
      that.scroller.doTouchEnd(e.timeStamp);
    }, false);

  // non-touch bind mouse events
  } else {
    
    var mousedown = false;

    this.container.addEventListener("mousedown", function(e) {

      if (e.target.tagName.match(/input|textarea|select/i)) {
        return;
      }
    
      that.scroller.doTouchStart([{
        pageX: e.pageX,
        pageY: e.pageY
      }], e.timeStamp);

      mousedown = true;
      e.preventDefault();

    }, false);

    document.addEventListener("mousemove", function(e) {

      if (!mousedown) {
        return;
      }
      
      that.scroller.doTouchMove([{
        pageX: e.pageX,
        pageY: e.pageY
      }], e.timeStamp);

      mousedown = true;

    }, false);

    document.addEventListener("mouseup", function(e) {

      if (!mousedown) {
        return;
      }
      
      that.scroller.doTouchEnd(e.timeStamp);

      mousedown = false;

    }, false);

    this.container.addEventListener("mousewheel", function(e) {
      if(that.options.zooming) {
        that.scroller.doMouseZoom(e.wheelDelta, e.timeStamp, e.pageX, e.pageY); 
        e.preventDefault();
      }
    }, false);

  }

};

/**************************** Modal Window ************************************/
/**
 * modalEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var ModalEffects = (function() {

  function init() {

    var overlay = document.querySelector( '.md-overlay' );
    var modalTrigger = document.getElementById( 'md-trigger' );
      var modal = document.querySelector( '#modal' ),
        close = modal.querySelector( '.md-close' );

      function removeModal( hasPerspective ) {
        classie.remove( modal, 'md-show' );

        if( hasPerspective ) {
          classie.remove( document.documentElement, 'md-perspective' );
        }
      }

      function removeModalHandler() {
        removeModal( classie.has( modalTrigger, 'md-setperspective' ) ); 
        destroyAudio();
      }
      function callModal() {
        classie.add( modal, 'md-show' );
        overlay.removeEventListener( 'click', removeModalHandler );
        overlay.addEventListener( 'click', removeModalHandler );

        if( classie.has( modalTrigger, 'md-setperspective' ) ) {
          setTimeout( function() {
            classie.add( document.documentElement, 'md-perspective' );
          }, 25 );
        }
      }
            function destroyAudio(){
        var content = document.querySelector('.md-content'),
            header = document.getElementById('modalH3'),
            body = document.getElementById('modalDiv');
            if (header && body) {
              content.removeChild(header);
              content.removeChild(body);
            }
      }

      modalTrigger.addEventListener( 'click', callModal);
      /**/
      close.addEventListener( 'click', function( ev ) {
        ev.stopPropagation();
        removeModalHandler();
      });
  }

  init();

})();
/***************************** Glossary lightBox ************************************************/
/**
 * SuperBox
 * The lightbox reimagined. Fully responsive HTML5 image galleries.
 * 
 * Latest version: https://github.com/seyDoggy/superbox
 * Original version: https://github.com/toddmotto/superbox
 * 
 * License <https://github.com/seyDoggy/superbox/blob/master/LICENSE.txt>
 */
 ;(function($, undefined) {
  'use strict';

  var pluginName = 'SuperBox',
    pluginVersion = '3.1.1';

  $.fn.SuperBox = function(options) {

    /*
     * OPTIONS
     */
    var defaults = $.extend({
      background : null,
      border : null,
      height : 150,
      view : 'landscape',
      xColor : null,
      xShadow : 'none'
    }, options);

    /*
     * DECLARATIONS
     */
    var sbIsIconShown = false,
      sbIsNavReady = false,
      sbShow = $('<div class="superbox-show"/>'),
      sbImg = $('<div class="superbox-current-img"><b>'+glossaryTermOld+'<b/><br/><br/>'+glossaryDescriptionOld+'<br/></div>').append('<a href="#slide-1-2" onclick="(glossaryScrollTo(idCruncher(htmlEntitiesEscape(&#39;'+glossaryTermOld+'&#39;))))">View in glossary</a>'),
      sbClose = $('<a href="#" class="superbox-close"><i class="icon-remove-sign"></i></a>'),
      sbPrev = $(''),
      sbNext = $(''),
      sbFloat = $('<div class="superbox-float"/>'),
      sbList = this.find('>div'),
      sbList8 = this.find('>div:nth-child(8n)'),
      sbList6 = this.find('>div:nth-child(6n)'),
      sbList4 = this.find('>div:nth-child(4n)'),
      sbList2 = this.find('>div:nth-child(2n)'),
      sbWrapper = this;

    /*
     * METHODS
     */
    /**
     * setSuperboxLayout
     * 
     * Removes previously set classes,
     * Add classes based on parent width,
     * Set .superbox.show width based number of columns
     */
    var setSuperboxLayout = function(num){
      var setColumns = function(num){
        var lastItem,
          columnClass = 'superbox-',
          classArray = ['class','class','class','class','class'];
        if (num === 8) {
          lastItem = sbList8;
        } else if (num === 6) {
          lastItem = sbList6;
        } else if (num === 4) {
          lastItem = sbList4;
        } else if (num === 2) {
          lastItem = sbList2;
        }
        /*
         * remove classes
         */
        for (var i = classArray.length - 1; i >= 0; i--) {
          sbList.removeClass(classArray[i]);
        }
        /*
         * add classes
         */
        sbList.addClass(columnClass);
        lastItem.add(sbList.last()).addClass('superbox-last');
        /*
         * set superbox-show width
         */
        if (1) {
          sbWrapper.find('.superbox-show').outerWidth($('#slide-1-1').width()-20);
          //alert(sbWrapper.find('.superbox-show'));
        }
      };
      if (sbWrapper.width() > 1024) {
        setColumns(8);
      } else if (sbWrapper.width() > 767) {
        setColumns(6);
      } else if (sbWrapper.width() > 320) {
        setColumns(4);
      } else {
        setColumns(2);
      }
    };
    /**
     * setSuperBoxHeight
     * 
     * Set superbox-show outer height based on default height,
     * based on viewport height,
     * based on standard 2:3 ratio,
     * based on default orientation.
     */
    var setSuperBoxHeight = (function(){
      var thisWidth = sbWrapper.find('.superbox-show').outerWidth(true),
        thisHeight = defaults.height + (16 * 3), /* 1.5em padding */
        newHeight = thisHeight,
        thisWindow = $(window).height() * 0.80,
        thisView = defaults.view,
        thisRatio = 0.6667;

      if (newHeight > thisWindow) {
        newHeight = thisWindow;
      }
      if ((thisView === 'landscape') && (thisWidth < newHeight / thisRatio)) {
        newHeight = thisWidth * thisRatio;
      }
      if ((thisView === 'portrait') && (thisWidth < newHeight * thisRatio)) {
        newHeight = thisWidth / thisRatio;
      }
      if ((thisView === 'square') && (thisWidth < newHeight)) {
        newHeight = thisWidth;
      }
      sbWrapper.find('.superbox-show').outerHeight(newHeight);
    });

    /**
     * createSuperboxShow
     * 
     * Dynamically create superbox-show and insert it after superbox-last,
     * apply data-img of the thumbnail to the source of the full image,
     * preload previous and next full size image data into DOM,
     * open the superbox-show,
     * fade in and out of each image,
     * animate image to top of clicked row,
     * close superbox-show when X is clicked,
     * close superbox-show when open image is clicked
     */
    var createSuperboxShow = function(elem){
      /*
       * DECLARATIONS (createSuperboxShow)
       */
      var noSuperbox = !sbWrapper.find('.superbox-show').length,
        isOpen = elem.hasClass('superbox-O'),
        notLast = !elem.hasClass('superbox-last'),
        notInRow = !elem.nextAll('.superbox-last:first').next('.superbox-show').length,
        showNotNext = !elem.next('.superbox-show').length,
      /*
       * METHODS (createSuperboxShow)
       */
        openSuperBoxShow = function(type){
          if (type === 'A') {
            sbShow.html(sbImg).append(sbClose).insertAfter(elem.nextAll('.superbox-last:first'));
          } else {
            sbShow.html(sbImg).append(sbClose).insertAfter(elem);
          }
          setSuperBoxHeight();
          setSuperboxLayout();
          setImageData();
          sbWrapper.find('.superbox-show').slideDown('slow',function(){
            moveToTop();
            setOpenClass(true);
            revealImage(true);
            if (sbIsNavReady === false) {
              sbWrapper.find('.superbox-prev,.superbox-next').on('click',function(event){
                navigation($(this),event);
                sbIsNavReady = true;
              });
              /*
               * Keyboard navigation
               
              $(document.documentElement).keyup(function (event) {
                if (isScrolledIntoView() === true) {
                  navigation($(this),event);
                  sbIsNavReady = true;
                }
              });*/
            }
          });
          scrollerDimensions(0, document.getElementById('slide-1-1').clientWidth, document.getElementById('slide-1-1').clientHeight+340);
        },
        setImageData = function(){
          sbWrapper.find('.superbox-show img.superbox-current-img').attr('src',elem.find('img').data('img'));
          preloadImageData();
        },
        preloadImageData = function(){
          var imgPrev = new Image(),
            imgNext = new Image();
          imgPrev.src = elem.prev('.superbox-list').find('img').data('img');
          imgNext.src = elem.nextAll('.superbox-list:first').find('img').data('img');
        },
        moveToTop = function(){
          var target = sbWrapper.find('.superbox-show');
          var navbarHeight = $('#navbar').height();
          var left1 = window.pageXOffset || document.documentElement.scrollLeft;
          window.scrollersY[scrollersY.length-1].scroller.scrollBy(left1, (target.offset().top- 30 -navbarHeight), true);
        },
        isScrolledIntoView = function (){
          var docViewTop = $(window).scrollTop();
          var docViewBottom = docViewTop + $(window).height();

          var elemTop = sbWrapper.find('.superbox-show').offset().top;
          var elemBottom = elemTop + sbWrapper.find('.superbox-show').height();

          return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        },
        setOpenClass = function(bool){
          if (bool === true) {
            sbList.removeClass('superbox-O');
            elem.addClass('superbox-O');
          } else {
            sbList.removeClass('superbox-O');
          }
        },
        revealImage = function(bool){
          if (bool === true) {
            sbWrapper.find('.superbox-show img.superbox-current-img').animate({opacity:1},750);
            if (sbIsIconShown === false) {
              revealIcons(true);
            }
          } else {
            sbWrapper.find('.superbox-show img.superbox-current-img').animate({opacity:0},100,function(){
              setImageData();
            });
          }
        },
        revealIcons = function(bool){
          if (bool === true) {
            sbIsIconShown = true;
            sbWrapper.find('.superbox-close, .superbox-prev, .superbox-next').animate({opacity:0.7},750);
          } else {
            sbIsIconShown = false;
            sbWrapper.find('.superbox-close, .superbox-prev, .superbox-next').animate({opacity:0},100);
          }
        },
        navigation = function(select,event){
          event.preventDefault();
          var direction = null,
            selector = null;
          if (event.keyCode == 37 || select.hasClass('superbox-prev')) {
            /*
             * go left
             */
            direction = 'prev';
            selector = '.superbox-list';
          } else if (event.keyCode == 39 || select.hasClass('superbox-next')) {
            /*
             * go right
             */
            direction = 'nextAll';
            selector = '.superbox-list:first';
          }
          if (direction !== null) {
            sbWrapper.find('.superbox-O')[direction](selector).click();
          }
        },
        quickSwap = function(){
          revealImage(false);
          revealImage(true);
          setOpenClass(true);
        },
        closeSuperBoxShow = function(){
          var closeUp = function(){
            revealImage(false);
            revealIcons(false);
            sbWrapper.find('.superbox-show').slideUp(function(){
              $(this).remove();
              setOpenClass(false);
              sbIsNavReady = false;
            });
            scrollerDimensions(0, document.getElementById('slide-1-1').clientWidth, document.getElementById('slide-1-1').clientHeight);/*bug*/
          };
          sbWrapper.find('.superbox-close').on('click',function(event){
            event.preventDefault();
            closeUp();
          });
          if (isOpen === true) {
            closeUp();
          }
        };

      /*
       * IMPLEMENTATION (createSuperboxShow)
       */
      if (isOpen === false) {
        if (notLast === true && notInRow === true) {
          if (noSuperbox === true) {
            openSuperBoxShow('A');
          } else {
            revealImage(false);
            revealIcons(false);
            sbWrapper.find('.superbox-show').slideUp(function(){
              openSuperBoxShow('A');
            });
          }
        } else if (notLast === false && showNotNext === true) {
          if (noSuperbox === true) {
            openSuperBoxShow('B');
          } else {
            revealImage(false);
            revealIcons(false);
            sbWrapper.find('.superbox-show').slideUp(function(){
              openSuperBoxShow('B');
            });
          }
        } else {
          quickSwap();
        }
      }
      closeSuperBoxShow();
    };

    /**
     * keepShowAfterLast
     * 
     * Move superbox-show to after superbox-last when window is resized
     */
    var keepShowAfterLast = function(){
      $(window).resize(function(){
        if (sbWrapper.find('.superbox-O').hasClass('superbox-last')) {
          sbWrapper.find('.superbox-show').insertAfter(sbWrapper.find('.superbox-O'));
        } else {
          sbWrapper.find('.superbox-show').insertAfter(sbWrapper.find('.superbox-O').nextAll('.superbox-last:first'));
        }
      });
    };

    /**
     * useDefaults
     * 
     * Make us of and apply user settings
     */
    var useDefaults = function(){
      if (defaults.background !== null) {
        sbWrapper.find('.superbox-show').css('background-color',defaults.background);
      }
      if (defaults.border !== null) {
        sbWrapper.find('.superbox-show img.superbox-current-img').css('border-color',defaults.border);
      }
      if (defaults.xColor !== null) {
        sbWrapper.find('.superbox-close, .superbox-prev, .superbox-next').css('color',defaults.xColor);
      }
      if (defaults.xShadow == 'emboss') {
        sbWrapper.find('.superbox-close, .superbox-prev, .superbox-next').css('text-shadow','0 1px 0 rgba(0,0,0,0.6), 0 -1px 0 rgba(250,250,250,0.2)');
      } else if (defaults.xShadow == 'embed') {
        sbWrapper.find('.superbox-close, .superbox-prev, .superbox-next').css('text-shadow','0 -1px 0 rgba(0,0,0,0.4), 0 1px 0 rgba(250,250,250,0.5)');
      }
    };

    /*
     * IMPLEMENTATION
     */

    /*
     * Add superbox-active class to allow for CSS to take hold
     */
    this.addClass('superbox-active');

    /*
     * Add superbox-list class for easier CSS targeting
     */
    sbList.addClass('superbox-list');

    /*
     * Adjust superbox-show height and width based on window size
     */
    setSuperboxLayout();
    $(window).resize(function(){
      setSuperBoxHeight();
      setSuperboxLayout();
    });

    /*
     * Create final float
     */
    sbFloat.appendTo(this);

    /*
     * Preload image data when thumbnail is hovered over
     */
    sbList.on('mouseenter',function(){
      var img = new Image(),
        source = $(this).find('img').data('img');
      $(img).attr('src',source);
    });

    /*
     * Open/Close superbox-show based on click
     */
    sbList.on('click',function(){
      /*
       * Create superbox-show
       */
      createSuperboxShow($(this));

      /*
       * Apply user settings
       */
      useDefaults();
    });

    /*
     * Keep superbox-show after the proper row at all times
     */
    keepShowAfterLast();

    return this;
  };
})(jQuery);
/********************* Dot Navigation **********************************/
