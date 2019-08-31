function showImage(src,target) {
	console.log(src)
	console.log(target)
  var fr=new FileReader();
  // when image is loaded, set the src of the image where you want to display it
  fr.onload = function(e) { target.src = this.result; };
  src.addEventListener("change",function() {
    // fill fr with image data    
    fr.readAsDataURL(src.files[0]);
  });

}

function display_image(){
    document.getElementById('image-selector').click();
	var src = document.getElementById("image-selector");
	var target = document.getElementById("selected-image");
	showImage(src,target);
}

let model;

(async function(){
	model = await mobilenet.load();
	console.log('Sucessfully loaded model');
})();

function predict(){
	// Make a prediction through the model on our image.
	  const imgEl = document.getElementById("selected-image");
	  // const result = await model.classify(imgEl);
	  // console.log(result);
	  let tensor = tf.browser.fromPixels(imgEl)
	  				 .toFloat()
	  				 .expandDims();
	(async function(){
		let predictions = await model.classify(tensor);
	  	console.log(predictions);
	  	
	  	
	 //  	var i;
		// for (i = 0; i < 3; i++) { 
  // 			text += cars[i] + "<br>";
		// }
		var p1 = document.getElementById("p1");
	  	var c1 = document.getElementById("c1");
	  	var p2 = document.getElementById("p2");
	  	var c2 = document.getElementById("c2");

	  	document.getElementById("p1").innerHTML = "";
	  	document.getElementById("p2").innerHTML = "";
	  	document.getElementById("c1").innerHTML = "";
	  	document.getElementById("c2").innerHTML = "";
	  	
	  	


	   	var text = document.createTextNode(" \t 1. Predicted Class = " +  predictions[0].className + "");
	   	var text2 = document.createTextNode(" \t Probability   =" + predictions[0].probability*100 + " %");
		c1.appendChild(text);
		p1.appendChild(text2);

		
	   	var text3 = document.createTextNode(" \t 2. Predicted Class = " +  predictions[1].className + "");
	   	var text4 = document.createTextNode(" \t   Probability   =" + predictions[1].probability*100 + " %");
		c2.appendChild(text3);
		p2.appendChild(text4);

	})();
}


