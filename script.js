let s="";
let event;
let date;
let time;
let venue;
let src;


window.addEventListener('load', function() {
  if (document.getElementById("js-container") !== null){
    const panelArray = sessionStorage.getItem("panelArray");
    if (panelArray !== null){
        console.log(panelArray);
        document.getElementById("js-container").insertAdjacentHTML('beforeend', panelArray);
    }
  }
  if (document.getElementById("event") !==null){
    const event = sessionStorage.getItem("event");
    document.getElementById("event").innerHTML = event
  }
  if (document.getElementById("date")!==null) {
    const date = sessionStorage.getItem("date");
  document.getElementById("date").innerHTML = "Date: " + date;
  }
  if (document.getElementById("time")!==null) {
    const time = sessionStorage.getItem("time");
  document.getElementById("time").innerHTML = "Time: " + time;
  }
  if (document.getElementById("venue")!==null) {
    const venue = sessionStorage.getItem("venue");
  document.getElementById("venue").innerHTML = "Venue: " + venue;
  }
  let s = document.createElement('script');
  s.setAttribute('type', "text/javascript");
  s.setAttribute('src', "https://addevent.com/libs/atc/1.6.1/atc.min.js");
  document.head.appendChild(s);
  document.querySelector('input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files[0]) {
          var img = document.querySelector('img');  // $('img')[0]

          src = URL.createObjectURL(this.files[0]); // set src to file url
          console.log(src);
          // fetch(src).then(function(response) { 
          //   console.log(response.body());
          //   return(response.body);
          // }).then(function(body) {
          //   const reader=body.getReader();
          //   reader.read().then(function({done, value}){})
          // });
        
          encodeImageFileAsURL(this.files[0]);
      }
  });
});

function encodeImageFileAsURL(element) {
  var file = element;
  var reader = new FileReader();
  reader.onloadend = function() {
    console.log('RESULT', reader.result);
    getTextFromGCP('AIzaSyAXqGaS9lyzPaHBvSMsgLLBwZNCSozOPfI', reader.result);  
  }
  reader.readAsDataURL(file);
}




function imageIsLoaded(e) { alert(e); }

