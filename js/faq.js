$(function () {
  // 質問エリア（Q）がクリックされたときの処理
  $('.top-support_wrapper_faq_list_item_q').on('click', function () {
    
    // 1. 回答を開閉する（スライドさせる）
    // クリックされた質問の「次（next）」にある回答エリアを探して、slideToggleで開閉します。
    $(this).next('.top-support_wrapper_faq_list_item_q_answer').slideToggle(300);
    
    // 2. アイコンを「＋」から「－」に切り替える
    // クリックされた質問の「親要素（parent）」に 'is-open' というクラスを付け外しします。
    $(this).parent('.top-support_wrapper_faq_list_item').toggleClass('is-open');
    
  });
});