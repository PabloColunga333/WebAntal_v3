const menu=document.querySelector('.menu'),navigation=document.getElementById('navigation'),solutions=document.querySelector('.solutions-toggle'),panel=document.getElementById('solutions-panel');
function closeSolutions(restore=false){solutions?.setAttribute('aria-expanded','false');if(panel)panel.hidden=true;if(restore)solutions?.focus()}
function closeNavigation(restore=false){menu?.setAttribute('aria-expanded','false');navigation?.classList.remove('open');closeSolutions();if(restore)menu?.focus()}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);if(!open)closeSolutions()});
solutions?.addEventListener('click',()=>{const open=solutions.getAttribute('aria-expanded')!=='true';solutions.setAttribute('aria-expanded',String(open));panel.hidden=!open});
solutions?.addEventListener('keydown',event=>{if(event.key==='ArrowDown'){event.preventDefault();solutions.setAttribute('aria-expanded','true');panel.hidden=false;panel.querySelector('a').focus()}});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(solutions?.getAttribute('aria-expanded')==='true'){closeSolutions(true)}else if(menu?.getAttribute('aria-expanded')==='true'){closeNavigation(true)}}});
document.addEventListener('click',event=>{if(!event.target.closest('.nav-solutions'))closeSolutions();if(!event.target.closest('.header-v5'))closeNavigation()});
document.querySelector('.nav-solutions')?.addEventListener('focusout',event=>{if(!event.currentTarget.contains(event.relatedTarget))closeSolutions()});
navigation?.addEventListener('click',event=>{if(event.target.closest('a'))closeNavigation()});
matchMedia('(min-width:1001px)').addEventListener('change',()=>closeNavigation());
const form = document.getElementById('contact-form');
if (form) {
  form.querySelector('button[type="submit"]').disabled=false;
  const interest = new URLSearchParams(location.search).get('interes');
  if ([...form.elements.interes.options].some(option => option.value === interest)) form.elements.interes.value = interest;
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const body = `Hola, equipo de Antal M:\n\nMe interesa: ${values.get('interes')}\nNombre: ${values.get('nombre')}\nEmpresa: ${values.get('empresa')}\nCorreo: ${values.get('correo')}\nTeléfono: ${values.get('telefono') || 'No proporcionado'}\n\n${values.get('mensaje')}`;
    const mailto = `mailto:ventas@antalm.com.mx?subject=${encodeURIComponent('Solicitud: '+values.get('interes'))}&body=${encodeURIComponent(body)}`;
    location.href = mailto;
    document.getElementById('form-status').textContent = 'Solicitud preparada. Si no se abrió tu aplicación de correo, escribe a ventas@antalm.com.mx. El mensaje aún debe enviarse desde tu correo.';
  });
}
// Continuous decorative motion pauses on hover/focus and respects system motion preferences.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
 const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('reveal'); observer.unobserve(entry.target); } });
 }, {threshold:0.08});
 document.querySelectorAll('.section-heading, .visual-cards .solution, .partner-copy, .feature-row, .predictive-cases article, .steps article, .cta').forEach(element => observer.observe(element));
}
// V3: accessible conceptual motion and editorial interactions.
document.querySelectorAll('.blog-filters button').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.blog-filters button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));let count=0;document.querySelectorAll('[data-article-category]').forEach(a=>{a.hidden=button.dataset.category!=='Todos'&&a.dataset.articleCategory!==button.dataset.category;if(!a.hidden)count++});document.querySelector('.filter-status').textContent=count+' '+(count===1?'artículo':'artículos');}));
const toc=document.querySelector('.article-toc');if(toc){document.querySelectorAll('.article-body h2').forEach((heading,i)=>{heading.id='seccion-'+(i+1);const a=document.createElement('a');a.href='#'+heading.id;a.textContent=heading.textContent;toc.append(a)});if(!toc.children.length)toc.parentElement.querySelector('.eyebrow').textContent='MANUFACTURA / ANTAL M';const bar=document.querySelector('.reading-progress');let queued=false;function progress(){const range=document.documentElement.scrollHeight-innerHeight;bar.style.width=(range>0?Math.min(100,scrollY/range*100):100)+'%';queued=false}addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(progress)}},{passive:true});progress();}
// Short, once-only motion for the four detailed corporate pages.
if (/^route-(aps|mes|calidad|nosotros)$/.test(document.body.className) && !reducedMotion.matches && 'IntersectionObserver' in window) {
 document.body.classList.add('motion-enabled');
 const visualSections = document.querySelectorAll('.product-editorial,.operating-model,.readiness-grid,.capability-grid,.quality-modules,.mes-flow,.enterprise-story,.enterprise-partner,.project-stages,.industry-layout,.purpose-grid,.value-row');
 const sectionObserver = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('entered');sectionObserver.unobserve(entry.target)}}),{threshold:.08});
 visualSections.forEach(section=>{section.classList.add('motion-section');sectionObserver.observe(section)});
 reducedMotion.addEventListener('change',event=>{if(event.matches){document.body.classList.remove('motion-enabled');sectionObserver.disconnect()}});
}
// Published impact figures: accessible final values remain readable without JavaScript.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
 const counters = new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  counters.unobserve(entry.target);
  const node=entry.target.querySelector('[data-counter]');
  const target=Number(node.dataset.counter); const start=performance.now();
  entry.target.classList.add('impact-entered');
  const tick=now=>{const t=Math.min(1,(now-start)/1300);node.textContent=String(Math.round(target*(1-Math.pow(1-t,3))));if(t<1&&!reducedMotion.matches)requestAnimationFrame(tick);else node.textContent=String(target)};
  requestAnimationFrame(tick);
 }),{threshold:.35});
 document.querySelectorAll('.impact-card').forEach(card=>counters.observe(card));
 reducedMotion.addEventListener('change',event=>{if(event.matches){counters.disconnect();document.querySelectorAll('[data-counter]').forEach(node=>node.textContent=node.dataset.counter)}});
}
// Local notice preference only. No cookies, trackers or optional scripts are enabled.
(()=>{
 const panel=document.getElementById('cookie-notice'); if(!panel)return;
 const key='antalm-cookie-notice-v1';const status=panel.querySelector('.cookie-status');const reset=panel.querySelector('[data-cookie-reset]');let trigger=null;
 const read=()=>{try{return localStorage.getItem(key)==='accepted'}catch{return false}};
 const open=(focus=false)=>{panel.hidden=false;reset.hidden=!read();status.textContent='';if(focus)panel.querySelector('h2').focus()};
 if(!read())open();
 document.querySelectorAll('[data-cookie-open]').forEach(button=>button.addEventListener('click',()=>{trigger=button;open(true)}));
 panel.querySelector('[data-cookie-accept]').addEventListener('click',()=>{try{localStorage.setItem(key,'accepted')}catch{}panel.hidden=true;if(trigger){trigger.focus();trigger=null}});
 reset.addEventListener('click',()=>{try{localStorage.removeItem(key);status.textContent='Preferencia restablecida. El aviso volverá a aparecer mientras no lo aceptes.'}catch{status.textContent='El navegador no permite modificar el almacenamiento. El sitio sigue funcionando.'}reset.hidden=true;panel.querySelector('[data-cookie-accept]').focus()});
})();
