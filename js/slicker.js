// $(function(){
//   /*=================================================
//   // カルーセル用 jQueryプラグイン「slick」
//   // マニュアル：https://kenwheeler.github.io/slick/
//   ===================================================*/
//   $('#slider').slick();
// });
    // <script>
      $(document).ready(function () {
        $(
          ".photos_spring_collection, .photos_summer_collection, .photos_autumn_collection, .photos_winter_collection"
        ).slick({
          slidesToShow: 4, // 表示するスライド数（PC）
          slidesToScroll: 4, // 1回にスクロールする数
          autoplay: false, // 自動再生
          autoplaySpeed: 3000, // 自動再生の速度
          dots: true, // 下のドットナビゲーションを表示
          arrows: true, // 左右の矢印を表示
          responsive: [
            {
              breakpoint: 1024, // PCとタブレットの中間くらいのブレイクポイント
              settings: {
                slidesToShow: 3,
              },
            },
                        {
              breakpoint: 768, // タブレットのブレイクポイント
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 480, // スマホのブレイクポイント
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        });
      });
    // </script>