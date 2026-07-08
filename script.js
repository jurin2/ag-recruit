/* 오토지니 채용공고 - script.js */
document.addEventListener('DOMContentLoaded', function() {

  /* =========================================================
     이력서 / 지원서 접수 폼 전송
     - 화면은 빠르게 접수 완료 처리
     - Apps Script 전송은 백그라운드 진행
  ========================================================= */
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyiMES_mdI1rGSWIZJcI24h69HP1dlRxuEx5UM6BjOxSke9nKi0UW_j7hQqpwy7uZrH/exec";

  const form = document.getElementById("applyForm");

  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

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

      /*
        Apps Script의 e.parameter로 안정적으로 받기 위해
        FormData를 URLSearchParams 방식으로 변환
      */
      const bodyData = new URLSearchParams();

      for (const pair of formData.entries()) {
        bodyData.append(pair[0], pair[1]);
      }

      /*
        실제 전송은 백그라운드로 실행
        no-cors 방식이라 브라우저에서 성공/실패 응답을 정확히 읽지는 않음
      */
      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: bodyData.toString()
      }).catch(function(error) {
        console.error("[오토지니 지원폼] fetch 오류:", error);
      });

      /*
        사용자 화면은 즉시 접수 완료로 변경
      */
      form.innerHTML =
        '<div style="text-align:center;padding:40px 0">' +
          '<div style="font-size:48px;margin-bottom:16px">✅</div>' +
          '<div style="font-size:20px;font-weight:900;color:#111;margin-bottom:8px">지원서가 접수되었습니다!</div>' +
          '<div style="font-size:14px;color:#999;line-height:1.7">제출해주신 내용 검토 후, 서류 합격자에 한해 개별 연락드리겠습니다.</div>' +
        '</div>';
    });
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
