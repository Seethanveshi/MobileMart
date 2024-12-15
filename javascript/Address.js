import { statesAnddistricts } from "./arrays.js";
let logined_email=JSON.parse(localStorage.getItem("logined_email"));


let stateDropdown = document.getElementById("states");
if(stateDropdown) stateDropdown.addEventListener("change", StateSelected);

function StateSelected() {
    const selectedState = stateDropdown.value;
    const districtContainer = document.getElementById("districts");

    districtContainer.innerHTML = `<option value="">Select District</option`;

    if (!selectedState) return;
    const stateData = statesAnddistricts.find((s) => s.state === selectedState);
    
    if (stateData) {
        console.log(stateData);
        stateData.districts.forEach((districtName) => {
            const option = document.createElement("option");
            option.value = districtName;
            option.textContent = districtName;
            districtContainer.appendChild(option);
        });
    }

}


const address_form=document.querySelector(".address-form");
if(address_form) address_form.addEventListener("submit" , (event)=>{
    event.preventDefault();
    const full_name=document.getElementById("full-name").value;
    const mobile_number=document.getElementById("mobile-number").value;
    const address=document.getElementById("address").value;
    const town_city=document.getElementById("town-city").value;
    const landmark=document.getElementById("landmark").value;
    const state=document.getElementById("states").value;
    const district=document.getElementById("districts").value;
    const pincode=document.getElementById("pincode").value;
    const full_address={
        full_name:full_name,
        mobile_number:mobile_number,
        address:address,
        town_city:town_city,
        landmark:landmark,
        state:state,
        district:district,
        pincode:pincode
    }
    let updated_addresses=JSON.parse(localStorage.getItem("addresses")) || [];
    updated_addresses.push(full_address);
    localStorage.setItem("addresses"  , JSON.stringify(updated_addresses));

    window.location.href='Address.html';
})

let updated_addresses=JSON.parse(localStorage.getItem("addresses")) || [];

let addresses_field=document.querySelector(".addresses-field");

let addresses_html=``;
let c=0;
updated_addresses.forEach((address) =>{
    c+=1;
    addresses_html+=`
        <div style="display: flex; gap:4px; width:33%; border:1px solid grey; padding:1rem;">
            <div>
                <input class="radio-for-addresses" type="radio" value="${c}" name="address">
            </div>
            <div style="display: flex; flex-direction: column; gap:0.5rem;">
                <div style="display:flex; gap:0.5rem">
                    <div>${address.full_name} |</div>
                    <div>${address.mobile_number}</div>
                </div>
                <div style="color:grey">${address.address}, ${address.landmark}, ${address.town_city}, ${address.district}, ${address.state}, india, ${address.pincode}. </div>
                <div style="display:flex; align-items: center; justify-content: right;">
                    <a href="payment_page.html"><button class="delivery-here-button delivery-here-button-${c}" data-id=${c}>DELIVERY HERE</button></a>
                </div>
            </div>
        </div>    
    `
})

if(addresses_field) addresses_field.innerHTML=addresses_html;



let radio_for_addresses=document.querySelectorAll('input[name="address"]');
radio_for_addresses.forEach((radio) =>{
    radio.addEventListener("change" , ()=>{
        let selected_option=document.querySelector('input[name="address"]:checked').value;
        let delivery_here_buttons=document.querySelectorAll(".delivery-here-button");
        let v=0;
        delivery_here_buttons.forEach((buttons) =>{
            v+=1;
            let delivery_here_button=document.querySelector(`.delivery-here-button-${v}`);
            if(buttons.dataset.id==selected_option){
                delivery_here_button.style.display="inline-block";
            }
            else{
                delivery_here_button.style.display="none";
            }
        })
    })
})

let delivery_here_buttons=document.querySelectorAll(".delivery-here-button");
let v=0;
delivery_here_buttons.forEach((buttons) =>{
    v+=1;
    let delivery_here_button=document.querySelector(`.delivery-here-button-${v}`);
    delivery_here_button.addEventListener("click" , ()=>{
        let selected_option=document.querySelector('input[name="address"]:checked').value;
        let temporery_address=updated_addresses[selected_option-1];
        localStorage.setItem("temporary_address" , JSON.stringify(temporery_address));
    })
})
