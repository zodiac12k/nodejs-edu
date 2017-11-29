/* GET home page. */
exports.index = function (req, res) {
    // index.ejs 파일을 찾아서 읽어서, 데이터를 전달하여 동적으로 응답 데이터를 구성하여 응답한다.
    // 전달한 구조는 js의 객체 구조로 전달 => 주로 리터럴 객체 형태를 취함
    /*
     * 1 obj = {}
     * 2 obj = new Object()
     * 3 function AA() {
     * 
     */
    res.render('index', {title: 'Express'});
};
