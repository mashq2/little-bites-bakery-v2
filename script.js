// Basic interactions for the demo site
document.getElementById('bookNow').addEventListener('click', ()=>{
  document.getElementById('contact').scrollIntoView({behavior:'smooth'});
});

function buildWhatsAppUrl(name, phone, details){
  const msg = `Hello, I want to book catering.%0AName: ${name}%0APhone: ${phone}%0ADetails: ${details}`;
  return `https://wa.me/254742459447?text=${msg}`;
}

document.getElementById('whatsappBtn').addEventListener('click', ()=>{
  const name = document.getElementById('name').value || 'Not provided';
  const phone = document.getElementById('phone').value || 'Not provided';
  const details = document.getElementById('details').value || 'No details';
  const url = buildWhatsAppUrl(name, phone, details);
  window.open(url, '_blank');
});

// M-Pesa modal flow
const mpesaModal = document.getElementById('mpesaModal');
const mpesaBtn = document.getElementById('mpesaBtn');
const modalClose = mpesaModal.querySelector('.modal-close');
const confirmMpesa = document.getElementById('confirmMpesa');

mpesaBtn.addEventListener('click', ()=>{
  mpesaModal.setAttribute('aria-hidden','false');
  const phoneField = document.getElementById('mpesaPhone');
  if (phoneField) phoneField.focus();
});

modalClose.addEventListener('click', ()=>{
  mpesaModal.setAttribute('aria-hidden','true');
});

confirmMpesa.addEventListener('click', ()=>{
  const p = document.getElementById('mpesaPhone').value || '';
  const amt = document.getElementById('mpesaAmount').value || '';
  alert(`Thank you. If you completed payment of KES ${amt} from ${p}, please send confirmation via WhatsApp.`);
  mpesaModal.setAttribute('aria-hidden','true');
  // Optionally open WhatsApp to confirm
  const name = document.getElementById('name').value || 'Not provided';
  const phone = document.getElementById('phone').value || 'Not provided';
  const details = `Payment: KES ${amt} from ${p}`;
  const url = buildWhatsAppUrl(name, phone, details);
  window.open(url, '_blank');
});

// Accessibility: close modal on ESC
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') mpesaModal.setAttribute('aria-hidden','true');
});
