const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

// Replace this with the salon owner's WhatsApp number, including country code.
const WHATSAPP_NUMBER = '91XXXXXXXXXX';
document.querySelector('.booking-submit').addEventListener('click', () => {
  const name = document.getElementById('customer-name').value.trim();
  const phone = document.getElementById('customer-phone').value.trim();
  const service = document.getElementById('service').value;
  const date = document.getElementById('visit-date').value || 'Flexible';
  if (!name || !phone) {
    alert('Please enter your name and phone number.');
    return;
  }
  const message = `Hello Aura Beauty Salon! I would like to request an appointment.\nName: ${name}\nPhone: ${phone}\nService: ${service}\nPreferred date: ${date}`;
  if (WHATSAPP_NUMBER.includes('X')) {
    alert('Demo mode: add the salon WhatsApp number in script.js to activate appointment requests.');
    return;
  }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});
