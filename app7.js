"use strict";

const express = require("express");
const session = require('express-session');
const app = express();

let bbs = [];  // 本来はDBMSを使用するが，今回はこの変数にデータを蓄える

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

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

app.get("/get_test", (req, res) => {
  res.json({
    answer: 0
  })
});

app.get("/add", (req, res) => {
  console.log("GET");
  console.log( req.query );
  const num1 = Number( req.query.num1 );
  const num2 = Number( req.query.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

app.post("/add", (req, res) => {
  console.log("POST");
  console.log( req.body );
  const num1 = Number( req.body.num1 );
  const num2 = Number( req.body.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

// これより下はBBS関係
app.post("/check", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  res.json( {number: bbs.length });
});

app.post("/read", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  const start = Number( req.body.start );
  console.log( "read -> " + start );
  if( start==0 ) res.json( {messages: bbs });
  else res.json( {messages: bbs.slice( start )});
});

app.post("/post", (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  console.log( [name, message] );
  // 本来はここでDBMSに保存する
  bbs.push( { name: name, message: message } );
  res.json( {number: bbs.length } );
});

//app.post("/login", (req, res) => {
  //const password = req.body.password;
  //const id = req.body.id;
  //console.log( [password, id] );
  //if ((id.substring(0,3) == ("24G1"||"24g1") || id.substring(1,4)== "24G1" && id.substring(id.length - 16) == "s.chibakoudai.jp") && password.substring(0,3)== ("24G1" || "24g1")){
    //res.json ({message: "OK, please wait..."});
  //}
  //else res.json( {message: "はメールアドレスまたはパスワードが違います" } );
//});


app.use(session({
  secret: 'secret_key', // セッション暗号化用のキー
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // HTTPS の場合は true に設定
}));

app.use(express.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  const id = req.body.id || "";
  const password = req.body.password || "";

  console.log("ログイン試行:", { id, password });

  const validId = (id.startsWith("24G1") || id.startsWith("24g1"));
  const validDomain = id.endsWith("s.chibakoudai.jp");
  const validPassword = (password.startsWith("24G1") || password.startsWith("24g1"));

  if ((validId || validDomain) && validPassword) {
      res.json({ message: "OK, please wait..." });
  } else {
      res.json({ message: "メールアドレスまたはパスワードもしくは両方が違います。" });
  }
});

app.get('/isLoggedIn', (req, res) => {
  if (req.session.isLoggedIn) {
      res.json({ loggedIn: true });
  } else {
      res.json({ loggedIn: false });
  }
});

// ログアウト処理
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).json({ message: 'ログアウトに失敗しました' });
      }
      res.json({ message: 'ログアウトしました' });
  });
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));
