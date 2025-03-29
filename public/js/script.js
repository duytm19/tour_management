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

// Carts
// Create cart in local storage if the system don't contain local storage
const cart = localStorage.getItem("cart")
if(!cart){
    localStorage.setItem("cart",JSON.stringify([]))
}
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
        }
    })

}

// End Carts