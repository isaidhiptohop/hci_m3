var speakerView = localStorage.getItem ('speakerview');



var buf = localStorage.getItem('speakers');
var speakers;

if (buf == "[object Object]") alert ("looks like u forgot to stringify ur objects before saving them to local storage");

if (buf == "" || buf == null) {
  speakers = [];
  localStorage.setItem ('speakers', JSON.stringify(speakers));
  console.log ("set speakers to empty array");
} else {
  speakers = JSON.parse(localStorage.getItem ('speakers'));
}



var buf = localStorage.getItem('groups');
var groups;

if (buf == "[object Object]") alert ("looks like u forgot to stringify ur objects before saving them to local storage");

if (buf == "" || buf == null) {
  groups = [];
  localStorage.setItem ('groups', JSON.stringify(speakers));
  console.log ("set groups to empty array");
} else {
  groups = JSON.parse(localStorage.getItem ('groups'));
}



if (speakerView == "allspeakers") {
  document.getElementById("groupedSpeakers").innerHTML = "";
  document.getElementById("addspeaker").addEventListener('click', addSpeaker);
  
  var speakerlist = "<table><tr><td>Speaker name</td><td>is playing</td><td>is locked</td><td></td><td></td></tr>"
  for (var i = 0; i < speakers.length; i++) {
    speakerlist += "<tr><td>" + speakers[i].speakername + "</td>";
    speakerlist += "<td>" + speakers[i].isPlaying + "</td>";
    speakerlist += "<td>" + speakers[i].isLocked + "</td>";
    
    if (speakers[i].isPlaying) {
      speakerlist += "<td><button id=\"toggleplay_" + i + "\">Pause</button></td>";
    } else {
      speakerlist += "<td><button id=\"toggleplay_" + i + "\">Play</button></td>";
    }
    console.log (document.getElementById("toggleplay_" + i));
    if (speakers[i].isLocked) {
      speakerlist += "<td><button id=\"lock_" + i + "\">Unlock</button></td>";
    } else {
      speakerlist += "<td><button id=\"lock_" + i + "\">Lock</button></td>";
    }

    speakerlist += "</tr>";
  }
  
  speakerlist += "</table>";
  document.getElementById("speakerlist").innerHTML = speakerlist;

  for (var i = 0; i < speakers.length; i++) {
    document.getElementById("toggleplay_" + i).addEventListener('click', 
      function () {
        var i = this.id.substring(this.id.length-1, this.id.length);
        speakers[i].isPlaying = !speakers[i].isPlaying;
        localStorage.setItem('speakers', JSON.stringify(speakers));
        var buf = localStorage.getItem('speakers');
        window.location.href = 'speakers.html';
      }
    );
// */

    document.getElementById("lock_" + i).addEventListener('click', 
      function () {
        var i = this.id.substring(this.id.length-1, this.id.length);
        speakers[i].isLocked = !speakers[i].isLocked;
        localStorage.setItem('speakers', JSON.stringify(speakers));
        var buf = localStorage.getItem('speakers');
        window.location.href = 'speakers.html';
      }
    );

// */
  }
} else {
  document.getElementById("allSpeakers").innerHTML = "";
  document.getElementById("addgroup").addEventListener('click', addGroup);

  var grouplist = "<table><tr><td>Group name</td><td></td><td></td></tr>"
  for (var i = 0; i < groups.length; i++) {
    grouplist += "<tr><td>" + groups[i].groupname + "</td>";
    grouplist += "</tr>";
  }
  
  grouplist += "</table>";
  document.getElementById("grouplist").innerHTML = grouplist;
}



document.getElementById('allspeakersbutton').addEventListener('click', setSpeakerViewAll);
document.getElementById('groupedspeakersbutton').addEventListener('click', setSpeakerViewGrouped);

function setSpeakerViewAll () {
  console.log ("speaker view all");
  localStorage.setItem ('speakerview', "allspeakers");
  window.location.href = 'speakers.html';
}

function setSpeakerViewGrouped () {
  console.log ("speaker view grouped");
  localStorage.setItem ('speakerview', "groupedspeakers");
  window.location.href = 'speakers.html';
}



