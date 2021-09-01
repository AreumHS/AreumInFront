const express = require('express');
const ejs = require('ejs');
const request = require('request');
const { query, urlencoded, json } = require('express');
const { get } = require('request');
const app = express();
const cookieparser = require('cookie-parser');


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(__dirname + '/'));
app.use(cookieparser());

app.get('/', function (req, res) {
  res.render('ect/location', { url: 'login' });
});

app.get('/logout', function (req, res) {
  res.clearCookie('key');
  res.render('ect/logout', {});
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
        res.cookie('key', body, {
          maxAge: msday
        });
      }
      res.render('ect/entry', { stat: body });
    });
  } catch (error) {
    console.log(error);
    //res.render('ect/error', { log: error });
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
      res.render('ect/regientry', { stat: body.status, log: body });
    });
  } catch (error) {
    console.log(error);
    // res.render('ect/error', { log: error });
  }
});

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

app.get('/:input', function (req, res) {
  try {
    const pagelist = ['login', 'register', 'main', 'meal', 'shop', 'time', 'calendar'];
    const page = String(req.params.input);
    const mycookie = String(req.cookies.key);

    //잘못된 주소 >> 404
    //올바른 주소인데 로그인 x >> /register이면 /register로 이동 >> 아니면 /login으로 이동
    //올바른 주소인데 로그인 o >> /register또는 /login 이면 /main으로 이동 >> 아니면 page로 이동


    if (pagelist.indexOf(page) == -1) {
      //res.render('ect/404', {});
    } else {
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
                res.render('feature/wrapper', { linkto: page, stdname: stdname, schnum: schnum, time: JSON.parse(body.body), title:body.title });
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
    //res.render('ect/error', { log: error });
  }
});

app.use(function (req, res, next) {
  next(createError(404));
});
/*
app.use(function (err, req, res, next) {
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('ect/404',{});
});
*/
app.listen(8081, function () {
  console.log("Running now...");
});

//  <%- include(linkto) %> 로 include함