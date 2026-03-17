// EasyWay - Gerar áudios Rachel (ElevenLabs Plano Starter)
// Rodar: node gerar-audios-premium-starter.js

const fs = require('fs');
const path = require('path');
const https = require('https');

// SUA NOVA CHAVE DA API STARTER
const API_KEY = 'sk_895bf2f43b5ec9b0f7eb01815a16d6d9e2eea6d4bdd075a7';
const VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Rachel

function tts(text) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: { stability: 0.5, similarity_boost: 0.75 }
    });
    const req = https.request({
      hostname: 'api.elevenlabs.io',
      path: '/v1/text-to-speech/' + VOICE_ID,
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
        'Content-Length': Buffer.byteLength(body)
      }
    }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(Buffer.concat(chunks).toString('base64'));
        } else {
          reject(new Error('Status ' + res.statusCode + ': ' + Buffer.concat(chunks).toString()));
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function processFile(filepath) {
  const fname = path.basename(filepath);
  console.log('\nProcessando: ' + fname);
  let html = fs.readFileSync(filepath, 'utf-8');

  // Regexes para capturar textos de áudio
  const regexes = [
    /<div class="vc-en">([\s\S]*?)<\/div>/g,
    /<div class="phrase">([\s\S]*?)<\/div>/g,
    /<span class="en">([\s\S]*?)<\/span>/g,
    /<span class="word">([\s\S]*?)<\/span>/g,
    /speak\('([^']+)'\)/g, // Captura de chamadas de função speak('...')
    /onclick="speak\('([^']+)'\)"/g
  ];

  const words = [];
  for (const regex of regexes) {
    let m;
    while ((m = regex.exec(html)) !== null) {
      let text = m[1].replace(/<[^>]*>?/gm, '').trim();
      text = text.replace(/[^\w\s']/gi, '').trim();
      if (text && !words.includes(text) && !text.includes('function') && !text.includes('var ')) {
        words.push(text);
      }
    }
  }

  if (words.length === 0) { console.log('  Sem palavras/frases encontradas.'); return; }
  console.log('  ' + words.length + ' palavras/frases encontradas');

  const audioMap = {};
  for (const word of words) {
    const key = word.toLowerCase();
    if (audioMap[key]) continue;
    process.stdout.write('  Rachel: ' + word + ' ... ');
    try {
      audioMap[key] = await tts(word);
      console.log('OK');
      await sleep(1000); 
    } catch (e) { 
      console.log('ERRO: ' + e.message);
      if (e.message.includes('429')) {
        console.log('  Aguardando 30 segundos para tentar novamente...');
        await sleep(30000);
      }
    }
  }

  // CSS para os botões de áudio
  const css = '\n.audio-btn{background:none;border:none;cursor:pointer;font-size:1rem;padding:0 2px;vertical-align:middle;transition:transform 0.15s;display:inline;}\n.audio-btn:hover{transform:scale(1.3);}';
  if (!html.includes('.audio-btn{')) {
    html = html.replace('</style>', css + '\n</style>');
  }

  // Substitui botões existentes que usam speak('...') para usar nossa função playAudio
  html = html.replace(/onclick="speak\('([^']+)'\)"/g, (match, text) => {
    const key = text.replace(/[^\w\s']/gi, '').toLowerCase().replace(/'/g, "\\'");
    return `onclick="event.stopPropagation();playAudio('${key}')"`;
  });

  // Insere novos botões onde não existem
  const tagsToInject = [
    { regex: /<div class="vc-en">([\s\S]*?)<\/div>/g, tag: 'div', class: 'vc-en' },
    { regex: /<div class="phrase">([\s\S]*?)<\/div>/g, tag: 'div', class: 'phrase' },
    { regex: /<span class="en">([\s\S]*?)<\/span>/g, tag: 'span', class: 'en' },
    { regex: /<span class="word">([\s\S]*?)<\/span>/g, tag: 'span', class: 'word' }
  ];

  for (const item of tagsToInject) {
    html = html.replace(item.regex, (match, raw) => {
      if (match.includes('audio-btn') || match.includes('onclick')) return match;
      const cleanText = raw.replace(/<[^>]*>?/gm, '').trim().replace(/[^\w\s']/gi, '').toLowerCase().replace(/'/g, "\\'");
      if (!cleanText) return match;
      return `<${item.tag} class="${item.class}">${raw}<button class="audio-btn" onclick="event.stopPropagation();playAudio('${cleanText}')" type="button"> 🔊</button></${item.tag}>`;
    });
  }

  const audioJson = JSON.stringify(audioMap);
  const js = '\n<script>\nconst _ew_audio=' + audioJson + ';\nfunction playAudio(t){const b=_ew_audio[t.toLowerCase()];if(!b){console.warn(\'No audio:\',t);return;}new Audio(\'data:audio/mpeg;base64,\'+b).play();}\n</script>';
  
  if (html.includes('const _ew_audio=')) {
      html = html.replace(/<script>\s*const _ew_audio=[\s\S]*?<\/script>/, js);
  } else {
      html = html.replace('</body>', js + '\n</body>');
  }

  const out = filepath.replace('.html','_rachel.html').replace('_rachel_rachel','_rachel');
  fs.writeFileSync(out, html, 'utf-8');
  console.log('  Salvo: ' + path.basename(out));
}

async function main() {
  const dir = process.argv[2] || '.';
  const files = fs.readdirSync(dir).filter(f => 
    (f.startsWith('beginner-a1') || f.startsWith('elementary-a2')) && 
    f.endsWith('.html') && 
    !f.includes('_rachel')
  );

  if (files.length === 0) {
    console.log('Nenhum arquivo beginner-a1*.html ou elementary-a2*.html encontrado em ' + dir);
    return;
  }
  console.log('EasyWay Audio - Rachel (ElevenLabs Starter)\n' + files.length + ' arquivos encontrados em ' + dir + '\n');
  for (const f of files) await processFile(path.join(dir, f));
  console.log('\nPronto! Arquivos gerados.');
}

main().catch(console.error);