var addspeakerprompt =
  "<label for=\"speakername\">Speaker Name</label>" + 
  "<input type=\"text\" id=\"speakername\"><br>" + 
  "<input type=\"submit\" id=\"addspeakersubmit\" value=\"Submit\">";

// adds a speaker by replacing an empty div called 'addspeakerdiv' with a string called 'addspeakerprompt' which displays an input field for the new speaker
// also adds an eventlistener to the new input field which calls saveSpeakerData ()
function addSpeaker () {
  document.getElementById('addspeakerdiv').innerHTML = addspeakerprompt;
  document.getElementById('addspeakersubmit').addEventListener('click', saveSpeakerData);
}

// creates a new speaker object, which is added to speakers-array, which then will be stringified and saved in localstorage
function saveSpeakerData () {
  var speakerName = document.getElementById("speakername").value;
  
  if (speakerName == "") {
    alert ("Enter a name for your speaker");
    return;
  }
  
  var newSpeaker = {speakername: speakerName, isPlaying: false, isLocked: false};
  
  window.location.href = 'speakers.html';
  
  if (typeof speakers == "object") {
    speakers.push(newSpeaker);
  } else {
    speakers = new Array(newSpeaker);
  }
  localStorage.setItem ('speakers', JSON.stringify(speakers));
}



function getaddgroupprompt () {
  var prompt = "<label for=\"groupname\">Group Name</label>" + 
    "<input type=\"text\" id=\"groupname\"><br>" +
    "<div><table>";
  
  for (var i = 0; i < speakers.length; i++) {
    prompt += "<tr>";
    prompt += "<td>" + speakers[i].speakername + "</td>";
    if (speakers[i].isLocked) {
      prompt += "<td>Locked</td>";
    } else {
      prompt += "<td><button id=\"speaker_" + i + "\">Add</button></td>";
    }
    prompt += "</tr>";
  }
  
  prompt += "</table></div><br>";  
  prompt += "<input type=\"submit\" id=\"addgroupsubmit\" value=\"Submit\">";
  
  return prompt;
}

function addGroup () {
  document.getElementById('addgroupdiv').innerHTML = getaddgroupprompt ();
  for (var i = 0; i < speakers.length; i++) {
    if (!speakers[i].isLocked) {
      document.getElementById("speaker_" + i).addEventListener('click', addSpeakerToGroup);
    }
  }
  document.getElementById('addgroupsubmit').addEventListener('click', saveGroupbuf);
}

function addSpeakerToGroup () {
  var groupbuf;
  
  if (localStorage.getItem('groupbuf') == "" || localStorage.getItem('groupbuf') == null) {
    groupbuf = {groupname: "", speakers: []};
    localStorage.setItem ('groupbuf', JSON.stringify(groupbuf));
    console.log ("set groupbuf to empty group object");
  } else {
    groupbuf = JSON.parse(localStorage.getItem ('groupbuf'));
  }
  
  groupbuf.speakers.push(speakers[this.id.substring(this.id.length-1, this.id.length)].speakername);
  localStorage.setItem ('groupbuf', JSON.stringify(groupbuf));
  console.log (JSON.stringify(groupbuf));
}

function saveGroupbuf () {
  var groupName = document.getElementById("groupname").value;
  
  if (groupName == "") {
    alert ("Enter a name for your group");
    return;
  }
  
  var groupbuf;
  
  if (localStorage.getItem('groupbuf') == "" || localStorage.getItem('groupbuf') == null) {
    groupbuf = {groupname: "", speakers: []};
    localStorage.setItem ('groupbuf', JSON.stringify(groupbuf));
    console.log ("set groupbuf to empty group object");
  } else {
    groupbuf = JSON.parse(localStorage.getItem ('groupbuf'));
  }
  
  groupbuf.groupname = groupName;
  
  window.location.href = 'speakers.html';
  
  if (typeof groups == "object") {
    groups.push(groupbuf);
  } else {
    groups = new Array(groupbuf);
  }
  localStorage.setItem ('groups', JSON.stringify(groups));
  console.log(JSON.stringify(groups));
}

