//Create an empty array
var schdule = []

//A for loop that creates the business hours
for (time = 9; time <= 17; time++) {
    var id = time - 9
    var data = ""
   

   //The time that will show as the business hours
   var showHour = 0;
   var AmOrPm = "";

    //Adding the Am and PM to the time
    if (time === 12) {
       showHour = 12
       AmOrPm = "pm"
    } else if (time > 12) { 
       showHour = time - 12;
       AmOrPm = "pm";
   } else if (time < 12) {
       showHour = time;
       AmOrPm = "am";
   }

   showHour = showHour.toString()

   data = {
       id: id,
       showHour: showHour,
       time: time,
       AmOrPm: AmOrPm,
       data: data
   }

   schdule.push(data)

}



//Show the current time in the jumbotron 
function currentDay() {
    var currentDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentDate);
}

//Function will save inputted data to the local storage
function save() {
    localStorage.setItem("schdule", JSON.stringify(schdule));
}

//Shows data in the time slots
function timeslotData() {
    schdule.forEach(function (hour) {
        $("#" + hour.id).val(hour.data)
    }) 
}

//load data function -- runs save and display
function loadPlannerData() {
    var dataLoaded = JSON.parse(localStorage.getItem("schdule"));

    if (dataLoaded) {
        schdule = dataLoaded;
    }

    save()
    timeslotData()
}

schdule.forEach(function(hour) {
    // Creates the time rows
    var timeRow = $("<form>")
        .addClass("row");

    $(".container").append(timeRow);

    //creates field for time
    var timeSide = $("<div>")
        .addClass("col-md-2 hour")
        .text(hour.showHour + hour.AmOrPm);

    // Creates schdeduler's data
    var input = $("<div>")
        .addClass("col-md-9 description p-0")
    var hourData = $("<textarea>");
        hourData.attr("id", hour.id);

        //Color coding the time rows
        if (hour.time == moment().format("HH")) {
            hourData.addClass("present")
        } else if (hour.time < moment().format("HH")) {
                hourData.addClass("past")
        } else if (hour.time > moment().format("HH")) {
            hourData.addClass("future")
    }
        

    input.append(hourData);
    
    // Save button icon
    var icon = $("<i class='far fa-save fa-lg'></i>")
    //Creating the save button
    var end = $("<button>")
        .addClass("col-md-1 saveBtn");

    //Appending elements to row 
    end.append(icon);    
    timeRow.append(timeSide, input, end)
})

    //Preventing the default for the save button
$(".saveBtn").on("click", function(event) {
    event.preventDefault();

    //Saving the correct information into array
    var saveIndex = $(this).siblings(".description").children().attr("id");
    schdule[saveIndex].data = $(this).siblings(".description").children().val();
    save();
    timeslotData();
})

currentDay()
loadPlannerData()