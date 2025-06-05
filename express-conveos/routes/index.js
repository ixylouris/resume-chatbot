var express = require('express');
var router = express.Router();
var responseMapTypes = require('../data/questionMap.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




router.post("/chat", async (req, res) => {
  
  const  { message } = req.body;
  console.log("Received message:", req.body);
  resAnswer = "";

  const words = message.trim().toLowerCase().replace(/[^\w\s]/g, "").split(" ").filter(word => word.length > 0);

  console.log("Processed message:", words);
  for ( let word of words) {
    if (word === "") continue;
    word = word.trim().toLowerCase();
    for (const [key, value] of Object.entries(responseMapTypes)) {
      
      if (value.keywords.includes(word)) {
        console.log(`Keyword "${word}" found in category "${key}"`);
        resAnswer += value.intro + " " + value.responses[Math.floor(Math.random() * value.responses.length)] + " ";
        break;
      }
    }    
  }
  console.log("Response answer:", resAnswer);
  if (resAnswer) {
    return res.json({ text: resAnswer, sender: "bot" });
  } else {
    return res.json({ text: "I don't understand that.", sender: "bot" });
  }
});
module.exports = router;
