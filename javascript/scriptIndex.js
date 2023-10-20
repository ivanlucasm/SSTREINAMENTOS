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


// let index2 = 0;
// const images2 = document.querySelectorAll('.carrossel2 img');
// const totalImages2 = images2.length;

// function changeImage2(){
//     images2[index2].style.display = 'none';
//     index2 = (index2 + 1 ) % totalImages2;
//     images2[index2].style.display = 'block';

// }


// setInterval(changeImage2, 5000);