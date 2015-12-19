
var giverArray = [];
var recieverArray = [];
var numberOfNames = 0;
var selfGivers = [];

//runs on buttonclick, adds text in textbox to the giverArray
function addName() {
	var name = document.getElementById("name").value;
  if (name !== "") {
    giverArray.push(name);
		clearNameField();
		displayNames();
		showButtons();
    numberOfNames++;
	}
  //debug
  loggiverArray();
}

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

//checks for anyone who has been assgned himself as Secret Santa, and correspondingly adjust SS assignments
function removeSelfGivers() {
  var i, t;
  //checks for people who are their own SS, and stores their location
  for (i = 0; i < numberOfNames; i++) {
    if (giverArray[i] === recieverArray[i]) {
      selfGivers.push(i);
    }
  }
  //if there is only 1 person who is their own SS, then he swaps SS with the person at the beginning or end of the array
  if (selfGivers.length == 1) {
    t = giverArray[selfGivers[0]];
    if (selfGivers[0] < giverArray.length-1) {
      giverArray[selfGivers[0]] = giverArray[giverArray.length-1];
      giverArray[giverArray.length-1] = t;
    } 
    else {
      giverArray[selfGivers[0]] = giverArray[0];
      giverArray[0] = t;      
    }
  }
  //if ther are more than 1 person who are their own SS, then they trade SS in rotation among themselves
  else if (selfGivers.length > 1) {
    var first = giverArray[selfGivers[0]];
    for (i=0; i < selfGivers.length-1; i++) {
      giverArray[selfGivers[i]] = giverArray[selfGivers[i+1]]
      
    }
    console.log("~~did the last sub")
    giverArray[selfGivers[i]] = first;
  }
}

function generateSantas() {
  //console.log(" ~~~~~~~~~~~~~~~~~~~ START");
  recieverArray = giverArray.slice();
  //loggiverArray();
  shuffle(giverArray);
  //loggiverArray();
  //console.log("~~~shuffled");
  removeSelfGivers();
  //loggiverArray();
  //console.log("~~~REMOVED SELF GIBERS");
  clearList();
  for (i = 0; i < numberOfNames; i++) {
    document.getElementById("list").innerHTML += giverArray[i] + " gives gift to " + recieverArray[i] + " <br>";
  }


}


//DEBUG: logs giverArray to console
function loggiverArray() {
  console.log("giver array: " + giverArray);
  console.log("reciever ar: " + recieverArray);
  console.log("selfGivers : " + selfGivers);
  console.log("names entered: " + numberOfNames);
}

//    UI STUFF

//displays the names added to current group on top of page
function displayNames() {
  clearList();
  document.getElementById("list").innerHTML = 'list of santas <br>';
  for (i=0; i <= giverArray.length-1; i++) {
      document.getElementById("list").innerHTML += giverArray[i] + ' has been added <br>';
    }
}

//removes the names displayed on top of page
function clearList() {
  document.getElementById("list").innerHTML='';
}

//clears the text from the text box
function clearNameField() {
  document.getElementById("name").value="";
}

//displays the hidden buttons after the first name has been added
function showButtons() {
  document.getElementById('buttons').style.display = "block";
}
