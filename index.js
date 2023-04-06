import express from 'express'

const app = express()


app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.set('port', process.env.PORT || 4000)


app.listen(app.get('port'), function () {
})

// Hier worden de urls benoemd, waaronder main url de spelers api en de questions api. 
const url = ["https://raw.githubusercontent.com/fdnd-agency/ultitv/main/ultitv-api"];
const postUrl = "https://api.ultitv.fdnd.nl/api/v1/players";
const apiUrl = "https://api.ultitv.fdnd.nl/api/v1/questions";

// Hier worden de urls samengevoegd onder de naam "urls" zodat je ze allemaal kunt aanroepen.
const urls = [
  url + "/game/943.json",
  url + "/game/943/statistics.json",
  url + "/facts/Player/8607.json",
  postUrl,
  apiUrl
];

// Dit moest ik gewoon neerzetten.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// hier worden alle urls samengevoegd tot een DATA variabele. 
app.get("/", async function (request, response) {
  const [data1, data2, data3, data4, data5] = await Promise.all(urls.map(fetchJson));
  const data = { data1, data2, data3, data4, data5 };
  response.render("index", data);
});

// Hier wordt de post route aangemaakt en er wordt gezorgd dat de data op de 
// juiste manier wordt opgesteld voor de api.
app.post("/", (request, response) => {
  
  request.body.answers = [
    {
      content: request.body.content,
      questionId: request.body.question
    }
  ];
  console.log(request.body)
  
  // Hier wordt gekeken of de post gelukt is of niet, vervolgens wordt de gebruiker doorgestuurd naar de homepage. 
  // Mocht de post niet gelukt zijn komt er een error in de console. 
  postJson(postUrl, request.body).then((data) => {
    let newPlayer = { ...request.body };
    if (data.success) {
      response.redirect("/?memberPosted=true");
    } else {
      const errormessage = `${data.message}: De lul.`;
      console.log(errormessage);
      response.redirect("/");
    }
  });
});

// Deze functie zorgt ervoor dat de data eerst volledig gelezen wordt voordat JS doorgaat naar de volgende stap. 
async function fetchJson(urls) {
  return await fetch(urls)
    .then((response) => response.json())
    .catch((error) => error)
}

// Deze functie verstuurd de data naar de API.
async function postJson(urls, body) {
  return await fetch(urls, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .catch((error) => error)
}
