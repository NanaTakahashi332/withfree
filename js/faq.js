
const animTiming = {
  duration: 500,
  easing: 'ease-in-out',
};

// 1122追加
// ----------------------------------------------------
// 💡 【新規追加】 閉じるアニメーションを関数化
// ----------------------------------------------------
/**
 * 指定されたアコーディオンを閉じるアニメーションを実行し、open属性を削除します。
 * @param {HTMLElement} el - <details> 要素
 * @param {HTMLElement} answer - <p class="answer"> 要素
 */
function closeAccordion(el, answer) {
  if (!el.hasAttribute('open')) return; // 既に閉じていたら何もしない

  // 現在のスタイル（marginやpadding）を計算して取得
  const computedStyle = getComputedStyle(answer);
  const marginTop = computedStyle.marginTop;
  const marginBottom = computedStyle.marginBottom;
  const paddingTop = computedStyle.paddingTop;
  const paddingBottom = computedStyle.paddingBottom;

  // --- 閉じるアニメーション ---
  const closingAnim = answer.animate(
    [
      {
        height: answer.offsetHeight + 'px',
        opacity: 1,
        marginTop: marginTop,
        marginBottom: marginBottom,
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
      },
      {
        height: 0,
        opacity: 0,
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
      },
    ],
    animTiming
  );

  closingAnim.onfinish = () => {
    el.removeAttribute('open');
  };
}
// 1122追加ここまで----------------------------------------------------



// 1122コメントアウト
// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll('.details').forEach(function (el) {
//     const summary = el.querySelector('.summary');
//     const answer = el.querySelector('.answer');

//     summary.addEventListener('click', (event) => {
//       // デフォルトの挙動を無効化
//       event.preventDefault();
// 1122コメントアウトここまで
// document.addEventListener('DOMContentLoaded', () => {const allAccordions = document.querySelectorAll('.accordion.details');allAccordions.forEach(function (el) {const summary = el.querySelector('.summary');

//       // 現在のスタイル（marginやpadding）を計算して取得
//       // これによりCSS側の変更に対応し、変な挙動を防ぎます
//       const computedStyle = getComputedStyle(answer);
//       const marginTop = computedStyle.marginTop;
//       const marginBottom = computedStyle.marginBottom;
//       const paddingTop = computedStyle.paddingTop;
//       const paddingBottom = computedStyle.paddingBottom;

//       // detailsのopen属性を判定
//       if (el.getAttribute('open') !== null) {
//         // --- 閉じるアニメーション ---
//         const closingAnim = answer.animate(
//           [
//             {
//               height: answer.offsetHeight + 'px',
//               opacity: 1,
//               marginTop: marginTop,
//               marginBottom: marginBottom,
//               paddingTop: paddingTop,
//               paddingBottom: paddingBottom,
//             },
//             {
//               height: 0,
//               opacity: 0,
//               marginTop: 0,
//               marginBottom: 0,
//               paddingTop: 0,
//               paddingBottom: 0,
//             },
//           ],
//           animTiming
//         );

//         closingAnim.onfinish = () => {
//           el.removeAttribute('open');
//         };
//       } else {
//         // --- 開くアニメーション ---
//         el.setAttribute('open', 'true');

//         // openを付けた直後の高さを取得
//         const fullHeight = answer.offsetHeight;

//         const openingAnim = answer.animate(
//           [
//             {
//               height: 0,
//               opacity: 0,
//               marginTop: 0,
//               marginBottom: 0,
//               paddingTop: 0,
//               paddingBottom: 0,
//             },
//             {
//               height: fullHeight + 'px',
//               opacity: 1,
//               marginTop: marginTop,
//               marginBottom: marginBottom,
//               paddingTop: paddingTop,
//               paddingBottom: paddingBottom,
//             },
//           ],
//           animTiming
//         );
//       }
//     });
//   });
// });
document.addEventListener('DOMContentLoaded', () => {
  // 変更点 A: すべてのアコーディオン要素を取得し、allAccordions変数に格納
  const allAccordions = document.querySelectorAll('.accordion.details');

  // 変更点 A: 取得したリストに対してループ処理
  allAccordions.forEach(function (el) {
    const summary = el.querySelector('.summary');
    const answer = el.querySelector('.answer');

    summary.addEventListener('click', (event) => {
      // デフォルトの挙動を無効化
      event.preventDefault();

      // ----------------------------------------------------
      // 変更点 B: 💡 シングルオープン制御: 他に開いているものを閉じる処理を追加
      // ----------------------------------------------------
      allAccordions.forEach(otherEl => {
        // クリックされた要素ではない かつ open属性がある場合
        if (otherEl !== el && otherEl.hasAttribute('open')) {
          const otherAnswer = otherEl.querySelector('.answer');
          closeAccordion(otherEl, otherAnswer); // 新規作成した関数で閉じる処理を実行
        }
      });
      // ----------------------------------------------------

      // 現在のスタイル（marginやpadding）を計算して取得
      // これによりCSS側の変更に対応し、変な挙動を防ぎます
      const computedStyle = getComputedStyle(answer);
      const marginTop = computedStyle.marginTop;
      const marginBottom = computedStyle.marginBottom;
      const paddingTop = computedStyle.paddingTop;
      const paddingBottom = computedStyle.paddingBottom;

      // detailsのopen属性を判定
      if (el.hasAttribute('open')) {
        // 変更点 C: 既存の閉じるアニメーションを関数呼び出しに置換
        // --- 閉じるアニメーション (現在の要素) ---
        closeAccordion(el, answer); 

      } else {
        // --- 開くアニメーション ---
        el.setAttribute('open', 'true');

        // openを付けた直後の高さを取得
        const fullHeight = answer.offsetHeight;

        const openingAnim = answer.animate(
          [
            {
              height: 0,
              opacity: 0,
              marginTop: 0,
              marginBottom: 0,
              paddingTop: 0,
              paddingBottom: 0,
            },
            {
              height: fullHeight + 'px',
              opacity: 1,
              marginTop: marginTop,
              marginBottom: marginBottom,
              paddingTop: paddingTop,
              paddingBottom: paddingBottom,
            },
          ],
          animTiming
        );
      }
    });
  });
});
