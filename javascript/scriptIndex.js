// let items = document.querySelectorAll('.slider .item');
// let next = document.getElementById('next');
// let prev = document.getElementById('prev')

// let active = 3;

// function loadShow(){
//     let stt = 0;

//     items[active].style.transform = `none`;
//         items[active].style.zIndes = 1;
//         items[active].style.filter = 'none';
//         items[active].style.opacity = 1;

//     for (var i = active + 1; i< items.length; i++){
//         stt++;
//         items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
//         items[i].style.zIndes = -stt;
//         items[i].style.filter = 'blur(5px)';
//         items[i].style.opacity = stt > 2 ? 0 : 0.6;
//     }
//     stt = 0;
//     for(var i = active - 1 ; i >= 0 ; i--){
//         stt++;
//         items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
//         items[i].style.zIndes = -stt;
//         items[i].style.filter = 'blur(5px)';
//         items[i].style.opacity = stt > 2 ? 0 : 0.6;
//     };

// }

// loadShow();

// next.onclick = function(){
//     active = active + 1 < items.length ? active + 1 : active;
//     loadShow();
// }

// prev.onclick = function (){
//     active = active - 1 < items.length ? active - 1 : active;
//     loadShow();
// }

//
function menuShow(){
    let menuMobile = document.querySelector(".mobile-menu");

    if(menuMobile.classList.contains('open')){
        menuMobile.classList.remove('open');
    }else{
        menuMobile.classList.add('open');
    }
}

let index = 0;
const images = document.querySelectorAll('#carrossel img');
const totalImages = images.length;

function changeImage() {
    images[index].style.display = 'none';
    index = (index + 1) % totalImages;
    images[index].style.display = 'block';
}

setInterval(changeImage, 5000); // Altera a imagem a cada 5 segundos


let index2 = 0;
const images2 = document.querySelectorAll('.carrossel2 img');
const totalImages2 = images2.length;

function changeImage2(){
    images2[index2].style.display = 'none';
    index2 = (index2 + 1 ) % totalImages2;
    images2[index2].style.display = 'block';

}


setInterval(changeImage2, 5000);