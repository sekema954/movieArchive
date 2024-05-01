//slider for signup page
//select wrappers
function changeSlide(){
    const step1 = document.querySelector(".card1");
    const step2 = document.querySelector(".card2");
    const step3 = document.querySelector(".card3");
    const setupWrapper = document.querySelectorAll(".setup-wrapper");
    
    //select buttons
    const btn1 = document.querySelector(".step-btn1");
    const btn2 = document.querySelector(".step-btn2");
    const btn3 = document.querySelector(".step-btn3");
    
    //change display for step-wrappers
    btn1.addEventListener("click", ()=>{
        step1.style.display ='none';
        step2.style.display = 'inline-block';
    });
    
    btn2.addEventListener("click", ()=>{
        step2.style.display = "none";
        step3.style.display = 'inline-block';
    });
};
changeSlide();


