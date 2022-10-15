
var data ="";
var data2 ="";

var itemLists;
fetch("https://131.217.172.194/assignment2/api.php")
    .then(response => response.json())
    .then(datas =>uiData(datas))
   
   
   
function uiData(datas){
  var seller1Data="";
  var seller1Data2="";
  itemLists = [...datas];
   for (const list of itemLists) { 
    
    if(list['belongs_to']=='1001')
    data += `<div class="col">
                <div class="card shadow-lg border-0h-100">
                    <img src="${list['image']}" class="card-img-top px-5" alt="..." height="250">
                    <div class="card-body">
                        <h5 class="card-title">${list['name']}</h5>
                        <p class="card-text">${list['details']}</p>
                    </div>
                    <div class="card-footer text-center bg-white border-top-0">
                    <a role="button" class="btn btn-outline-secondary" onclick="addToCart(${list['id']})">Add to Cart</a>       
                        
                    </div>
                </div>
            </div> `;

    if(list['belongs_to']=='1002')
    data2 += `<div class="col">
                <div class="card shadow-lg border-0h-100">
                    <img src="${list['image']}" class="card-img-top px-5" alt="..." height="250">
                    <div class="card-body">
                        <h5 class="card-title">${list['name']}</h5>
                        <p class="card-text">${list['details']}</p>
                    </div>
                    <div class="card-footer text-center bg-white border-top-0">
                    <a role="button" class="btn btn-outline-secondary" onclick="addToCart(${list['id']})">Add to Cart</a>       
                        
                    </div>
                </div>
            </div> `;
    


}

seller1Data = `<section class="container my-5"  >
      <h2 style="text-align: center;">Seller 1</h2>  
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" id="seller1">
            
              ${data}
              
              
          </div>
      </section>`;
 seller1Data2 = `<section class="container my-5"  >
      <h2 style="text-align: center;">Seller 2</h2>  
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" id="seller2">
            
              ${data2}
              
              
          </div>
      </section>`;
document.getElementById('seller1Cointainer').innerHTML=seller1Data;
document.getElementById('seller2Cointainer').innerHTML=seller1Data2;

}

function registration(){

  var name = document.getElementById('registrationName').value;
  var email = document.getElementById('registrationEmail').value;
  var password = document.getElementById('registrationPassword').value;
  var address = document.getElementById('registrationAddress').value;
  console.log(address);

  let formData = new FormData();
formData.append('name', name);
formData.append('email', email);
formData.append('password', password);
formData.append('address', address);

fetch("https://131.217.172.194/assignment2/registration.php",
    {
        body: formData,
        method: "post"
    })
    .then(res=>res.json())
    .then(json=>userData(json,name,password,'register'));
  
}

function userData(json,name,password,from){
  var message =json.message;
  console.log(message);
  if(message =="successful"){

let formData = new FormData();
formData.append('name', name);
formData.append('password', password);


fetch("https://131.217.172.194/assignment2/login.php",
    {
        body: formData,
        method: "post"
    })
    .then(res=>res.json())
    .then(json=>loginData(json,from));
  
}

  }

function loginData(json,from){

  if(from =="register")
 document.getElementById("registrationClose").click();
 if(from =='login')
 document.getElementById("loginbutton").click();
 document.getElementById("login").style.display="none";
 document.getElementById("logout").style.display="block";
 document.getElementById("username").style.display="block";
 document.getElementById("username").innerText=`${json.name}'s Dashboard`;
 document.getElementById("offcanvasRightLabel2").innerText=`${json.name}'s Dashboard`;

 var cardBody = `
 <table class="table">
 <thead>
   <tr>
     <th scope="col">#</th>
     <th scope="col">User</th>
     <th scope="col">Info.</th>
     
   </tr>
 </thead>
 <tbody>
   <tr>
     <th scope="row">1</th>
     <td>User ID</td>
     <td>${json.id}</td>
     
   </tr>
   <tr>
     <th scope="row">2</th>
     <td>Name</td>
     <td>${json.name}</td>
     
   </tr>
   <tr>
     <th scope="row">3</th>
     <td >Address</td>
     <td>${json.address}</td>
   </tr>
   <tr>
     <th scope="row">4</th>
     <td >Balance</td>
     <td id="balance">${json.balance==null?0:json.balance}</td>
   </tr>

 </tbody>
</table>
<div class="input-group mb-3">
  <input type="text" class="form-control" id="addBalance" placeholder="Add balance" aria-label="Recipient's username" aria-describedby="button-addon2">
  <button class="btn btn-outline-secondary" type="button" id="button-addon2" onclick="addBalance()">Add Balance</button>
</div
 `;
document.getElementById("offcanvas-body2").innerHTML = cardBody;



 
}

