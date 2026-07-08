/* 오토지니 채용공고 - script.js */
document.addEventListener('DOMContentLoaded', function() {

  // 폼 제출
  window.handleSubmit = function(e) {
    e.preventDefault();
    var form = e.target, btn = form.querySelector('.af-submit');
    btn.textContent = '제출 중...'; btn.disabled = true;
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
      .then(function(r) {
        if (r.ok) { form.innerHTML = '<div style="text-align:center;padding:40px 0"><div style="font-size:48px;margin-bottom:16px">✅</div><div style="font-size:20px;font-weight:900;color:#111;margin-bottom:8px">지원서가 접수되었습니다!</div><div style="font-size:14px;color:#999;line-height:1.7">영업일 기준 1~2일 내 담당자가 연락드립니다.<br>문의: 1600-3481</div></div>'; }
        else { btn.textContent = '제출 실패'; btn.disabled = false; }
      }).catch(function() { btn.textContent = '제출 실패'; btn.disabled = false; });
  };

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