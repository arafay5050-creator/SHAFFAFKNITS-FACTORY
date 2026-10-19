(function(){
var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
var bar=document.querySelector(".bar"),prog=document.querySelector(".progress");
function onScroll(){
 var y=window.scrollY||0,h=document.documentElement.scrollHeight-window.innerHeight;
 if(bar)bar.classList.toggle("scrolled",y>20);
 if(prog&&!reduce)prog.style.transform="scaleX("+(h>0?Math.min(1,y/h):0)+")";
}
window.addEventListener("scroll",onScroll,{passive:true});onScroll();
if(reduce)return;

/* headline word-by-word entrance */
document.querySelectorAll(".hero h1,.ph h1").forEach(function(h){
 var t=h.textContent.trim().split(/\s+/);h.setAttribute("aria-label",t.join(" "));
 h.innerHTML=t.map(function(w,i){return '<span class="wd" aria-hidden="true" style="--i:'+i+'">'+w+'</span>'}).join(" ");
});

/* scroll reveal */
var targets=[];
function mark(sel,type,step){
 document.querySelectorAll(sel).forEach(function(el){
  if(el.hasAttribute("data-r"))return;
  if(el.closest(".carousel"))return;
  var sibs=Array.prototype.filter.call(el.parentNode.children,function(c){return c.matches(sel)});
  var i=sibs.indexOf(el);
  el.setAttribute("data-r",type);
  el.style.setProperty("--d",(Math.min(i,6)*(step||.09)).toFixed(2)+"s");
  targets.push(el);
 });
}
document.querySelectorAll(".split").forEach(function(s){
 var k=s.children;if(k[0]){k[0].setAttribute("data-r","l");targets.push(k[0])}
 if(k[1]){k[1].setAttribute("data-r","r");targets.push(k[1])}
});
mark(".sh","u");mark(".stats > div","z",.1);mark(".tile","u",.1);mark(".steps li","u",.12);
mark(".slot","z",.07);mark(".tl li","l",.14);mark(".pills li","z",.06);mark("details","u",.08);
mark(".form","u");mark(".cta .w","z");mark(".gal figure","z",.1);mark(".cert","z",.1);mark(".et","z",.12);mark(".need","z",.08);mark(".steps li","u",.12);mark(".quote","z");
document.querySelectorAll(".feature").forEach(function(s){var k=s.children;if(k[0]){k[0].setAttribute("data-r","l");targets.push(k[0])}if(k[1]){k[1].setAttribute("data-r","r");targets.push(k[1])}});mark(".contact .info .btn","u");

var tl=document.querySelector(".tl");
var io="IntersectionObserver" in window?new IntersectionObserver(function(es){
 es.forEach(function(e){
  if(!e.isIntersecting)return;
  var el=e.target;io.unobserve(el);
  el.classList.add("in");
  var d=parseFloat(el.style.getPropertyValue("--d"))||0;
  setTimeout(function(){el.removeAttribute("data-r");el.classList.remove("in");el.style.removeProperty("--d")},(0.8+d)*1000+100);
 });
},{threshold:.12,rootMargin:"0px 0px -6% 0px"}):null;
targets.forEach(function(el){io?io.observe(el):el.classList.add("in")});
if(tl){
 var io2="IntersectionObserver" in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){tl.classList.add("in");io2.disconnect()}})},{threshold:.2}):null;
 io2?io2.observe(tl):tl.classList.add("in");
}

/* needle bars grow when visible */
document.querySelectorAll(".needle-vis").forEach(function(n){
 if(!("IntersectionObserver" in window)){n.classList.add("go");return}
 var o=new IntersectionObserver(function(es){if(es[0].isIntersecting){n.classList.add("go");o.disconnect()}},{threshold:.4});o.observe(n);
});

/* count-up numbers */
document.querySelectorAll(".stats b").forEach(function(b){
 var m=b.textContent.match(/^(\d+)(.*)$/);if(!m)return;
 var end=+m[1],suf=m[2],final=b.textContent;
 b.setAttribute("aria-label",final);b.textContent="0"+suf;
 var started=false;
 var o=new IntersectionObserver(function(es){
  if(!es[0].isIntersecting||started)return;started=true;o.disconnect();
  var t0=null,dur=1500;
  function step(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);
   b.textContent=Math.round(end*e)+suf;if(p<1)requestAnimationFrame(step);else b.textContent=final}
  requestAnimationFrame(step);
 },{threshold:.6});
 o.observe(b);
});

/* tilt + parallax with a mouse */
if(window.matchMedia("(hover:hover) and (pointer:fine)").matches){
 document.querySelectorAll(".tile:not(.row)").forEach(function(t){
  t.addEventListener("pointermove",function(e){
   if(t.hasAttribute("data-r"))return;
   var r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
   t.style.transform="perspective(900px) rotateX("+(-y*6).toFixed(2)+"deg) rotateY("+(x*6).toFixed(2)+"deg) translateY(-4px)";
  });
  t.addEventListener("pointerleave",function(){t.style.transform=""});
 });
 var art=document.querySelector(".hero-art"),hero=document.querySelector(".hero");
 if(art&&hero){
  hero.addEventListener("pointermove",function(e){
   var r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
   art.style.transform="perspective(900px) rotateY("+(x*12).toFixed(2)+"deg) rotateX("+(-y*9).toFixed(2)+"deg)";
  });
  hero.addEventListener("pointerleave",function(){art.style.transform=""});
 }
}

/* product filter pop-in */
document.querySelectorAll(".chip").forEach(function(c){
 c.addEventListener("click",function(){
  setTimeout(function(){
   var n=0;
   document.querySelectorAll("#pg .prod:not([hidden])").forEach(function(el){
    el.animate([{opacity:0,transform:"translateY(20px) scale(.95)"},{opacity:1,transform:"none"}],{duration:450,delay:n++*60,easing:"cubic-bezier(.2,.7,.2,1)",fill:"backwards"});
   });
  },0);
 });
});
})();
