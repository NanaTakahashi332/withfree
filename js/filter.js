// works filter (Vanilla JS)
// HTMLの<nav class="works_list_button"> と <li class="work" data-cat="..."> に対応

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("#works_list .works_list_button");
  const buttons = nav?.querySelectorAll("button[data-filter]") || [];
  const items = document.querySelectorAll("#works_list .works_list_site .work");

  if (!nav || items.length === 0) return;

  const applyFilter = (filter) => {
    items.forEach((item) => {
      const cat = item.dataset.cat || "";
      const show = filter === "all" || cat === filter;

      // display:none 相当（CSSを書かずに済む）
      item.hidden = !show;
      // もし「display:none」にこだわるなら下の2行を使ってください
      // item.style.display = show ? "" : "none";
    });

    // ボタンのアクティブ表現（必要ならCSSで .is-active を作る）
    buttons.forEach((b) =>
      b.classList.toggle("is-active", b.dataset.filter === filter)
    );
  };

  // 初期状態：all
  applyFilter("all");

  // クリックはイベント委譲で処理
  nav.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-filter]");
    if (!btn) return;
    applyFilter(btn.dataset.filter);
  });
});
