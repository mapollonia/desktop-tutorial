var product = {};
var comments = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showComments(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let com = array[i];

        htmlContentToAppend += `
        <div class="col">
                <h5>`+ com.user +`</h5>
                <p>`+ com.dateTime +`</p>
                <p>Puntuación: `+ com.score +`/5</p>
                <p>`+ com.description +`</p>
                <p><br></p>
        </div>
        `

        document.getElementById("comments").innerHTML = htmlContentToAppend;
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let categoryNameHTML  = document.getElementById("productName");
            let categoryDescriptionHTML = document.getElementById("productDescription");
            let costHTML = document.getElementById("cost");
            let currencyHTML = document.getElementById("currency");
            let soldCountHTML = document.getElementById("soldCount");
            let categoryHTML = document.getElementById("category");
        
            categoryNameHTML.innerHTML = product.name;
            categoryDescriptionHTML.innerHTML = product.description;
            costHTML.innerHTML = product.cost;
            currencyHTML.innerHTML = product.currency;
            soldCountHTML.innerHTML = product.soldCount;
            categoryHTML.innerHTML = product.category;


            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status == "ok")
        {
            showComments(resultObj.data);
        }
    });
});

var usuario_nav = document.getElementById("show-username");

usuario_nav.innerText = sessionStorage.getItem("user");