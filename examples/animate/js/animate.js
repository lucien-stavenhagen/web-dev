function kludgePx(pxstring) {
    var n = pxstring.slice(0, pxstring.indexOf('px'));
    return (1 * n);
}
//
//got this off StackOverflow
//https://stackoverflow.com/questions/6338217/get-a-css-value-with-javascript
// doesn't work on chrome
// function getStyleRuleValue(style, selector) {
//     for (var i = 0; i < document.styleSheets.length; i++) {
//         var mysheet = document.styleSheets[i];
//         var myrules = mysheet.cssRules ? mysheet.cssRules : mysheet.rules;
//         for (var j = 0; j < myrules.length; j++) {
//             if (myrules[j].selectorText && myrules[j].selectorText.toLowerCase() === selector) {
//                 return myrules[j].style[style];
//             }
//         }
//     }
//     return undefined;
// }
// function getDimsFromCSS(elname, cssselector) {
//     e = document.getElementById(elname);
//     h = kludgePx(getStyleRuleValue("height", cssselector));
//     w = kludgePx(getStyleRuleValue("width", cssselector));
//     b = kludgePx(getStyleRuleValue("border-width", cssselector));
//     return { 'w': w, 'h': h, 'b': b, 'e': e };
// }
function setAnimationColors(cl, el, mtext, timescalled, timesaround) {
    const w = 255;
    const ss = 36;
    var stp;
    if (timesaround == 0) {
        stp = ss;
    } else {
        tmp = ss - (timesaround * timesaround * timesaround);
        if (tmp < 1) {
            stp = 1;
        } else {
            stp = tmp;
        }
    }
    console.log(stp);
    if ((timescalled % stp) == 0) {
        mtext.style.backgroundColor = "rgb(" + Math.floor(Math.random() * w) + "," + Math.floor(Math.random() * w) + "," + Math.floor(Math.random() * w) + ")";
        el.style.backgroundColor = "rgb(" + Math.floor(Math.random() * w) + "," + Math.floor(Math.random() * w) + "," + Math.floor(Math.random() * w) + ")";
        cl.style.backgroundColor = "rgb(" + Math.floor(Math.random() * w) + "," + Math.floor(Math.random() * w) + "," + Math.floor(Math.random() * w) + ")";
    }
}
function setAnimationText(mtext, numtimes) {
    //mtext.style.fontSize = "300%";
    var txt;
    if(numtimes==1){
        txt="Yep!";
    } else if(numtimes==2){
        txt="Hrm..";
    }else if (numtimes==3){
        txt="Uh Oh..";
    }
    else if (numtimes > 3){
        txt="OMG";
    }
    else{
        txt="Nice!";
    }
    mtext.innerHTML = txt +" Trips: " + numtimes;
    if ((numtimes % 2) == 0) {
        mtext.style.color = "black";
    }
    if ((numtimes % 2 - 1) == 0) {
        mtext.style.color = "white";
    }
}
function killAndReset(cl, el, mtext, id) {
    clearInterval(id);
    el.style.left = '0px';
    el.style.top = '0px';
    el.style.backgroundColor = "rgb(100,200,215)";
    cl.style.backgroundColor = "rgb(190,190,100)";
    mtext.style.backgroundColor = "rgb(50,100,107)";
    mtext.style.color = "white";
    mtext.innerHTML = "Glad That's Over";
}
function toggleButton(s){
    var bb=document.getElementById("startstop");
    if(s){
        bb.innerHTML="Start";
    }
    else{
        bb.innerHTML="Stop";
    }
}
var stopme=true;
function moveBox() {
    if (stopme){
        stopme=false;
    }
    else{
        stopme=true;
    }
    toggleButton(stopme);
    // dims = getDimsFromCSS('container', '#container');
    // cl = dims['e']
    // cont_width = dims['w'];
    // cont_height = dims['h'];

    cl = document.getElementById('container');
    cont_width=340;
    cont_height=340;

    // dims = getDimsFromCSS('moveme', '#moveme');
    // b_width = dims['b'];
    // el = dims['e'];
    // el_width = dims['w'];
    // el_height = dims['h'];

    el = document.getElementById('moveme');
    b_width = 1;
    el_width = 100;
    el_height = 100;
    el.style.left = '0px';
    el.style.top = '0px';

    mtext = document.getElementById("mtext")
    var lpos = b_width;
    var tpos = 0;
    var rlmt = cont_width - (el_width + (b_width * 2));
    var tlmt = cont_height - (el_height + (b_width * 2));
    var goback = false;
    var id = setInterval(mright, 0);
    var timesaround = 0;
    var timescalled = 0;
    setAnimationText(mtext, timesaround);
    function mright() {
        if (goback) {
            if (lpos >= 0) {
                lpos--;
            }
            else if (tpos >= 0) {
                tpos--;
            }
            else {
                goback = false;
                timesaround++;
                setAnimationText(mtext, timesaround);
            }
        }
        else {
            if (lpos <= rlmt) {
                lpos++;
            }
            else if (tpos <= tlmt) {
                tpos++;
            }
            else {
                goback = true;
            }
        }
        setAnimationColors(cl, el, mtext, timescalled, timesaround)
        el.style.left = lpos + 'px';
        el.style.top = tpos + 'px';
        timescalled++;
        if (timesaround >= 5 || stopme) {
            if(!stopme){
                stopme=true;
                toggleButton(true);
            }
            killAndReset(cl, el, mtext, id);
        }
    }
}
