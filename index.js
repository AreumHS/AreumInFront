const express   = require('express');
const ejs       = require('ejs');
const request   = require('request');
const { query, urlencoded, json } = require('express');
const { get } = require('request');
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static(__dirname + '/'));

var url_ = "https://areum.in";
/*
app.post('https://api.areum.in/auth/login', function(req, res){
  var _url = 'https://api.areum.in/auth/login';

  request({
      uri: _url,
      method: 'POST',
      body: { 'id' : req.body.id, 'pw' : req.body.pw },
      json:true
  }, function(err2,res2,body2){
     var callback = body2;

     if(callback.status == "Succeed"){
      Location.href = url_ + "/main?param=" + callback.return;
     }
     else{
      switch(callback.log){
        case "NullException":{
            alert("학번 혹은 비밀번호가 입력되지 않았습니다.");
            break;
        }case "IdIncorrect":{
            alert("올바른 학번을 입력해주세요.");
            break;
        }case "DatabaseSelectErr":{
            alert("데이터베이스 구문에러");
            break;
        }case "IdIsntExist":{
            alert("계정이 존재하지 않습니다.");
            break;
        }case "PasswordFalse":{
            alert("비밀번호를 다시 입력하여주세요.");
            break;
        }
       }
       Location.href = url_ + "/login";
     }
  });
});

app.post('https://api.areum.in/auth/register', function(req, res){
  var _url = 'https://api.areum.in/auth/register';

  request({
      uri: _url,
      method: 'POST',
      body:{
          'id':   req.body.id,
          'name': req.body.name,
          'pw':   req.body.pw,
          'pw2':  req.body.pw2,
          'email':req.body.email,
          'code': req.body.code
      },
      json:true
  }, function(err2, res2, body2){
      var callback = body2;

      if(callback.status == "Succeed"){
        alert("회원가입을 마쳤습니다.");
        Location.href = url_ + "/main?param=" + callback.return;
      }
      else{
        switch(callback.log){
          case "NullException":{
            alert("입력되지 않은 칸이 있습니다.");
            break;
          }case "CodeCheckFailed":{
            alert("유효하지 않은 코드입니다.");
            break;
          }case "PasswordIncorrect":{
            alert("비밀번호와 비밀번호 재입력이 일치하지 않습니다.");
            break;
          }case "IdIncorrect":{
            alert("아이디는 학번만 가능합니다.");
            break;
          }case "EmailIncorrect":{
            alert("올바르지 않은 이메일 입니다.");
            break;
          }case "AlreadyUsing":{
            alert("이미 사용된 학번입니다.");
            break;
          }default:{
            alert("데이터베이스 오류입니다. 관리자에게 문의하십시오.");
            break;
          }
        }
        Location.href = url_ + "/register";
      }
  });
});
*/
function daymeal(req,res){
  request({
    uri: 'https://api.areum.in/meal/day',
    method: 'POST',
    json:true
  },function(error,response,body){
    res.render('login', {meal: body.return});
  });
}

app.get('/', function(req,res){
  res.render('login', {meal: ''})
  //daymeal(req,res);
});

app.get('/:input', function (req, res){
  const page = req.params.input;
  const list = ['login','register','main', 'meal', 'shop','time','calendar'];

  if(list.indexOf(page) != -1){
    if(page == 'login'){res.render('login', {meal: ''}); /* daymeal(req,res);*/ }
    if(page == 'register'){ res.render('register', {}); }

    if(page == 'main')   res.render('wrapper', {linkto: page, lunch: 'testmenu'});
    if(page == 'meal')   res.render('wrapper', {linkto: page});
    if(page == 'shop')   res.render('wrapper', {linkto: page});
    if(page == 'time')   res.render('wrapper', {linkto: page});
    if(page == 'calendar') res.render('wrapper', {linkto: page});
  }
  else res.render('404', {});
});

app.use(function(req, res, next){
  next(createError(404));
});

app.use(function(err, req, res, next) {
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('404');
});

app.listen(8081, function(){
  console.log("Running now...");
});

//  <%- include(linkto) %> 로 include함