/* ========= LETTER ========= */

const envelope = document.getElementById("envelope");
const envelopeScreen = document.getElementById("envelopeScreen");
const letterScreen = document.getElementById("letterScreen");
const galleryScreen = document.getElementById("galleryScreen");
const letterText = document.getElementById("letterText");
const toGallery = document.getElementById("toGallery");
const music = document.getElementById("bgm");

music.volume = 0.4;

const message = `Hello My Love ❤️

Thank you for every moment,
every laugh,
every memory.

Every year with you
still feels special.`;

let i = 0;
function typeWriter(){
  if(i < message.length){
    letterText.innerHTML += message.charAt(i);
    i++;
    setTimeout(typeWriter, 35);
  } else {
    toGallery.classList.remove("hidden");
  }
}

envelope.onclick = () => {
  music.play().catch(()=>{});

  fadeToDark(() => {
    envelopeScreen.classList.add("hidden");
    letterScreen.classList.remove("hidden");
    document.body.classList.remove("bg-pink-100");
    document.body.classList.add("bg-black");
    fadeOverlay.style.opacity = "0"; // fade balik
  });

  typeWriter();
};

/* ========= SLIDES ========= */

const slides = [
 {img:"src/1.jpeg", cap:"Our first little moment 💗"},
 {img:"src/2.jpeg", cap:"Your smile"},
 {img:"src/10.jpeg", cap:"My favorite person"},
 {img:"src/3.jpeg", cap:"Laughs we shared"},
 {img:"src/7.jpeg", cap:"You + this moment = ❤️"},
 {img:"src/4.jpeg", cap:"Still my favorite"},
 {img:"src/5.png", cap:"Every year with you"},
 {img:"src/8.jpeg", cap:"My comfort place"},
 {img:"src/9.jpeg", cap:"This still makes me smile"},
 {img:"src/6.jpeg", cap:"thankyou for being my valentine again this year — I love you so much ❤️"}
];

let index = 0;
let clickLock = false;
let timer;

const slideImg = document.getElementById("slideImg");
const slideCaption = document.getElementById("slideCaption");

function showSlide(){
  slideImg.src = slides[index].img;
  slideCaption.innerText = slides[index].cap;
}

function nextSlide(){

  if(clickLock) return; // cegah spam
  clickLock = true;

  index = (index + 1) % slides.length;
  showSlide();

  setTimeout(()=>{
    clickLock = false;
  }, 1000); // cooldown 0.8 detik
}


function startAuto(){
  timer = setInterval(nextSlide, 3500);
}

toGallery.onclick = () => {
  letterScreen.classList.add("hidden");
  galleryScreen.classList.remove("hidden");
  showSlide();
  startAuto();
  startBackgroundHearts();
};

/* ========= CONTINUOUS BACKGROUND HEARTS ========= */

function spawnBgHeart(){
  const h = document.createElement("div");
  h.className = "bg-heart";
  h.innerHTML = "💗";
  h.style.left = Math.random()*100 + "vw";
  h.style.animationDuration = (Math.random()*4+4)+"s";
  document.body.appendChild(h);
  setTimeout(()=>h.remove(),8000);
}

function startBackgroundHearts(){
  setInterval(spawnBgHeart, 300);
}

const fadeOverlay = document.getElementById("fadeOverlay");

function fadeToDark(callback){
  fadeOverlay.style.opacity = "1";
  setTimeout(callback, 700); // sama dengan duration CSS
}

/* ========= BURST HEARTS ========= */

function burstHearts(x,y){
  for(let i=0;i<20;i++){
    const h = document.createElement("div");
    h.className = "burst";
    h.innerHTML = "❤️";
    h.style.left = x+"px";
    h.style.top = y+"px";
    h.style.transform =
      `translate(${(Math.random()-0.5)*160}px, ${(Math.random()-0.5)*120}px)`;
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),1200);
  }
}

/* click image → burst + next */
slideImg.addEventListener("click", e=>{
  burstHearts(e.clientX, e.clientY);
  nextSlide();
});

/* ========= SWIPE ========= */

let startX=0;
slideImg.addEventListener("touchstart", e=>startX=e.touches[0].clientX);
slideImg.addEventListener("touchend", e=>{
 let dx = e.changedTouches[0].clientX - startX;
 if(dx<-50) nextSlide();
 if(dx>50){ index=(index-1+slides.length)%slides.length; showSlide(); }
});