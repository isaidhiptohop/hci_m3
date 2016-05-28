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




function displaySpeaker() {
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
}



// creates a new speaker object, which is added to speakers-array, which then will be stringified and saved in localstorage
function saveSpeakerData (value) {
    var speakerName = value;

    if (speakerName == "") {
        alert ("Enter a name for your speaker");
        return;
    }

    var newSpeaker = {speakername: speakerName, isPlaying: false, isLocked: false};

    window.location.href = 'speaker.html';

    if (typeof speakers == "object") {
        speakers.push(newSpeaker);
    } else {
        speakers = new Array(newSpeaker);
    }
    localStorage.setItem ('speakers', JSON.stringify(speakers));
    displaySpeaker();
}



