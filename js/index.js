function addToCart(ID){
    const product = document.getElementById(ID).textContent;
 
    alert(`${product} added to cart!`);
}


function showsidebar(){
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = 'flex';
}

function closesidebar(){
const sidebar = document.querySelector(".sidebar");
sidebar.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", () => {
    const typed = new Typed('#element', {
        strings: ['Front', 'Back'],
        typeSpeed: 80,
        backSpeed: 80,
        backDelay: 1200,
       
        loop: true
    });
});

   