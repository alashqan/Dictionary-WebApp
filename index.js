const searchValue = document.getElementById('input');
const searchBtn = document.getElementById('searchBtn')
const result = document.getElementById('meaning')
const audio = document.getElementById('audio')
const wordDefination = document.getElementById('wordDef')

const getAPIdata = () => {
    console.log(searchValue.value);
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+searchValue.value)
    .then((res) => res.json())
    .then((data) => {
        const [meaning] = data;
        const [word,phonetic,meanings,phonetics] = [meaning.word, meaning.phonetic, meaning.meanings, meaning.phonetics];

        const [meaningData] = meanings;
        const [definition] = meaningData.definitions

        // destructure phonetics to get audio

        const [desPhonetics] = phonetics
        audio.src = desPhonetics.audio;

        result.innerHTML = `<b>${word}</b><br>${phonetic}`
        wordDefination.innerHTML = `${definition.definition}`

    }).catch((error)=>{
        console.log(error);

        result.innerHTML = `No Definitions Found.`
        wordDefination.innerHTML = `Sorry buddy, we couldn't find definitions for <b>${searchValue.value}</b>. <br>You can try the search again at later time or head to the web instead.`
    })
   
}

searchBtn.addEventListener('click',getAPIdata)

const wage = document.getElementById('wage');
wage.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        console.log("Enter pressed");
        // getAPIdata();
    }
});