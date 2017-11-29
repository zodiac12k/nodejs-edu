// nodejs 에서 데이베이스 핸들링
// 0단계 해당 디비를 액세스할 수 있는 모듈 설치
// mysql 계열(mysql, 마리아, 오로라)
// npm install mysql --save
// --save : package.json 파일이 존재할 경우 dependencies 에 해당 모듈 추가 기술 후 모듈을 설치한다.
// 1단계, 연결하고, 연결끊기

var mysql = require('mysql');



exports.loginSql = function(param, cb) {
    var connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '1111',
        database : 'nodes'
    });
    connection.connect(function () {
            console.log("Connection success!!");

            var sql = "select * from users where username = ? and password = ?";
            console.log(sql);
            connection.query(sql, [param.username, param.password], function (error, rows) {
                cb(error, rows);
                connection.end(function () {
                    console.log('Connnection end!!');
                });
        });
    });
}