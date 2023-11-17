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
    console.log(index);
}

setInterval(changeImage, 5000); // Altera a imagem a cada 5 segundos