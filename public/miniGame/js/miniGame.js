/**
 * Created by cczhang on 8/28/14.
 */
// Create the Img elements when button pressed
//
var noElements = 48;
var imgContain = [];
var checkContain = [];
var oriPos = [];
var randPos = [];
var checkPos = [];

var level_Src = ["level_1", "level_2", "level_3", "level_4", "level_5"];
var level_Reward = [];
level_Reward[0] = "<b class='numHund'>Two</b> hundred and <b class='numTen'>Thirty</b> <b class='numSmall'>Four</b>";    //234
level_Reward[1] = "<b class='numHund'>Five</b> hundred and <b class='numTen'>Thirty</b> <b class='numSmall'>One</b>";    //531
level_Reward[2] = "<b class='numHund'>Nine</b> hundred and <b class='numTen'>Twenty</b> <b class='numSmall'>One</b>";    //921
level_Reward[3] = "<b class='numThou'>One</b> thousand <b class='numHund'>Three</b> hundred and <b class='numTen'>Fourteen</b>";    //1314
level_Reward[4] = "<b class='numThou'>Twenty One</b>  thousand <b class='numHund'>One</b> hundred and <b class='numTen'>Eighty</b> <b class='numSmall'>Four</b>";    //21184

var checkFlag = true;

function createImg(no, level, parentId)
{
    // scan all elements
    for(var i= 0; i<48; i++)
    {
        imgContain[i] = document.createElement("div");
        imgContain[i].setAttribute("id", "IMG" + i);
        imgContain[i].setAttribute("class", "dragImg");
        var childImg = document.createElement("img");
        childImg.src = "img/" + level + "/IMG (" + i + ").jpg";
        imgContain[i].appendChild(childImg);
        var parentDiv = document.getElementById(parentId);
        parentDiv.appendChild(imgContain[i]);
        oriPos[i] = $("#"+"IMG" + i).offset();
        randPos[i] = oriPos[i];
    }
}

function createCheck(no, parentId)
{
    for(var i= 0; i<48; i++)
    {
        checkContain[i] = document.createElement("div");
        checkContain[i].setAttribute("id", "CHECK" + i);
        checkContain[i].setAttribute("class", "check");
        var parentDiv = document.getElementById(parentId);
        parentDiv.appendChild(checkContain[i]);
        checkPos[i] = $("#"+"CHECK" + i).offset();
    }
}

// Fisher-Yates shuffle, an established pattern for creating random values
function shuffle (array) {
    var i = array.length;
    if(i===0){
        return false;
    }
    while(--i){
        var j = Math.floor((Math.random()) * (i+1)),
            tempi = array[i],
            tempj = array[j];
        array[i] = tempj;
        array[j] = tempi;
    }
}
// Repositioning of all the elements
function rePostion (){
    for(var i= 0; i<48; i++)
    {
        $("#"+"IMG" + i).offset(randPos[i]);
    }
    // Put tips to assist gamer
    $("#"+"IMG" + 0).offset({top:oriPos[0].top,left:oriPos[0].left + leftOffset});
    $("#"+"IMG" + 5).offset({top:oriPos[5].top,left:oriPos[5].left + leftOffset});
    $("#"+"IMG" + 42).offset({top:oriPos[42].top,left:oriPos[42].left + leftOffset});
    $("#"+"IMG" + 47).offset({top:oriPos[47].top,left:oriPos[47].left + leftOffset});
}