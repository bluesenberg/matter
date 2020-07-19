var SERVER_URL = "http://ip-api.com/json/";
var CUSTOMER_INFO = "";
var CLAIM_INFO = ""
var API_KEY = "s7NKGt0Q2Ja9HEs4rPD6x7dosmiqri0Z1aRNv7dp";

var NORMIE_OFFSET = 1;

var TOP_LEVEL_DIV_NAMES= {
  "firstLevel": "details-content-div",
  // "claims":"claims-title"
}

var REMOVAL_IDENTIFIER = "remove";

var KEY_SWAP_OBJECT = {
  "query":"Query",
  "city":"City Name",
}

function isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return JSON.stringify(obj) === JSON.stringify({});
}

function makeClickable(elementId) {
  var $element = $("#"+elementId);
  $element.click(function(e) {
  	$(this).siblings().slideToggle();
    e.preventDefault();
  });
 } 

 function createDiv(dataObject, keyString, valueString, parentId, counter) {
  var displayKey = keyString;
  console.log(displayKey);
  
  if (keyString in KEY_SWAP_OBJECT) {
    if (KEY_SWAP_OBJECT[keyString] == REMOVAL_IDENTIFIER) {
      return;
    } else if (dataObject[keyString] == null) {
      console.log(keyString + " is null object");
      return;
    } else {
    displayKey = KEY_SWAP_OBJECT[keyString];
    console.log("changed " + keyString + " to " + displayKey);
    }
  }

  var div = document.createElement("div");
  var descriptionTerm = document.createElement("dt");
  var descriptionTermId = "dtID" + counter + keyString;
  counter++;
  descriptionTerm.id = descriptionTermId
  if (Number.isInteger(keyString)) {
    descriptionTerm.innerHTML = keyString + NORMIE_OFFSET;
    console.log(descriptionTermId)
    // makeClickable(descriptionTermId);
  } else {
  	descriptionTerm.innerHTML = displayKey;
  }
  div.appendChild(descriptionTerm);

  if (typeof dataObject[keyString] === 'object')  {
    if (isEmpty(dataObject[keyString])) {
      document.getElementById(parentId).appendChild(div);   
      return;
    } else {
      div.classList.add("object-div");

      var childObject = dataObject[keyString];
      for (var key in childObject) {
        document.getElementById(parentId).appendChild(div); 
        createDiv(childObject, key, childObject[key], descriptionTermId, counter++);
      }
    }
  } else {
    var descriptionDeets = document.createElement("dd");
    console.log("descriptionDeets");
    console.log(descriptionDeets);

    descriptionDeets.id = "ddID" + counter + valueString;
    counter++;
    descriptionDeets.innerHTML = valueString;
    descriptionDeets.setAttribute("contenteditable", "true");
    descriptionDeets.setAttribute("spellcheck", "false");
    div.appendChild(descriptionDeets);
    document.getElementById(parentId).appendChild(div);   
  }
}

// get the current selected visitor information and render it.
function getAndRenderInformation() {

  // var data = TEST_DATA.transactions;
  // for (var i=0; i<data.length; i++) {
  //   createDiv(data, i, data[i], TOP_LEVEL_DIV_NAMES.firstLevel, i);
  // }

    $.ajax({
        url: SERVER_URL,  
        type: "GET",
        headers: {
            "Content-Type":"application/json",
            // "x-api-key":API_KEY
        },
        // data: JSON.stringify(visitorData),
        success: function(result) {
          console.log("RESULT");
          console.log(result);
            // var parsedResponse = JSON.parse(result);
            // var data = result.MemberDetails[0];
            for (var key in result) {
                createDiv(result, key, result[key], "details-content-div");
                }
        },
        error: function(error) {
            console.log("ERROR");
            console.log(error);
        }
    });

    // $.ajax({
    //     url: SERVER_URL + CLAIM_INFO,
    //     type: "POST",
    //     headers: {
    //         "Content-Type":"application/json"
    //     },
    //     data: JSON.stringify(visitorData),
    //     success: function(result) {
    //         console.log("Claim Info");
    //         console.log(result);
    //         for (var i=0; i<result.length; i++) {
    //             createDiv(result, i, result[i], "claims-content-div");
    //         }

    //     },
    //     error: function(error) {
    //         console.log("ERROR");
    //         console.log(error);
    //     }
    // });  
}

function onTestButtonClick() {
  $("object-details").show();
  getAndRenderInformation();

}


















document.addEventListener("DOMContentLoaded", function(event) {
  $("#object-details").hide();

  // RUN FUNCTION
  $("#object-details").show();
  makeClickable("details-title");
  $(".field-container").hide();
  var counter = 0;
  getAndRenderInformation();


  // RUN FUNCTION
  $("#object-details").show();
  makeClickable("details-title");
  $(".field-container").hide();
  var counter = 0;
  getAndRenderInformation();

      return;
  
});

