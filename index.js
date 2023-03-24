import express from 'express'
const app = express()


app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.set('port', process.env.PORT || 4000)


app.listen(app.get('port'), function () {
})

const url = ["https://raw.githubusercontent.com/fdnd-agency/ultitv/main/ultitv-api"];


const urls = [
  [url] + "/game/943.json",
  [url] + "/game/943/statistics.json",
  [url] + "/facts/Player/8607.json",
];

app.get("/", async function (request, response) {
  const [data1, data2, data3] = await Promise.all(urls.map(fetchJson));
  const data = { data1, data2 };
  response.render("index", data);
});

async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}