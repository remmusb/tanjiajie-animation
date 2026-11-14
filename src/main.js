// 《叹家姐》动画小片 — 播放引擎
// 场景数据：dur=秒, mood=声音氛围, subs=[出现秒, 文本, 是否歌诗体]

const scenes = [
  { id: 'sc-title', dur: 12, mood: 'calm', subs: [
    [1.0, '海水连天，天连水。'],
    [4.2, '疍家人祖祖辈辈，生在船上，死在浪里。'],
    [7.6, '这是四代女人，和一艘船的故事。'],
  ]},
  { id: 'sc-paris', dur: 16, mood: 'night', subs: [
    [0.8, '巴黎，老佛爷，珠宝柜台后。我在本子上涂着小漫画。'],
    [4.6, '电话响了。是妈妈。'],
    [7.6, '——“外婆被那条船吃了。”'],
    [11.2, '飞机、高铁、大巴，我赶回了那座闷热的海滨小城。'],
  ]},
  { id: 'sc-raid', dur: 18, mood: 'tense', subs: [
    [0.8, '1944年，防空警报划过城市上空。'],
    [4.2, '五岁的淑珍坐在树上：“不怕，飞机还没来呢。”'],
    [8.0, '父亲把一句口信压进她的小手：明晚子时落大潮，地角码头接货。'],
    [12.4, '港口桅杆如林。一个疍家女钻出水面：“跟我来！”'],
  ]},
  { id: 'sc-stele', dur: 14, mood: 'warm', subs: [
    [0.8, '1945年，抗战胜利纪念碑亭落成。'],
    [4.4, '邓公拉着七岁的淑珍，在碑亭前合影。'],
    [8.2, '“淑珍，你也是撑起这座碑亭的一颗小石子。”'],
  ]},
  { id: 'sc-sister', dur: 22, mood: 'dark', subs: [
    [0.8, '十七岁的家姐淑仪，拿下了全市女子百米亚军。'],
    [4.6, '那件运动短裤，换来一顿藤条，和一间锁死的柴房。'],
    [8.8, '高烧、昏迷。大夫到时，一切都太迟了。'],
    [12.8, '那是淑珍第一次触到人的遗体。'],
    [16.4, '她忽然明白了家姐想当医生的原因——“能救人呀。”'],
  ]},
  { id: 'sc-boat', dur: 18, mood: 'night', subs: [
    [0.8, '深夜，月娥倒出樟木盒里全部的首饰。'],
    [4.4, '一纸离婚契书，换回一艘旧木船。'],
    [8.0, '“家姐，往后这里就是我们新家了。”'],
    [11.6, '她用锅底灰调了油，在船头写下三个字——'],
  ]},
  { id: 'sc-typhoon', dur: 16, mood: 'storm', subs: [
    [0.8, '“鱼起水，台风嘴。”'],
    [4.2, '贪兜沙钻鱼的淑珍，直直撞进了台风嘴。'],
    [8.2, '浪头几乎把船拍散。是大眼鸡他们骂骂咧咧地，把她拖回了内港。'],
    [12.4, '那一夜，母女俩相拥缩在船舱里，身下垫着潮湿的草席。'],
  ]},
  { id: 'sc-song', dur: 26, mood: 'calm', subs: [
    [0.8, '药嫲说，傍晚上甲板唱的那支歌，叫「叹家姐」。'],
    [5.0, '“妹仔多是家姐带大的，同睡一舱，同补一网。”'],
    [9.2, '“家姐一旦出嫁、被卖、落海、病死……妹仔也就成了家姐。”'],
    [13.6, '一尾青丝两处分，姐先跌落暗潮深。', true],
    [18.2, '莫怪阿妹泪眼涩，哭姐即是哭自身。', true],
  ]},
  { id: 'sc-hospital', dur: 20, mood: 'day', subs: [
    [0.8, '麻风病院里，淑珍重逢了当年被指婚卖掉的秀胧。'],
    [4.8, '一锅海榄树皮煮的药水，拔出了病人疮底的腐毒。'],
    [9.0, '石灰警戒线那头，李泰抛来医书和鱼干。'],
    [13.0, '“原想着能常碰面，谁知只能隔着石灰粉当牛郎织女。”'],
  ]},
  { id: 'sc-wedding', dur: 16, mood: 'warm', subs: [
    [0.8, '一纸结婚批准报告折成纸飞机，落在退潮的滩涂上。'],
    [4.6, '疍家水上婚礼，淑仪号挂了红，唱起了叹家姐。'],
    [8.8, '“你要是不后悔——就再捞我一次。”'],
    [12.2, '这句话，外婆记了一辈子，也拼尽全力捞了一辈子。'],
  ]},
  { id: 'sc-farewell', dur: 22, mood: 'dark', subs: [
    [0.8, '1966年，淑珍把宝螺小鲸鱼悄悄套进秀胧的衣领。'],
    [4.8, '药嫲的小船载着秀胧一家，融进了夜色。'],
    [9.0, '清晨拖回来的船，船身全是弹孔。'],
    [13.2, '那一夜，淑珍在医疗船上，咬着毛巾自己为自己接生。'],
    [17.4, '外婆这一生，再没能当面同秀胧道别。'],
  ]},
  { id: 'sc-years', dur: 26, mood: 'night', subs: [
    [0.8, '1977年，母女同进考场：忠桦考上省城，淑珍从“医士”成了“医师”。'],
    [6.0, '1993年，忠桦欠债十一万五：“只要我不死，就把钱赚回来。”'],
    [11.5, '1998年除夕，欠条烧成灰，抵押的船契回到了淑珍手里。'],
    [16.8, '1997年7月1日夜，李泰穿着旧军装，看完香港回归直播。'],
    [21.0, '一周后，他在家中辞世。淑珍没有哭，只是常常放空。'],
  ]},
  { id: 'sc-eye', dur: 26, mood: 'eye', subs: [
    [0.8, '多年以后，我在台风的中心，又见到了外婆。'],
    [5.0, '“再大的船，硬顶着浪头都要散架。滑进风眼里，才有活路。”'],
    [9.6, '她把那枚宝螺鲸鱼，戴上了我的脖子。'],
    [13.4, '“顺风顺水啊，武岳。”'],
    [17.2, '舵轮忽然转得动了。这一次，是我自己在开船。'],
    [21.2, '“把船当成游走在台风肋骨间的手术刀。”'],
  ]},
  { id: 'sc-finale', dur: 26, mood: 'calm', subs: [
    [0.8, '外婆手机里那个“老伴”，是大洋彼岸的秀胧。'],
    [4.8, '“我唱支叹家姐给你听，等唱完呢，可能就到啦……”'],
    [9.6, '海水连天天连水，家姐过洋探路行。', true],
    [13.6, '潮退潮升皆是客，暂借他乡作故乡。', true],
    [17.6, '姐啊莫怕夜色重，循着月影就归家。', true],
  ]},
];

