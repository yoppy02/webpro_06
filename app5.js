const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win =  0|Number( req.query.win);
  let total = 0|Number( req.query.total );
  let lose = 0|Number( req.query.lose);
  var all =0|Number( req.query.all );
  console.log( {hand, win, total, lose, all} );
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  if (all==0) cpu=' ';
  else;
  console.log( {cpu} );
  if ( hand == 'パー' && num==1 || hand == 'チョキ' && num==3 || hand == 'グー' && num==2)judgement='勝ち';
  else if (hand == 'グー' && num==1 || hand == 'パー' && num==3 || hand == 'チョキ' && num==2)judgement='あいこ';
  else if (hand == 'チョキ' && num==1 || hand == 'グー' && num==3 || hand == 'パー' && num==2)judgement='負け';
  else judgement = '';

  if (judgement == '勝ち') win += 1,total += 1;
  else if (judgement == 'あいこ');
  else if (judgement == '負け') lose +=1,total += 1;
  all += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total,
    lose: lose,
    all: all
  };
  
  

  res.render( 'janken', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
