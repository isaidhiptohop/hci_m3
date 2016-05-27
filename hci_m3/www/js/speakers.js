var addspeakerprompt =
  "<label for=\"speakername\">Speaker Name</label>" + 
  "<input type=\"text\" id=\"speakername\" value=\"male\"><br>" + 
  "<input type=\"submit\" id=\"addspeakersubmit\" value=\"Submit\">";

var speakerView = localStorage.getItem ('speakerview');
var speakers = localStorage.getItem ('speakers');

if (speakers === null) {
  speakers = [];
  localStorage.setItem ('speakers', speakers);
  console.log ("set speakers to empty array");
}

if (speakerView == "allspeakers") {
  document.getElementById("groupedSpeakers").innerHTML = "";
  document.getElementById("addspeaker").addEventListener('click', addSpeaker);
  
  var speakerlist = "<table><tr><td>Speaker name</td><td>is playing</td><td>is locked</td>"
  
  for (var i = 0; i < speakers.length; i++) {
    speakerlist += "<tr><td>" + speakers[i].speakername + "</td>";
    speakerlist += "<td>" + speakers[i].isPlaying + "</td>";
    speakerlist += "<td>" + speakers[i].isLocked + "</td></tr>";
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

function getSavedSpeakers () {}

function getSavedGroups () {}

function addSpeaker () {
  document.getElementById('addspeakerdiv').innerHTML = addspeakerprompt;
  document.getElementById('addspeakersubmit').addEventListener('click', saveSpeakerData);
}

function saveSpeakerData () {
  window.location.href = 'speakers.html';
  var speakerName = document.getElementById("speakername").value;
  var newSpeaker = {speakername: speakerName, isPlaying: false, isLocked: false};
  console.log (speakers);
  localStorage.setItem ('speakers', speakers);
}
