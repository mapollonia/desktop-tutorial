const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
const ORDER_ASC_BY_PRICE = "Price-Asc";
const ORDER_DESC_BY_PRICE = "Price-Desc";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_ASC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function displayProducts(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))){

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.soldCount + ` vendidos</small>
                            <small class="text-muted">$` + product.cost + `</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("product-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndDisplayProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    displayProducts();
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndDisplayProducts(ORDER_ASC_BY_NAME, resultObj.data);
            console.log(resultObj.data)
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        getJSONData("https://japdevdep.github.io/ecommerce-api/product/all.json").then(function(resultObj){
            if (resultObj.status === "ok"){
                sortAndDisplayProducts(ORDER_ASC_BY_NAME, resultObj.data);
                console.log(resultObj.data)
            }
        });
    });

    document.getElementById("sortAscByPrice").addEventListener("click", function(){
        getJSONData("https://japdevdep.github.io/ecommerce-api/product/all.json").then(function(resultObj){
            if (resultObj.status === "ok"){
                sortAndDisplayProducts(ORDER_ASC_BY_PRICE, resultObj.data);
                console.log(resultObj.data)
            }
        });
    });

    document.getElementById("sortDescByPrice").addEventListener("click", function(){
        getJSONData("https://japdevdep.github.io/ecommerce-api/product/all.json").then(function(resultObj){
            if (resultObj.status === "ok"){
                sortAndDisplayProducts(ORDER_DESC_BY_PRICE, resultObj.data);
                console.log(resultObj.data)
            }
        });
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        getJSONData("https://japdevdep.github.io/ecommerce-api/product/all.json").then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndDisplayProducts(ORDER_DESC_BY_NAME, resultObj.data);
            console.log(resultObj.data)
        }
    });
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        getJSONData("https://japdevdep.github.io/ecommerce-api/product/all.json").then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndDisplayProducts(ORDER_BY_PROD_COUNT, resultObj.data);
            console.log(resultObj.data)
        }
    });
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        displayProducts();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minPrice = document.getElementById("rangeFilterCountMin").value;
        maxPrice = document.getElementById("rangeFilterCountMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }

        displayProducts();
    });
});

var usuario_nav = document.getElementById("dropdownMenuButton");


usuario_nav.innerText = sessionStorage.getItem("user");