$(document).ready(function () {
   console.log('dom load');
   $('#searchForm').on('submit', function (e) {
      e.preventDefault();
      console.log($('#searchForm').serialize());
      $.ajax({
          url:'/main/search',
          data: $('#searchForm').serialize(),
          dataType: 'json',
          type: 'post',
          success: function (data) {
              // $('#record_tbl .table .tbody').empty();

          },
          error: function (err) {
              console.log("오류", err);
          }
      });
      return false;
   });
});