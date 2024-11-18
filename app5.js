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

app.get("/takara",(req,res) => {
  const value1 = Number(req.query.radio);
  let get = 0|Number( req.query.get); 
  let none = 0|Number( req.query.none);
  let total = 0|Number( req.query.total);
  let per = 0;
  let all = 0|Number( req.query.all);
  if (all == 0){
    all+=1;
    judgement = 'なし';
    tresure = 'なし';
  }
  else{
  num=total+1
  tresure = 7 * num % 10; 
  console.log( {tresure, value1, get, none, total, per, num} );
  if (tresure == value1){
    judgement = 'あたり';
    get += 1;
  }
  else{
    judgement = 'はずれ';
    none += 1;
  }
  total+=1;
  per = get / total ;
  }
  const display={
  your: value1,
  jadgement:judgement, 
  tresure: tresure,
  get: get,
  none: none,
  total: total,
  per: per,
  all: all
  };
  res.render('takara', display);
});

app.get("/MontyHoll1",(req,res) => {
  const value1 = req.query.radio;
  const tresure = Math.floor(Math.random() * 4 + 1 );
  console.log( {tresure, value1, get, none, total, per} );
  if (tresure == value1){
  const num = Math.floor(Math.random() * 3 + 1);
  num = (num + value1) % 4;
  }
  else {
    do{
      const num = Math.floor(Math.random() * 4 +1);
      num = (num + value1) % 4;
      }while(num==tresure||num==value1);
  }
  let open = num;
  if(open==4){num1=0}
  else{num1=open}
  if(num1==0){
  let door01 =1
  let door02 =2
  let door03 =3
  }
  else if(num1==1){
  let door01 =2
  let door02 =3
  let door03 =4
  }
  else if(num1==2){
  let door01 =1
  let door02 =3
  let door03 =4
  }
  else{
  let door01 =1
  let door02 =2
  let door03 =4
  }
  const display1={
    your1: value1,
    open: open,
    door01: door01,
    door02: door02,
    door03: door03
  }
  res.render('MontyHoll', display1);
});
app.get('/MontyHoll2',(req,res) =>{
  const  value2 = req.query.radio;
  let get = 0|Number( req.query.get);
  let get1 = 0|Number( req.query.get1);
  let get2 = 0|Number( req.query.get2);
  let none = 0|Number(  req.query.none);
  let total = 0|Number( req.query.total);
  let stotal1 = 0|Number (req.query.stotal1);
  let stotal2 = 0|Number (req.query.stotal2);
  let per = 0|Number( req.query.per);
  let per1 = 0|Number( req.query.per1);
  let per2 = 0|Number( req.query.per2);
  let your1 = Number( req.query.your1);
  let open = Number( req.query.open);
  if(tresure == value2){
    get += 1;
    judgement = 'あたり';
  }
  else{
    none += 1;
    judgement = 'はずれ';
  }
  total += 1;
  per = Math.floor(get / total * 100);
  if(your1 == value2){
  stotal1 += 1;
    if(judgement == 'あたり'){get1+=1;}
  per1 = Math.floor(get1 / stotal1 * 100);
  }
  else {
  srotal2 += 1;
    if(judgement == 'あたり'){get2+=1;}
  per2 = Math.floor(get2 / stotal2 * 100);
  }
  const display2 = {
    tresure:tresure,
    jadgement:judgement,
    get: get,
    none: none,
    total: total,
    per: per,
    per1: per1,
    per2: per2,
    stotal1: stotal1,
    stotal2: stotal2,
    get1: get1,

  };
  res.render('MontyHoll', display2);
});

app.get ("/6charactorseet", (req, res) => {
  let level = Number(req.query.radio);
  if(level==1){
    do{
    str = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1);
    con = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1); 
    siz = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+6;
    dex = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1);
    App = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1);
    int = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+6;
    pow = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1);
    edu = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+3;
    num =str+con+siz+dex+App+int+pow+edu
    }while(num >135||num<120)}
  else if(level==2){
    do{
    str = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1);
    con = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1); 
    siz = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+6;
    dex = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1);
    App = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1);
    int = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+6;
    pow = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1);
    edu = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+3;
    num =str+con+siz+dex+App+int+pow+edu
    }while(num >=120|| num<=60)}
  else if(level==3){
    do{
    str = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1);
    con = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1); 
    siz = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+6;
    dex = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1);
    App = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1);
    int = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+6;
    pow = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1);
    edu = Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+Math.floor(Math.random()*6+1)+3;
    num =str+con+siz+dex+App+int+pow+edu
    }while(num>60||num <=40)} 
  else{
    str =0
    con =0
    siz =0
    dex =0
    App =0
    int =0
    pow =0
    edu =0
  }
  const luck= pow *5;
  console.log( {level} );
  let damage_bonus = '';
  if(str+siz >= 33) damage_bonus = '+1d6';
  else if(str+siz >= 25) damage_bonus = '+1d4';
  else damage_bonus = '0';
  const san = pow*5;
  const HP = Math.floor((con+siz)/2);
  const MP = pow;
  const idea = int*5;
  const tishiki = edu*5;
  const syoku = edu*20;
  const syumi = int*10;
  res.render( '6charactorseet', {
    str:str, con:con, siz:siz, dex:dex, App:App, int:int, pow:pow, edu:edu, luck:luck, db:damage_bonus, san:san, HP:HP, MP:MP, idea:idea, tishiki:tishiki, syoku:syoku, syumi:syumi});
  });


app.listen(8080, () => console.log("Example app listening on port 8080!"));
