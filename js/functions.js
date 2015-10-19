function loadJSON(callback) {
   var data_file = 'data/potions.json';
   var http_request = new XMLHttpRequest();
   try{
      // Opera, Firefox, Chrome, Safari
      http_request = new XMLHttpRequest();
   }catch (e){
      // IE
      try{
         http_request = new ActiveXObject("Msxml2.XMLHTTP");
      }catch (e) {
         try{
            http_request = new ActiveXObject("Microsoft.XMLHTTP");
         }catch (e){
            alert("Your browser broke!");
            return false;
         }
      }
   }
   http_request.open("GET", data_file, true);
   http_request.overrideMimeType("application/json");
   http_request.onreadystatechange  = function(){
      if (http_request.readyState == 4)
		callback(http_request.responseText);
   }
   http_request.send(null);
 }

 function callLightbox(output){
  	document.getElementById('white_content').style.display='block';
  	document.getElementById('black_overlay').style.display='block';
  	document.getElementById('close_lightbox').onclick = function () {
  		 closeLightbox();
  	};
  	document.getElementById('white_content').style.display = 'block';
  }

function closeLightbox(){

	document.getElementById('white_content').style.display='none';
	document.getElementById('black_overlay').style.display='none';
}

function createProd(callback){
  var products;
	loadJSON(function(response) {

		var actual_JSON = JSON.parse(response);

		for (var i in actual_JSON.potions){
			var newElement = document.createElement('div');
			newElement.id = actual_JSON.potions[i].id;
			newElement.className = "prod";
			newElement.innerHTML =
			'<img src="images/' + actual_JSON.potions[i].image + '">'+
			'<div class="caption">'+
			'<b>'+ actual_JSON.potions[i].name + ' - </b>'+
			'<span>$'+ actual_JSON.potions[i].price + '</span></div>';

			document.getElementById("products").appendChild(newElement);
		}
		products = document.querySelectorAll(".prod");
		 if (typeof callback === "function")
			callback(products);		
	});
}

function bindLightbox(products){
	for (var i = products.length - 1;  i >= 0;  --i) {
		document.getElementById(products[i].id).onclick = function () {
			var myid = this.id;
			var newContent = "";

			loadJSON(function(response) {
				var actual_JSON = JSON.parse(response);
				var actual_Potion = actual_JSON.potions[myid];
				var actual_Ing = actual_JSON.potions[myid].ingredients;

				document.getElementById('imagebox').src = "images/" + actual_Potion.image;
				document.getElementById('potionName').innerHTML = actual_Potion.name;
				document.getElementById('effects').innerHTML = actual_Potion.effect;
				newContent += '<ul>';
				for (var j in actual_Ing) {
				    newContent += '<li>' + actual_Ing[j] + '</li>';
				}
				newContent += '</ul><br/>';

				document.getElementById('composite').innerHTML = newContent;
				document.getElementById('price').innerHTML = '$ ' + actual_Potion.price;
				var  elementCart = document.getElementsByClassName('addCartItem');

				elementCart[0].setAttribute("id", myid);
				elementCart[0].setAttribute("name", actual_Potion.name);
				elementCart[0].setAttribute("price", actual_Potion.price);

				callLightbox(newContent);
			});
		};
	}
}

function showCart(){
  document.getElementById('cartCheck').style.display='block';
}

function hideCart(){
  document.getElementById('cartCheck').style.display='none';
}
