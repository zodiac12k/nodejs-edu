// nodejs 에서 데이베이스 핸들링
// 0단계 해당 디비를 액세스할 수 있는 모듈 설치
// mysql 계열(mysql, 마리아, 오로라)
// npm install mysql --save
// --save : package.json 파일이 존재할 경우 dependencies 에 해당 모듈 추가 기술 후 모듈을 설치한다.
// 1단계, 연결하고, 연결끊기

var pool = require('./pool');
var mysql = require('mysql');

exports.loginSql = function(param, cb) {
    // 커넥션 빌리고
    pool.acquire(function (err, connection) {
        if (err) {
            // 커넥션을 확보 못함
            cb(err, []);
        } else {
            var sql = "select * from users where username = ? and password = ?";
            console.log(sql);
            connection.query(sql, [param.username, param.password], function (error, rows) {
                // 반납
                pool.release(connection);
                // 응답
                cb(error, rows);
            });
        }
    });
}

exports.insertUser = function(param, cb) {
    // 커넥션 빌리고
    pool.acquire(function (err, connection) {
        if (err) {
            // 커넥션을 확보 못함
            cb(err, []);
        } else {
            var sql = "insert into users (username, password, name) values (?, ?, ?)";
            console.log(sql);
            connection.query(sql, [param.username, param.password, param.name], function (error, rows) {
                // 반납
                pool.release(connection);
                // 응답
                cb(error, rows);
            });
        }
    });
}

exports.getEplInfo = function(param, cb) {
    // 커넥션 빌리고
    pool.acquire(function (err, connection) {
        if (err) {
            // 커넥션을 확보 못함
            cb(err, []);
        } else {
            var sql = "select * from tbl_epl order by rank asc";
            console.log(sql);
            connection.query(sql, [], function (error, rows) {
                // 반납
                pool.release(connection);
                // 응답
                cb(error, rows);
            });
        }
    });
}

exports.search = function(param, cb) {
    // 커넥션 빌리고
    pool.acquire(function (err, connection) {
        if (err) {
            // 커넥션을 확보 못함
            cb(err, []);
        } else {
            var sql = "select * from tbl_epl where name like concat('%', ?, '%') order by rank asc";
            console.log(sql);
            console.log(param.keyword);
            connection.query(sql, [param.keyword], function (error, rows) {
                // 반납
                pool.release(connection);
                // 응답
                cb(error, rows);
            });
        }
    });
}