function addBalance(){
    console.log("clicked");
   var newBalance=  document.getElementById("addBalance").value;
   var oldBalance=  document.getElementById("balance").innerText;
   if(oldBalance =="0")
   document.getElementById("balance").innerText= newBalance;
   else
   document.getElementById("balance").innerText =  parseInt(newBalance) +parseInt(oldBalance);

}



function logout(){

//  document.getElementById("registrationClose").click();
 document.getElementById("login").style.display="block";
 document.getElementById("logout").style.display="none";
 document.getElementById("username").style.display="none";
//  document.getElementById("username").innerText=`${json.name}'s Dashboard`;
 
}

function loginUser(){
var name =  document.getElementById('loginUsername').value;
var password =  document.getElementById('loginPassword').value;
  // var password = document.getElementById('loginPassword').value;

  userData({message:"successful"},name,password,'login');
}

























function seller1(){
  document.getElementById('seller1Cointainer').innerHTML="";
document.getElementById('seller2Cointainer').innerHTML="";
  fetch("https://131.217.172.194/assignment2/seller1/itemlist.php")
    .then(response => response.json())
    .then(json =>seller1UI(json));
}
function seller2(){
  document.getElementById('seller1Cointainer').innerHTML="";
document.getElementById('seller2Cointainer').innerHTML="";
  fetch("https://131.217.172.194/assignment2/seller2/itemlist.php")
    .then(response => response.json())
    .then(json =>seller2UI(json));
}

function seller1UI(itemlist){
  var seller1Data="";
  var data ="";
  
  var itemLists1 = [...itemlist];
   for (const list of itemLists1) { 
    let myArray = list['details'].split(",");
   
    let listItem = myArray.map(item =>`<li>${item}<li>`)
    
    if(list['belongs_to']=='1001')
    data += `<div class="col">
                <div class="card shadow-lg border-0h-100">
                    <img src="${list['image']}" class="card-img-top px-5" alt="..." height="250">
                    <div class="card-body">
                        <h5 class="card-title">${list['name']}</h5>
                        <ul class="card-text">${listItem}</ul>
                    </div>
                    <div class="card-footer text-center bg-white border-top-0">
                    <a role="button" class="btn btn-outline-secondary" onclick="addToCart(${list['id']})">Add to Cart</a>       
                        
                    </div>
                </div>
            </div> `;


            seller1Data = `<section class="container my-5"  >
      <h2 style="text-align: center;">Seller 1</h2>  
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" id="seller1">
            
              ${data}
              
              
          </div>
      </section>`;



}
document.getElementById('seller1Cointainer').innerHTML=seller1Data;

}
function seller2UI(itemlist){
  var seller2Data="";
  var data ="";
  
  var itemLists2 = [...itemlist];
   for (const list of itemLists2) { 
    
    if(list['belongs_to']=='1002')
    data += `<div class="col">
                <div class="card shadow-lg border-0h-100">
                    <img src="${list['image']}" class="card-img-top px-5" alt="..." height="250">
                    <div class="card-body">
                        <h5 class="card-title">${list['name']}</h5>
                        <p class="card-text">${list['details']}</p>
                    </div>
                    <div class="card-footer text-center bg-white border-top-0">
                    <a role="button" class="btn btn-outline-secondary" onclick="addToCart(${list['id']})">Add to Cart</a>       
                        
                    </div>
                </div>
            </div> `;


            seller2Data = `<section class="container my-5"  >
      <h2 style="text-align: center;">Seller 2</h2>  
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" id="seller1">
            
              ${data}
              
              
          </div>
      </section>`;



}
document.getElementById('seller1Cointainer').innerHTML=seller2Data;

}


