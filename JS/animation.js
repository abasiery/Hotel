const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry)
      if(entry.isIntersecting){
        entry.target.classList.add('show');
      } else{
        entry.target.classList.remove('show');
      }
    });
});




const hiddenElements = document.querySelectorAll('.hidden ');
hiddenElements.forEach((e1) => observer.observe(e1));
const hi = document.querySelectorAll('.h22');
hi.forEach((e2) => observer.observe(e2));
const basic = document.querySelectorAll('.basic');
basic.forEach((e3) => observer.observe(e3));
const slow = document.querySelectorAll('.hslow');
slow.forEach((e4) => observer.observe(e4));
const hs = document.querySelectorAll('.hs');
hs.forEach((e5) => observer.observe(e5));
const m1 = document.querySelectorAll('.head');
m1.forEach((e6) => observer.observe(e6));
const lef = document.querySelectorAll('.left');
lef.forEach((e7) => observer.observe(e7));
const ri = document.querySelectorAll('.right');
ri.forEach((e8) => observer.observe(e8));