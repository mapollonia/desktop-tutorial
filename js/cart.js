var cartProducts=[];

function updateProductSubtotal(){
    getCart(CART_INFO_URL).then(response=>{
        cartProducts = response.articles;
        for(let i = 0; i < cartProducts.length; i++)
        {
            let amount = document.getElementById(`amount${i}`).value;
            let cost = cartProducts[i].unitCost;
            let subtotal = amount * cost;
            document.getElementById(`dynamic${i}`).innerText = subtotal;
        }
        update();
    })
}

function update()
{
    let sum = 0;
    for(let j = 0; j < cartProducts.length; j++){
        sum += parseInt(document.getElementById(`dynamic${j}`).innerText);
    }
    document.getElementById("productTotal").innerText = "UYU " + sum;
}

function showCart(){
    let htmlToAppend = "";
    let i = 0;
    for(let article of cartProducts){
        htmlToAppend += `
        <tr>
        <td><img src="${article.src}" class = "img-fluid" style ="max-width:50px!important"></td>
        <td class="align-middle">${article.name}</td>
        <td class="align-middle">${article.currency} ${article.unitCost}</td>
        <td class="align-middle"><input id="amount${i}" type="number" min ="1" value=${article.count} onChange="updateProductSubtotal()"></td>
        <td class="align-middle" id="dynamic${i}">${article.unitCost * article.count}</td>
        </tr>`;
                    
        i++;
    }
    htmlToAppend += `
        <tr>
        <td></td>
        <td class="align-middle">Subtotal de carrito</td>
        <td class="align-middle"></td>
        <td class="align-middle"></td>
        <td class="align-middle" id="productTotal"></td>
        </tr>`;

    document.getElementById("cart").innerHTML = htmlToAppend;
}

function getCart(url){
    return fetch(url).then(respuesta=>{
        return respuesta.json();
    })
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getCart(CART_INFO_URL).then(response=>{
        cartProducts = response.articles;
        showCart();
        update()
    })
})

var usuario_nav = document.getElementById("dropdownMenuButton");

usuario_nav.innerText = sessionStorage.getItem("user");