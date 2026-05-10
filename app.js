const data = window.SCHOOL_DATA;
const state = { level: '本科', sort: 'rank', chips: new Set(), selected: new Set() };
const $ = (id) => document.getElementById(id);
const fmtMoney = (n) => `$${Math.round(n/1000)}k`;
const fmtQs = (n) => n >= 1000 ? '1000+' : `#${n}`;
const colorPairs = [['#153b5b','#a9d6e5'],['#174f3c','#b7d48b'],['#4d2b6a','#f2b880'],['#2d4a2f','#d9c17b'],['#183a69','#79b8ff']];

function init() {
  $('updatedAt').textContent = `更新：${window.SOURCE_POLICY?.updated || '2026-05'}`;
  if ($('sourcePolicy') && window.SOURCE_POLICY) $('sourcePolicy').textContent = `${window.SOURCE_POLICY.note} 核验：${window.SOURCE_POLICY.federal}；${window.SOURCE_POLICY.official}。`;
  const majors = ['全部专业', ...new Set(data.flatMap(s => s.majors))].sort((a,b)=> a==='全部专业'?-1:b==='全部专业'?1:a.localeCompare(b,'zh'));
  const cityTypes = ['全部城市', ...new Set(data.map(s => s.cityType))];
  const types = ['全部属性', ...new Set(data.map(s => s.type))];
  fillSelect('majorFilter', majors); fillSelect('cityFilter', cityTypes); fillSelect('typeFilter', types);
  ['majorFilter','cityFilter','typeFilter','fitFilter','gpaInput','budgetInput'].forEach(id => $(id).addEventListener('input', render));
  document.querySelectorAll('.toggle button').forEach(btn => btn.addEventListener('click', () => {state.level=btn.dataset.level; document.querySelectorAll('.toggle button').forEach(b=>b.classList.toggle('active', b===btn)); render();}));
  document.querySelectorAll('[data-sort]').forEach(btn => btn.addEventListener('click', () => {state.sort=btn.dataset.sort; render();}));
  $('resetBtn').addEventListener('click', reset);
  $('compareBtn').addEventListener('click', renderCompare);
  $('closeDialog').addEventListener('click', () => $('detailDialog').close());
  renderChips(); render();
}
function fillSelect(id, items){ $(id).innerHTML = items.map(x=>`<option value="${x}">${x}</option>`).join(''); }
function renderChips(){
  const chips = ['高排名','CS强','工程强','商业强','金融强','医学强','传媒强','公共政策强','公立旗舰','私立','核心经济圈','科技湾区','大城市','大学城','阳光海岸'];
  $('quickChips').innerHTML = chips.map(c=>`<button class="chip" data-chip="${c}">${c}</button>`).join('');
  document.querySelectorAll('[data-chip]').forEach(btn => btn.addEventListener('click', () => { state.chips.has(btn.dataset.chip) ? state.chips.delete(btn.dataset.chip) : state.chips.add(btn.dataset.chip); btn.classList.toggle('active'); render(); }));
}
function filtered(){
  const major = $('majorFilter').value, city = $('cityFilter').value, type = $('typeFilter').value, fit = $('fitFilter').value;
  const budget = +$('budgetInput').value; $('budgetLabel').textContent = fmtMoney(budget);
  return data.filter(s => s.level.includes(state.level))
    .filter(s => major==='全部专业' || s.majors.includes(major))
    .filter(s => city==='全部城市' || s.cityType===city)
    .filter(s => type==='全部属性' || s.type===type)
    .filter(s => fit==='全部' || s.fit===fit)
    .filter(s => (state.level==='本科'?s.costUG:s.costGrad) <= budget)
    .filter(s => [...state.chips].every(c => s.tags.includes(c)))
    .sort((a,b) => state.sort==='cost' ? (state.level==='本科'?a.costUG-b.costUG:a.costGrad-b.costGrad) : state.sort==='admit' ? ((state.level==='本科'?b.admitUG:b.admitGrad)-(state.level==='本科'?a.admitUG:a.admitGrad)) : a.usNews-b.usNews);
}
function render(){
  $('levelTitle').textContent = state.level;
  const rows = filtered();
  $('statCount').textContent = `${rows.length} 所`;
  $('statMinCost').textContent = rows.length ? fmtMoney(Math.min(...rows.map(s=>state.level==='本科'?s.costUG:s.costGrad))) + '/年' : '—';
  $('statAvgRate').textContent = rows.length ? Math.round(rows.reduce((sum,s)=>sum+(state.level==='本科'?s.admitUG:s.admitGrad),0)/rows.length) + '%' : '—';
  $('statBestRank').textContent = rows.length ? `#${Math.min(...rows.map(s=>s.usNews))}` : '—';
  $('cards').innerHTML = rows.map(card).join('') || '<div class="box"><h3>没有匹配学校</h3><p>请放宽预算、专业或标签条件。</p></div>';
  document.querySelectorAll('[data-open]').forEach(btn => btn.addEventListener('click', () => openDetail(btn.dataset.open)));
  document.querySelectorAll('[data-select]').forEach(btn => btn.addEventListener('click', () => { const id=btn.dataset.select; state.selected.has(id)?state.selected.delete(id):state.selected.add(id); render(); }));
  renderCompare(false);
}
function card(s, i){
  const [c1,c2] = colorPairs[i%colorPairs.length];
  const cost = state.level==='本科'?s.costUG:s.costGrad, admit = state.level==='本科'?s.admitUG:s.admitGrad;
  const selected = state.selected.has(s.id);
  return `<article class="card"><div class="city-art" style="--c1:${c1};--c2:${c2}"><span class="badge">US #${s.usNews} · QS ${fmtQs(s.qs)}</span><button class="select-school" data-select="${s.id}">${selected?'已选 ✓':'对比 +'}</button></div><div class="body"><div class="title"><h3>${s.name}<span>${s.zh}</span></h3><span class="pill">${s.type} · ${s.city.split(',')[0]}</span></div><p class="meta">${state.level} · ${s.city} · ${s.cityType}</p><div class="grid"><div class="metric"><small>录取率</small><strong class="red">${admit}%</strong></div><div class="metric"><small>总预算/年</small><strong>${fmtMoney(cost)}</strong></div><div class="metric"><small>诺奖</small><strong>${s.nobel} 位</strong></div><div class="metric"><small>强势专业</small><strong>${s.majors.slice(0,2).join(' / ')}</strong></div><div class="metric"><small>GPA参考</small><strong>${s.gpa}</strong></div><div class="metric"><small>定位</small><strong>${s.fit}</strong></div></div><div class="tagrow">${s.tags.slice(0,4).map(t=>`<span class="tag">${t}</span>`).join('')}</div><div class="route">官方强口径：${s.route}</div></div><button class="expand" data-open="${s.id}">展开学校详细信息 <span>+</span></button></article>`;
}
function openDetail(id){
  const s = data.find(x=>x.id===id), cost = state.level==='本科'?s.costUG:s.costGrad, admit = state.level==='本科'?s.admitUG:s.admitGrad;
  const gpa = parseFloat($('gpaInput').value);
  const gpaNote = Number.isFinite(gpa) ? (gpa >= parseFloat(s.gpa) ? 'GPA 达到/超过参考区间下沿，重点拉开科研、竞赛、文书差异。' : 'GPA 低于参考区间下沿，建议用高难度课程、排名、科研/实习和推荐信补强。') : '输入 GPA 后可获得个性化判断。';
  $('dialogContent').innerHTML = `<section class="detail"><h2>${s.name} · ${s.zh}</h2><p class="meta">${state.level} · ${s.type} · ${s.city} · ${s.cityType}</p><div class="detail-grid"><div class="box"><h3>申请画像与录取权重</h3><div class="bars">${bar('课程难度',95,'hard')}${bar('GPA',88,'')}${bar('标化/语言',state.level==='本科'?75:82,'')}${bar('文书/PS',92,'hard')}${bar('推荐信',86,'')}${bar('科研/实习',state.level==='本科'?70:94,'hard')}${bar('面试/作品集',s.majors.includes('艺术')||s.majors.includes('影视传媒')?90:55,'')}</div><p><strong>GPA判断：</strong>${gpaNote}</p><p><strong>申请建议：</strong>${s.fit}校；若大陆普高/国际高中申请本科，建议把 ${s.majors.slice(0,3).join('、')} 相关课程、竞赛、科研或作品集中做出一条清晰主线。硕士申请则优先匹配项目先修课、量化/编程能力、科研或实习成果。</p></div><div class="box"><h3>学校与城市画像</h3><p><strong>强势专业：</strong>${s.strengths}</p><p><strong>城市样子：</strong>${s.vibe}</p><p><strong>费用：</strong>${fmtMoney(cost)}/年，通常包括学费、住宿餐饮、保险、书本和个人开销的估算；不等于拿到奖学金后的净价。</p><p><strong>排名：</strong>U.S. News National Universities #${s.usNews}；QS World University Rankings ${fmtQs(s.qs)}。</p><p><strong>诺奖：</strong>${s.nobel} 位（学校口径/关联口径可能不同，申请时建议以学校官方 Nobel 页面复核）。</p></div></div><div class="box sources"><h3>数据来源与口径</h3><p>${s.source}</p><p class="source-links"><a href="${s.sourceLinks.scorecard}" target="_blank" rel="noopener">College Scorecard</a><a href="${s.sourceLinks.usNews}" target="_blank" rel="noopener">U.S. News</a><a href="${s.sourceLinks.qs}" target="_blank" rel="noopener">QS</a><a href="${s.sourceLinks.official}" target="_blank" rel="noopener">学校官网检索</a></p><p>提示：录取率、费用、排名每年变化。本工具用于初筛和沟通，不替代学校官网、项目官网和 Common Data Set 的最终核验。</p></div></section>`;
  $('detailDialog').showModal();
}
function bar(label,val,klass){ return `<p><span>${label}</span><span class="bar ${klass}"><i style="width:${val}%"></i></span><em>${val>=90?'非常重要':val>=75?'重要':'参考'}</em></p>`; }
function renderCompare(show=true){
  const rows = [...state.selected].map(id => data.find(s=>s.id===id)).filter(Boolean);
  const el = $('compareBar');
  if (!rows.length || !show) { el.classList.toggle('hidden', !rows.length); if(!rows.length) el.innerHTML=''; return; }
  el.classList.remove('hidden');
  el.innerHTML = `<h3>对比清单（${rows.length}/最多建议 5 所）</h3><table class="compare-table"><thead><tr><th>学校</th><th>US/QS</th><th>费用</th><th>录取率</th><th>城市</th><th>强势专业</th></tr></thead><tbody>${rows.map(s=>`<tr><td>${s.zh}</td><td>#${s.usNews} / ${fmtQs(s.qs)}</td><td>${fmtMoney(state.level==='本科'?s.costUG:s.costGrad)}</td><td>${state.level==='本科'?s.admitUG:s.admitGrad}%</td><td>${s.city}</td><td>${s.majors.slice(0,3).join('、')}</td></tr>`).join('')}</tbody></table>`;
}
function reset(){ state.chips.clear(); state.selected.clear(); state.sort='rank'; ['majorFilter','cityFilter','typeFilter','fitFilter'].forEach(id=>$(id).selectedIndex=0); $('gpaInput').value=''; $('budgetInput').value=90000; document.querySelectorAll('[data-chip]').forEach(b=>b.classList.remove('active')); render(); }
init();
