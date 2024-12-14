
let data = JSON.parse(localStorage.getItem('credentials')) || [];

localStorage.setItem("logined_name" , JSON.stringify("Login/SignUp"));
localStorage.setItem("logined_email" , JSON.stringify("guest_email"));

register_function();
login_function();
attachLoginEvent();


function register_function(){
   let register_button=document.querySelector('.js-SIGNUP-BUTTON');
   register_button.addEventListener('click' , ()=>{
    document.title='MobileMart/SignUp';
       let login_page=document.querySelector('.js-Login-page');
       login_page.innerHTML=
           `<div class="Login-form">
               <div class="WELCOME-BACK-TITLE">Welcome Back!</div>
               <div class="PARAGRAPH">Keep connect with us please login with your personal info</div>
               <button class="LOGIN-BUTTON js-login-button" type="button">Login</button>
           </div>`;
       login_page.classList.add('LOGIN-PAGE');
       login_page.classList.remove('Login-page');


       let signin_page=document.querySelector('.JS-SIGNUP-PAGE');
       signin_page.innerHTML=
        `<div class="Sign-form">
            <div class="welcome-back-title"></div>
            <div class="signup-title">Sign Up</div>
            <div class="registration-message"></div>
            <div class="signup-name-block">
                <div class="namemessage"></div>
                <input class="signup-name js-signup-name" name="signup-name" type="text" id="signup-name" placeholder="Full Name" required>           
            </div>
           <div class="signup-email-block">
               <input class="signup-email js-signup-email" name="signup-email" type="email" id="signup-email" placeholder="Email" required>           
                <div class="js-emailmessage"></div>
               </div>
           <div class="signup-password-block">
               <input class="signup-password js-signup-password" name="signup-password" type="password" id="signup-password" placeholder="Password" required>
           </div>
           <div class="signup-confirm-password-block">
                <div class="js-password-message"></div>
                <input class="signup-confirm-password js-signup-confirm-password" name="signup-confirm-password" type="password" id="signup-confirm-password" placeholder="Confirm Password" required>
            </div>
           <div class="signup-button-block">
               <button class="signup-button js-register" type="button">Register</button>
           </div>
           
       </div>`;
       signin_page.classList.add('Signup-page');
       signin_page.classList.remove('SIGNUP-PAGE');
       login_function();
       attachRegisterEvent();
   })
}


function login_function(){
    let login_button=document.querySelector('.js-login-button');
    login_button.addEventListener('click' , ()=>{
        document.title='MobileMart/Login';
        let login_page=document.querySelector('.js-Login-page');
        login_page.innerHTML=
            `<div class="Login-form">
                <div class="welcome-back-title">Welcome Back!</div>
                <div class="login-title">Login</div>
                <div class="login-message"></div>
                <div class="login-email-block">
                    <input class="login-email js-login-email" name="login-email" type="email" id="login-email" placeholder="Email" required>                
                </div>
                <div class="login-password-block">
                    <input class="login-password js-login-password" name="login-password" type="password" id="login-password" placeholder="Password" required>   
                </div>
                <div class="forget-password">
                    <button class="forget-password-button">Forget Password</button>
                </div>
                <div class="login-button-block">
                    <button class="login-button js-login-button" type="button">Login</button>
                </div>  
            </div>
            <div style="margin-top:4rem; color:green; font-weight: bold;">
                <a href="Home.html" style="text-decoration: none;">Continue without Login</a>
            </div>`;
        login_page.classList.add('Login-page');
        login_page.classList.remove('LOGIN-PAGE');

        let signup_page=document.querySelector('.JS-SIGNUP-PAGE');
        signup_page.innerHTML=
        `<div class="Sign-form">
            <div class="WELCOME-BACK-TITLE">Hello, User</div>
            <div class="PARAGRAPH">Enter your details and start journey with us</div>
            <button class="SIGNUP-BUTTON js-SIGNUP-BUTTON" type="button">Register</button>
        </div>`;
        signup_page.classList.add('SIGNUP-PAGE');
        signup_page.classList.remove('Signup-page');
        register_function();
        attachLoginEvent();

    })
}


let register_page=document.querySelector(".Sign-form");
register_page.addEventListener("keydown" , (Event)=>{
    if(Event.key=='Enter'){
        Loginintopage();
    }
});

function attachRegisterEvent() {
    let register=document.querySelector('.js-register');
    if (register) {
        register.addEventListener('click' , ()=>{
            Registerintopage();
        })
    }
}

function isValidEmail(Email){
    const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailpattern.test(Email);
}

function attachLoginEvent(){
    let login_button=document.querySelector('.js-login-button');
    login_button.addEventListener('click' , (event)=>{
        Loginintopage();
    })
}

let login_page=document.querySelector(".Login-form");
login_page.addEventListener("keydown" , (Event)=>{
    if(Event.key=='Enter'){
        Loginintopage();
    }
});

function Loginintopage(){
    let c=0;
    let login_email=document.querySelector('.js-login-email');
    let login_password=document.querySelector('.js-login-password');

    data.forEach((credentials) =>{
        if(credentials.email==login_email.value && credentials.password==login_password.value){
            let name=credentials.name;
            let email=credentials.email;
            localStorage.setItem("logined_name" , JSON.stringify(name));
            localStorage.setItem("logined_email" , JSON.stringify(email));
            window.location.href='Home.html';
            c=1;
        }
    });
    
    if(c==0){
        document.querySelector('.login-message').innerHTML='Invalid Credentials';
        document.querySelector('.login-message').style.color='red';
    }
}

function Registerintopage(){
    let c=0;
    let name=document.querySelector('.js-signup-name');
    let email=document.querySelector('.js-signup-email');
    let password=document.querySelector('.js-signup-password');
    let confirmpassword=document.querySelector('.js-signup-confirm-password');
    let emailmessage=document.querySelector('.js-emailmessage');

    if(name.value.length===0){
        document.querySelector('.namemessage').innerHTML='Enter Name';
        document.querySelector('.namemessage').style.color='red';
        c=1;
    }
    else{
        document.querySelector('.namemessage').innerHTML='';
    }
    if(isValidEmail(email.value)){
        emailmessage.innerHTML='Valid Email'; 
        emailmessage.style.color='green';
    }
    else{
        emailmessage.innerHTML='Invalid Email';
        emailmessage.style.color='red';
        c=1;

    }
    if(password.value.length===0 && confirmpassword.value.length===0 ){
        document.querySelector('.js-password-message').innerHTML='Enter Password';
        document.querySelector('.js-password-message').style.color='red';
        c=1;
    }
    else if(password.value!==confirmpassword.value){
        document.querySelector('.js-password-message').innerHTML='Password & Confirm Password not same';
        document.querySelector('.js-password-message').style.color='red';
        c=1;

    }
    else if(password.value===confirmpassword.value){
        document.querySelector('.js-password-message').innerHTML=''
    }

    if(c==0){
        let exists=0;
        data.forEach((Emails) =>{
            if(Emails.email==email.value){
                document.querySelector('.registration-message').innerHTML='An account with this email already exists.';
                document.querySelector('.registration-message').style.color='red';
                exists=1;
            }
        })
        if(exists==0){
            data.push({
                name:name.value,
                email:email.value,
                password:password.value
            });
            localStorage.setItem('credentials' , JSON.stringify(data));
            document.querySelector('.registration-message').innerHTML='Registration Completed Please Login';
            document.querySelector('.registration-message').style.color='green';
        }
    }
}