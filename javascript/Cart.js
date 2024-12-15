import { display_order_summary } from './Order_summary.js';

import { all_available_mobiles } from "./arrays.js";

let logined_email=JSON.parse(localStorage.getItem("logined_email"));



export let cart = JSON.parse(localStorage.getItem(`${logined_email}_cartItems`)) || [];
console.log(cart);

let CartHtmlElement = ``;
let matched;


display_cart();

function display_cart(){
    CartHtmlElement = ``;
    let new_cart = JSON.parse(localStorage.getItem(`${logined_email}_cartItems`)) || [];
    if(new_cart.length==0){
        CartHtmlElement=
        `<div style="display:flex; flex-direction: column; align-items: center; height:60vh ; justify-content: center;">
            <div class="empty-cart-block">
                <img src="images/empty-cart (2).png">
                <div>There is nothing in your Cart. Let's add some items</div>
            </div>
            <div style="margin-top: 40px;;">
                <a href="Home.html"><button class="home-page-button">HOME PAGE</button></a>
            </div>
        </div>
        `;
        let full_page=document.querySelector(".container");
        full_page.innerHTML=CartHtmlElement;
    }
    else{
        new_cart.forEach((cart_product) => {
            let mobileId = cart_product.mobileId;
            let qty=cart_product.qty;
            console.log(mobileId);
            all_available_mobiles.forEach((mobiles) => {
                if (mobileId === mobiles.General[1][1]) {
                    matched = mobiles;
                }
            });
            if (matched) {
                let price=parseInt((matched.price).replace(/,/g , ''));
                let MRP=(price+4000).toLocaleString("en-IN");
                let discount=((price+4000-price)/(price+4000)*100).toFixed(2);
                let deliveryDate=getDeliveryDate((matched.General[1][1].length)%2);
    
                CartHtmlElement += `
                    <div class="cart-product-information js-cart-product-${matched.General[1][1]}">
                        <div class="cart-product-image">
                            <img class="cart-image" src="${matched.image}">
                        </div>
                        <div class="cart-product-details">
                            <p class="cart-name">${matched.name}</p>
                            <div class="cart-price-details">
                                <div class="cart-price">&#x20b9;${matched.price}</div>
                                <div class="cart-actual-price">&#x20b9;${MRP}</div>
                                <div class="cart-discount">${discount}%</div>
                            </div>
                            <div style="display:flex; align-items: center; gap:1rem;">
                                <div class="cart-product-qty">Qty: 
                                    <button class="minus-button" data-cart-id="${matched.General[1][1]}">-</button>${qty}<button class="plus-button" data-cart-id="${matched.General[1][1]}">+</button>
                                </div>
                                <div class="cart-update-delete-button">
                                    <button class="cart-delete-button js-cart-delete-button" data-cart-id="${matched.General[1][1]}">Remove</button>
                                </div>
                            </div>
                            
                        </div>

                        <div style="margin:15px;">Delivery by ${deliveryDate}</div>
                        
                    </div>
                `;
            }
        });

        let AllCartProducts = document.querySelector('.js-cart-products');
    
        if (AllCartProducts) {
            AllCartProducts.innerHTML = CartHtmlElement;
        }

        display_order_summary();

        let cart_delete_button=document.querySelectorAll('.js-cart-delete-button');

        cart_delete_button.forEach((button) =>{
            button.addEventListener('click' , ()=>{
                let cartId=button.dataset.cartId;
                removeItem(cartId);
                display_cart();
                display_order_summary();

            })
        });

        let plus_button=document.querySelectorAll('.plus-button');
        let minus_button=document.querySelectorAll('.minus-button');

        plus_button.forEach((p_button) =>{
            p_button.addEventListener("click" , ()=>{
                let id=p_button.dataset.cartId;
                Enter_quantity(id , "plus");
            })
        })
        minus_button.forEach((m_button) =>{
            m_button.addEventListener("click" , ()=>{
                let id=m_button.dataset.cartId;
                Enter_quantity(id , "minus");
            })
        })


    }
    
}

function removeItem(cartId){
    let newCart=[];
    cart.forEach((product) =>{
        if(cartId!=product.mobileId){
            newCart.push(product);
        }
    })
    cart=newCart;

    localStorage.setItem(`${logined_email}_cartItems` , JSON.stringify(cart));

    return ;

}

function Enter_quantity(cartId , value){
    cart.forEach((product)=>{
        if(product.mobileId==cartId){
            if(value=="plus") product.qty+=1;
            else if(value=="minus"){
                if(product.qty>=2) product.qty-=1;
                else removeItem(cartId);
            }
        }
    })
    localStorage.setItem(`${logined_email}_cartItems` , JSON.stringify(cart));
    display_cart();
}


export function getDeliveryDate(num){
    const deliverydate=new Date();
    deliverydate.setDate(deliverydate.getDate()+(num+7));

    const weeks=['SUN' , 'MON' , 'TUE' , 'WED' , 'THU' , 'FRI' , 'SAT'];
    const months=['JAN' , 'FEB' , 'MAR' , 'APR' , 'MAY' , 'JUN' , 'JUL' , 'AUG' , 'SEP' , 'OCT' , 'NOV' , 'DEC'];

    const day=weeks[deliverydate.getDay()];
    const date=deliverydate.getDate();
    const month=months[deliverydate.getMonth()];
    const year=deliverydate.getFullYear();

    return `${day} | ${date} ${month} ${year}`;

}

let logined_name=JSON.parse(localStorage.getItem("logined_name"));
let profile_block=document.querySelector(".profile-block");
if(logined_name=="Login/SignUp"){
    profile_block.innerHTML=`
        <a class="profile-button" href="index.html">
            <img src="images/profile-image.svg">
            <div class="logined-name">Login/SignUp</div>
        </a>
    `;
}
else{
    profile_block.innerHTML=`
        <button class="profile-button">
            <img src="images/profile-image.svg">
            <div class="logined-name">${logined_name}</div>
            <div class="cap"><img src="images/greater-than-symbol.jpg"></div>
            <div class="profile-more-information">
            <div class="my-orders-block">
                <a href="my_orders.html" style="text-decoration: none;"><div class="my-orders" style="display: flex; color:black; margin-left:8px;"><img style="width:1.5rem; height:1.5rem; margin-right:4px;" src="images/parcel-symbol.png"> My Orders</div></a>
            </div>
            <div class="profile-logout-block">
                <a style="text-decoration: none;" href="index.html"><div class="profile-logout" style="display: flex; color:black; margin-left:8px;"><img style="width:1.5rem; height:1.5rem; margin-right:4px;" src="images/logout-symbol.webp">Logout</div></a>
            </div>
            </div>
        </button>
    `;
}

let searched_mobiles=document.querySelector(".search-input");
searched_mobiles.value="";
let search_button=document.querySelector(".search-button");
search_button.addEventListener("click" , Performsearch);
searched_mobiles.addEventListener("keydown" , (Event)=>{
    if(Event.key=='Enter'){
        Performsearch();
    }
})

function Performsearch(){
    let search_name=searched_mobiles.value;
    localStorage.setItem('searchedname' , JSON.stringify(search_name));
    search_name=search_name.toLowerCase();
    search_name=search_name.replace(/\s+/g , "");
    console.log(search_name);
    let filtered_mobiles=all_available_mobiles.filter(searchmobile =>
        searchmobile.name.toLowerCase().replace(/\s+/g , "").includes(search_name)
    )
    localStorage.setItem('clickedbutton' , JSON.stringify(filtered_mobiles));
    window.location.href="mobiles.html";
}