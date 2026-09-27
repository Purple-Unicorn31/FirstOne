const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const loader=$(".loader");
window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("done"),650));

const sections=$$(".chapter"), no=$("#chapterNo"), name=$("#chapterName"), bar=$(".progress span");
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      no.textContent=e.target.dataset.no;
      name.textContent=e.target.dataset.chapter;
      e.target.querySelectorAll(".reveal").forEach(x=>x.classList.add("in"));
    }
  });
},{threshold:.35});
sections.forEach(s=>observer.observe(s));

const progress=()=>{const max=document.documentElement.scrollHeight-innerHeight;bar.style.height=(max?scrollY/max*100:0)+"%";
  $$(".parallax").forEach((el,i)=>{const r=el.getBoundingClientRect(), offset=(innerHeight/2-r.top)/innerHeight*18; const img=el.querySelector("img"); if(img && !matchMedia("(prefers-reduced-motion: reduce)").matches) img.style.transform=`scale(1.08) translateY(${offset}px)`;});
};
addEventListener("scroll",progress,{passive:true}); progress();

const dlg=$("#familyDialog");
$("#openLetter").addEventListener("click",()=>dlg.showModal());
$("#closeDialog").addEventListener("click",()=>dlg.close());
dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});

const sound=$(".sound-toggle");
sound.addEventListener("click",()=>{
  const on=sound.getAttribute("aria-pressed")==="true";
  sound.setAttribute("aria-pressed",String(!on));
  sound.innerHTML=`SOUND <b>${on?"OFF":"ON"}</b>`;
  // No audio asset is shipped: the control is intentionally non-intrusive.
});
