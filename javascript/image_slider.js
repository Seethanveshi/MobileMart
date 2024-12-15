let slider=document.querySelectorAll('.slider');

let c=0 , num=0;

slider.forEach((images) =>{
    images.style.left=`${c*100}%`;
    c+=1;
})

let prev=document.querySelector('.prev');
let next=document.querySelector('.next');

prev.addEventListener('click' , ()=>{
    changeslide(-1);
})

next.addEventListener('click' , ()=>{
    changeslide(1);
})

function changeslide(val){
    num+=(val)
    if(num<0){
        num=2;
    }
    else if(num>=3){
        num=0;
    }

    slider.forEach((images) =>{
        images.style.transform=`translateX(-${num*100}%)`;
    })    

}