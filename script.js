/* 오토지니 채용공고 - script.js */
document.addEventListener('DOMContentLoaded', function() {

  // 입력폼 데이터 전송
(function () {
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyKOewYN5TZFMK2Ge41HT9NRN5O00k35RMBE99937qiuXMwylspMD9TCd3Qk7ZvZumz/exec";

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("applyForm");

    if (!form) {
      console.warn("applyForm 폼을 찾을 수 없습니다.");
      return;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "접수 중...";
      }

      const formData = new FormData(form);
      formData.append("pageUrl", location.href);

      const bodyData = new URLSearchParams();

      for (const pair of formData.entries()) {
        bodyData.append(pair[0], pair[1]);
      }

      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: bodyData.toString()
      })
      .then(function () {
        alert("지원서가 정상적으로 접수되었습니다.");
        form.reset();
      })
      .catch(function () {
        alert("접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "지원서 접수하기";
        }
      });
    });
  });
})();


  // 스크롤 애니메이션
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
        var s = Array.from(e.target.parentNode.children).filter(function(c) { return c.style && c.style.opacity === '0'; });
        var idx = s.indexOf(e.target);
        setTimeout(function() {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }, Math.max(0, idx) * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(function(el) { io.observe(el); });

});