function search(){

  document.getElementById('seller1Cointainer').innerHTML="";
  document.getElementById('seller2Cointainer').innerHTML="";
  var searchData = document.getElementById('search').value;
  var data="";
  var data2="";
  var searchName = searchData.toLowerCase();
  for (const list of itemLists) { 

    var itemName = list['name'].toLowerCase();
    if(list['belongs_to']=='1001' && itemName.includes(searchName))
    data += `<div class="col">
                <div class="card shadow-lg border-0h-100">
                    <img src="${list['image']}" class="card-img-top px-5" alt="..." height="250">
                    <div class="card-body">
                        <h5 class="card-title">${list['name']}</h5>
                        <p class="card-text">${list['details']}</p>
                    </div>
                    <div class="card-footer text-center bg-white border-top-0">
                    <a role="button" class="btn btn-outline-secondary" onclick="addToCart(${list['id']})">Add to Cart</a>       
                        
                    </div>
                </div>
            </div> `;

    if(list['belongs_to']=='1002' && itemName.includes(searchName))
    data2 += `<div class="col">
                <div class="card shadow-lg border-0h-100">
                    <img src="${list['image']}" class="card-img-top px-5" alt="..." height="250">
                    <div class="card-body">
                        <h5 class="card-title">${list['name']}</h5>
                        <p class="card-text">${list['details']}</p>
                    </div>
                    <div class="card-footer text-center bg-white border-top-0">
                    <a role="button" class="btn btn-outline-secondary" onclick="addToCart(${list['id']})">Add to Cart</a>       
                        
                    </div>
                </div>
            </div> `;
    

  
}
var seller1Data = `<section class="container my-5"  >
      <h2 style="text-align: center;">Seller 1</h2>  
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" id="seller1">
            
              ${data}
              
              
          </div>
      </section>`;
 var seller1Data2 = `<section class="container my-5"  >
      <h2 style="text-align: center;">Seller 2</h2>  
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" id="seller2">
            
              ${data2}
              
              
          </div>
      </section>`;
if(data)
document.getElementById('seller1Cointainer').innerHTML=seller1Data;
if(data2)
document.getElementById('seller2Cointainer').innerHTML=seller1Data2;
}
var cartObj = {};
function addToCart(id){
 var  cart= document.getElementById("cart").innerText;
 document.getElementById("cart").innerText = parseInt(cart) +1;
 if(cartObj[id])
 cartObj[id]=cartObj[id]+1;
 else
 cartObj[id]=1;
 console.log(cartObj);
 


}

var cartItems=[];
function cartDesign()
{
  document.getElementById("offcanvas-body").innerHTML="";

  for(item in cartObj){
    console.log(item);
    console.log(cartObj[item]);
    console.log(itemLists);
    var cartItem = itemLists.find(listitem =>{
      if(listitem['id']==item)
      return listitem;
    })
    cartItems = [...cartItems,cartItem];
    
  }
  displayCart(cartItems);
}
function displayCart(cartItems) {
  var cartArray = [...cartItems];
  console.log("cartArray");
  console.log(cartArray);
  var quantity;
  var total = 0;
  var output = "";
  for(var i in cartArray) {

   for( item in cartObj){
    if(cartArray[i].id ==item){
      quantity = cartObj[item];
    }
   }
    output += "<tr>"
      + "<td>" + cartArray[i].name + "</td>" 
      + "<td>($" + cartArray[i].price + ")</td>"
      + "<td><div class='input-group'><button  onclick='reduceItem("+cartArray[i].id+")' class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
      + "<input type='number' class='item-count form-control'min='1' max='20' data-name='" + cartArray[i].name + "' value='"+ quantity +"'>"
      + "<button onclick='addItem("+cartArray[i].id+")' class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
      + "<td><button onclick='deleteItem("+cartArray[i].id+")' class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
      
      + "<td>=$" + parseInt(cartArray[i].price )*parseInt(quantity) + "</td>" 
      +  "</tr>";
      total +=parseInt(cartArray[i].price )*parseInt(quantity);
  }

  document.getElementById("offcanvas-body").innerHTML = `<table class="show-cart table" id="cartTable">
          ${output}
        </table>`;
        document.getElementById("total-cart").innerText = total;
        output="";
}

function deleteItem(id){
  var num = id;
  var newObj ={};
  for(var item in cartObj){
     if(num!=item)
     {
      newObj[item]=cartObj[item];
     }
       
  }
  cartObj ={...newObj}
 var newCartItems = cartItems.map(item=>{
    var id = item.id;
    for(var cart in cartObj){
      if(id == cart)
      return item;
    }
  
  })
  
  cartItems =[];
  for ( i of newCartItems){
    if(i){
      cartItems=[...cartItems,i];
    }
  }
   displayCart(cartItems);
}

function addItem(id){
  for(item in cartObj){
    if(item==id)
    if(cartObj[item]>=10){
      cartObj[item] =10;
      alert("Sorry, only 10 piece left !!!");
    }
    else
    cartObj[item] +=1;

  }
   displayCart(cartItems);


}
function reduceItem(id){
  for(item in cartObj){
    if(item==id)
    if(cartObj[item]==1){
      cartObj[item] =1;
      alert("You can't order less than 1 item !!!");
    }
    
    else
    cartObj[item] -=1;

  }
   displayCart(cartItems);


}

function checkOut(){
  var cartTotal= document.getElementById('total-cart').innerText;
  var loginTest = document.getElementById("login").innerText;
//   alert(loginTest);
  if(parseInt(cartTotal)==0){
    alert("No item selected !!!");
  }
  else if(loginTest=="Login"){
    // console.log(parseInt(cartTotal));
    alert("Please login first !!!");
  }
  else{
    alert("Purchase success");
    // cartClose
    document.getElementById("cartClose").click();
  }
}

