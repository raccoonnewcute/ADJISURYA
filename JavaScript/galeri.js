    // Header shrink
    const header=document.getElementById("header");
    if(header){window.addEventListener("scroll",()=>{window.scrollY>50?header.classList.add("scrolled"):header.classList.remove("scrolled")})}

    // Tahun footer
    const yearEl=document.getElementById("year"); if(yearEl) yearEl.textContent=new Date().getFullYear();

    // Back to Top
    const toTop=document.getElementById("toTop");
    if(toTop){window.addEventListener("scroll",()=>{window.scrollY>400?toTop.classList.add("show"):toTop.classList.remove("show")});toTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));}

    // ===== Modal Logic =====
    const WA_NUMBER = "6285226974905";
    const openOrderBtns = document.querySelectorAll(".open-order, .buy-btn");
    const modal = document.getElementById("orderModal");
    const closeBtn = document.getElementById("orderClose");
    const backBtn = document.getElementById("orderBack");
    const sendBtn = document.getElementById("orderSend");
    const nama = document.getElementById("nama");
    const alamat = document.getElementById("alamat");
    const deskripsi = document.getElementById("deskripsi");

    function openModal(){ modal.classList.add("show"); document.body.style.overflow="hidden"; }
    function closeModal(){ modal.classList.remove("show"); document.body.style.overflow=""; }

    openOrderBtns.forEach(btn=>btn.addEventListener("click", openModal));
    closeBtn.addEventListener("click", closeModal);
    backBtn.addEventListener("click", closeModal);
    modal.addEventListener("click",(e)=>{ if(e.target===modal) closeModal(); });

    sendBtn.addEventListener("click", ()=>{
      const base = `https://wa.me/${WA_NUMBER}`;
      const namaV = (nama.value||"").trim();
      const alamatV = (alamat.value||"").trim();
      const deskV = (deskripsi.value||"").trim();

      let url = base;
      if(namaV && alamatV && deskV){
        const text = `Permisi, nama saya ${namaV} dengan alamat ${alamatV}, ${deskV}.`;
        url = `${base}?text=${encodeURIComponent(text)}`;
      }
      window.open(url, "_blank");
      closeModal();
    });

    // ================== GALERI SCRIPT ==================
    const cards = [...document.querySelectorAll('#gallery .card')];
    const fImg = document.getElementById('featuredImg');
    const fTitle = document.getElementById('featuredTitle');
    const fDesc = document.getElementById('featuredDesc');
    const btnShowFeatured = document.getElementById('btnShowFeatured');
    const btnReroll = document.getElementById('btnReroll');
    let featuredIndex = 0;

    function pickFeatured(){
      if(!cards.length) return;
      featuredIndex = Math.floor(Math.random()*cards.length);
      const c = cards[featuredIndex];
      fImg.src = c.dataset.full || c.querySelector('img').src;
      fImg.alt = c.dataset.title || c.querySelector('.cap')?.textContent || 'Produk';
      fTitle.textContent = c.dataset.title || c.querySelector('.cap')?.textContent || 'Produk';
      fDesc.textContent = c.dataset.desc || '—';
    }
    btnReroll?.addEventListener('click', pickFeatured);
    btnShowFeatured?.addEventListener('click', ()=> openDetail(featuredIndex));

    // Modal detail
    const dlg = document.getElementById('productDetail');
    const pdClose = document.getElementById('pdClose');
    const pdMain = document.getElementById('pdMain');
    const pdT1 = document.getElementById('pdT1');
    const pdT2 = document.getElementById('pdT2');
    const pdT3 = document.getElementById('pdT3');
    const pdTitle = document.getElementById('pdTitle');
    const pdTitle2 = document.getElementById('pdTitle2');
    const pdDesc = document.getElementById('pdDesc');
    const pdPrev = document.getElementById('pdPrev');
    const pdNext = document.getElementById('pdNext');
    let current = 0;

    function openDetail(index){
      if(!cards.length) return;
      current = (index + cards.length) % cards.length;
      const c = cards[current];

      const title = c.dataset.title || c.querySelector('.cap')?.textContent || 'Produk';
      const desc = c.dataset.desc || '—';
      const g1 = c.dataset.g1 || c.dataset.full || c.querySelector('img').src;
      const g2 = c.dataset.g2 || c.dataset.full || c.querySelector('img').src;
      const g3 = c.dataset.g3 || c.dataset.full || c.querySelector('img').src;

      pdTitle.textContent = 'Detail: ' + title;
      pdTitle2.textContent = title;
      pdDesc.textContent = desc;

      pdMain.src = g1;
      pdT1.src = g1; pdT2.src = g2; pdT3.src = g3;
      [pdT1, pdT2, pdT3].forEach((img)=>{ img.onclick = ()=>{ pdMain.src = img.src; }; });

      if(typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open','');
    }

    pdClose.addEventListener('click', ()=> dlg.close());
    dlg.addEventListener('click', (e)=>{
      const rect = dlg.querySelector('.pd-body').getBoundingClientRect();
      if(e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom){
        dlg.close();
      }
    });
    pdNext.addEventListener('click', ()=> openDetail(current+1));
    pdPrev.addEventListener('click', ()=> openDetail(current-1));
    cards.forEach((c,i)=> c.addEventListener('click', ()=> openDetail(i)));

    // Init galeri
    window.addEventListener('load', pickFeatured);

    // ================== SMOOTH SCROLL ==================
    // Anchor ke bagian index.html jika sedang di index.html
    const sections = ['tentang','layanan','produk'];
    sections.forEach(id=>{
      document.querySelectorAll(`a[href$="#${id}"]`).forEach(a=>{
        a.addEventListener('click', (e)=>{
          const inIndex = location.pathname.endsWith('index.html') || location.pathname === '/' || location.pathname === '';
          const target = document.getElementById(id);
          if(inIndex && target){
            e.preventDefault();
            target.scrollIntoView({behavior:'smooth'});
          }
        });
      });
    });

    // Kontak di header → scroll ke footer halaman ini
    document.querySelectorAll('a[href="#footer"]').forEach(a=>{
      a.addEventListener('click', (e)=>{
        const footer = document.getElementById('footer');
        if(footer){
          e.preventDefault();
          footer.scrollIntoView({behavior:'smooth'});
        }
      });
    });
    // === BUKA DETAIL OTOMATIS JIKA ADA PARAMETER ?foto= ===
const params = new URLSearchParams(window.location.search);
const fotoParam = params.get("foto");
if (fotoParam && cards.length) {
  const targetIndex = cards.findIndex(c =>
    c.dataset.full?.includes(fotoParam) ||
    c.querySelector('img').src.includes(fotoParam)
  );
  if (targetIndex >= 0) {
    setTimeout(() => openDetail(targetIndex), 400);
  }
}
 const menuBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav');

  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  // Tutup menu saat salah satu tautan diklik
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });