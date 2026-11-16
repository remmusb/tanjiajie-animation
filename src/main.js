// 《叹家姐》动画小片 — 播放引擎
// 场景：dur=秒；subs=[出现秒, 文本, 标志]；flag: 'd'=对白(楷体浮现) 'v'=歌诗(逐字)
// card=集名卡（ep=集号, name=集名对句）

const scenes = [
  { id: 'sc-title', dur: 12, subs: [
    [1.0, '海水连天，天连水。'],
    [4.2, '疍家人祖祖辈辈，生在船上，死在浪里。'],
    [7.6, '这是四代女人，和一艘船的故事。'],
  ]},
  { id: 'ep1', card: 1, ep: '第一集', name: '莫道辛烈皆过口，蚀骨方知痛生鳞', dur: 5, subs: [] },
  { id: 'sc-paris', dur: 16, subs: [
    [0.8, '巴黎，老佛爷，珠宝柜台后。我在本子上涂着小漫画。'],
    [5.0, '电话响了。是妈妈。'],
    [8.6, '“外婆被那条船吃了。”', 'd'],
    [12.2, '飞机、高铁、大巴，我赶回了那座闷热的海滨小城。'],
  ]},
  { id: 'sc-raid', dur: 18, subs: [
    [0.8, '1944年，防空警报划过城市上空。'],
    [4.6, '五岁的淑珍坐在树上。'],
    [6.6, '“不怕，飞机还没来呢。”', 'd'],
    [9.8, '父亲把一句口信压进她的小手：明晚子时落大潮，地角码头接货。'],
    [13.8, '港口桅杆如林。一个疍家女钻出水面——'],
    [15.8, '“跟我来！”', 'd'],
  ]},
  { id: 'sc-stele', dur: 14, subs: [
    [0.8, '1945年，抗战胜利纪念碑亭落成。'],
    [5.0, '邓公拉着七岁的淑珍，在碑亭前合影。'],
    [9.2, '“淑珍，你也是撑起这座碑亭的一颗小石子。”', 'd'],
  ]},
  { id: 'ep2', card: 1, ep: '第二集', name: '一纸决绝辞旧骨，愿凭辛温获重生', dur: 5, subs: [] },
  { id: 'sc-sister', dur: 22, subs: [
    [0.8, '十七岁的家姐淑仪，拿下了全市女子百米亚军。'],
    [5.0, '那件运动短裤，换来一顿藤条，和一间锁死的柴房。'],
    [9.4, '高烧、昏迷。大夫到时，一切都太迟了。'],
    [13.4, '那是淑珍第一次触到人的遗体。'],
    [16.8, '她忽然明白了家姐想当医生的原因——'],
    [19.2, '“能救人呀。”', 'd'],
  ]},
  { id: 'sc-boat', dur: 18, subs: [
    [0.8, '深夜，月娥倒出樟木盒里全部的首饰。'],
    [4.6, '一纸离婚契书，换回一艘旧木船。'],
    [8.6, '“家姐，往后这里就是我们新家了。”', 'd'],
    [12.4, '她用锅底灰调了油，在船头写下三个字——'],
    [15.2, '淑 仪 号', 'v'],
  ]},
  { id: 'sc-typhoon', dur: 16, subs: [
    [0.8, '“鱼起水，台风嘴。”', 'd'],
    [4.4, '贪兜沙钻鱼的淑珍，直直撞进了台风嘴。'],
    [8.4, '浪头几乎把船拍散。是大眼鸡他们把她拖回了内港。'],
    [12.6, '那一夜，母女俩相拥缩在船舱里，身下垫着潮湿的草席。'],
  ]},
  { id: 'sc-song', dur: 26, subs: [
    [0.8, '药嫲说，傍晚上甲板唱的那支歌，叫「叹家姐」。'],
    [5.2, '“妹仔多是家姐带大的，同睡一舱，同补一网。”', 'd'],
    [10.0, '“家姐一旦出嫁、被卖、落海、病死……妹仔也就成了家姐。”', 'd'],
    [14.6, '一尾青丝两处分，姐先跌落暗潮深。', 'v'],
    [19.4, '莫怪阿妹泪眼涩，哭姐即是哭自身。', 'v'],
  ]},
  { id: 'ep3', card: 1, ep: '第三集', name: '苦燥入髓拔疠毒，一线灰开见故人', dur: 5, subs: [] },
  { id: 'sc-hospital', dur: 20, subs: [
    [0.8, '1956年，麻风病院里，淑珍重逢了当年被指婚卖掉的秀胧。'],
    [5.4, '一锅海榄树皮煮的药水，拔出了病人疮底的腐毒。'],
    [10.0, '石灰警戒线那头，李泰抛来医书和鱼干。'],
    [14.6, '“原想着能常碰面，谁知只能隔着石灰粉当牛郎织女。”', 'd'],
  ]},
  { id: 'ep4', card: 1, ep: '第四集', name: '以苦坚阴心相印，稚女盲行搅暗涡', dur: 5, subs: [] },
  { id: 'sc-wedding', dur: 16, subs: [
    [0.8, '一纸结婚批准报告折成纸飞机，落在退潮的滩涂上。'],
    [5.0, '疍家水上婚礼。淑仪号挂了红，唱起了叹家姐。'],
    [9.4, '“你要是不后悔——就再捞我一次。”', 'd'],
    [13.0, '这句话，外婆记了一辈子，也捞了一辈子。'],
  ]},
  { id: 'ep5', card: 1, ep: '第五集', name: '酸收固脱争生死，万顷狂澜不渡人', dur: 5, subs: [] },
  { id: 'sc-farewell', dur: 22, subs: [
    [0.8, '1966年。淑珍把宝螺小鲸鱼，悄悄套进秀胧的衣领。'],
    [5.2, '药嫲的小船载着秀胧一家，融进了夜色。'],
    [9.6, '清晨拖回来的船，船身全是弹孔。'],
    [13.6, '那一夜，淑珍咬着毛巾，自己为自己接生。'],
    [18.0, '外婆这一生，再没能当面同秀胧道别。'],
  ]},
  { id: 'ep6', card: 1, ep: '第六集', name: '酸甘化阴滋寸草，双及微茫念故魂', dur: 5, subs: [] },
  { id: 'sc-1977', dur: 16, subs: [
    [0.8, '1977年，恢复高考。'],
    [4.8, '母女俩同进考场，一盏灯熬了两代人。'],
    [9.4, '忠桦考上省城；淑珍从医士，考成了医师。'],
    [12.6, '“我只想她们手里，都握着实打实的本事。”', 'd'],
  ]},
  { id: 'ep7', card: 1, ep: '第七集', name: '暗绾双丝葺旧艇，甘缓培元笃始生', dur: 5, subs: [] },
  { id: 'sc-repair', dur: 16, subs: [
    [0.8, '1986年，公社解体，淑仪号卸下了医疗船的重任。'],
    [5.2, '台风把船身砸出大窟窿。姐妹们凑钱大修，索性扩建。'],
    [10.0, '淑珍站在船头，用油漆重新题上三个字——'],
    [13.2, '淑 仪 号', 'v'],
  ]},
  { id: 'ep8', card: 1, ep: '第八集', name: '天风一遇姤成契，甘润回潮久相逢', dur: 5, subs: [] },
  { id: 'sc-reunion', dur: 16, subs: [
    [0.8, '九十年代中，秀胧从美国回来了。'],
    [5.0, '当年出发的那片滩涂，早已埋在水泥堤坝底下。'],
    [9.6, '直到她看见码头边那艘新修整的淑仪号——'],
    [12.6, '眼睛才重新亮了起来。'],
  ]},
  { id: 'ep9', card: 1, ep: '第九集', name: '咸走重澜化沉疴，契归劫后调船头', dur: 5, subs: [] },
  { id: 'sc-1993', dur: 14, subs: [
    [0.8, '1993年，忠桦欠债十一万五。'],
    [4.6, '“只要我不死，就把钱赚回来。”', 'd'],
    [8.8, '老妈没说话，拿着淑仪号的船契去了信用社。'],
  ]},
  { id: 'sc-1997', dur: 14, subs: [
    [0.8, '1997年7月1日夜，李泰穿着旧军装，看完了香港回归直播。'],
    [6.2, '一周后，他在家中辞世。'],
    [9.8, '淑珍没有哭，只是常常放空。'],
  ]},
  { id: 'sc-1998', dur: 16, subs: [
    [0.8, '1998年，除夕。'],
    [3.8, '“今天，十一万五——彻底结清！”', 'd'],
    [8.2, '欠条烧成灰。盖着红戳的船契，轻轻推回淑珍手里。'],
    [12.2, '“这不就是你当年说的——调转船头的底气么？”', 'd'],
  ]},
  { id: 'ep10', card: 1, ep: '第十集', name: '咸润通溟归化境，长风自引破浪刀', dur: 5, subs: [] },
  { id: 'sc-eye', dur: 26, subs: [
    [0.8, '多年以后，我在台风的中心，又见到了外婆。'],
    [5.2, '“再大的船，硬顶着浪头都要散架。滑进风眼里，才有活路。”', 'd'],
    [10.4, '她把那枚宝螺鲸鱼，戴上了我的脖子。'],
    [14.4, '“顺风顺水啊，武岳。”', 'd'],
    [18.2, '舵轮忽然转得动了。这一次，是我自己在开船。'],
    [22.0, '“把船当成游走在台风肋骨间的手术刀。”', 'd'],
  ]},
  { id: 'sc-finale', dur: 26, subs: [
    [0.8, '外婆手机里那个“老伴”，是大洋彼岸的秀胧。'],
    [5.2, '“我唱支叹家姐给你听，等唱完呢，可能就到啦……”', 'd'],
    [10.4, '海水连天天连水，家姐过洋探路行。', 'v'],
    [14.8, '潮退潮升皆是客，暂借他乡作故乡。', 'v'],
    [19.0, '姐啊莫怕夜色重，循着月影就归家。', 'v'],
  ]},
];

