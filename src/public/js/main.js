//Cambio de cantidad de X producto.

let minusBtn = document.querySelector('.input__minus');
let plusBtn = document.querySelector('.input__plus');
let userInput = document.querySelector('.input__number');

let userInputNumber = 0;

plusBtn.addEventListener('click', ()=>{
    userInputNumber++;
    userInput.value = userInputNumber;
});

minusBtn.addEventListener('click', ()=>{
    userInputNumber--;
    if (userInputNumber <= 0) {
        userInputNumber = 0;
    }
    userInput.value = userInputNumber;
});

//Agregar productos al carrito.
const addToCartBtn = document.querySelector('.details__button');
let cartNotification = document.querySelector('.header__cart--notification');
let lastValue = parseInt(cartNotification.innerText);

addToCartBtn.addEventListener('click', ()=>{
    click();

    lastValue = lastValue + userInputNumber;

    cartNotification.innerText = lastValue;

    if (userInputNumber == 0) {

    } else {
        cartNotification.style.display = 'block';
        drawProductInModal();
        //console.log(cartNotification);
        if (lastValue == 0) {
            cartNotification.style.display = 'none';
        } else {
            cartNotification.style.display = 'block';
        }
    }
});

//Muestro el carrito y el detalle.
const cartIconBtn = document.querySelector('.header__cart');
const cartModal = document.querySelector('.cart-modal');
let priceModal = document.querySelector('.cart-modal__price');
const productContainer = document.querySelector('.cart-modal__checkout-container');

cartIconBtn.addEventListener('click', ()=>{
    cartModal.classList.toggle('show');

    if (lastValue == 0) {
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    }else{
        drawProductInModal();
    }
});

//Borrar carrito.
function deleteProduct() {
    const deleteProductBtn = document.querySelector('.cart-modal__delete');
    deleteProductBtn.addEventListener('click', ()=>{
        click();
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        lastValue = 0;
        cartNotification.innerText = lastValue;
        if (lastValue == 0) {
            cartNotification.style.display = 'none';
        } else {
            cartNotification.style.display = 'block';
        }
    });
}

//Checkout button.                          ERROR NO ENCONTRADO
const checkoutBtn = document.querySelector('.cart-modal__checkout');
checkoutBtn.addEventListener('click', ()=>{
    click();
});

//Cambiar imagenes producto.
const imageContainer = document.querySelector('.gallery__image-container');
const nextGalleryBtn = document.querySelector('.gallery__next');
const previousGalleryBtn = document.querySelector('.gallery__previous');
let imgIndex = 1;

nextGalleryBtn.addEventListener('click', ()=>{
    changeNextImage(imageContainer);
});

previousGalleryBtn.addEventListener('click', ()=>{
    changePreviousImage(imageContainer);
});

//Mostrar el modal gallery.
const imagesModal = document.querySelector('.gallery-modal__background');
const closeModalBtn = document.querySelector('.gallery-modal__close');

imageContainer.addEventListener('click', ()=>{
    imagesModal.style.display = 'grid';
});

closeModalBtn.addEventListener('click', ()=>{
    imagesModal.style.display = 'none';
});

//Mostrar el modal navbar.
const navModalBack = document.querySelector('.modal-navbar__background');
const closeModalNavBtn = document.querySelector('.modal-navbar__close-icon');
const headerMenuBtn = document.querySelector('.header__menu');

headerMenuBtn.addEventListener('click', ()=>{
    navModalBack.style.display = 'grid';
});

closeModalNavBtn.addEventListener('click', ()=>{
    navModalBack.style.display = 'none';
});

//Cambiar imagen con thumnail
let thumbnails = document.querySelectorAll('.gallery__thumbnail');
thumbnails = [...thumbnails]        //no necesario, pero interesante...

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', event=>{
        console.log(event.target.id);
        imageContainer.style.backgroundImage = `url('/img/image-product-${event.target.id}.jpg')`;
    });
});

//Cambiar imagen con thumnail MODAL
let modalthumbnails = document.querySelectorAll('.gallery-modal__thumbnail');
const modalImageContainer = document.querySelector('.gallery-modal__image-container');
modalthumbnails = [...modalthumbnails]        //no necesario, pero interesante...

modalthumbnails.forEach(modalthumbnail => {
    modalthumbnail.addEventListener('click', event=>{
        console.log(event.target.id.slice(-1));
        modalImageContainer.style.backgroundImage = `url('/img/image-product-${event.target.id.slice(-1)}.jpg')`;
    });
});

//Cambio imagen MODAL con previous-next.
const nextModalBtn = document.querySelector('.gallery-modal__next');
const previousModalBtn = document.querySelector('.gallery-modal__previous');

nextModalBtn.addEventListener('click', ()=>{
    changeNextImage(modalImageContainer);
});

previousModalBtn.addEventListener('click', ()=>{
    changePreviousImage(modalImageContainer);
});

//Check click.
function click() {
    console.log('click');
}

// FUNCIONES

function drawProductInModal() {
    productContainer.innerHTML = `
        <div class="cart-modal__checkout-container">
            <div class="cart-modal__details-container">
                <img class="cart-modal__image" src="./img/image-product-1.jpg" alt="">
                <div>
                    <p class="cart-modal__product">Nombre del producto</p>
                    <p class="cart-modal__price">$125 x0 <span>$0</span></p>
                </div>
                <img class="cart-modal__delete" src="./img/icon-delete.svg" alt="delete">
            </div>
            <button class="cart-modal__checkout">Checkout</button>
        </div>`;
    deleteProduct();
    let priceModal = document.querySelector('.cart-modal__price');
    priceModal.innerHTML = `$5.00 x${lastValue} <span>$${lastValue*5.00}</span>`;
}

function changeNextImage(imgContainer) {
    if (imgIndex == 4) {
        imgIndex = 1;
    } else {
        imgIndex++;
    }
    imgContainer.style.backgroundImage = `url('/img/image-product-${imgIndex}.jpg')`;
}

function changePreviousImage(imgContainer) {
    if (imgIndex == 1) {
        imgIndex = 4;
    } else {
        imgIndex--;
    }
    imgContainer.style.backgroundImage = `url('/img/image-product-${imgIndex}.jpg')`;
}