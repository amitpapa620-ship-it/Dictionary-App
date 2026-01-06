import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';



const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async(req, res) => {
       
    res.render("index.ejs");
});

app.post("/", async (req, res) => {
    try {
    const word = req.body.input;
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const result = response.data[0]; 
    const audioEntry = result.phonetics.find(p => p.audio !== "");

    res.render("index.ejs", {
      data: {
        word: result.word,
        partOfSpeech: result.meanings[0].partOfSpeech,
        phonetic: result.phonetic || (result.phonetics[0] ? result.phonetics[0].text : ""),
        Definition: result.meanings[0].definitions[0].definition,
        Example: result.meanings[0].definitions[0].example,
        Synonyms: result.meanings[0].synonyms,
        Antonyms: result.meanings[0].antonyms,
        Audio: audioEntry ? audioEntry.audio : null,
      },
      error: null
    });
  } catch (err) {
    res.render("index.ejs", { data: null, 
        error: "Word not found!" 
        });
  }

});


app.listen(port,()=>{
        console.log(`Server is running on the port ${port}`);
});

