/**
 * IAP PHOENIX — Interatividade & Micro-Interações
 * Inspirado na fluidez e minimalismo do vídeo de referência
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Atualizar ano dinâmico no rodapé
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Menu mobile toggle
  const menuTrigger = document.getElementById('menuTrigger');
  const canvasNav = document.getElementById('canvasNav');

  if (menuTrigger && canvasNav) {
    menuTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = canvasNav.classList.toggle('is-open');
      menuTrigger.setAttribute('aria-expanded', isOpen);
      menuTrigger.textContent = isOpen ? '✕ Fechar' : '☰ Menu';
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      if (!canvasNav.contains(e.target) && !menuTrigger.contains(e.target)) {
        canvasNav.classList.remove('is-open');
        menuTrigger.textContent = '☰ Menu';
      }
    });

    // Fechar ao clicar em um link interno
    canvasNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        canvasNav.classList.remove('is-open');
        menuTrigger.textContent = '☰ Menu';
      });
    });
  }

  // 3. Copiar Chave Pix com Toast Notification
  const copyPixBtns = document.querySelectorAll('.btn-copy-pix');
  copyPixBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-pix') || '05.685.682/0001-37';
      navigator.clipboard.writeText(key).then(() => {
        showToast('✓ Chave Pix copiada com sucesso!');
        const origText = btn.textContent;
        btn.textContent = 'Copiado!';
        btn.style.backgroundColor = '#10b981';
        btn.style.color = '#fff';
        setTimeout(() => {
          btn.textContent = origText;
          btn.style.backgroundColor = '';
          btn.style.color = '';
        }, 2500);
      }).catch(() => {
        showToast('Erro ao copiar chave Pix.');
      });
    });
  });

  // Função Toast
  function showToast(message) {
    let toast = document.getElementById('toastNotification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotification';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 3200);
  }

  // 4. Formulário de contato com feedback visual elegante
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Enviando mensagem...';

      setTimeout(() => {
        showToast('✓ Mensagem enviada! Entraremos em contato em breve.');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;
      }, 1200);
    });
  }

  // 5. Efeito suave de reveal ao rolar a página
  const revealElements = document.querySelectorAll('.bento-card, .editorial-headline, .stat-box, .gallery-item');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });
  }
});
