
//swiper image
var swiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });
  var swiper2 = new Swiper(".mySwiper2", {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
  });

// End swiper
// Alert
const alertAddCartSuccess=()=>{
    const elementAlert = document.querySelector("[alert-add-cart-success]")
    if(elementAlert){
        elementAlert.classList.remove("alert-hidden")

        setTimeout(()=>{
            elementAlert.classList.add("alert-hidden")
        },3000)

        const closeAlert = elementAlert.querySelector("[close-alert]")
        closeAlert.addEventListener("click",()=>{
            elementAlert.classList.add("alert-hidden")
        })
    }
}
// End Alert
// Carts
// Create cart in local storage if the system don't contain local storage
const cart = localStorage.getItem("cart")
if(!cart){
    localStorage.setItem("cart",JSON.stringify([]))
}

const showMiniCart=()=>{
    const miniCart = document.querySelector("[mini-cart]")
    if(miniCart){
        const cart = JSON.parse(localStorage.getItem("cart"))
        const totalQuantity = cart.reduce((sum,item)=>sum+item.quantity,0)
        miniCart.innerHTML= totalQuantity
    }
}
showMiniCart()
// Add tour in to cart
const formAddToCart = document.querySelector("[form-add-to-cart]")
if(formAddToCart){
    formAddToCart.addEventListener("submit",(e)=>{
        e.preventDefault()

        const quantity = parseInt(e.target.elements.quantity.value)
        const tourId = parseInt(formAddToCart.getAttribute("tour-id"))

        if(quantity>0 && tourId){

            const cart = JSON.parse(localStorage.getItem("cart"))

            const indexExistTour = cart.findIndex(item => item.tourId == tourId)

            if(indexExistTour == -1){
                cart.push({
                    tourId:tourId,
                    quantity:quantity
                })
            }
            else{
                cart[indexExistTour].quantity = cart[indexExistTour].quantity +quantity
            }
            localStorage.setItem("cart",JSON.stringify(cart))

            alertAddCartSuccess()
            showMiniCart()
        }
    })

}

// End Carts