const searchValue = document.getElementById('input');
const searchBtn = document.getElementById('searchBtn');
const result = document.getElementById('meaning');
const audio = document.getElementById('audio');
const wordDefination = document.getElementById('wordDef');
const wordExample = document.getElementById('wordExample');

const getAPIdata = () => {
    const wordToSearch = searchValue.value.trim();
    if (!wordToSearch) return; // don't search if input is empty

    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + wordToSearch)
    .then(res => res.json())
    .then(data => {
        const [meaning] = data;
        const { word, phonetic, meanings, phonetics } = meaning;

        const [meaningData] = meanings;
        const [definitionData] = meaningData.definitions;

        // Get example if exists
        const example = definitionData.example ? definitionData.example : "No example available.";

        // Get audio if exists
        const [desPhonetics] = phonetics;
        audio.src = desPhonetics.audio || "";

        result.innerHTML = `<b>${word}</b><br>${phonetic || ""}`;
        wordDefination.innerHTML = `${definitionData.definition}`;
        wordExample.innerHTML = example;

    })
    .catch(error => {
        console.log(error);
        result.innerHTML = `No Definitions Found.`;
        wordDefination.innerHTML = `Sorry buddy, we couldn't find definitions for <b>${searchValue.value}</b>. <br>You can try the search again later or head to the web instead.`;
        wordExample.innerHTML = "";
    });
};

searchBtn.addEventListener('click', getAPIdata);

// Enter key trigger
searchValue.addEventListener("keydown", function(e) {
    if (e.code === "Enter") {  
        getAPIdata();
    }
});
