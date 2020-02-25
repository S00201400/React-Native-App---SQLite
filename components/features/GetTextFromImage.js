import processResult from "./ProcessResult";

//This function is expecting the imagePath and using FormData object lets you compile a 
//set of value pairs to send using XMLHttpRequest. 
async function getTextFromImage(imagePath) {
    var data = new FormData();
    data.append('file', {
        uri: imagePath,
        type: 'image/jpg',
        name: 'file'
    });

    //Request Manager
    var xhr = new XMLHttpRequest();

    //OnStateChange is looking if the state is done (if i have an answare) 
    //and if yes, is showing me using console.log the JSON Response
    //Once I have the response, I am calling Process Result where I am extracting the right
    //thing that I need from that response
    //And finally, I am returning the result which it should be the price from the receipt
    xhr.onreadystatechange = function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            var result = processResult(this.responseText);
            console.log(result);
            return result;
        }
    };

    //Opening the request with POST method and sending it to that link
    //The Request Header should have their Authorization included
    xhr.open("POST", "https://app.nanonets.com/api/v2/OCR/Model/9f4e8b1b-ac07-4a8e-8b24-e91f6f6b471f/LabelFile/");
    xhr.setRequestHeader("authorization", 'Basic ' + 'bDRNdjlfWC1BNU1MYkJQU2YzY3NVajZIVTNZTFFUSUg6');

    //sending the FormData Object
    xhr.send(data);
}

export default getTextFromImage
