import {flagship_mobiles, new_arrival_mobiles , mid_range_mobiles , budget_mobiles, all_available_mobiles} from './arrays.js';
import { samsung_mobiles , realme_mobiles , moto_mobiles , poco_mobiles , redmi_mobiles , oppo_mobiles , iphone_mobiles , nothing_mobiles , oneplus_mobiles , vivo_mobiles} from './arrays.js';
import { see_all_button_clicked } from './mobiles.js';
import {single_mobile_display} from './single_mobile.js';

let logined_email=JSON.parse(localStorage.getItem("logined_email"));
let temp=JSON.parse(localStorage.getItem(`${logined_email}_ordered_items`)) || [];
localStorage.setItem('searchedname' , JSON.stringify(""));

let new_arrival_scrolling=0;
let flagship_scrolling=0;
let mid_range_scrolling=0;
let budget_scrolling=0;

display_scrolling_mobiles(new_arrival_mobiles , "new-arrival");
display_scrolling_mobiles(flagship_mobiles , "flagship");
display_scrolling_mobiles(mid_range_mobiles , "mid-range");
display_scrolling_mobiles(budget_mobiles , "budget");


let slides=document.querySelectorAll('.slide');
let num=0;
showslides(0);


setInterval(()=>{
    showslides(1);
},3000);

document.querySelector('.dot-1').addEventListener('click' , ()=>{
    dotclick(0);
})
document.querySelector('.dot-2').addEventListener('click' , ()=>{
    dotclick(1);
})
document.querySelector('.dot-3').addEventListener('click' , ()=>{
    dotclick(2);
})

document.querySelector('.next').addEventListener('click' , ()=>{
    showslides(1);
})
document.querySelector('.prev').addEventListener('click' , ()=>{
    showslides(-1);
})

document.querySelector('.new-arrivals-next').addEventListener('click' , ()=>{
    scrolling(1 , "new-arrival");
})
document.querySelector('.new-arrivals-prev').addEventListener('click' , ()=>{
    scrolling(-1 , "new-arrival");
})

document.querySelector('.flagship-next').addEventListener('click' , ()=>{
    scrolling(1 , "flagship");
})
document.querySelector('.flagship-prev').addEventListener('click' , ()=>{
    scrolling(-1 , "flagship");
})

document.querySelector('.mid-range-next').addEventListener('click' , ()=>{
    scrolling(1 , "mid-range");
})
document.querySelector('.mid-range-prev').addEventListener('click' , ()=>{
    scrolling(-1 , "mid-range");
})

document.querySelector('.budget-next').addEventListener('click' , ()=>{
    scrolling(1 , "budget");
})
document.querySelector('.budget-prev').addEventListener('click' , ()=>{
    scrolling(-1 , "budget");
})


export function dotclick(n){
    num=n;
    showslides(0);
}

function showslides(n){
    num+=(n);
    if(num<0){
        num=2;
    }
    else if(num>=3){
        num=0;
    }

    slides.forEach((slide) =>{
        slide.style.transform=`translateX(-${num*100}%)`;
        let dotElement1=document.querySelector('.dot-1');
        let dotElement2=document.querySelector('.dot-2');
        let dotElement3=document.querySelector('.dot-3');

        if(num==0){
            dotElement1.innerHTML='&#9679;';
            dotElement2.innerHTML='&#9675;';
            dotElement3.innerHTML='&#9675;';
        }
        else if(num==1){
            dotElement1.innerHTML='&#9675;';
            dotElement2.innerHTML='&#9679;';
            dotElement3.innerHTML='&#9675;';
        }
        else{
            dotElement1.innerHTML='&#9675;';
            dotElement2.innerHTML='&#9675;';
            dotElement3.innerHTML='&#9679;';
        }
    })
}


export function storeinlocalstorage(name){
    localStorage.setItem('stored' , JSON.stringify(`{name}`));
}



export function scrolling(n , section){
    let percentage=0;
    if(section=='new-arrival'){
        new_arrival_scrolling+=n;
        new_arrival_scrolling = (new_arrival_scrolling>2) ? 2 : new_arrival_scrolling;
        new_arrival_scrolling = (new_arrival_scrolling<0) ? 0 : new_arrival_scrolling; 
        percentage=new_arrival_scrolling;
    }
    else if(section=='flagship'){
        flagship_scrolling+=n;
        flagship_scrolling = (flagship_scrolling>2) ? 2 : flagship_scrolling;
        flagship_scrolling = (flagship_scrolling<0) ? 0 : flagship_scrolling; 
        percentage=flagship_scrolling;
    }
    else if(section=='mid-range'){
        mid_range_scrolling+=n;
        mid_range_scrolling = (mid_range_scrolling>2) ? 2 : mid_range_scrolling;
        mid_range_scrolling = (mid_range_scrolling<0) ? 0 : mid_range_scrolling; 
        percentage=mid_range_scrolling;
    }
    else if(section=='budget'){
        budget_scrolling+=n;
        budget_scrolling = (budget_scrolling>2) ? 2 : budget_scrolling;
        budget_scrolling = (budget_scrolling<0) ? 0 : budget_scrolling; 
        percentage=budget_scrolling;
    }
    let Element=document.querySelector(`.js-${section}-mobiles`);
    if(percentage>2){
        percentage=2;
    }
    else if(percentage<0){
        percentage=0;
    }
    Element.style.transform=`translateX(-${percentage*10}%)`;
}


