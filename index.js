import express from 'express'

const app = express()


app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.set('port', process.env.PORT || 4000)


app.listen(app.get('port'), function () {
})


const url = ["https://raw.githubusercontent.com/fdnd-agency/ultitv/main/ultitv-api"];
const postUrl = "https://api.ultitv.fdnd.nl/api/v1/players";
const apiUrl = "https://api.ultitv.fdnd.nl/api/v1/questions";


const urls = [
  url + "/game/943.json",
  url + "/game/943/statistics.json",
  url + "/facts/Player/8607.json",
  postUrl,
  apiUrl
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async function (request, response) {
  const [data1, data2, data3, data4, data5] = await Promise.all(urls.map(fetchJson));
  const data = { data1, data2, data3, data4, data5 };
  response.render("index", data);
});

app.post("/", (request, response) => {
  
  request.body.answers = [
    {
      content: request.body.content,
      questionId: request.body.question
    }
  ];
  console.log(request.body)
  
  
  
  postJson(postUrl, request.body).then((data) => {
    let newPlayer = { ...request.body };
    if (data.success) {
      response.redirect("/?memberPosted=true");
    } else {
      const errormessage = `${data.message}: De lul.`;
      const newplayer = { error: errormessage, values: newPlayer };
      console.log(errormessage);
      response.redirect("/");
    }
  });
});

async function fetchJson(urls) {
  return await fetch(urls)
    .then((response) => response.json())
    .catch((error) => error)
}

async function postJson(urls, body) {
  return await fetch(urls, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .catch((error) => error)
}
