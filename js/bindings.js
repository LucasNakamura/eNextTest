document.addEventListener('DOMContentLoaded', function() {
	createProd(bindLightbox);
	document.getElementById("cartHover").addEventListener("mouseover", function(){
		showCart();
	});
	document.getElementById("closeCart").addEventListener("click", function () {
	    hideCart();
	});
});
