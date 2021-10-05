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
    //obtengo la información del producto
    getJSONData(PRODUCT_INFO_URL).then(function(productInfoObj){
        if (productInfoObj.status === "ok")
        {
            product = productInfoObj.data;

            //obtengo las etiquetas html de cada campo del objeto product info
            let categoryNameHTML  = document.getElementById("productName");
            let categoryDescriptionHTML = document.getElementById("productDescription");
            let costHTML = document.getElementById("cost");
            let currencyHTML = document.getElementById("currency");
            let soldCountHTML = document.getElementById("soldCount");
            let categoryHTML = document.getElementById("category");
            
            //agrego en cada html la informacion correspondiente
            categoryNameHTML.innerHTML = product.name;
            categoryDescriptionHTML.innerHTML = product.description;
            costHTML.innerHTML = product.cost;
            currencyHTML.innerHTML = product.currency;
            soldCountHTML.innerHTML = product.soldCount;
            categoryHTML.innerHTML = product.category;


            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);

            //obtengo la lista de productos y muestro solo los relacionados
            getJSONData(PRODUCTS_URL).then(function(productsObj){
                if (productsObj.status === "ok"){
                    let prodList = productsObj.data;
                    let relatedHTML = document.getElementById("related");

                    let htmlRelProdToAppend = "";
                    
                    for (let i = 0; i < product.relatedProducts.length; i++){
                        htmlRelProdToAppend += `
                        <div class="card" style="width: 18rem;">
                            <img src="` + prodList[product.relatedProducts[i]].imgSrc + `" class="card-img-top">
                            <div class="card-body">
                                <h4 class="card-text">` + prodList[product.relatedProducts[i]].name + `</h4>
                                <p class="card-text">` + prodList[product.relatedProducts[i]].description + `</p>
                            </div>
                        </div>`
                    }
                    relatedHTML.innerHTML = htmlRelProdToAppend;
                }
            });
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status == "ok")
        {
            showComments(resultObj.data);
        }
    });
});

var usuario_nav = document.getElementById("dropdownMenuButton");

usuario_nav.innerText = sessionStorage.getItem("user");