async function getTextFromGCP(GCPAPIKEY, image64){
  image64 = image64.split(',')[1]
    var data = `
    {
        "requests": [
          {
            "image": {
            
                "content": "${image64}"
              
            },
            "features": [
              {
                "type": "TEXT_DETECTION"
              }
            ]
          }
        ]
      }
    `;
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {

      if (this.readyState === 4) {
     
        s=((JSON.parse(this.responseText)).responses[0].fullTextAnnotation.text);
    
        let temp = "";
        let array = [];
        for (var i=0;i<s.length;i++) {
        	if ((s[i]!='\n')&&(s[i]!=' ')) {
        		temp+=s[i];
        	}
        	else {
        		console.log(temp);
                array.push(temp);
        		temp="";
        	}
        }
        //Naming the event
        event = "Unknown";
        for (var i = 0; i < array.length; i++){
            if (array[i].toLowerCase() == "celebration"){
                event = "Celebration";
                break;
            }
            if (array[i].toLowerCase() == "ceremony"){
                event = "Ceremony";
                break;
            }
            if (array[i].toLowerCase() == "concert"){
                event = "Concert";
                break;
            }
            if (array[i].toLowerCase() == "conference"){
                event = "Conference";
                break;
            }
            if (array[i].toLowerCase() == "experience"){
                event = "Experience";
                break;
            }
            if (array[i].toLowerCase() == "fair"){
                event = "Fair";
                break;
            }
            if (array[i].toLowerCase() == "festival"){
                event = "Festival";
                break;
            }
            if (array[i].toLowerCase() == "holiday"){
                event = "Holiday";
                break;
            }
            if (array[i].toLowerCase() == "party"){
                event = "Party";
                break;
            }
            if (array[i].toLowerCase() == "performance"){
                event = "Performance";
                break;
            }
            if (array[i].toLowerCase() == "sale"){
                event = "Sale";
                break;
            }
            if (array[i].toLowerCase() == "summit"){
                event = "Summit";
                break;
            }
            if (array[i].toLowerCase() == "tour"){
                event = "Tour";
                break;
            }
        }
        sessionStorage.setItem("event", event);
        //Date
        date = "Unknown";
        for (var i = 0; i < array.length; i++){
            if (array[i].toLowerCase() == "date:" || array[i].toLowerCase == "day:"
                || array[i].toLowerCase() == "date" || array[i].toLowerCase() == "day"){
                if (i < array.length-3 && includesNumber(array[i+1])
                    && includesNumber(array[i+2]) && includesNumber(array[i+3])){
                    date = array[i+1] + " " + array[i+2] + " " + array[i+3];
                    break;
                }
                if (i < array.length - 2 && includesNumber(array[i+1])
                    && includesNumber(array[i+2])){
                    date = array[i+1] + " " + array[i+2];
                    break;
                }
                if (i < array.length -1 && includesNumber(array[i+1])){
                    date = array[i+1];
                    break;
                }
            }
            if (array[i].toLowerCase() == "january" || array[i].toLowerCase() == "jan"
                || array[i].toLowerCase() == "jan."){
                if (i != 0 && includesNumber(array[i-1])){
                    date = "January " + array[i-1];
                    break;
                } if (i < array.length - 1 && includesNumber(array[i+1])){
                    date = "January " + array[i+1];
                    break;
                } else{
                    date = "January";
                    break;
                }
            }
            if (array[i].toLowerCase() == "february" || array[i].toLowerCase() == "feb"
                || array[i].toLowerCase() == "feb."){
                if (i != 0 && includesNumber(array[i-1])){
                    date = "February " + array[i-1];
                    break;
                } else if (i < array.length -1 && includesNumber(array[i+1])){
                    date = "February " + array[i+1];
                    break;
                } else {
                    date = "February";
                    break;
                }
            }
            if (array[i].toLowerCase() == "march" || array[i].toLowerCase() == "mar"
                || array[i].toLowerCase() == "mar."){
                if (i != 0 && includesNumber(array[i-1])){
                    date = "March " + array[i-1];
                    break;
                } else if (i < array.length-1 && includesNumber(array[i+1])){
                    date = "March " + array[i+1];
                    break;
                } else{
                    date = "March";
                    break;
                }
            }
            if (array[i].toLowerCase() == "april" || array[i].toLowerCase() == "apr"
                || array[i].toLowerCase() == "apr."){
                if (i != 0 && includesNumber(array[i-1])){
                    date = "April " + array[i-1];
                    break;
                } else if (i < array.length-1 && includesNumber(array[i+1])){
                    date = "April " + array[i+1];
                    break;
                } else{
                    date = "April";
                    break;
                }
            }
            if (array[i].toLowerCase() == "may"){
                if (i != 0 && includesNumber(array[i-1])){
                    date = "May " + array[i-1];
                    break;
                } else if (i < array.length-1 && includesNumber(array[i+1])){
                    date = "May " + array[i+1];
                    break;
                } else {
                    date = "May";
                    break;
                }
            }
            if (array[i].toLowerCase() == "june" || array[i].toLowerCase() == "jun"
                || array[i].toLowerCase() == "jun."){
                if (i != 0 && includesNumber(array[i-1])){
                    date = "June " + array[i-1];
                    break;
                } else if (i < array.length -1 && includesNumber(array[i+1])){
                    date = "June " + array[i+1];
                    break;
                } else{
                    date = "June";
                    break;
                }

            }
            if (array[i].toLowerCase() == "july" || array[i].toLowerCase() == "jul"
                || array[i].toLowerCase() == "jul."){
                if (i != 0 && includesNumber(array[i-1])){
                    date = "July " + array[i-1];
                    break;
                } else if (i < array.length - 1 && includesNumber(array[i+1])){
                    date = "July " + array[i+1];
                    break;
                } else{
                    date = "July";
                    break;
                }
            }
            if (array[i].toLowerCase() == "august" || array[i].toLowerCase() == "aug"
                || array[i].toLowerCase() == "aug."){
                if (i != 0 && includesNumber(array[i-1])){
                    date = "August " + array[i-1];
                    break;
                } else if (i < array.length -1 && includesNumber(array[i+1])){
                    date = "August " + array[i+1];
                    break;
                } else{
                    date = "August";
                    break;
                }
            }
            if (array[i].toLowerCase() == "september" || array[i].toLowerCase() == "sep"
                || array[i].toLowerCase() == "sep."){
                if (i != 0 && includesNumber(array[i-1])){
                    date = "September " + array[i-1];
                    break;
                } if (i < array.length-1 && includesNumber(array[i+1])){
                    date = "September " + array[i+1];
                    break;
                } else{
                    date = "September";
                    break;
                }
            }
            if (array[i].toLowerCase() == "october" || array[i].toLowerCase() == "oct"
                || array[i].toLowerCase() == "oct."){
                if (i != 0 && includesNumber(array[i-1])){
                    date = "October " + array[i-1];
                    break;
                } else if (i < array.length -1 && includesNumber(array[i+1])){
                    date = "October " + array[i+1];
                    break;
                } else{
                    date = "October";
                    break;
                }
            }
            if (array[i].toLowerCase() == "november" || array[i].toLowerCase() == "nov"
                || array[i].toLowerCase() == "nov."){
                if (i!=0 && includesNumber(array[i-1])){
                    date = "November " + array[i-1];
                    break;
                } else if (i < array.length-1 && includesNumber(array[i+1])){
                    date = "November " + array[i+1];
                    break;
                } else{
                    date = "November";
                    break;
                }
            }
            if (array[i].toLowerCase() == "december" || array[i].toLowerCase() == "dec"
                || array[i].toLowerCase() == "dec."){
                if (i!=0 && includesNumber(array[i-1])){
                    date = "December " + array[i-1];
                    break;
                } else if (i < array.length -1 && includesNumber(array[i+1])){
                    date = "December " + array[i+1];
                    break;
                } else{
                    date = "December";
                    break;
                }
            }
        }


        // let getDate=sessionStorage.getItem("date")
        // console.log(date);
        // let dateref=document.getElementById("date");
        // dateref.innerText="Date: " + date;
        sessionStorage.setItem("date",date); 

        //Time
        time = "Unknown";
        for (var i = 0; i < array.length-1; i++){
            if (array[i].toLowerCase() == "time"){
                time = array[i+1];
                break;
            }
            if ((array[i].toLowerCase().includes("am") || array[i].toLowerCase().includes("pm"))
                && includesNumber(array[i])){
                time = array[i];
                break;
            }
        }
        sessionStorage.setItem("time",time); 
        //Venue

        venue = "Unknown";
        for (var i = 0; i < array.length-1; i++){
            if (array[i].toLowerCase() == "venue" || array[i].toLowerCase() == "locale"
                || array[i].toLowerCase() == "place" || array[i].toLowerCase() == "setting"
                || array[i].toLowerCase() == "site" || array[i].toLowerCase() == "location"){
                venue = array[i+1];
                break;
            }
        }
        sessionStorage.setItem("venue",venue);
        let panelArray;
        if (sessionStorage.getItem("panelArray") === null){
            sessionStorage.setItem("panelArray", 
                `<div class="col-lg-4 col-md-6 col-sm-12">
                            <div class="panel panel-default text-center">
                                <div class="panel-heading">
                                    <h1>ACM Hack on the Hill</h1>
                                </div>
                                <div class="panel-body">
                                    <kbd>`+event+`</kbd>
                                    <div class="reqs">
                                        <ul>
                                            <li>Date: ` + date + `</li>
                                            <li>Time: `+time+`</li>
                                            <li>Venue: `+venue+`</li>
                                        </ul>

                                    </div>
                                    <div class="panel-footer">
                                        <button class="btn">View Original Flyer</button>
                                        <div title="Add to Calendar" class="addeventatc btn btn-cal">
                                            Add to Calendar
                                            <span class="start">12/02/2018 08:00 AM</span>
                                            <span class="end">12/02/2018 10:00 AM</span>
                                            <span class="timezone">America/Los_Angeles</span>
                                            <span class="title">Summary of the event</span>
                                            <span class="description">Description of the event</span>
                                            <span class="location">Location of the event</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`);
        }
        else{
            panelArray = sessionStorage.getItem("panelArray");
            panelArray = panelArray+`<div class="col-lg-4 col-md-6 col-sm-12">
                            <div class="panel panel-default text-center">
                                <div class="panel-heading">
                                    <h1>ACM Hack on the Hill</h1>
                                </div>
                                <div class="panel-body">
                                    <kbd>`+event+`</kbd>
                                    <div class="reqs">
                                        <ul>
                                            <li>Date: ` + date + `</li>
                                            <li>Time: `+time+`</li>
                                            <li>Venue: `+venue+`</li>
                                        </ul>

                                    </div>
                                    <div class="panel-footer">
                                        <button class="btn">View Original Flyer</button>
                                        <div title="Add to Calendar" class="addeventatc btn btn-cal">
                                            Add to Calendar
                                            <span class="start">12/02/2018 08:00 AM</span>
                                            <span class="end">12/02/2018 10:00 AM</span>
                                            <span class="timezone">America/Los_Angeles</span>
                                            <span class="title">Summary of the event</span>
                                            <span class="description">Description of the event</span>
                                            <span class="location">Location of the event</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            sessionStorage.setItem("panelArray", panelArray);
            console.log(panelArray);
        }
      }
    });
    xhr.open("POST",`https://vision.googleapis.com/v1/images:annotate?key=${GCPAPIKEY}`);
    xhr.send(data);
    
}
function includesNumber(x){
    if (x.toLowerCase().includes("0") || x.toLowerCase().includes("1")
        || x.toLowerCase().includes("2") || x.toLowerCase().includes("3")
        || x.toLowerCase().includes("4") || x.toLowerCase().includes("5")
        || x.toLowerCase().includes("6") || x.toLowerCase().includes("7")
        || x.toLowerCase().includes("8") || x.toLowerCase().includes("9")){
        return true;
    }
    else{
        return false;
    }
}