// ---------- DOM -------
const $ = s => document.querySelector(s);
const stage = $('#stage'), sub = $('#subtitle'), bar = $('#bar'), timeEl = $('#time'), dotsEl = $('#dots');
const btnPlay = $('#btn-play'), btnPrev = $('#btn-prev'), btnNext = $('#btn-next'), btnMute = $('#btn-mute');
const overlay = $('#start-overlay');
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

function activate(idx) {
  document.querySelectorAll('.scene').forEach(el => {
    el.classList.remove('active'); void el.offsetWidth; // 重置 CSS 动画
  });
  document.getElementById(scenes[idx].id).classList.add('active');
  dots.forEach((d, i) => d.classList.toggle('on', i === idx));
  setSceneAudio(scenes[idx].id);
  curIdx = idx; curSubKey = '__none__'; sub.classList.remove('show');
}

function render() {
  let idx = 0;
  for (let i = 0; i < starts.length; i++) { if (pos >= starts[i]) idx = i; }
  if (idx !== curIdx) activate(idx);
  const sc = scenes[idx], t = pos - starts[idx];
  let text = '', verse = false, win = 4;
  for (let i = 0; i < sc.subs.length; i++) {
    const [at, txt, v] = sc.subs[i];
    if (t >= at) { text = txt; verse = !!v; win = (i + 1 < sc.subs.length ? sc.subs[i + 1][0] : sc.dur) - at; }
    else break;
  }
  const key = idx + '|' + text;
  if (key !== curSubKey) {
    curSubKey = key;
    if (text) {
      if (verse) {
        // 歌诗：逐字浮现（卡拉OK式）
        const chars = [...text];
        const step = Math.min(0.17, (win * 0.5) / chars.length);
        sub.innerHTML = '<span class="verse">' + chars.map((c, i) =>
          `<i style="animation-delay:${(i * step).toFixed(2)}s">${c === ' ' ? '&nbsp;' : c}</i>`).join('') + '</span>';
      } else {
        sub.textContent = text;
      }
      sub.classList.add('show');
    }
    else sub.classList.remove('show');
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
  if (audioOn && !muted) setSceneAudio(scenes[curIdx].id);
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

// ---------- 声音引擎（本地合成音频文件：环境声 / 配乐 / 音效） -------
const AU = 'assets/audio/';
const SCENE_AUDIO = {
  'sc-title':    { amb: [['sea', .45]] },
  'sc-paris':    { amb: [['rain', .38]] },
  'sc-raid':     { amb: [['crowd', .22]], loopFx: [['siren', .5]] },
  'sc-stele':    { amb: [['crowd', .18]], music: ['victory45', 1.0, .8] },
  'sc-sister':   { amb: [['rain', .16]] },
  'sc-boat':     { amb: [['sea', .45]] },
  'sc-typhoon':  { amb: [['storm', .9]] },
  'sc-song':     { amb: [['sea', .28]], music: ['lament', 3.0, .85] },
  'sc-hospital': { amb: [['crowd', .12], ['sea', .12]] },
  'sc-wedding':  { amb: [['sea', .3]], music: ['wedding', 1.0, .8], fx: [[2.0, 'firecrackers', .7]] },
  'sc-farewell': { amb: [['sea', .32]], music: ['march66', 0.5, .3], fx: [[13.2, 'baby', .65]] },
  'sc-years':    { amb: [['sea', .12]], music: ['pop90s', 1.0, .7] },
  'sc-eye':      { amb: [['sea', .4]], fx: [[0.5, 'static', .3]], music: ['lament', 17.0, .55] },
  'sc-finale':   { amb: [['sea', .38]], fx: [[0.6, 'static', .22]], music: ['lament', 5.0, .8] },
};
const pool = {};      // name -> Audio（循环环境声底）
let muted = false, activeEls = [], fxTimers = [];

function audioEl(name, loop) {
  const a = new Audio(AU + name + '.wav');
  a.loop = loop; a.preload = 'auto';
  activeEls.push(a);
  return a;
}
function fadeTo(a, v, ms, done) {
  const from = a.volume, steps = Math.max(1, ms / 50); let i = 0;
  const iv = setInterval(() => {
    i++;
    a.volume = Math.min(1, Math.max(0, from + (v - from) * (i / steps)));
    if (i >= steps) { clearInterval(iv); if (v === 0) { a.pause(); } done && done(); }
  }, 50);
}
function stopAllAudio() {
  fxTimers.forEach(clearTimeout); fxTimers = [];
  activeEls.forEach(a => { a.pause(); a.currentTime = 0; });
  activeEls = [];
}
function setSceneAudio(id) {
  if (!audioOn) return;
  stopAllAudio();
  const cfg = SCENE_AUDIO[id]; if (!cfg || muted) return;
  (cfg.amb || []).forEach(([name, v]) => {
    const a = audioEl(name, true); a.volume = 0; a.play().catch(() => {});
    fadeTo(a, v, 1200);
  });
  (cfg.loopFx || []).forEach(([name, v]) => {
    const a = audioEl(name, true); a.volume = 0; a.play().catch(() => {});
    fadeTo(a, v, 1800);
  });
  if (cfg.music) {
    const [name, delay, v] = cfg.music;
    fxTimers.push(setTimeout(() => {
      const a = audioEl(name, false); a.volume = 0; a.play().catch(() => {});
      fadeTo(a, v, 900);
    }, delay * 1000));
  }
  (cfg.fx || []).forEach(([at, name, v]) => {
    fxTimers.push(setTimeout(() => {
      const a = audioEl(name, false); a.volume = v; a.play().catch(() => {});
    }, at * 1000));
  });
}
function pauseAllAudio() { activeEls.forEach(a => a.pause()); fxTimers.forEach(clearTimeout); fxTimers = []; }
let audioOn = false;
btnMute.addEventListener('click', () => {
  muted = !muted;
  btnMute.innerHTML = '<svg viewBox="0 0 24 24">' + (muted ? ICO_MUTE : ICO_VOL) + '</svg>';
  if (muted) stopAllAudio();
  else if (playing && curIdx >= 0) setSceneAudio(scenes[curIdx].id);
});

// ---------- 开播 -------
window.addEventListener('error', e => {
  let el = document.getElementById('errlog');
  if (!el) { el = document.createElement('div'); el.id = 'errlog'; el.style.display = 'none'; document.body.appendChild(el); }
  el.textContent += '[ERR] ' + e.message + ' ; ';
});

$('#btn-start').addEventListener('click', () => {
  audioOn = true;   // 用户手势后允许出声
  overlay.classList.add('hide');
  pos = 0; ended = false; activate(0); play();
});

// ?auto=1&t=秒 ：无音频自动播放（用于自检验证）
const qp = new URLSearchParams(location.search);
if (qp.has('auto')) {
  overlay.classList.add('hide');
  pos = Math.min(parseFloat(qp.get('t')) || 0, total - 0.01);
  curIdx = -1; render(); play();
}
render();
