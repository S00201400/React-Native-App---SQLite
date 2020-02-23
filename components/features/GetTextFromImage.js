import processResult from "../features/ProcessResult";

async function getTextFromImage(imagePath) {
    var data = new FormData();
    data.append('file', {
        uri: imagePath,
        type: 'image/jpg',
        name: 'file'
    }); // This is file object
    //aici am creat pachetul de date, tipuri de date


    var xhr = new XMLHttpRequest(); //manager de request

    xhr.onreadystatechange = function() {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            var result = processResult(this.responseText);
            console.log(result);
            return result;
        }
    }; //daca i se schimba state-ul se apleaza functia verifica daca state is done
    //log rasp de la api
    //fac apel de celalata functie ca sa procesez imaginea ==rez il trimiti aici ca sa intorc ceva mai clean inapoi 

//deschide requesti cu metoda posdt si unde sa trimita req
    xhr.open("POST", "https://app.nanonets.com/api/v2/OCR/Model/9f4e8b1b-ac07-4a8e-8b24-e91f6f6b471f/LabelFile/");
    xhr.setRequestHeader("authorization", 'Basic ' + 'bDRNdjlfWC1BNU1MYkJQU2YzY3NVajZIVTNZTFFUSUg6');
//hedere de la request // autorizatioa lor de tip string inbaza 64


    xhr.send(data); //trimite
}

export default getTextFromImage;