// ---------- DOM -------
const $ = s => document.querySelector(s);
const stage = $('#stage'), sub = $('#subtitle'), dlg = $('#dialogue'), bar = $('#bar'), timeEl = $('#time'), dotsEl = $('#dots');
const btnPlay = $('#btn-play'), btnPrev = $('#btn-prev'), btnNext = $('#btn-next'), btnMute = $('#btn-mute');
const overlay = $('#start-overlay');

// 集名卡 section 由 JS 生成，插到颗粒层之前
scenes.filter(s => s.card).forEach(s => {
  const el = document.createElement('section');
  el.className = 'scene epcard'; el.id = s.id;
  const [l1, l2] = s.name.split('，');
  el.innerHTML = `<div class="epno">${s.ep}</div><div class="epname"><span>${l1}</span>${l2 ? `<span>${l2}</span>` : ''}</div>`;
  stage.insertBefore(el, stage.querySelector('.grain'));
});
const ICO_PLAY = '<path d="M7 4l14 8-14 8z"/>', ICO_PAUSE = '<path d="M6 4h4v16H6zM14 4h4v16h-4z"/>';
const ICO_VOL = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z"/>';
const ICO_MUTE = '<path d="M3 9v6h4l5 5V4L7 9H3zm14.6 3l2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4z"/>';

