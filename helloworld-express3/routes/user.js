var db = require('./db7');

/* GET users listing. */
exports.list = function (req, res) {
    res.send('respond with a resource');
};

exports.loginForm = function (req, res) {
    res.render('loginForm', {title: 'Login'});
};

exports.loginProc = function (req, res) {
    console.log(req.body.username);
    console.log(req.body.password);
    db.loginSql({
        username: req.body.username,
        password: req.body.password
    }, function (err, rows) {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
            res.end('<scrip>alert("로그인실패");history.back();</script>');
        } else if (rows.length == 0) {
            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
            res.end('로그인 실패!');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end('로그인 성공!');
            // res.redirect('/main');
        }
    });

};
