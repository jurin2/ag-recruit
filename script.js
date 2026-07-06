function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.af-submit');
  btn.textContent = '제출 중...';
  btn.disabled = true;

  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  })
    .then(r => {
      if (r.ok) {
        form.innerHTML = `
          <div style="text-align:center;padding:40px 0">
            <div style="font-size:48px;margin-bottom:16px">✅</div>
            <div style="font-size:20px;font-weight:900;color:#111;margin-bottom:8px">지원서가 접수되었습니다!</div>
            <div style="font-size:14px;color:#999;line-height:1.7">
              영업일 기준 1~2일 내 담당자가 연락드립니다.<br>문의: 1600-3481
            </div>
          </div>`;
      } else {
        btn.textContent = '제출 실패 — 다시 시도해주세요';
        btn.disabled = false;
      }
    })
    .catch(() => {
      btn.textContent = '제출 실패 — 다시 시도해주세요';
      btn.disabled = false;
    });
}
