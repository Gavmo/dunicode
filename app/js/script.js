function findHighIndexCharacters(inputtext) {
    // Find any characters above an index of 127.  This should be enough to highlight anyitnhg not
    // available by a key on the keyboard
    var charindex = [];
    for (let i = 0; i < document.getElementById("id_inputtext").value.length; i++) {
        // Possibly assess if less than 0x20 also, this may impact newline chars
        if (inputtext.charCodeAt(i) > 127) {
            charindex.push(i);
        }
      }
   ;
   return charindex
}

function highlightBadChars(inputtext) {
    var precedingstring = document.createElement("span");
    precedingstring.innerHTML = inputtext.substring(0, inputtext.length - 1);
    var newspan = document.createElement("span");
    newspan.setAttribute("class", "bg-danger");
    newspan.innerHTML = inputtext.slice(-1);
    return [precedingstring, newspan]

}

function replaceBrackets(inputtext) {
    return inputtext.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function replaceNewline(inputtext) {
    return inputtext.replaceAll("\n", "<br>");
}

function makeNewhighightedString(inputtext, indexes) {
    var lastindex = 0;
    var return_array = [];
    indexes.forEach(i => {
        // offset by 1 so the last character is the bad char.
        char_substring = inputtext.substring(lastindex, i + 1);
        lastindex = i + 1;
        highlightBadChars(char_substring).forEach(x => {
            return_array.push(x);
        })
    
    });
    // Add the last part of the input string to the array
    var last_element = document.createElement("span");
    last_element.innerHTML = inputtext.substring(lastindex, inputtext.length);
    return_array.push(last_element);
    return return_array;
}


function updateCharcount() {
    var inputlength = document.getElementById("id_inputtext").value.length;
    document.getElementById("id_charcount").innerHTML = `Characters: ${inputlength}/4000` ;
    findHighIndexCharacters(document.getElementById("id_inputtext").value)
    return inputlength;
}

function updateOutput() {
    var outputtext = replaceBrackets(document.getElementById("id_inputtext").value);
    outputtext = replaceNewline(outputtext);
    document.getElementById("id_output").innerHTML = "";
    var outputarray = makeNewhighightedString(outputtext, findHighIndexCharacters(outputtext));
    
    outputarray.forEach( el => {
        document.getElementById("id_output").appendChild(el);    
    }

    )
    //document.getElementById("id_output").innerHTML = outputtext;
}



// Run this on body load
function attachEventListeners() {
    document.getElementById("id_inputtext").addEventListener("change", updateCharcount);
    document.getElementById("id_inputtext").addEventListener("keyup", updateCharcount);
    document.getElementById("id_inputtext").addEventListener("change", updateOutput);
    document.getElementById("id_inputtext").addEventListener("keyup", updateOutput);
}