function display_scrolling_mobiles(mobiles_array , classname){

    let mobilesHtml=``;

    mobiles_array.forEach((mobiles) =>{
        mobilesHtml+=
        `
        <div class="for-single-mobile" data-mobile-name="${mobiles.name}">
            <a class="${classname}-mobile-block">
                <div class="${classname}-mobiles-img-block">
                    <img src="${mobiles.image}">
                </div>
                <div style="display:flex; flex-direction:column; text-align: center; margin-top:0.5rem; gap:3px;">
                    <div>${mobiles.name}</div>
                    <div style="font-weight:bold;">₹${mobiles.price}</div>
                </div>
            </a>
        </div>
        `
    })

    mobilesHtml+=`<button class="${classname}-see-all-button">See All</button>`;

    let mobilesElement=document.querySelector(`.js-${classname}-mobiles`);

    mobilesElement.innerHTML=mobilesHtml;
}


let new_arrivals_seeallbutton=document.querySelector(".new-arrival-see-all-button");
let flagships_seeallbutton=document.querySelector(".flagship-see-all-button");
let mid_ranges_seeallbutton=document.querySelector(".mid-range-see-all-button");
let budgets_seeallbutton=document.querySelector(".budget-see-all-button");

new_arrivals_seeallbutton.addEventListener("click" , ()=>{
    localStorage.setItem('clickedbutton' , JSON.stringify(new_arrival_mobiles));
    window.location.href='http://127.0.0.1:5501/mobiles.html';
});
flagships_seeallbutton.addEventListener("click" , ()=>{
    localStorage.setItem('clickedbutton' , JSON.stringify(flagship_mobiles));
    window.location.href='http://127.0.0.1:5501/mobiles.html';
});
mid_ranges_seeallbutton.addEventListener("click" , ()=>{
    localStorage.setItem('clickedbutton' , JSON.stringify(mid_range_mobiles));
    window.location.href='http://127.0.0.1:5501/mobiles.html';
});
budgets_seeallbutton.addEventListener("click" , ()=>{
    localStorage.setItem('clickedbutton' , JSON.stringify(budget_mobiles));
    window.location.href='http://127.0.0.1:5501/mobiles.html';
});


let mobilebutton=document.querySelectorAll(".mobiles");

mobilebutton.forEach((mobile) =>{
    mobile.addEventListener("click" , ()=>{
        let mobile_name=mobile.dataset.mobilesName;
        if(mobile_name=="samsung"){
            localStorage.setItem('clickedbutton' , JSON.stringify(samsung_mobiles));
            window.location.href='http://127.0.0.1:5501/mobiles.html';
        }
        else if(mobile_name=="realme"){
            localStorage.setItem('clickedbutton' , JSON.stringify(realme_mobiles));
            window.location.href='http://127.0.0.1:5501/mobiles.html';
        }
        else if(mobile_name=="moto"){
            localStorage.setItem('clickedbutton' , JSON.stringify(moto_mobiles));
            window.location.href='http://127.0.0.1:5501/mobiles.html';
        }
        else if(mobile_name=="poco"){
            localStorage.setItem('clickedbutton' , JSON.stringify(poco_mobiles));
            window.location.href='http://127.0.0.1:5501/mobiles.html';
        }
        else if(mobile_name=="redmi"){
            localStorage.setItem('clickedbutton' , JSON.stringify(redmi_mobiles));
            window.location.href='http://127.0.0.1:5501/mobiles.html';
        }
        else if(mobile_name=="oppo"){
            localStorage.setItem('clickedbutton' , JSON.stringify(oppo_mobiles));
            window.location.href='http://127.0.0.1:5501/mobiles.html';
        }
        else if(mobile_name=="iphone"){
            localStorage.setItem('clickedbutton' , JSON.stringify(iphone_mobiles));
            window.location.href='http://127.0.0.1:5501/mobiles.html';
        }
        else if(mobile_name=="nothing"){
            localStorage.setItem('clickedbutton' , JSON.stringify(nothing_mobiles));
            window.location.href='http://127.0.0.1:5501/mobiles.html';
        }
        else if(mobile_name=="oneplus"){
            localStorage.setItem('clickedbutton' , JSON.stringify(oneplus_mobiles));
            window.location.href='http://127.0.0.1:5501/mobiles.html';
        }
        else if(mobile_name=="vivo"){
            localStorage.setItem('clickedbutton' , JSON.stringify(vivo_mobiles));
            window.location.href='http://127.0.0.1:5501/mobiles.html';
        }
    })
})

let for_single_mobile=document.querySelectorAll('.for-single-mobile');

for_single_mobile.forEach((mobile) =>{
    mobile.addEventListener("click" , ()=>{
        let mobile_name=mobile.dataset.mobileName;
        localStorage.setItem('singleMobile' , JSON.stringify(mobile_name));
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
                <a href="my_orders.html" style="text-decoration: none;" href=""><div class="my-orders" style="display: flex; color:black; margin-left:8px;"><img style="width:1.5rem; height:1.5rem; margin-right:4px;" src="images/parcel-symbol.png"> My Orders</div></a>
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
