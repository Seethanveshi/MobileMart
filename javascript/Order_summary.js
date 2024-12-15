import { all_available_mobiles } from "./arrays.js";

let logined_email=JSON.parse(localStorage.getItem("logined_email"));

let OrderSummaryHtml=``;
display_order_summary();

export function display_order_summary(){
    let cart=JSON.parse(localStorage.getItem(`${logined_email}_cartItems`)) || [];

    let No_items=cart.length; 
    let total_MRP=0 , total_discount=0 , shipping_fee=0 , total_amount=0;

    if(No_items>0){
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
                <div class="place-order">
                    <div style="width:100%;"><button class="place-order-button">PLACE ORDER</button></div>
                </div>
            `

            let OrderSummary=document.querySelector('.order-summary');
            if(cart.length==0) OrderSummary.innerHTML=``;
            else OrderSummary.innerHTML=OrderSummaryHtml;

            let placeorder_button=document.querySelector(".place-order-button");
            placeorder_button.addEventListener("click" , ()=>{
                console.log(logined_email);
                if(logined_email=='guest_email'){
                    window.location.href="index.html";
                }
                else{
                    window.location.href="address.html";
                }
            })
        }
}