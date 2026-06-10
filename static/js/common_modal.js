document.addEventListener("DOMContentLoaded", () => {
  const faqOpenBtn = document.getElementById('btn-faq');
  const faqModal = document.getElementById('faq-modal');

  const termsOpenBtn = document.getElementById('open-terms');
  const termsModal = document.getElementById('terms-modal');

  const privacyOpenBtn = document.getElementById('open-privacy');
  const privacyModal = document.getElementById('privacy-modal');

  const copyrightOpenBtn = document.getElementById('open-copyright');
  const copyrightModal = document.getElementById('copyright-modal')

  if (faqOpenBtn && faqModal) {
    faqOpenBtn.addEventListener('click', () => {
      faqModal.showModal();
    });
  }

  if (termsOpenBtn && termsModal) {
    termsOpenBtn.addEventListener('click', () =>{
      termsModal.showModal();
    });
  }

  if (privacyOpenBtn && privacyModal) {
    privacyOpenBtn.addEventListener('click', () =>{
      privacyModal.showModal();
    });
  }

  if (copyrightOpenBtn && copyrightModal) {
    copyrightOpenBtn.addEventListener('click', () =>{
      copyrightModal.showModal();
    });
  }

  const closeButton = document.querySelectorAll('#close-modal');

  closeButton.forEach(button => {
    button.addEventListener('click', () =>{
      const currentModal = button.closest('dialog');
      if(currentModal) {
        currentModal.close();
      }
    })
  })
});