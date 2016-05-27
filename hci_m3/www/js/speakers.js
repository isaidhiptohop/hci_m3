var addspeakerprompt =
  "<label for=\"speakername\">Speaker Name</label>" + 
  "<input type=\"text\" id=\"speakername\"><br>" + 
  "<input type=\"submit\" id=\"addspeakersubmit\" value=\"Submit\">";

var speakerView = localStorage.getItem ('speakerview');
var speakers = JSON.parse(localStorage.getItem ('speakers'));

if (speakers == null) {
  speakers = [];
  localStorage.setItem ('speakers', speakers);
  console.log ("set speakers to empty array");
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
    document.getElementById("toggleplay_" + i).addEventListener('click', 
      function () {
        togglePlay (i);
      }
    );

    if (speakers[i].isLocked) {
      speakerlist += "<td><button id=\"lock_" + i + "\">Unlock</button></td>";
    } else {
      speakerlist += "<td><button id=\"lock_" + i + "\">Lock</button></td>";
    }
    document.getElementById("lock_" + i).addEventListener('click', );

    speakerlist += "</tr>";
  }
  
  speakerlist += "</ul>";
  document.getElementById("speakerlist").innerHTML = speakerlist;
} else {
  document.getElementById("allSpeakers").innerHTML = "";
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

function addSpeaker () {
  document.getElementById('addspeakerdiv').innerHTML = addspeakerprompt;
  document.getElementById('addspeakersubmit').addEventListener('click', saveSpeakerData);
}

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
//  console.log (speakers.length);
//  console.log (speakers[0]);
//  console.log (JSON.stringify(speakers));
  localStorage.setItem ('speakers', JSON.stringify(speakers));
//  var speakers2 = JSON.parse(localStorage.getItem ('speakers'))
//  console.log (speakers2[0]);
//  console.log (speakers2.length);
}
