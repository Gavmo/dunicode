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

function replaceBrackets(inputtext) {
    return inputtext.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function replaceNewline(inputtext) {
    return inputtext.replaceAll("\n", "<br>");
}

function makeNewhighightedString(inputtext) {
    var indexes = inputtext.split('');
    for (var i = 0; i < indexes.length; i++) {
        if (indexes[i].charCodeAt(0) > 127) {
            indexes[i] = `<span class=\"bg-danger\ rounded">${indexes[i]}</span>`
        }

    }
    return indexes.join("");
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
    outputtext = makeNewhighightedString(outputtext);
    document.getElementById("id_output").innerHTML = outputtext;
}



// Run this on body load
function attachEventListeners() {
    document.getElementById("id_inputtext").addEventListener("change", updateCharcount);
    document.getElementById("id_inputtext").addEventListener("keyup", updateCharcount);
    document.getElementById("id_inputtext").addEventListener("change", updateOutput);
    document.getElementById("id_inputtext").addEventListener("keyup", updateOutput);
}

