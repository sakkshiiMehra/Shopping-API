function LoadCategories(){
    fetch("https://fakestoreapi.com/products/categories")
    .then((response)=>{
        return response.json();
    })
    .then((categories)=>{
        categories.unshift("all");
        categories.map((category)=>{
        var option = document.createElement("option");
        option.value = category;
        option.text = category.toUpperCase();
        document.getElementById("lstCategories").appendChild(option);
        })
    })
   }
   function LoadProducts(url){
    document.querySelector("main").innerHTML="";
    fetch(url)
    .then((response)=>{
        return response.json();
    })
    .then((products)=>{
        products.map((product)=>{
            var div = document.createElement("div");
            div.className = "card p-2 m-2";
            div.style.width="200px";
            div.innerHTML = 
            `<img src=${product.image} class="card-img-top" height="140">
            <div class="card-header">
                ${product.title}
            </div>
            <div class="card-body">
                <dl>
                    <dt>Price</dt>
                    <dd>${product.price}</dd>
                    <dt>Rating</dt>
                    <dd>${product.rating.rate}<span class="bi bi-star-fill text-success"></span></dd>
                </dl>
            </div>
            <div class="card-footer">
                <button class="btn btn-dark w-100 bi bi-cart" onclick="AddClick(${product.id})">Add to Cart</button>
            </div>`;
            document.querySelector("main").appendChild(div);
        })
    })
   }
   function bodyload(){
    LoadCategories();
    LoadProducts("https://fakestoreapi.com/products");

   }
   function CategoryChanged(){
    var categoryName = document.getElementById("lstCategories").value;
    if(categoryName==="all"){
        LoadProducts("https://fakestoreapi.com/products");
    }else{
        LoadProducts(`https://fakestoreapi.com/products/category/${categoryName}`);
    }
   }
   var cartItems = [];
   function GetCartCount(){
    document.getElementById("lblCount").innerHTML= cartItems.length;
   }
   function AddClick(id){
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res)=>{
        return res.json();
    })
    .then((product)=>{
        cartItems.push(product);
        alert(`${product.title}\n Added to Cart`);
        GetCartCount();
    })
   }
   function ShowCartClick(){
    document.querySelector("tbody").innerHTML="";

    cartItems.map((item)=>{
        var tr = document.createElement("tr");
        var tdTitle = document.createElement("td");
        var tdPrice = document.createElement("td");
        var tdImage = document.createElement("td");

        tdTitle.innerHTML = item.title;
        tdPrice.innerHTML = item.price;
        tdImage.innerHTML = `<img src=${item.image} width="50" height="50">`; 
        
        tr.appendChild(tdTitle);
        tr.appendChild(tdPrice);
        tr.appendChild(tdImage);
        document.querySelector("tbody").appendChild(tr);
    })
   }