const prompt = require('prompt-sync')({ sigint: true })
const fs = require("fs");
const questions = require("./frågor1.json");

let name = prompt("vänligen skriv ditt namn:")

let poäng = [0, 0, 0, 0];
for (let i = 0; i < 4; i++) {
  console.log(questions[i].Fråga);
  let answer = prompt('J = Ja N= Nej:').trim().toLocaleLowerCase();
  if (answer == 'j') {
    for (let j = 0; j < 4; j++) {
      poäng[j] += questions[i].Ja[j];
    }
  } else if (answer == 'n') {
    for (let j = 0; j < 4; j++) {
      poäng[j] += questions[i].Nej[j];
    }
  } else { console.log('ogiltig svar') }
}



fs.readFile("svar.json", (err, data) => {
  let användare = [];
  if (!err) {
    användare = JSON.parse(data)
  };
  användare.push(
    {
      Name: name,
      Date: new Date().toLocaleString(),

      score: (`den djur verkligen passar dig bäst: ${ordning[0].djur}, med ${ordning[0].value} %`)
    })


  fs.writeFile("svar.json", JSON.stringify(användare, null, 2), (err) => {
    if (err) throw err;
    console.log("Data sparas i filen");
  });
})

const totalt = (poäng[0] + poäng[1] + poäng[2] + poäng[3])

hundResult = (poäng[0] / totalt * 100).toFixed(2)
kattResult = (poäng[1] / totalt * 100).toFixed(2)
kaninResult = (poäng[2] / totalt * 100).toFixed(2)
fiskResult = (poäng[3] / totalt * 100).toFixed(2)

let ordning = [{
  djur: "Hund", Value: hundResult
},

{
  djur: "Katt", value: kattResult
},

{
  djur: "Kanin", value: kaninResult
},

{
  djur: "Fisk", value: fiskResult
},
]

console.log(ordning.sort((första, andra) => (första.value - andra.value)).reverse());
console.log(`den djur verkligen passar dig bäst: ${ordning[0].djur}, med ${ordning[0].value} %`)


