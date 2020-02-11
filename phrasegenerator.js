'use strict';

const CHAR_LIMIT_LOWER = 4;
const CHAR_LIMIT_UPPER = 8;

document.getElementById("generateButton").addEventListener("click", () => {
    if (document.getElementById("specialChars").value.length > 0 )
    {
        specialSymbolList = document.getElementById("specialChars").value;
    }
    
    document.getElementById("outputPhrase").value = generatePhrase();
});

let specialSymbolList;

// https://grammar.yourdictionary.com/parts-of-speech/adjectives/list-of-adjective-words.html
const adjectiveList = [
    "alert"
    ,"shy"
    ,"silly"
    ,"rich"
    ,"bad"
];

const nounList = [
    "cat"
    ,"dog"
    ,"hat"
    ,"shoe"
    ,"ball"
    ,"kix"
    ,"sox"
    ,"tix"
    ,"dab"
];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function generatePrePhrase() {
    const adjectiveIndex = getRandomInt(adjectiveList.length);
    const nounIndex = getRandomInt(nounList.length);

    let adjective = toTitleCase(adjectiveList[adjectiveIndex]);
    let noun = toTitleCase(nounList[nounIndex]);

    let result = adjective + noun;

    return result;
}

function addPadding(stringToCheck) {
    let result = stringToCheck;
    const padLength = CHAR_LIMIT_UPPER - result.length;
    for (let i = 0; i < padLength; i++)
    {
        if (padLength > 1 && i == padLength - 1)
        {
            let special = specialSymbolList.substr(getRandomInt(specialSymbolList.length), 1);
            result = result + special;
        }
        else
        {
            result = result + getRandomInt(10);
        }
        
    }
    return result;
}

function generatePhrase() {
    let result = generatePrePhrase();

    while (result.length < CHAR_LIMIT_LOWER || result.length > (CHAR_LIMIT_UPPER - 1))
    {
        result = generatePrePhrase();
    }

    // needs to be less than 7 so we can add more characters
    if (result.length > (CHAR_LIMIT_LOWER - 1) && result.length < CHAR_LIMIT_UPPER)
    {
        result = addPadding(result);
        // const padLength = 8 - result.length;
        // for (let i = 0; i < padLength; i++)
        // {
        //     result = result + getRandomInt(10);
        // }
    }
    else
    {
        result = "";
    }

    return result;
}