//menubar function


menuIconClicked()
function menuIconClicked(){
    const menubar = document.querySelector(".menu-bar");
    const dropdownMenu = document.querySelector(".dropdown-card")
    const dropdownWrapper = document.querySelector(".dropdown-ul");
    menubar.addEventListener("click", ()=>{
        menubar.classList.toggle('change');
        dropdownMenu.classList.toggle("dropdown-card-classlist");
        dropdownWrapper.classList.toggle("show-display");
    })
};
