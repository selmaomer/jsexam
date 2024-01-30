let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})

function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})
var links = document.querySelectorAll('ul li');

for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click' ,function(e){
        var curentText =   e.target.innerHTML;
        console.log(curentText)
        
if (curentText=="Search"){
    showSearchInputs();
    closeSideNav();
 }
  else if(curentText=="Categories"){
    getCategories();
    closeSideNav();
}
else if(curentText=="Area") {
    getArea();
    closeSideNav();
}
else if (curentText=="Ingredients"){
    getIngredients();
    closeSideNav();
}

else if(curentText=="Contact Us")  {  
  displayContacts();
  closeSideNav();
}
 else{
  return false;
 }
} )
}

getMeals();
//display meals//


async function getMeals() {
  var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
  var response = await response.json();
  let   data = (response.meals);
    let cartoona = "";
  for (let i = 0; i < data.length; i++) {
      cartoona += `
      <div class="col-md-3">
              <div onclick="getMealDetails('${data[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${data[i].strMealThumb}" alt="" srcset="">
                  <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                      <h3>${data[i].strMeal}</h3>
                  </div>
              </div>
      </div>
      `
  }
  rowData.innerHTML = cartoona;
}



function displayMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}



async function getCategories() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
    $(".inner-loading-screen").fadeOut(300)

}

function displayCategories(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}


async function getArea() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayArea(respone.meals)
    $(".inner-loading-screen").fadeOut(300)

}


function displayArea(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}


async function getIngredients() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}


function displayIngredients(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}


async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
 
    $(".inner-loading-screen").fadeOut(300)

}



async function getAreaMeals(area) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}


async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

async function getMealDetails(id) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".inner-loading-screen").fadeOut(300)

}


function displayMealDetails(meal) {
    
    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags.split(",")


    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = cartoona
}



function showSearchInputs() {
    
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
}

async function searchByName(name) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    response = await response.json()
    displayMeals(response.meals)

    $(".inner-loading-screen").fadeOut(300)

}

async function searchByFLetter(mealName) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealName}`)
    response = await response.json()

    displayMeals(response.meals)
 
   $(".inner-loading-screen").fadeOut(300)

}


function  displayContacts() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
        <div class="col-md-6">
        <input id="nameInput" onkeyup="validatename()" type="text" class="form-control" placeholder="Enter Your Name">
        <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
            Special characters and numbers not allowed
        </div>
    </div>
        <div class="col-md-6">
        <input id="phoneInput" onkeyup="validatephone()" type="text" class="form-control " placeholder="Enter Your Phone">
        <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid Phone Number
        </div>
    </div>
   
    <div class="col-md-6">
        <input id="emailInput" onkeyup="validatemail()" type="email" class="form-control " placeholder="Enter Your Email">
        <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
            Email not valid *exemple@yyy.zzz
        </div>
    </div>
    <div class="col-md-6">
        <input id="ageInput" onkeyup="validatage()" type="number" class="form-control " placeholder="Enter Your Age">
        <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid age
        </div>
    </div>
    <div class="col-md-6">
        <input  id="passwordInput" onkeyup="validatpassword()" type="password" class="form-control " placeholder="Enter Your Password">
        <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid password *Minimum eight characters, at least one letter and one number:*
        </div>
    </div>
    <div class="col-md-6">
        <input  id="repasswordInput" onkeyup="validatrepassword()" type="password" class="form-control " placeholder="Repassword">
        <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid repassword 
        </div>
    </div>
</div>
<button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
</div>
</div> `

}

  
function validatename() {
    let regexname = /^[a-zA-Z ]+$/;
         let nameAlert = document.getElementById("nameAlert");
    let name=document.getElementById("nameInput");
    
    if (regexname.test(name.value)) {
        nameAlert.classList.replace("d-block", "d-none");

      return true;
    } else {
      nameAlert.classList.replace("d-none", "d-block");
      return false;
    }
}
  
function validatephone() {
    let phone=document.getElementById("phoneInput");
    let phoneAlert = document.getElementById("phoneAlert");
    let regxphone=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
if (regxphone.test(phone.value)) {
    phoneAlert.classList.replace("d-block", "d-none");
     return true;
} else {
    phoneAlert.classList.replace("d-none", "d-block")
  return false;
}
}

function validatage() {
    let age=document.getElementById("ageInput");
    let ageAlert = document.getElementById("ageAlert");
    let regxage=/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
if (regxage.test(age.value)) {
    ageAlert.classList.replace("d-block", "d-none");
     return true;
} else {
  ageAlert.classList.replace("d-none", "d-block")
  return false;
}
}
function validatemail() {
    let email=document.getElementById("emailInput");
    let emailAlert = document.getElementById("emailAlert");
    let regxeamil=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if (regxeamil.test(email.value)) {
    emailAlert.classList.replace("d-block", "d-none");
     return true;
} else {
   emailAlert.classList.replace("d-none", "d-block")
  return false;
}
}
function validatpassword() {
    let password=document.getElementById("passwordInput");
    let passwordAlert = document.getElementById("passwordAlert");
    let regxpassword=/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
if (regxpassword.test(password.value)) {
    passwordAlert.classList.replace("d-block", "d-none");
     return true;
} else {
    passwordAlert.classList.replace("d-none", "d-block")
  return false;
}
}
function validatrepassword() {
if( document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value)
{   

    return true;
}
else{
   

    return false;
}
}

function validatInputs(){
  let  submitBtn1=document.getElementById("submitBtn");
    if (validatename()==true && validatephone()==true && validatemail()== true && validatage()==true  && validatpassword()== true && validatrepassword()  ){
     submitBtn1.removeAttribute("disabled");
    }
       else {
        
return false;
        }
        
    }
   