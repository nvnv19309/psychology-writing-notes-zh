
(function(){
const $=s=>document.querySelector(s), all=s=>[...document.querySelectorAll(s)];
const rail=$('.rail'), panel=$('.search-panel'), input=$('#search-input'), results=$('.results');
$('.menu').onclick=()=>rail.classList.toggle('open');
all('.nav-link').forEach(a=>a.onclick=()=>rail.classList.remove('open'));
let saved=18;try{saved=+(localStorage.getItem('reader-font')||18)}catch(e){}document.documentElement.style.setProperty('--size',saved+'px');
all('[data-size]').forEach(b=>b.onclick=()=>{let x=parseInt(getComputedStyle(document.documentElement).getPropertyValue('--size'))+(b.dataset.size==='up'?1:-1);x=Math.max(15,Math.min(23,x));document.documentElement.style.setProperty('--size',x+'px');try{localStorage.setItem('reader-font',x)}catch(e){}});
function openSearch(){panel.classList.add('open');input.focus();input.select()}
function closeSearch(){panel.classList.remove('open')}
$('.search-open').onclick=openSearch;$('.search-close').onclick=closeSearch;
panel.onclick=e=>{if(e.target===panel)closeSearch()};
function escape(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
input.oninput=()=>{const q=input.value.trim().toLocaleLowerCase();if(!q){results.innerHTML='<p class="hint">输入关键词，搜索全书正文。</p>';return}
let found=[];for(const item of window.SEARCH_INDEX||[]){const lower=item.text.toLocaleLowerCase();let pos=lower.indexOf(q);if(pos>=0){let start=Math.max(0,pos-65),end=Math.min(item.text.length,pos+q.length+100);found.push({item,snippet:item.text.slice(start,end)})}}
results.innerHTML=found.length?found.map(x=>`<a class="result" href="${x.item.url}?q=${encodeURIComponent(q)}"><strong>${escape(x.item.title)}</strong><small>…${escape(x.snippet)}…</small></a>`).join(''):'<p class="hint">未找到匹配内容。</p>'};
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();openSearch()}if(e.key==='Escape'){closeSearch();$('#lightbox').classList.remove('open')}});
const light=$('#lightbox');all('.source-images img').forEach(img=>img.onclick=()=>{light.querySelector('img').src=img.src;light.classList.add('open')});light.onclick=()=>light.classList.remove('open');
const q=new URLSearchParams(location.search).get('q');if(q){const walk=document.createTreeWalker($('.page'),NodeFilter.SHOW_TEXT);while(walk.nextNode()){if(walk.currentNode.textContent.toLocaleLowerCase().includes(q.toLocaleLowerCase())){walk.currentNode.parentElement.scrollIntoView({block:'center'});break}}}
})();
