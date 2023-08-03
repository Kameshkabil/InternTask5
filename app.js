const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart')
const closeCart = document.querySelector('#close-cart')
const removeCart = document.getElementById('remove-cart')


cartIcon.onclick= function(){
    cart.classList.add('active');
}

closeCart.onclick=function(){
    cart.classList.remove('active');
}

if(document.readyState=='loading'){
    document.addEventListener("DOMContentLoaded",ready);
}else{
    ready()
}

function ready(){
    let removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for(let i=0 ; i<removeCartButtons.length;i++){
        let button = removeCartButtons[i];
        button.addEventListener('click',removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity');
    for(let i =0 ;i<quantityInputs.length;i++){
        let input = quantityInputs[i]
        input.addEventListener('change',quantityChanged);
    }

    let addCart = document.getElementsByClassName('add-cart');
    for(let i =0;i<addCart.length;i++){
        let button = addCart[i];
        button.addEventListener('click',addCartClicked);
    }

    document.getElementsByClassName('btn-buy')[0].addEventListener('click',buyButtonClicked);
}

function buyButtonClicked(){
    alert("Your Order is Placed Successfully");
    let cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}


function removeCartItem(event){
    let buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal();
}

function quantityChanged(event){
    let input = event.target;
    if(isNaN(input.value) || input.value  <= 0){
        input.value=1;
    }
    updateTotal();
}


function addCartClicked(event){
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    let price = shopProducts.getElementsByClassName('price')[0].innerText;
    let productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title,price,productImg);
    updateTotal();
}

function addProductToCart(title,price,productImg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box')
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for(let i =0;i<cartItemsNames.length;i++){
        if(cartItemsNames[i].innerHTML==title){
        alert('You already add item to cart');
        return;
        }
    } 

let cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">
<div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
</div>
<!-- remove -->
<i class="fa fa-trash cart-remove"></i>`

cartShopBox.innerHTML=cartBoxContent
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem)
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChanged)
}

function updateTotal(){
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for(let i=0;i<cartBoxes.length;i++){
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        let price = parseFloat(priceElement.innerText.replace("$",""))
        let quantity = quantityElement.value;
        total=total+(price * quantity);
    }
        total=total.toFixed(2);
        document.getElementsByClassName('total-price')[0].innerText="$"+total;
   
}

