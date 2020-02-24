function processResult(rawPrediction) {
    var regexForNumbers = /[+-]?\d+(\.\d+)?/g; 
    //pattern imi intoarce numerele
    var regexForExtractingStrings = /(?="ocr_text")(.*)(?=")/g; 
    //imi intoarce ce est eintre ocr test si ultimele ghilimele
    var newString = rawPrediction.match(regexForExtractingStrings).toString(); 
    //cand ii dau match imi ia patternul si imi reconstruieste stringul
   //in string am doar ocr..si scoate restul 
    console.log(newString);
    var floats = newString.match(regexForNumbers).map(function(v) { return parseFloat(v); });
    //map aplica o functie pe toate elementele si dau return 
    //deci map intra in fiecare in parte si se uita 
    console.log(floats);
    return Math.max(...floats); 
    // il caut pe ala maxim 
}

export default processResult
