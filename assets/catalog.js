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

  const favoritesKey='valera-text-favorites';
  const textGrid=document.querySelector('#textPage .grid');
  let favorites=[];
  try{favorites=JSON.parse(localStorage.getItem(favoritesKey)||'[]')}
  catch{favorites=[]}

  const textCards=[...document.querySelectorAll('#textPage .text-card')];

  function renderFavorites(){
    if(!textGrid)return;
    const favoriteCards=favorites
      .map(name=>textCards.find(card=>card.dataset.copy===name))
      .filter(Boolean);
    const regularCards=textCards.filter(card=>!favorites.includes(card.dataset.copy));

    [...favoriteCards,...regularCards].forEach(card=>textGrid.appendChild(card));

    textCards.forEach(card=>{
      const active=favorites.includes(card.dataset.copy);
      const button=card.querySelector('.favorite-toggle');
      card.classList.toggle('is-favorite',active);
      if(button){
        button.classList.toggle('is-favorite',active);
        button.setAttribute('aria-pressed',String(active));
        button.setAttribute('aria-label',`${active?'Убрать':'Добавить'} ${card.dataset.copy} ${active?'из':'в'} избранное`);
        button.title=active?'Убрать из избранного':'Добавить в избранное';
      }
    });
  }

  textCards.forEach(card=>{
    const button=card.querySelector('.favorite-toggle');
    if(!button)return;
    button.addEventListener('click',event=>{
      event.stopPropagation();
      const name=card.dataset.copy;
      if(favorites.includes(name)){
        favorites=favorites.filter(item=>item!==name);
      }else{
        favorites.push(name);
      }
      localStorage.setItem(favoritesKey,JSON.stringify(favorites));
      renderFavorites();
    });
  });

  renderFavorites();

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
      if(e.target.closest('.favorite-toggle'))return;
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