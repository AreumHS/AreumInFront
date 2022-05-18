// pre-define
const express = require('express');
const ejs = require('ejs');
const request = require('request');
const cookieparser = require('cookie-parser');

const app = express();


// https redirect routers
app.all("*", function(req,res,next){
  let protocol = req.headers['x-forwarded-proto'] || req.protocol;
  if(protocol == 'http'){ res.redirect("https://"+req.hostname + req.url); }
  else{ next(); }
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/'));
app.use(cookieparser());

// function define
function getCookie(cookie, name) {
  var vname = name + "=";
  var ar = cookie.split(';');
  for (var i = 0; i < ar.length; i++) {
    var cstr = ar[i];
    while (cstr.charAt(0) == ' ') cstr = cstr.substring(1, cstr.length);
    if (cstr.indexOf(vname) == 0) return cstr.substring(vname.length, cstr.length);
  }
  return null;
}

//special routers ( include post entrypoints )
app.get('/', function (req, res) {
  res.render('ect/location', { url: 'login' });
});

app.get('/logout', function (req, res) {
  res.clearCookie('key');
  res.send("<script> location.href = '/'; </script>");
});

app.post('/entry', function (req, res) {
  try {
    request({
      uri: 'https://api.areum.in/login/post',
      method: 'POST',
      body: { id: req.body.id, pw: req.body.pw },
      json: true
    }, function (error, response, body) {
      if (body != 'Failed') {
        const msday = 1000 * 24 * 60 * 60;
        res.cookie('key', body, { maxAge: msday });
        res.send("<script> location.href = '/main'; </script>");
      }
      else{ res.send("<script> alert('잘못된 아이디 또는 비밀번호를 입력하셨습니다.'); location.href = '/login'; </script>"); }
    });
  } catch (error) {
    console.log(error);
    res.render('ect/error', { log: error });
  }
});

app.post('/regientry', function (req, res) {
  try {
    request({
      uri: 'https://api.areum.in/register/post',
      method: 'POST',
      body: {
        chkcode: req.body.chkcode,
        barcode: req.body.barcode,
        id: req.body.id,
        email: req.body.email,
        pw: req.body.pw,
        pw2: req.body.pw2,
        pid: req.body.pid,
        name: req.body.name
      },
      json: true
    }, function (error, response, body) {
      if(body.status == 'Failed'){ res.send("<script> alert('입력한 정보들을 다시 확인해주세요.'); location.href = '/register'; </script>"); }
      else{ res.send("<script> alert('회원가입 완료!'); location.href = '/login'; </script>"); }
    });
  } catch (error) {
    console.log(error);
    res.render('ect/error', { log: error });
  }
});

//primary routers
app.get('/:input', function (req, res) {
  try {
    const pagelist = ['login', 'register', 'main', 'meal', 'shop', 'time', 'calendar'];
    const page = String(req.params.input);
    const mycookie = String(req.cookies.key);

    //잘못된 주소 >> 404
    //올바른 주소인데 로그인 x >> /register이면 /register로 이동 >> 아니면 /login으로 이동
    //올바른 주소인데 로그인 o >> /register또는 /login 이면 /main으로 이동 >> 아니면 page로 이동
    

    if (pagelist.indexOf(page) == -1) { res.render('ect/404', {}); }
    else {
      if (mycookie == 'undefined') {
        switch (page) {
          case 'login': {
            request({
              uri: 'https://api.areum.in/login/get',
              method: 'GET',
              json: true
            }, function (error, response, body) {
              res.render('feature/login', { ml: body.lunch, md: body.dinner });
            });
            break;
          } case 'register': {
            res.render('feature/register', {});
            break;
          } default: {
            res.render('ect/location', { url: 'login' });
          }
        }
      } else {
        const key = getCookie(req.headers.cookie, "key");
        request({
          uri: 'https://api.areum.in/side/get?code=' + key,
          method: 'GET',
          json: true
        }, function (_error, _response, _body) {
          var stdname = _body.name.name;
          var schnum = _body.schnum;
          switch (page) {
            case 'main': {
              request({
                uri: 'https://api.areum.in/main/get?code=' + key,
                method: 'GET',
                json: true
              }, function (error, response, body) {
                res.render('feature/wrapper', { linkto: page, stdname: stdname, schnum: schnum, ml: body.meal.lunch, md: body.meal.dinner, time: body.table, barcode: body.barcode });
              });
              break;
            } case 'meal': {
              request({
                uri: 'https://api.areum.in/meal/get',
                method: 'GET',
                json: true
              }, function (error, response, body) {
                //console.log(body);
                res.render('feature/wrapper', { linkto: page, stdname: stdname, schnum: schnum, ml: body.lunch, md: body.dinner });
              });
              break;
            } case 'shop': {
              res.render('feature/wrapper', { linkto: page, stdname: stdname, schnum: schnum });
              break;
            } case 'time': {
              request({
                uri: 'https://api.areum.in/time/get?code=' + key,
                method: 'get',
                json: true
              }, function (error, response, body) {
                res.render('feature/wrapper', { linkto: page, stdname: stdname, schnum: schnum, time: body.body, title:body.title });
              });
              break;
            } case 'calendar': {
              res.render('feature/wrapper', { linkto: page, stdname: stdname, schnum: schnum });
              break;
            } default: {
              res.render('ect/location', { url: 'main' });
              break;
            }
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.render('ect/error', { log: error });
  }
});

app.listen(8081, function () {
  console.log("Running now...");
});






/*
app.use(function (err, req, res, next) {
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('ect/404',{});
});
*/

//  <%- include(linkto) %> 로 include함

/* 테스트 코드 ( 쿠키등록 )
app.post('/test', function (req, res) {
  try {
    request({
      uri: 'https://api.areum.in/test',
      method: 'POST',
      body: {
        code: getCookie(req.headers.cookie, "key"),
        diff: req.body.barcode
      },
      json: true
    }, function (error, response, body) {
      res.render('ect/test', { stat: body });
    });
  } catch (error) {
    console.log(error);
    // res.render('ect/error', { log: error });
  }
})
*/