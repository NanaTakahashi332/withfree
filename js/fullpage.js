// window.addEventListener("load", () => {
//   const container = document.querySelector("#fv");
//   if (!container) return;

//   const sections = Array.from(
//     container.querySelectorAll(".fv-hero, .fv_area_2, .fv_area_3, .fv_area_4, .fv_area_5, .fv_area_6")
//   );

//   let lock = false;
//   const LOCK_MS = 650; // スクロールアニメ時間に合わせて調整

//   function getCurrentIndex() {
//     const y = container.scrollTop;
//     // 最も近いセクションを現在位置とする
//     let best = 0;
//     let bestDist = Infinity;
//     sections.forEach((sec, i) => {
//       const dist = Math.abs(sec.offsetTop - y);
//       if (dist < bestDist) {
//         bestDist = dist;
//         best = i;
//       }
//     });
//     return best;
//   }

//   container.addEventListener(
//     "wheel",
//     (e) => {
//       // Ctrl+wheel(ズーム)は邪魔しない
//       if (e.ctrlKey) return;

//       e.preventDefault(); // ←これが無いと “勢い” が混ざる
//       if (lock) return;

//       const dir = e.deltaY > 0 ? 1 : -1;
//       const current = getCurrentIndex();
//       let next = Math.max(0, Math.min(sections.length - 1, current + dir));

//       if (next === current) return;

//       lock = true;
//       sections[next].scrollIntoView({ behavior: "smooth", block: "start" });

//       window.setTimeout(() => {
//         lock = false;
//       }, LOCK_MS);
//     },
//     { passive: false }
//   );
// });

window.addEventListener("load", () => {
  const container = document.querySelector("#fv");
  if (!container) return;

  const sections = Array.from(
    container.querySelectorAll(
      ".fv-hero, .fv_area_2, .fv_area_3, .fv_area_4, .fv_area_5, .fv_area_6"
    )
  );
  if (sections.length === 0) return;

  // 現在のセクションIndex（スクロール中に毎回計算しない）
  let activeIndex = 0;

  // wheelの合算（トラックパッドのブレ対策）
  let wheelSum = 0;
  let wheelTimer = null;

  // 連続入力ロック
  let lock = false;
  const LOCK_MS = 700;

  // どのセクションが表示されてるかを安定して更新（root=#fv）
  const io = new IntersectionObserver(
    (entries) => {
      // 一番見えているものを activeIndex にする
      let best = null;
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
      }
      if (best) {
        const idx = sections.indexOf(best.target);
        if (idx >= 0) activeIndex = idx;
      }
    },
    {
      root: container,
      threshold: [0.55, 0.6, 0.65, 0.7],
    }
  );

  sections.forEach((s) => io.observe(s));

  function scrollToIndex(next) {
    next = Math.max(0, Math.min(sections.length - 1, next));
    if (next === activeIndex) return;

    lock = true;
    sections[next].scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(() => {
      lock = false;
    }, LOCK_MS);
  }

  container.addEventListener(
    "wheel",
    (e) => {
      if (e.ctrlKey) return;

      e.preventDefault();
      if (lock) return;

      wheelSum += e.deltaY;

      if (wheelTimer) clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        wheelSum = 0;
      }, 120);

      // 小さな揺れは無視する
      const TH = 60; 
      if (Math.abs(wheelSum) < TH) return;

      const dir = wheelSum > 0 ? 1 : -1;
      wheelSum = 0; // 1回発火したらクリア

      scrollToIndex(activeIndex + dir);
    },
    { passive: false }
  );
});