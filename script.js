// interactions: modal lift details, quote modal, reveals, year
document.addEventListener('DOMContentLoaded', () => {
  // year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // simple reveal on load for some sections
  setTimeout(()=> document.querySelectorAll('.lift-card, .team-card').forEach((el,i)=>{
    el.classList.add('reveal');
    setTimeout(()=> el.classList.add('visible'), 80*i);
  }), 120);

  // LIFT MODAL LOGIC (re-used modal)
  const liftCards = document.querySelectorAll('.lift-card');
  const liftModal = document.getElementById('liftModal');
  const modalImg = document.getElementById('modalImg');
  const liftTitle = document.getElementById('liftTitle');
  const liftDesc = document.getElementById('liftDesc');
  const liftComponents = document.getElementById('liftComponents');
  const closeModal = document.getElementById('closeModal');
  const closeModal2 = document.getElementById('closeModal2');

  function openLiftModal(card) {
    const title = card.dataset.title || card.querySelector('h3').innerText;
    const img = card.dataset.img || card.querySelector('img').src;
    const desc = card.dataset.desc || card.querySelector('.muted').innerText;
    const compsRaw = card.dataset.components || '[]';
    let comps;
    try { comps = JSON.parse(compsRaw); } catch(e) { comps = [compsRaw]; }

    liftTitle.textContent = title;
    modalImg.src = img;
    modalImg.alt = title;
    liftDesc.textContent = desc;

    liftComponents.innerHTML = '';
    comps.forEach(c => {
      const li = document.createElement('li');
      li.textContent = c;
      liftComponents.appendChild(li);
    });

    // show modal
    liftModal.style.display = 'flex';
    liftModal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }

  liftCards.forEach(card => {
    card.addEventListener('click', () => openLiftModal(card));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') openLiftModal(card); });
  });

  function closeLift() {
    liftModal.style.display = 'none';
    liftModal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  closeModal && closeModal.addEventListener('click', closeLift);
  closeModal2 && closeModal2.addEventListener('click', closeLift);
  window.addEventListener('click', (e) => { if (e.target === liftModal) closeLift(); });

  // QUOTE MODAL
  const openQuote = document.getElementById('openQuote');
  const openQuote2 = document.getElementById('openQuote2');
  const quoteModal = document.getElementById('quoteModal');
  const closeQuote = document.getElementById('closeQuote');
  const quoteForm = document.getElementById('quoteForm');

  function openQuoteModal() {
    if (!quoteModal) return;
    quoteModal.style.display = 'flex';
    quoteModal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeQuoteModal() {
    if (!quoteModal) return;
    quoteModal.style.display = 'none';
    quoteModal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  openQuote && openQuote.addEventListener('click', openQuoteModal);
  openQuote2 && openQuote2.addEventListener('click', openQuoteModal);
  closeQuote && closeQuote.addEventListener('click', closeQuoteModal);
  window.addEventListener('click', (e) => { if (e.target === quoteModal) closeQuoteModal(); });

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your request has been received. We will contact you soon.');
      quoteForm.reset();
      closeQuoteModal();
    });
  }

  // keyboard close (Escape)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (liftModal && liftModal.style.display === 'flex') closeLift();
      if (quoteModal && quoteModal.style.display === 'flex') closeQuoteModal();
    }
  });

});
