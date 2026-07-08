console.log("script.js 연결됨");

/* 오토지니 채용공고 - script.js */
document.addEventListener('DOMContentLoaded', function() {

  console.log("[오토지니 지원폼] script.js 로드됨");

  /* =========================================================
     이력서 / 지원서 접수 폼 전송
  ========================================================= */
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyiMES_mdI1rGSWIZJcI24h69HP1dlRxuEx5UM6BjOxSke9nKi0UW_j7hQqpwy7uZrH/exec";

  const form = document.getElementById("applyForm");

  console.log("[오토지니 지원폼] form:", form);

  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      console.log("[오토지니 지원폼] submit 감지됨");

      const submitBtn =
        form.querySelector('button[type="submit"]') ||
        form.querySelector('.af-submit');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "접수 중...";
      }

      const formData = new FormData(form);
      formData.append("접수페이지", location.href);
      formData.append("접수시간", new Date().toLocaleString("ko-KR"));

      for (const pair of formData.entries()) {
        console.log("[오토지니 지원폼] 전송값:", pair[0], pair[1]);
      }

      console.log("[오토지니 지원폼] fetch 시작:", GOOGLE_SCRIPT_URL);

      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData
      })
      .then(function() {
        console.log("[오토지니 지원폼] fetch 완료");

        form.innerHTML =
          '<div style="text-align:center;padding:40px 0">' +
            '<div style="font-size:48px;margin-bottom:16px">✅</div>' +
            '<div style="font-size:20px;font-weight:900;color:#111;margin-bottom:8px">지원서가 접수되었습니다!</div>' +
            '<div style="font-size:14px;color:#999;line-height:1.7">영업일 기준 1~2일 내 담당자가 연락드립니다.<br>문의: 1600-3481</div>' +
          '</div>';
      })
      .catch(function(error) {
        console.error("[오토지니 지원폼] fetch 오류:", error);

        alert("접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "지원서 접수하기";
        }
      });
    });
  } else {
    console.warn("[오토지니 지원폼] applyForm 폼을 찾을 수 없습니다.");
  }


  /* =========================================================
     스크롤 애니메이션
  ========================================================= */
  var sel = '.sec-label,.sec-title,.sec-desc,.why-card,.ben-card,.job-sec,.sidebar,.hero-sub,.hero-title,.hero-quote,.cta-t,.cta-d,.cta-btn,.cta-c,.ideal-row,.why-n,.why-t,.why-d,.jl li,.ins-chip,.proc-s,.s-card,.foot-logo,.foot-info,.about-top,.chart-wrap,.chart-bubble';
  var els = Array.from(document.querySelectorAll(sel));

  if (!els.length) return;

  els.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.55s ease,transform 0.55s ease';
  });

  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        var s = Array.from(e.target.parentNode.children).filter(function(c) {
          return c.style && c.style.opacity === '0';
        });

        var idx = s.indexOf(e.target);

        setTimeout(function() {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }, Math.max(0, idx) * 80);

        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  els.forEach(function(el) {
    io.observe(el);
  });

});
