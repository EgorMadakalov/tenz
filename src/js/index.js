window.addEventListener('DOMContentLoaded', function() {
   const video = document.querySelector('#video');
   const btnVideo = document.querySelector('#btnVideo');

   const radiocheck = document.querySelector('#radiocheck');
   const relay = document.getElementById('relay');

   const pactCheck = document.querySelector('#pactCheck');

   const footerBtns = document.querySelectorAll('.footer__btn');
   const footerBtn = document.querySelector('.footer__btn');

   const body = document.querySelector('body');
   const wrapModal = document.getElementById('wrap-modal');
   const feedback = document.getElementById('feedback');
   const thank = document.getElementById('thank');
   const send = document.getElementById('send');
   
   
   btnVideo.addEventListener('click', function(){

    if(btnVideo.classList.contains('ready')) {
        return;
    }
    btnVideo.classList.add('ready');
    btnVideo.style.display = 'none';

    const src = video.dataset.src;
    video.insertAdjacentHTML('afterbegin', '<iframe src="'+ src +'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>');

   });
   
   

   radiocheck.addEventListener('click', function(){
    if (radiocheck.classList.contains('active')) {
        radiocheck.style.backgroundColor = '#ABABAB';
        relay.style.removeProperty('right');
        relay.style.left = '3px';
        radiocheck.classList.remove('active');
        return;
    }
    radiocheck.classList.add('active');
    radiocheck.style.backgroundColor = '#25DAC5';
    relay.style.left = 'unset';
    relay.style.right = '3px';
   });


   
   pactCheck.addEventListener('click', function(){
    if (pactCheck.classList.contains('send')) {
        pactCheck.style.backgroundColor = '#D1D1D1';
        pactCheck.classList.remove('send');
        return;
    };
    pactCheck.classList.add('send');
    pactCheck.style.backgroundColor = '#FF0D6A';
   });

   footerBtns.forEach((footerBtn) => {
    footerBtn.addEventListener('click', function(){
        body.style.overflow = 'hidden';
        wrapModal.style.display = 'flex';
        feedback.style.display = 'flex';
    });
   });
   
   send.onclick = function(){
    feedback.style.display = 'none';
    thank.style.display = 'flex';
    setTimeout(() => {
        thank.style.display = 'none';
        wrapModal.style.display = 'none';
        body.style.overflow = 'visible';
    }, 1500);
   };
});