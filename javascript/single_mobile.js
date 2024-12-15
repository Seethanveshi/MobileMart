import { all_available_mobiles} from "./arrays.js";
let logined_email=JSON.parse(localStorage.getItem("logined_email"));


let cart=JSON.parse(localStorage.getItem(`${logined_email}_cartItems`)) || [];

let mobilename=JSON.parse(localStorage.getItem('singleMobile'));

single_mobile_display(mobilename);

export function single_mobile_display(mobile_name){
    all_available_mobiles.forEach((mobiles) =>{
    
        if(mobiles.name==mobile_name){
            HTMLElement=`
                <div>
                    <div style="position: sticky; top:5rem;">
                        <div class="single-mobile-block">
                            <div class="single-mobile-img">
                                <img src="${mobiles.image}">
                            </div>
                        </div>
                        <div class="buy-cart-buttons">
                            <button class="buy-now-button" data-mobile-id=${mobiles.General[1][1]}>BUY NOW</button>
                            <button class="add-to-cart-button" data-mobile-id=${mobiles.General[1][1]}>ADD TO CART</button>
                        </div>
                    </div>
                </div>
                <div style="flex:2;" class="single-mobile-details-block">
                    <div class="single-mobile-details">
                        <div class="single-mobile-name">${mobiles.name} (${mobiles.General[3][1]})</div> 
                        <div class="single-mobile-rating">${mobiles.Ratings[0][1]} <img style="height:1rem; width:1rem; margin:0.2rem 0rem 0rem 0rem" src="images/star-imgae.svg"> </div>
                        <div class="single-mobile-price">&#8377;${mobiles.price}</div>
                        <div style="display:flex; gap:2rem; margin-top:2rem;">
                            <div style="font-size:1.1rem;">Highlights</div>
                            <div style="display:flex; flex-direction: column; gap:0.5rem; margin-left:0.5rem;">
                            <div class="single-mobiole-storage" style="display: flex; align-items: center;"><div class="bullet-point"></div>${mobiles.Memory_and_Storage_Features[1][1]} | ${mobiles.Memory_and_Storage_Features[0][1]}</div>
                            <div class="single-mobile-display" style="display: flex; align-items: center;"><div class="bullet-point"></div>${mobiles.Display_Features[0][1]} ${mobiles.Display_Features[1][1]} ${mobiles.Display_Features[2][1]}</div>
                            <div class="single-mobile-camera" style="display: flex; align-items: center;"><div class="bullet-point"></div> ${mobiles.Camera[1][1]} | ${mobiles.Camera[2][1]} </div>
                            <div class="single-mobile-processor" style="display: flex; align-items: center;"><div class="bullet-point"></div>${mobiles.Os_and_Processor_Features[0][1]} ${mobiles.Os_and_Processor_Features[1][1]} ${mobiles.Os_and_Processor_Features[2][1]}</div>
                        </div>
                    </div>

                    <div style="border:1px solid , rgba(128, 128, 128, 0.458); margin:2rem 0rem; width:100%;" class="single-mobile-specifications-block">
                        <table>
                            <div>
                                <div style="font-size:1.8rem; padding:1rem;">Specifications</div>
                            </div>
                `;

            for (let category in mobiles) {
                // Skip the non-category properties
                if (category == 'name' || category == 'image' || category == 'price' || category=='Ratings') continue;

                HTMLElement += `
                    <thead>
                        <tr>
                            <th colspan="2" style="border-top: 1px solid rgba(128, 128, 128, 0.458); font-size: 1.5rem; padding: 1rem;">${category}</th>
                        </tr>
                    </thead>
                    <tbody>
                `;
        
                // Add each specification in the category
                mobiles[category].forEach(spec => {
                    HTMLElement += `
                        <tr>
                            <td style="padding: 0.5rem; list-style-type: none;">${spec[0]}</td>
                            <td style="padding: 0.5rem; list-style-type: none;">${spec[1]}</td>
                        </tr>
                    `;
                });
                HTMLElement += `
                    </tbody>`;

            }
            
            HTMLElement += `</table></div>`;
        }
    })


    document.querySelector('.single-mobile').innerHTML=HTMLElement;
}


let add_to_cart_button=document.querySelector(".add-to-cart-button");
add_to_cart_button.addEventListener("click" , ()=>{
    let mobileId=add_to_cart_button.dataset.mobileId;
    let qty=1 , exists=0;

    cart.forEach((mobi) =>{
        if(mobi.mobileId==mobileId){
            mobi.qty+=1;
            qty=mobi.qty;
            exists=1;
        }
    })

    if(exists==0){
        cart.push({
            mobileId:mobileId,
            qty:qty
        });
    }
    localStorage.setItem(`${logined_email}_cartItems` , JSON.stringify(cart));
    display_cart_qty(cart.length);
    let product_img = returnimg(mobileId);
    console.log(product_img);
    let tooltip=document.querySelector(".add-to-cart-tooltip");
    tooltip.innerHTML=`<div style="width:2rem; height:2rem; margin-right:5px;"><img style="border-radius:2px;" src="${product_img}"></div><div>Added to Cart</div>`
    tooltip.classList.add("js-add-to-cart-tooltip");
    setTimeout(()=>{
        tooltip.classList.remove("js-add-to-cart-tooltip");
    } , 3000);

})


let buy_now_button=document.querySelector(".buy-now-button");
buy_now_button.addEventListener("click" , ()=>{
    let mobileId=buy_now_button.dataset.mobileId;
    let qty=1 , exists=0;

    cart.forEach((mobi) =>{
        if(mobi.mobileId==mobileId){
            mobi.qty+=1;
            qty=mobi.qty;
            exists=1;
        }
    })

    if(exists==0){
        cart.push({
            mobileId:mobileId,
            qty:qty
        });
    }
    localStorage.setItem(`${logined_email}_cartItems` , JSON.stringify(cart));
    display_cart_qty(cart.length);
    window.location.href="Cart.html";
})

function returnimg(mobileids){
    let src="";
    all_available_mobiles.forEach(mobiles =>{
        // console.log(mobiles.General[1][1] , mobileids);
        if(mobiles.General[1][1]==mobileids){
            src=mobiles.image;
        }
    })
    return src;
}

display_cart_qty(cart.length);
function display_cart_qty(qty){
    let cart_qty=document.querySelector(".cart-qty");

    if(qty==0){
        cart_qty.classList.remove("js-cart-qty");
    }
    else{
        cart_qty.classList.add("js-cart-qty");
        cart_qty.innerHTML=qty;
    }
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
