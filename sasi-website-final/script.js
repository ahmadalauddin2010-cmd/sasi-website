const imageFiles=['images/photo1.jpg','images/photo2.jpg','images/photo3.jpg','images/photo4.jpg'];
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
document.addEventListener('DOMContentLoaded',()=>{
  const slides=document.getElementById('slides');
  const order=shuffle(imageFiles.slice());
  order.forEach(src=>{
    const div=document.createElement('div');
    div.className='slide';
    const img=document.createElement('img');
    img.src=src; img.alt='Galeri Sasi';
    div.appendChild(img);
    slides.appendChild(div);
  });
  let idx=0;
  const update=()=>{const w=document.querySelector('.slider').clientWidth;document.getElementById('slides').style.transform=`translateX(${-idx * w}px)`}
  window.addEventListener('resize',update);
  document.getElementById('next').addEventListener('click',()=>{idx=(idx+1)%document.querySelectorAll('.slide').length;update();resetTimer()});
  document.getElementById('prev').addEventListener('click',()=>{idx=(idx-1+document.querySelectorAll('.slide').length)%document.querySelectorAll('.slide').length;update();resetTimer()});
  let timer=setInterval(()=>{idx=(idx+1)%document.querySelectorAll('.slide').length;update()},4500);
  const resetTimer=()=>{clearInterval(timer);timer=setInterval(()=>{idx=(idx+1)%document.querySelectorAll('.slide').length;update()},4500)};
  setTimeout(update,200);
  const faders=document.querySelectorAll('.fade');
  const appearOptions={threshold:0.15};
  const appearOnScroll=new IntersectionObserver(function(entries,appearOnScroll){
    entries.forEach(entry=>{if(!entry.isIntersecting) return;entry.target.classList.add('in');appearOnScroll.unobserve(entry.target)})},appearOptions);
  faders.forEach(f=>appearOnScroll.observe(f));
});