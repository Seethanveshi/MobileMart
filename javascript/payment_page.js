import { all_available_mobiles, ordered_items} from "./arrays.js";

let logined_email=JSON.parse(localStorage.getItem("logined_email"));

let OrderSummaryHtml=``;
display_order_summary();

export function display_order_summary(){
    let cart=JSON.parse(localStorage.getItem(`${logined_email}_cartItems`)) || [];

    let No_items=cart.length; 
    let total_MRP=0 , total_discount=0 , shipping_fee=0 , total_amount=0;

    cart.forEach((cart_product) =>{
        for(let i=0 ; i<all_available_mobiles.length ; i++){
            if(cart_product.mobileId===all_available_mobiles[i].General[1][1]){
                let price=parseInt((all_available_mobiles[i].price).replace(/,/g , ''));
                total_MRP+=((price)*(cart_product.qty)+(4000*cart_product.qty))
                total_amount+=(price*cart_product.qty);
                total_discount=(total_MRP-total_amount);

                break;
            }
        }
        
    })

    if(total_amount>500 || total_amount==0){
        shipping_fee=`<span class="amount">&#x20b9;79</span>
                    <span> FREE</span>`
    }
    else{
        shipping_fee=`<span class="amount-2">&#x20b9;79</span>`
        total_amount+=79;
    }

    OrderSummaryHtml=`
        <div class="price-details">PRICE DETAILS <span>(${No_items} Items)</span></div>
            <div class="total-mrp">
                <div>Total MRP</div>
                <div class="amount">&#x20b9;${total_MRP.toLocaleString("en-IN")}</div>
            </div>
            <div class="discount-on-mrp">
                <div>Discount on MRP</div>
                <div class="discount-amount">-&#x20b9;${total_discount.toLocaleString("en-IN")}</div>
            </div>
            <div class="platform-fee">
                <div>Platform Fee</div>
                <div class="platform-fee-amount">FREE</div>
            </div>
            <div class="shipping-fee">
                <div>Shipping Fee</div>
                <div class="shipping-fee-amount">
                    ${shipping_fee}
                </div>
            </div>
            <div class="total-amount">
                <div>Total Amount</div>
                <div>&#x20b9;${total_amount.toLocaleString("en-IN")}</div>
            </div>
            <div class="confirm-order">
                <button class="confirm-order-button">CONFIRM ORDER</button>
            </div>
        `

        let OrderSummary=document.querySelector('.order-summary');
        if(cart.length==0) OrderSummary.innerHTML=``;
        else OrderSummary.innerHTML=OrderSummaryHtml;

}

let payment_option=document.querySelector("input[name=payment-option]");
let confirm_order_button=document.querySelector(".confirm-order-button");
payment_option.addEventListener("change" , (event)=>{
    event.preventDefault();
    confirm_order_button.style.display="inline-block";
 
})

confirm_order_button.addEventListener("click" , ()=>{
    let payment_page=document.querySelector(".payment-page");
    let temporery_ordered_items=JSON.parse(localStorage.getItem(`${logined_email}_cartItems`));
    let temporery_address=JSON.parse(localStorage.getItem("temporary_address"));
    localStorage.setItem(`${logined_email}_cartItems` , JSON.stringify([]));
    let ordered_items=JSON.parse(localStorage.getItem(`${logined_email}_ordered_items`)) || [];
    temporery_ordered_items.forEach((items) =>{
        let deliverydate=getDeliveryDate(items.mobileId);
        let temporery_ordered_object={
            oredered_id:items.mobileId,
            address:temporery_address,
            qty:items.qty,
            deliverydate:deliverydate
        }
        ordered_items.push(temporery_ordered_object);
    })
    localStorage.setItem(`${logined_email}_ordered_items` , JSON.stringify(ordered_items));
    payment_page.innerHTML=`<div style="display: flex; flex-direction: column; align-items: center; justify-content:center;">
        <div class="green-tick-block">
            <img src="images/green-color-tick.png">
        </div>
        <div>
            <div>Your Order Placed Successfully</div>
        </div>
        <div style="margin-top: 40px;;">
            <a href="Home.html"><button class="home-page-button">HOME PAGE</button></a>
        </div>
    </div>`;
})

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