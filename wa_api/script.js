(function initWhatsAppForm(){
  function setup(){
    const form = document.getElementById('waSendForm');
    if(!form) return false;
    const toEl = document.getElementById('waTo');
    const modeEl = document.getElementById('waMode');
    const msgWrap = document.getElementById('waMessageWrap');
    const msgEl = document.getElementById('waMessage');
    const tplNameWrap = document.getElementById('waTemplateNameWrap');
    const tplNameEl = document.getElementById('waTemplateName');
    const tplLangWrap = document.getElementById('waTemplateLangWrap');
    const tplLangEl = document.getElementById('waTemplateLang');
    const tplParamsWrap = document.getElementById('waTemplateParamsWrap');
    const tplParamsEl = document.getElementById('waTemplateParams');
    const statusEl = document.getElementById('waStatus');
    const resultPre = document.getElementById('waResult');
    const exampleBtn = document.getElementById('waExampleBtn');
    const dryRunBtn = document.getElementById('waDryRunBtn');
    function setStatus(t,c){ if(statusEl){ statusEl.textContent=t; statusEl.style.color=c||'#64748b'; } }
    function updateMode(){
      const m = modeEl.value;
      const isTpl = m==='template';
      tplNameWrap.style.display = isTpl? 'flex':'none';
      tplLangWrap.style.display = isTpl? 'flex':'none';
      tplParamsWrap.style.display = isTpl? 'flex':'none';
      msgWrap.style.display = isTpl? 'none':'flex';
    }
    modeEl.addEventListener('change', updateMode); updateMode();
    exampleBtn?.addEventListener('click',()=>{
      if(!toEl.value) toEl.value = '+529514138990';
      if(modeEl.value==='text'){ msgEl.value = 'SU PEDIDO ESTA LISTO'; }
      else { tplNameEl.value = 'hello_world'; tplLangEl.value = 'en_US'; tplParamsEl.value = ''; }
      setStatus('Ejemplo cargado','#475569');
    });
    async function doSend({dryRun=false}){
      const to = toEl.value.trim();
      if(!to){ setStatus('Destino requerido','#b91c1c'); return; }
      const mode = modeEl.value;
      let body;
      if(mode==='text'){
        const message = msgEl.value.trim();
        if(!message){ setStatus('Mensaje requerido','#b91c1c'); return; }
        body = { to, message };
      } else {
        const name = tplNameEl.value.trim();
        if(!name){ setStatus('Nombre template requerido','#b91c1c'); return; }
        const language = tplLangEl.value.trim()||'en_US';
        const paramsRaw = tplParamsEl.value.trim();
        let components;
        if(paramsRaw){
          const parts = paramsRaw.split('|').map(s=>s.trim()).filter(Boolean);
          components = [{ type:'body', parameters: parts.map(p=>({ type:'text', text:p })) }];
        }
        body = { to, templateName: name, language, components };
      }
      if(dryRun) body.dryRun = true;
      setStatus(dryRun? 'Generando payload...' : 'Enviando...','#475569'); resultPre.style.display='none';
      try {
        const r = await fetch('/send-whatsapp',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
        const data = await r.json().catch(()=>({}));
        if(!r.ok){ setStatus('Error: '+(data.error||r.status),'#b91c1c'); resultPre.style.display='block'; resultPre.textContent=JSON.stringify(data,null,2); return; }
        setStatus(dryRun? 'Payload listo' : 'Enviado','#16a34a'); resultPre.style.display='block'; resultPre.textContent=JSON.stringify(data,null,2);
      } catch(err){ setStatus('Fallo: '+err.message,'#b91c1c'); }
    }
    form.addEventListener('submit', e=>{ e.preventDefault(); doSend({dryRun:false}); });
    dryRunBtn?.addEventListener('click', ()=> doSend({dryRun:true}));
    return true;
  }
  if(!setup()){ document.addEventListener('DOMContentLoaded', setup, { once:true }); }
})();

// Confirm form
(function initWhatsAppConfirmForm(){
  function setup(){
    const form = document.getElementById('waConfirmForm'); if(!form) return false;
    const toEl = document.getElementById('wacTo');
    const headerUrlEl = document.getElementById('wacHeaderUrl');
    const nombreEl = document.getElementById('wacNombre');
    const trabajoEl = document.getElementById('wacTrabajo');
    const corrEl = document.getElementById('wacCorrecciones');
    const statusEl = document.getElementById('wacStatus');
    const resultPre = document.getElementById('wacResult');
    const dryRunBtn = document.getElementById('wacDryRunBtn');
    function setStatus(t,c){ if(statusEl){ statusEl.textContent = t; statusEl.style.color = c||'#64748b'; } }
    function normalizeToE164(input){
      let s = String(input||'').trim(); if(!s) return '';
      if(s.startsWith('+')){ s = '+'+s.slice(1).replace(/\D+/g,''); }
      else { s = s.replace(/\D+/g,''); }
      if(!s) return '';
      if(s.startsWith('+')) return s;
      if(s.startsWith('52') && s.length>=12) return '+'+s;
      if(s.length===10) return '+52'+s;
      return s.startsWith('+')? s : ('+'+s);
    }
    async function doSend({dryRun=false}){
      const toRaw = toEl.value.trim();
      const to = normalizeToE164(toRaw);
      if(!to){ setStatus('Destino requerido','#b91c1c'); return; }
      const nombre = nombreEl.value.trim();
      const trabajo = trabajoEl.value.trim();
      const correcciones = String(corrEl.value||'').trim() || '0';
      const headerUrl = headerUrlEl.value.trim();
      const components = [];
      if(headerUrl){ components.push({ type:'header', parameters:[{ type:'image', image:{ link: headerUrl } }] }); }
      components.push({ type:'body', parameters:[ { type:'text', text: nombre }, { type:'text', text: trabajo }, { type:'text', text: correcciones } ]});
      const body = { to, templateName:'confirmacion', language:'es', components };
      if(dryRun) body.dryRun = true;
      setStatus(dryRun? 'Generando payload...' : 'Enviando...','#475569'); resultPre.style.display='none';
      try{
        const r = await fetch('/send-whatsapp',{ method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(body) });
        const data = await r.json().catch(()=>({}));
        if(!r.ok){ setStatus('Error: '+(data.error||r.status),'#b91c1c'); resultPre.style.display='block'; resultPre.textContent = JSON.stringify(data,null,2); return; }
        setStatus(dryRun? 'Payload listo' : 'Enviado','#16a34a'); resultPre.style.display='block'; resultPre.textContent = JSON.stringify(data,null,2);
      }catch(err){ setStatus('Fallo: '+err.message,'#b91c1c'); }
    }
    form.addEventListener('submit', (e)=>{ e.preventDefault(); doSend({dryRun:false}); });
    dryRunBtn?.addEventListener('click', ()=> doSend({dryRun:true}));
    return true;
  }
  if(!setup()){ document.addEventListener('DOMContentLoaded', setup, { once:true }); }
})();
