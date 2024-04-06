var initialVal = 0;
var currPage = 1;
var lastPage;

var selectedCategory = ["India","Business", "Sports", "Technology", "Politics", "Hatke", "Startups","Entertainment", "International","Automobile"];
const saveToLocalStorage = [];
let mainData = [];
var category_length;
var m=0;

// ------------for news load Container fetech news-----------------------
const  newsContainer = document.querySelector('.news-load-container');
const URL = `https://content.newtonschool.co/v1/pr/64e3d1b73321338e9f18e1a1/inshortsnews`;

async function getNewsData(initialVal){
    let response = await fetch(URL);
    let data = await response.json();
    const filteredValue = data.filter((item)=>{
       return selectedCategory.includes(item.category);
    });
    category_length = filteredValue.length;
    let finalValue = initialVal+10;
    lastPage = category_length/10;
    
    checkLastPage();
    if(lastPage>=currPage && filteredValue.length>0){
        newsContainer.innerHTML = "";
        if(category_length<finalValue){
            finalValue = category_length;
        }
        for(let j=initialVal; j<finalValue; j++){
            newsContainer.innerHTML += `
            <div class="news-card">
                <span class="loadAuthor" id="author"> BY: <strong>${filteredValue[j].author}</strong></span>
                <span class="loadCategory" id="category">CATEGORY: <strong>${filteredValue[j].category}</strong></span>
                <p class="loadNews" id="news"> ${filteredValue[j].content}</p>
                <a  class = "insideBtn" id="url" href= ${filteredValue[j].url}> Read More</a>
                <br/><i class="fa-solid fa-heart likedbtn" id="likedheart${j}"></i>
            </div>  `
        }
    }
}

getNewsData(initialVal);

// -----------Sort By Category---------------------

const categoryAll = document.querySelector('.all_category');
const categoryBtn = document.getElementsByClassName('category-btn');
categoryAll.addEventListener('click',(event)=>{
    selectedCategory = event.target.value;
    for(cl of categoryBtn){ cl.classList.remove("activebtn"); }
    event.target.classList.add("activebtn");
    if(event.target.value == 'All'){
        selectedCategory = ["India","Business", "Sports", "Technology", "Politics", "Hatke", "Startups","Entertainment", "International","Automobile"];
    }
    currPage = 1; initialVal = 0;  getNewsData(initialVal);
})

//------------------Save News Container----------------------

newsContainer.addEventListener('click',(e)=>{
    if(e.target.className.includes('likedbtn')){
        const getId = e.target.id;
        const likedClick  = document.getElementById(getId);
        likedClick.style.color = "red";
        var parentDiv = document.getElementById(getId).parentElement;  
        const savedNewsObject = {
            news: parentDiv.children[2].textContent,
            author: parentDiv.children[0].textContent,
            category: parentDiv.children[1].textContent,
            url : parentDiv.children[3].href
        };
        //------------------Saved News Pused To LocalStorage----------------------
        saveToLocalStorage.push(savedNewsObject);
        localStorage.setItem('LocalStorage', JSON.stringify(saveToLocalStorage));
        loadSavedDataAuto();
    }
});

//------------------Save News load auto----------------------

const  news_savedContainer = document.querySelector('.news-save-container');
function loadSavedDataAuto(){
    var retrievedData = localStorage.getItem("LocalStorage");
    mainData = JSON.parse(retrievedData);
    if(mainData.length==0){
        news_savedContainer.innerHTML = `
                <div class="emptyCard">
                    <p id="card-text"> No Saved News Found </p>
                </div>  `
    } else {
        news_savedContainer.innerHTML = "";
        for(let i=0; i<mainData.length; i++){
            news_savedContainer.innerHTML +=    ` 
                <div class="save-card">
                    <span class="save-Author" id="savedA1"> <strong>${mainData[i].author}</strong></span>
                    <span class="save-Category" id="savedC1" > <strong>${mainData[i].category}</strong></span>
                    <p class="save-News" id="savedN1"> ${mainData[i].news}</p>
                    <a class = "save-Url" id="savedU1" href= ${mainData[i].url}> Read More</a></br>
                    <i class="fa-solid fa-heart likedNews" id="unlike${i}" style="color: red;"></i>
                </div>  `
        }
    }
}

loadSavedDataAuto();

let main_containerBtn = document.querySelector('.load-news-btn');
let btn_main_container = document.getElementsByClassName('btn-main-container');
main_containerBtn.addEventListener('click', (e)=>{
    for(cl of btn_main_container){  cl.classList.remove("activebtn2"); }
    e.target.classList.add("activebtn2");
}); 

// ------------Pagination--------------

function counterIncrease(){
    currPage = currPage+1;
    initialVal = initialVal+10;
    getNewsData(initialVal);
    
}

function counterDecrease(){
    currPage = currPage-1;
    initialVal = initialVal-10;
    getNewsData(initialVal);
   
}

const next_Btn = document.querySelector('.btn-next');
const prev_Btn = document.querySelector('.btn-prev');


next_Btn.addEventListener('click',()=>{
    counterIncrease();
})

prev_Btn.addEventListener('click',()=>{  
    counterDecrease();
})

function checkLastPage(){
    if(currPage==1){
        prev_Btn.disabled = true;
    } else {
        prev_Btn.disabled = false;
    }
    console.log(currPage,lastPage);
    
    if(currPage===lastPage){
        next_Btn.disabled = true;
    } else {
        next_Btn.disabled = false;
    }
}

//----Delete Saved News--------------
const btnUnlike = document.querySelector('likedNews');
news_savedContainer.addEventListener('click',(e)=>{
    const unlike = e.target.id;
    const idd = unlike.substring(0,unlike.length-1);
    if(idd.includes('unlike')){
        let digit = Number(unlike.charAt(unlike.length-1));
        console.log(digit,"selected");
        var retrievedData1 = localStorage.getItem("LocalStorage");
        var mainData1 = JSON.parse(retrievedData1);
        mainData1.splice(digit,1);
        localStorage.setItem('LocalStorage', JSON.stringify(mainData1));
        loadSavedDataAuto();
    }
});
