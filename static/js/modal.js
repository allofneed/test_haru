document.addEventListener("DOMContentLoaded", () =>{
  const faqOpenBtn = document.getElementById('btn-open-faq');
  const faqModal = document.getElementById('faq-modal');
  const faqCloseBtn = document.getElementById('btn-close-faq');

  if (faqOpenBtn && faqModal) {
    faqOpenBtn.addEventListener('click', () =>{
      faqModal.showModal();
    });
  }

  if (faqCloseBtn && faqModal) {
    faqCloseBtn.addEventListener('click', () => {
      faqModal.close();
    });
  }
})