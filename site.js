
(function(){
var nav=document.getElementById("nav"),mb=document.getElementById("mb");
if(mb){mb.addEventListener("click",function(){var o=nav.classList.toggle("open");mb.setAttribute("aria-expanded",o?"true":"false");mb.setAttribute("aria-label",o?"Close menu":"Open menu")})}
/* collection carousel */
var car=document.getElementById("car");
if(car){document.querySelectorAll(".cbtn").forEach(function(b){b.addEventListener("click",function(){car.scrollBy({left:(+b.dataset.dir)*320,behavior:"smooth"})})})}
/* product filter */
var pg=document.getElementById("pg");
if(pg){
 var chips=document.querySelectorAll(".chip"),none=document.getElementById("none");
 function show(f){var n=0;pg.querySelectorAll(".prod").forEach(function(c){var ok=f==="all"||c.dataset.cat===f;c.hidden=!ok;if(ok)n++});
  chips.forEach(function(b){var on=b.dataset.f===f;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on?"true":"false")});none.hidden=n>0}
 chips.forEach(function(b){b.addEventListener("click",function(){show(b.dataset.f);try{history.replaceState(null,"","#"+b.dataset.f)}catch(e){}})});
 var h=(location.hash||"").slice(1);if(h&&document.querySelector('.chip[data-f="'+h+'"]'))show(h);
}
/* enquiry form: email or WhatsApp */
var f=document.getElementById("qf");
if(f){
 function body(){var d=new FormData(f);return {d:d,t:"Name: "+d.get("n")+"\nCompany: "+d.get("c")+"\nCountry: "+d.get("k")+"\nEmail: "+d.get("e")+"\nSock style: "+d.get("p")+"\nEstimated quantity: "+d.get("q")+"\n\nIdea: "+d.get("m")}}
 f.addEventListener("submit",function(x){x.preventDefault();var o=body(),err=document.getElementById("err");
  var ok=o.d.get("n").trim()&&/^\S+@\S+\.\S+$/.test(o.d.get("e").trim());err.hidden=!!ok;if(!ok)return;
  location.href="mailto:qadeer@shaffaf.org?subject="+encodeURIComponent("Quotation request - "+o.d.get("p"))+"&body="+encodeURIComponent(o.t)});
 var wa=document.getElementById("wa");
 if(wa){wa.addEventListener("click",function(){var o=body();window.open("https://wa.me/923008463763?text="+encodeURIComponent("Hello Shaffaf Knits, I would like to discuss an enquiry.\n\n"+o.t),"_blank","noopener")})}
}
})();
