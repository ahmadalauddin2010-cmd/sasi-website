// script.js - slider with auto and arrows, randomized image order on load
const images = [
  'images/photo1.png',
  'images/photo2.png',
  'images/photo3.png',
  'images/photo4.png'
];

function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]] } return a }

document.addEventListener('DOMContentLoaded',()=>{
  const slidesEl = document.getElementById('slides');
  const imgOrder = shuffle(images.slice());
  imgOrder.forEach(src=>{
    const div = document.createElement('div');
    div.className = 'slide';
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Galeri Sasi';
    div.appendChild(img);
    slidesEl.appendChild(div);
  });

  const slides = document.querySelectorAll('.slide');
  let index = 0;
  let interval = null;

  const update = ()=>{
    const w = document.querySelector('.slider').clientWidth;
    const el = document.getElementById('slides');
    el.style.transform = `translateX(${ - index * w }px)`;
  }

  window.addEventListener('resize', update);

  const next = ()=>{ index = (index+1)%slides.length; update() }
  const prev = ()=>{ index = (index-1+slides.length)%slides.length; update() }

  document.getElementById('next').addEventListener('click', ()=>{ next(); resetTimer() })
  document.getElementById('prev').addEventListener('click', ()=>{ prev(); resetTimer() })

  const startTimer = ()=> interval = setInterval(next, 4000)
  const resetTimer = ()=>{ clearInterval(interval); startTimer() }

  // start when images loaded
  setTimeout(()=>{ update(); startTimer() }, 200);
});
