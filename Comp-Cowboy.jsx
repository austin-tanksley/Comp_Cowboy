

//Set UI 
var myWindow = new Window("palette", "Comp Daddy", undefined);
var frameRatePanel = myWindow.add("Panel", undefined, "Frame Rate")
var frameRateSelectionGroup = frameRatePanel.add("group", undefined, "selectionFR");
var frameRateLabel = frameRateSelectionGroup.add("statictext", undefined, "Frame Rate:");
var frameRateInput = frameRateSelectionGroup.add("edittext", [10,10,80,35], "24");
var frameRateArray = [8, 12, 15, 23.976, 24, 25, 29.97, 30, 50, 59.94, 60, 120];
var frameRateDropDown = frameRateSelectionGroup.add("dropdownlist", [10,10,30,30], frameRateArray);
var frameRateBtn = frameRatePanel.add("button", undefined, "Update Frame Rate");
var durationPanel = myWindow.add("Panel", undefined, "Duration");
var durationInputGroup = durationPanel.add("group", undefined, "Duration");
var durationInput  = durationInputGroup.add("edittext", [10,10,120,35], "0:00:10:00");
var durationBtn = durationPanel.add("button", undefined, "Update Duration");

//UI Orientations and Defaults
myWindow.orientation = "column";
frameRateSelectionGroup.orientation = "row";
frameRateDropDown.selection = 4;

myWindow.center();
myWindow.show();

//Functionality
//When the Framerate Dropdown selection changes, this function updates the Frame rate input box.
frameRateDropDown.onChange = function(){
  var selectionIndex = frameRateDropDown.selection.index;
  //pulling data from original array. Fetching data straight from the dropDown list selection broke shit.
  var rate = frameRateArray[selectionIndex];
  frameRateInput.text = rate;
}

frameRateBtn.onClick = function(){
  var selected = app.project.selection;
  for (i=0; i<=selected.length; i++){
    selected[i].frameRate = frameRateInput.text;
  }
}

durationBtn.onClick = function(){
  var selected = app.project.selection;
  var timeCode = durationInput.text;
  var checkHourArray = timeCode.split(":");
  var checkHourInput = parseInt(checkHourArray[0]);
  if (checkHourInput>2){
    alert("Hour value can be no greater than 2, Please adjust and retry");
  }
  for(i=0; i<= selected.length; i++){
    var compFrameRate = selected[i].frameRate;
    var secs = convertTimeCodeToSeconds(timeCode, compFrameRate);
    selected[i].duration = secs;
  }
}

function convertTimeCodeToSeconds(timeString, framerate)
{

  var timeArray = timeString.split(":");
  var hours   = parseInt(timeArray[0]) * 60 * 60;
  var minutes = parseInt(timeArray[1]) * 60;
  var seconds = parseInt(timeArray[2]);
  var frames  = parseInt(timeArray[3])*(1/framerate);
  var totalTime = hours + minutes + seconds + frames;
  //alert(timeString + " = " + totalTime)
  return totalTime;
}
