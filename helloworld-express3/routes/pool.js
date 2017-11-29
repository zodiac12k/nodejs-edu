/**
 * 디비 커넥션을 미리 잡아두고 관리한다.
 * 요청이 불렸을 때 균일한 처리 속도 및 디비 연결성을 보장한다.
 * npm install generic-pool@2.5 --save
 * 버전에 따른 사용법이 다르다.
 */
var genericPool = require('generic-pool');
var mysql = require('mysql');

// 풀링 생성
var pool = new genericPool.Pool({
    name: '',
    create: function (cb) { // callback 을 통해 커넥션을 보내준다 (max 값 만큼)
        var connection = mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '1111',
            database : 'nodes'
        });
        connection.connect(function (err) {
            cb(err, connection);
        });
    },
    destroy: function (connection) {
        if (connection) {
            connection.end();
        }
    },
    max: 15,
    min: 10,
    log: true, // 커넥션수를 계속 모니터링하여 모드상에 어디가 반납하고 있지 않는지 확인한다.
    idleTimeoutMillis: 600*1000
});
// 이벤트 등록 (오류, 해제)
process.on('uncaughtException', (err) => {
    // 전체 구동 중 예외 상황 발생시 이쪽으로 모두 전달된다.
    console.log(err);
});

process.on('beforeExit', (code) => {
    pool.drain(function () {
        pool.destroyAllNow();
    });
});

// 객체 모듈화
module.exports = pool;