// ---------- 时间轴 -------
const starts = []; let total = 0;
scenes.forEach(s => { starts.push(total); total += s.dur; });
let pos = 0, playing = false, lastTs = 0, curIdx = -1, curSubKey = '';
let ended = false;

scenes.forEach((s, i) => {
  const d = document.createElement('i');
  d.title = `第${i + 1}幕`;
  d.setAttribute('role', 'button'); d.setAttribute('tabindex', '0');
  d.setAttribute('aria-label', `跳到第${i + 1}幕`);
  const go = () => seek(starts[i] + 0.01);
  d.addEventListener('click', go);
  d.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
  dotsEl.appendChild(d);
});
const dots = [...dotsEl.children];

function fmt(t) { t = Math.max(0, Math.round(t)); return String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0'); }

// 对白长句：在靠近中部的标点处换行
function dlgBreak(text) {
  const chars = [...text];
  if (chars.length <= 14) return text;
  const mid = chars.length / 2;
  let best = -1, bd = 1e9;
  chars.forEach((c, i) => {
    if ('，。；：'.includes(c) && i > 2 && i < chars.length - 2) {
      const d = Math.abs(i - mid);
      if (d < bd) { bd = d; best = i; }
    }
  });
  if (best < 0) return text;
  return chars.slice(0, best + 1).join('') + '<br>' + chars.slice(best + 1).join('');
}

function activate(idx) {
  document.querySelectorAll('.scene').forEach(el => {
    el.classList.remove('active'); void el.offsetWidth; // 重置 CSS 动画
  });
  document.getElementById(scenes[idx].id).classList.add('active');
  dots.forEach((d, i) => d.classList.toggle('on', i === idx));
  setSceneAudio(scenes[idx].id);
  curIdx = idx; curSubKey = '__none__'; sub.classList.remove('show'); dlg.classList.remove('show');
}

function render() {
  let idx = 0;
  for (let i = 0; i < starts.length; i++) { if (pos >= starts[i]) idx = i; }
  if (idx !== curIdx) activate(idx);
  const sc = scenes[idx], t = pos - starts[idx];
  let text = '', flag = '', win = 4;
  for (let i = 0; i < sc.subs.length; i++) {
    const [at, txt, f] = sc.subs[i];
    if (t >= at) { text = txt; flag = f || ''; win = (i + 1 < sc.subs.length ? sc.subs[i + 1][0] : sc.dur) - at; }
    else break;
  }
  const key = idx + '|' + text;
  if (key !== curSubKey) {
    curSubKey = key;
    sub.classList.remove('show'); dlg.classList.remove('show');
    if (text) {
      if (flag === 'v') {
        // 歌诗：逐字浮现（卡拉OK式）
        const chars = [...text];
        const step = Math.min(0.17, (win * 0.5) / chars.length);
        sub.innerHTML = '<span class="verse">' + chars.map((c, i) =>
          `<i style="animation-delay:${(i * step).toFixed(2)}s">${c === ' ' ? '&nbsp;' : c}</i>`).join('') + '</span>';
        sub.classList.add('show');
      } else if (flag === 'd') {
        // 对白：楷体浮现于画面上方，长句在中部标点换行
        dlg.innerHTML = dlgBreak(text);
        dlg.classList.add('show');
      } else {
        // 叙述：底部宋体
        sub.textContent = text;
        sub.classList.add('show');
      }
    }
  }
  bar.style.width = (pos / total * 100) + '%';
  timeEl.textContent = fmt(pos) + ' / ' + fmt(total);
}

function tick(ts) {
  if (!playing) return;
  const dt = Math.min(0.1, (ts - lastTs) / 1000); lastTs = ts;
  pos += dt;
  if (pos >= total) { pos = total; pause(); ended = true; render(); return; }
  render();
  requestAnimationFrame(tick);
}

function play() {
  if (ended && pos >= total) { pos = 0; ended = false; activate(0); }
  playing = true; lastTs = performance.now();
  btnPlay.innerHTML = '<svg viewBox="0 0 24 24">' + ICO_PAUSE + '</svg>'; btnPlay.setAttribute('aria-label', '暂停');
  if (audioOn && curIdx >= 0) setSceneAudio(scenes[curIdx].id);
  requestAnimationFrame(tick);
}
function pause() {
  playing = false;
  btnPlay.innerHTML = '<svg viewBox="0 0 24 24">' + ICO_PLAY + '</svg>'; btnPlay.setAttribute('aria-label', '播放');
  pauseAllAudio();
}
function seek(p) {
  pos = Math.min(Math.max(0, p), total - 0.01); ended = false;
  curIdx = -1; render();
  if (!playing) play();
}

btnPlay.addEventListener('click', () => playing ? pause() : play());
btnPrev.addEventListener('click', () => seek(starts[Math.max(0, curIdx - 1)] + 0.01));
btnNext.addEventListener('click', () => seek(curIdx < scenes.length - 1 ? starts[curIdx + 1] + 0.01 : total - 0.01));
$('#progress').addEventListener('click', e => {
  const r = $('#progress').getBoundingClientRect();
  seek((e.clientX - r.left) / r.width * total);
});
document.addEventListener('keydown', e => {
  if (e.target.closest('button') || e.target.closest('.dots')) return;
  if (e.code === 'Space') { e.preventDefault(); playing ? pause() : play(); }
  if (e.key === 'ArrowRight') btnNext.click();
  if (e.key === 'ArrowLeft') btnPrev.click();
});

// ---------- 声音引擎 -------
// 模型：所有循环音在点击「开始放映」的用户手势里一次性创建并播放（音量0），
// 之后换幕只调整各条音轨的目标音量，由渐变器平滑逼近——不再新建 Audio 元素，
// 规避浏览器自动播放限制导致的“只有第一幕有声”。
const AU = 'assets/audio/';
const LOOPS = ['sea', 'sing_a', 'sing_b', 'sing_c', 'sing_d', 'siren', 'thunder', 'wedding', 'tvmur', 'phonering'];
// 每幕：v={音轨:目标音量}；fx=[秒, 音轨, 音量, 持续秒(循环型音效可省=一次性)]
const SCENE_AUDIO = {
  'sc-title':    { v: { sea: .5,  sing_a: .45 } },
  'ep1':         { v: { sea: .35, sing_a: .3 } },
  'sc-paris':    { v: { sea: .12, sing_d: .35, tvmur: .3 }, fx: [[1.2, 'phonering', .5, 6.0]] },
  'sc-raid':     { v: { sea: .15, sing_d: .25, siren: .26 } },
  'sc-stele':    { v: { sea: .3,  sing_a: .38 }, fx: [[5.2, 'shutter', .5]] },
  'ep2':         { v: { sea: .3,  sing_d: .3 } },
  'sc-sister':   { v: { sea: .18, sing_d: .5 } },
  'sc-boat':     { v: { sea: .5,  sing_a: .4 } },
  'sc-typhoon':  { v: { sea: .3,  sing_d: .28, thunder: .55 } },
  'sc-song':     { v: { sea: .28, sing_b: .85 } },
  'ep3':         { v: { sea: .25, sing_a: .3 } },
  'sc-hospital': { v: { sea: .18, sing_a: .38 } },
  'ep4':         { v: { sea: .3,  sing_a: .3 } },
  'sc-wedding':  { v: { sea: .32, sing_a: .18, wedding: .45 } },
  'ep5':         { v: { sea: .3,  sing_d: .35 } },
  'sc-farewell': { v: { sea: .28, sing_d: .5 }, fx: [[13.2, 'baby', .4]] },
  'ep6':         { v: { sea: .25, sing_a: .35 } },
  'sc-1977':     { v: { sea: .18, sing_a: .42 } },
  'ep7':         { v: { sea: .3,  sing_a: .3 } },
  'sc-repair':   { v: { sea: .35, sing_a: .4 } },
  'ep8':         { v: { sea: .3,  sing_b: .35 } },
  'sc-reunion':  { v: { sea: .35, sing_b: .45 } },
  'ep9':         { v: { sea: .25, sing_d: .3 } },
  'sc-1993':     { v: { sea: .2,  sing_d: .35 } },
  'sc-1997':     { v: { sea: .15, sing_d: .28, tvmur: .5 } },
  'sc-1998':     { v: { sea: .25, sing_a: .4, tvmur: .3 } },
  'ep10':        { v: { sea: .35, sing_c: .4 } },
  'sc-eye':      { v: { sea: .32, sing_c: .7, thunder: .3 } },
  'sc-finale':   { v: { sea: .38, sing_b: .75 }, fx: [[0.6, 'phonering', .35, 4.0]] },
};
let muted = false, audioOn = false;
const loops = {};      // name -> {el, cur, target}
let fxTimers = [];

function startAudio() {
  if (audioOn) return; audioOn = true;
  LOOPS.forEach(n => {
    const a = new Audio(AU + n + '.wav');
    a.loop = true; a.preload = 'auto'; a.volume = 0;
    a.play().catch(() => {});
    loops[n] = { el: a, cur: 0, target: 0 };
  });
  // 全局渐变器：音量向目标指数平滑
  setInterval(() => {
    Object.values(loops).forEach(o => {
      const d = o.target - o.cur;
      o.cur = Math.abs(d) < 0.005 ? o.target : o.cur + d * 0.07;
      const v = muted ? 0 : Math.min(1, Math.max(0, o.cur));
      if (Math.abs(o.el.volume - v) > 0.004) o.el.volume = v;
      if (o.target === 0 && o.cur < 0.01 && !o.el.paused) o.el.pause();
      else if (o.target > 0 && o.el.paused && !muted) o.el.play().catch(() => {});
    });
  }, 100);
}

// 一次性/限时音效：循环型音轨用 target 临时提起，到时落下；其余直接播放
function playFx(name, vol, dur) {
  if (!audioOn || muted) return;
  const o = loops[name];
  if (o) {
    o.target = vol;
    if (dur) fxTimers.push(setTimeout(() => { o.target = 0; }, dur * 1000));
  } else {
    const a = new Audio(AU + name + '.wav');
    a.volume = muted ? 0 : vol;
    a.play().catch(() => {});
  }
}

function setSceneAudio(id) {
  if (!audioOn) return;
  fxTimers.forEach(clearTimeout); fxTimers = [];
  const cfg = SCENE_AUDIO[id]; if (!cfg) return;   // 无配置幕保持现状
  Object.keys(loops).forEach(n => { loops[n].target = cfg.v[n] || 0; });
  (cfg.fx || []).forEach(([at, name, vol, dur]) => {
    fxTimers.push(setTimeout(() => playFx(name, vol, dur), at * 1000));
  });
}

function pauseAllAudio() {
  Object.values(loops).forEach(o => o.el.pause());
  fxTimers.forEach(clearTimeout); fxTimers = [];
}
btnMute.addEventListener('click', () => {
  muted = !muted;
  btnMute.innerHTML = '<svg viewBox="0 0 24 24">' + (muted ? ICO_MUTE : ICO_VOL) + '</svg>';
  if (muted) pauseAllAudio();
  else if (playing && curIdx >= 0) {
    Object.values(loops).forEach(o => { if (o.target > 0) o.el.play().catch(() => {}); });
    setSceneAudio(scenes[curIdx].id);
  }
});

// ---------- 开播 -------
window.addEventListener('error', e => {
  let el = document.getElementById('errlog');
  if (!el) { el = document.createElement('div'); el.id = 'errlog'; el.style.display = 'none'; document.body.appendChild(el); }
  el.textContent += '[ERR] ' + e.message + ' ; ';
});

$('#btn-start').addEventListener('click', () => {
  startAudio();     // 在用户手势里一次性创建并启动全部循环音轨
  overlay.classList.add('hide');
  pos = 0; ended = false; activate(0); play();
});

// ?auto=1&t=秒 ：无音频自动播放（用于自检验证）
const qp = new URLSearchParams(location.search);
if (qp.has('auto')) {
  document.documentElement.classList.add('shot');
  overlay.style.display = 'none';
  pos = Math.min(parseFloat(qp.get('t')) || 0, total - 0.01);
  curIdx = -1; render(); play();
}
render();
