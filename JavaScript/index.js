    // Header shrink
    const header=document.getElementById("header");
    if(header){window.addEventListener("scroll",()=>{window.scrollY>50?header.classList.add("scrolled"):header.classList.remove("scrolled")})}

    // Tahun footer
    const yearEl=document.getElementById("year"); if(yearEl) yearEl.textContent=new Date().getFullYear();

    // Back to Top
    const toTop=document.getElementById("toTop");
    if(toTop){window.addEventListener("scroll",()=>{window.scrollY>400?toTop.classList.add("show"):toTop.classList.remove("show")});toTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));}

    // Slider: auto-rotate 5s
    const slides=[...document.querySelectorAll(".slide")];
    const dots=[...document.querySelectorAll(".dot")];
    let idx=0; let timer=null; const INTERVAL=5000;
    function show(i){slides.forEach((s,k)=>s.classList.toggle("active",k===i));dots.forEach((d,k)=>d.classList.toggle("active",k===i));idx=i;}
    function next(){show((idx+1)%slides.length);} function start(){stop();timer=setInterval(next,INTERVAL);} function stop(){if(timer){clearInterval(timer);timer=null;}}
    dots.forEach((d,k)=>d.addEventListener("click",()=>{show(k);start();}));
    slides.forEach(s=>{const url=(s.style.backgroundImage||"").slice(5,-2);if(url){const img=new Image();img.src=url;}});
    start();

    // "Layanan Kami" → scroll ke #tentang
    document.querySelectorAll('a[href="#tentang"]').forEach(a=>{
      a.addEventListener("click",(e)=>{const t=document.querySelector("#tentang"); if(t){e.preventDefault();t.scrollIntoView({behavior:"smooth"});}});
    });

    // Modal WhatsApp
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
    
    // header Mobile
    const menuBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav');

  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  // Tutup menu saat salah satu tautan diklik
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });