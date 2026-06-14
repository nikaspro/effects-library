(()=>{
  const root=document.documentElement;
  const pageEls=[...document.querySelectorAll('[data-page]')];
  const pageLinks=[...document.querySelectorAll('[data-page-link]')];
  const themeToggle=document.getElementById('themeToggle');
  const toast=document.getElementById('toast');
  let toastTimer;

  root.dataset.theme=localStorage.getItem('catalog-theme')||'dark';
  themeToggle.addEventListener('click',()=>{
    root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';
    localStorage.setItem('catalog-theme',root.dataset.theme);
  });

  function showPage(name,updateHash=true){
    const valid=name==='text'?'text':'hero';
    pageEls.forEach(page=>page.hidden=page.dataset.page!==valid);
    pageLinks.forEach(link=>link.classList.toggle('is-active',link.dataset.pageLink===valid));
    if(updateHash)history.replaceState(null,'','#'+valid);
    scrollTo({top:0,behavior:'instant'});
  }
  pageLinks.forEach(link=>link.addEventListener('click',e=>{
    e.preventDefault();
    showPage(link.dataset.pageLink);
  }));
  addEventListener('hashchange',()=>showPage(location.hash.slice(1),false));
  showPage(location.hash.slice(1),false);

  document.querySelectorAll('[data-letters]').forEach(el=>{
    const text=el.textContent;
    el.innerHTML=[...text].map((char,i)=>
      `<span class="letter-char anim-target" style="--i:${i}">${char===' '?'&nbsp;':char}</span>`
    ).join('');
  });
  document.querySelectorAll('[data-wave]').forEach(el=>{
    const text=el.textContent;
    el.innerHTML=[...text].map((char,i)=>
      `<span class="wave-char anim-target" style="--i:${i}">${char===' '?'&nbsp;':char}</span>`
    ).join('');
  });

  document.querySelectorAll('.text-card').forEach(card=>{
    card.addEventListener('mouseenter',()=>{
      card.classList.remove('is-playing');
      void card.offsetWidth;
      card.classList.add('is-playing');
    });
    card.addEventListener('mouseleave',()=>card.classList.remove('is-playing'));

    const copyEffect=async()=>{
      const value=card.dataset.copy;
      try{await navigator.clipboard.writeText(value)}
      catch{
        const ta=document.createElement('textarea');
        ta.value=value;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      toast.textContent='Скопировано: '+value;
      toast.classList.add('is-visible');
      clearTimeout(toastTimer);
      toastTimer=setTimeout(()=>toast.classList.remove('is-visible'),1600);
    };

    card.addEventListener('click',copyEffect);
    card.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){
        e.preventDefault();
        copyEffect();
      }
    });
  });

  document.querySelectorAll('.hero-card').forEach(card=>{
    const frame=card.querySelector('iframe');
    const url=card.dataset.demo;
    card.addEventListener('mouseenter',()=>{
      frame.src=url;
      card.classList.add('is-playing');
    });
    card.addEventListener('mouseleave',()=>{
      frame.src='about:blank';
      card.classList.remove('is-playing');
    });
    card.querySelector('.preview').addEventListener('click',()=>{
      open(url.replace('?preview=1',''),'_blank');
    });
  });
})();