(function(){
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  toggle.addEventListener('click', function(){
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      links.classList.remove('open');
    });
  });

  // header shadow on scroll
  var header = document.querySelector('header');
  window.addEventListener('scroll', function(){
    if(window.scrollY > 10){
      header.style.boxShadow = '0 8px 24px rgba(0,0,0,0.25)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  // scroll reveal for cards
  var revealTargets = document.querySelectorAll('.stat-card, .benefit-card, .job-card, .loc-card, .loc-map-box');
  revealTargets.forEach(function(el){
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
  });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  revealTargets.forEach(function(el){ io.observe(el); });
})();
