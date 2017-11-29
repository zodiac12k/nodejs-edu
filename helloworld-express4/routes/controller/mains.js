var express = require('express');
var router = express.Router();
var db = require('../db/db7');
var _ = require('underscore');
var multiparty = require('multiparty');
var path = require('path');

/* GET mains listing. */
router.get('/', function (req, res, next) {
    // EPL 정보 가져오기 => 쿼리
    db.getEplInfo({}, function (err, rows) {
        // 응답 => 렌더링
        res.render('main', {title:'순위표', epl:rows})
    });
});

/* GET mains listing. */
router.post('/search', function (req, res, next) {
    console.log(req.body);
    // EPL 정보 가져오기 => 쿼리
    db.search(req.body, function (err, rows) {
        // 응답 => 렌더링
        console.log(rows);
        var code = err ? -1 : 1;
        res.json({code:code, results:rows});
    });
});

router.post('/upload', (req, res, next) => {
   var infos = {};
   var dir = path.join(__dirname, '../../public/upload');
   console.log('디렉토리', dir);
   var form = new multiparty.Form({
       maxFields: 10,
       uploadDir: dir
   });

   form.on('field', (name, value) => {
       infos[name] = value;
   });
   form.on('file', (name, file) => {
       infos[name] = file.path.replace(path.join(__dirname.replace('/routes/controller', ''), '/public'));
       console.log('저장파일 경로', infos[name]);
   });
   form.on('close', () => {
       // 파일 업로드에 대한 응답
       // 파일 경로/파일명을 기록
   });
   form.on('part', (part) => {
       // 파일을 저장하기
       // 파일의 이름, 크기를 획득
       // 스트림을 생성 (저장 위치까지 연결)
       // 읽어지는 대로 파이프라인을 따라서 기록이 된다.
       var filename;
       var size;
       if (part.filename) {
           filename = part.filename;
           size = part.byteCount;
       } else {
           part.resume();
       }
       // 서버의 특정 공간에 파일을 생성 => fs(파일시스템)
       // 스트림을 생성 (저장 위치까지 연결) => 파이프라인 연결
       var wStream = fs.createWriteStream(path.join(dir, filename));
       wStream.filename = filename;
       // part에서 파일까지 스트림을 연결시켰다. part는 네트워크를 타고 클라이언트 브라우저와 연결 (TCP)
       part.pipe(wStream);
       part.on('data', (chunk) => {
           console.log(filename, '를 읽어서 쓰고 있다', chunk.length, '바이트 만큼');
       });
       part.on('end', () => {
           console.log('파일 읽기 완료');
           wStream.close();
           res.redirect('/main');
       });
   });
   form.on('progress', (read, expected) => {
       console.log('읽은 데이터 로그: ', read, expected);
   });
   form.on('error', (error) => {
       console.log('에러: ', error);
   });

   form.parse(req, (error, fields, files) => {
       console.log('파싱: ', error, fields, files);

   });
});

module.exports = router;
