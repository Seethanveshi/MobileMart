import {flagship_mobiles, new_arrival_mobiles , mid_range_mobiles , budget_mobiles , all_available_mobiles} from './arrays.js';

let mobiles=JSON.parse(localStorage.getItem('clickedbutton'));

let logined_email=JSON.parse(localStorage.getItem('logined_email'));


if(mobiles) see_all_button_clicked(mobiles);

export function see_all_button_clicked(mobiles){

    let mobileHtml=``;
    if(mobiles.length==0){
        mobileHtml=`<div style="text-align:center">No Mobiles Found</div>`;
    }
    mobiles.forEach((mobiles) =>{
        mobileHtml+=
        `
            <div class="mobile-block mobiles-for-single-mobile" data-mobile-name="${mobiles.name}" >
                <div class="image-block">
                    <img style="object-fit=cover" src=${mobiles.image}>
                </div>
                <div class="mobile-details">
                    <div class="mobile-name">${mobiles.name}</div> 
                    <div class="mobile-rating">${mobiles.Ratings[0][1]} <img style="height:1rem; width:1rem; margin:0.2rem 0rem 0rem 0rem" src="images/star-imgae.svg"> </div>
                    <div class="mobile-price">&#8377;${mobiles.price}</div>
                    <div style="display:flex; pointer-events:none; flex-direction: column; gap:0.5rem; margin-left:0.5rem;">
                        <div class="mobiole-storage" style="display: flex; align-items: center;"><div class="bullet-point"></div>${mobiles.Memory_and_Storage_Features[0][1]} | ${mobiles.Memory_and_Storage_Features[0][1]}</div>
                        <div class="mobile-display" style="display: flex; align-items: center;"><div class="bullet-point"></div>${mobiles.Display_Features[0][1]} ${mobiles.Display_Features[1][1]} ${mobiles.Display_Features[2][1]}</div>
                        <div class="mobile-camera" style="display: flex; align-items: center;"><div class="bullet-point"></div> ${mobiles.Camera[1][1]}  ${mobiles.Camera[2][1]} </div>
                        <div class="mobile-processor" style="display: flex; align-items: center;"><div class="bullet-point"></div>${mobiles.Os_and_Processor_Features[0][1]} ${mobiles.Os_and_Processor_Features[1][1]} ${mobiles.Os_and_Processor_Features[2][1]}</div>
                    </div>
                </div>
            </div>
        `
    })


    let mobilesElement=document.querySelector('.required-mobiles');
    mobilesElement.innerHTML=mobileHtml;
}

let for_single_mobile=document.querySelectorAll('.mobiles-for-single-mobile');

for_single_mobile.forEach((mobile) =>{
    mobile.addEventListener("click" , ()=>{
        let mobilename=mobile.dataset.mobileName;
        localStorage.setItem('singleMobile' , JSON.stringify(mobilename));
        window.open('http://127.0.0.1:5501/single_mobile.html' , "_blank");
    })
})

let cart=JSON.parse(localStorage.getItem(`${logined_email}_cartItems`)) || [];

let cart_qty=document.querySelector(".cart-qty");

if(cart.length==0){
    cart_qty.classList.remove("js-cart-qty");
}
else{  
    cart_qty.classList.add("js-cart-qty");
    cart_qty.innerHTML=cart.length;
}

let logined_name=JSON.parse(localStorage.getItem("logined_name"));
let profile_block=document.querySelector(".profile-block");
if(logined_name=="Login/SignUp"){
    profile_block.innerHTML=`
        <a class="profile-button" href="Login&Sign-page.html">
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
                <a href="my_orders.html" style="text-decoration: none;" href=""><div class="my-orders" style="display: flex; color:black; margin-left:8px;"><img style="width:1.5rem; height:1.5rem; margin-right:4px;" src="images/parcel-symbol.png"> My Orders</div></a>
            </div>
            <div class="profile-logout-block">
                <a style="text-decoration: none;" href="Login&Sign-page.html"><div class="profile-logout" style="display: flex; color:black; margin-left:8px;"><img style="width:1.5rem; height:1.5rem; margin-right:4px;" src="images/logout-symbol.webp">Logout</div></a>
            </div>
            </div>
        </button>
    `;
}

let searched_mobiles=document.querySelector(".search-input");
searched_mobiles.value="";
searched_mobiles.value=JSON.parse(localStorage.getItem('searchedname')) || " ";
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
    let filtered_mobiles=all_available_mobiles.filter(searchmobile =>
        searchmobile.name.toLowerCase().replace(/\s+/g , "").includes(search_name)
    )
    localStorage.setItem('clickedbutton' , JSON.stringify(filtered_mobiles));
    window.location.href="mobiles.html";
}