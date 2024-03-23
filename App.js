const author1 = document.getElementById('author1');
const category1 = document.getElementById('category1');
const news1 = document.getElementById('news1');
const url1 = document.getElementById('url1');

const author2 = document.getElementById('author2');
const category2 = document.getElementById('category2');
const news2 = document.getElementById('news2');
const url2 = document.getElementById('url2');

const URL = 'https://content.newtonschool.co/v1/pr/64e3d1b73321338e9f18e1a1/inshortsnews';


var initialVal = 0;
var  selectedCategory = ["Business", "Sports", "World", "Politics", "Hatke", "Science", "Automobile"];
const savedAllNews = [];
const savedAllAuthor = [];
const savedAllCategory = [];
const savedAllUrl = [];
const saveToLocalStorage = [];
const unlikeNewsId = [];
var mainData=[];
var m=0;


const  newsContainer = document.querySelector('.news_container');

async function getNewsData(initialVal){
    let response = await fetch(URL);
    let data = await response.json();
  
    const filteredValue = data.filter((item)=>{
       return selectedCategory.includes(item.category);
    });
    console.log(filteredValue);
    if(filteredValue.length>0){
        newsContainer.innerHTML =
            `
        <div class="loadOne">
            <span class="loadAuthor" id="author1"> BY: <strong>${filteredValue[initialVal].author}</strong></span>
            <span class="loadCategory" id="category1">CATEGORY: <strong>${filteredValue[initialVal].category}</strong></span>
            <p class="loadNews" id="news1"> ${filteredValue[initialVal].content}</p>
            <a  class = "insideBtn" id="url1" href= ${filteredValue[initialVal].url}> Read More</a> </br>
            <i class="fa-solid fa-heart unlikeNews" id="heart1"></i>
        </div>
    
        <div class="loadTwo">
            <span class="loadAuthor" id="author2"> BY: <strong>${filteredValue[initialVal+1].author}</strong></span>
            <span class="loadCategory" id="category2">CATEGORY: <strong>${filteredValue[initialVal+1].category}</strong></span>
            <p class="loadNews" id="news2"> ${filteredValue[initialVal+1].content}</p>
            <a class = "insideBtn" id="url2" href= ${filteredValue[initialVal+1].url}> Read More</a></br>
            <i class="fa-solid fa-heart unlikeNews" id="heart2" ></i>
            
        </div>
        `
    }

}

getNewsData(initialVal);

function counterIncrease(){
    initialVal = initialVal+2;
    if(initialVal>10){
        initialVal = 0;
    }
    getNewsData(initialVal);
}

function counterDecrease(){
    initialVal = initialVal-2;
    if(initialVal<0){
        initialVal = 0;
    }
    getNewsData(initialVal);
}



const next = document.querySelector('.next');
const previous = document.querySelector('.previous');

next.addEventListener('click',()=>{
    counterIncrease();
})

previous.addEventListener('click',()=>{
    counterDecrease();
})


const categoryAll = document.querySelector('.all_category');

categoryAll.addEventListener('click',(event)=>{
    selectedCategory = event.target.value;
    if(event.target.value == 'All'){
        selectedCategory = ["Business", "Sports", "World", "Politics", "Hatke", "Science", "Automobile"];
        getNewsData(0);
    }
    getNewsData(initialVal);
})

//------------------Saved Container----------------------


newsContainer.addEventListener('click',(e)=>{
    const like = e.target.id;
    const val1 = document.getElementById(like);

    if(e.target.className.includes('unlikeNews')){
        val1.style.color = 'red'; 
        // unlikeNewsId.push(e.target.id);     
        funcSavedNews(e.target.id);
    }
});


function funcSavedNews(selectedID){
    // console.log(selectedID);
    if(selectedID.includes('heart1')){
        // const clickedNewsId =  
        const clickedNews = document.getElementById('news1');
        const clickedAuthor = document.getElementById('author1');
        const clickedCategory = document.getElementById('category1');
        const clickedUrl = document.getElementById('url1');
       
        savedAllNews.push(clickedNews.textContent);
        savedAllAuthor.push(clickedAuthor.textContent);
        savedAllCategory.push(clickedCategory.textContent);
        savedAllUrl.push(clickedUrl.href);
        
        const savedNewsObject = {
                news: clickedNews.textContent,
                author: clickedAuthor.textContent,
                category: clickedCategory.textContent,
                url : clickedUrl.href
        };
        
        
        saveToLocalStorage.push(savedNewsObject);
        localStorage.setItem('LocalStorage', JSON.stringify(saveToLocalStorage));

    } else if(selectedID.includes('heart2')){
        const clickedNews = document.getElementById('news2');
        const clickedAuthor = document.getElementById('author2');
        const clickedCategory = document.getElementById('category2');
        const clickedUrl = document.getElementById('url2');
        savedAllNews.push(clickedNews.textContent);
        savedAllAuthor.push(clickedAuthor.textContent);
        savedAllCategory.push(clickedCategory.textContent);
        savedAllUrl.push(clickedUrl.href);
        const savedNewsObject = {
            news: clickedNews.textContent,
            author: clickedAuthor.textContent,
            category: clickedCategory.textContent,
            url : clickedUrl.href
        };
        saveToLocalStorage.push(savedNewsObject);
        localStorage.setItem('LocalStorage', JSON.stringify(saveToLocalStorage));
    }
   
    // var retrievedData = localStorage.getItem("LocalStorage");
    // mainData = JSON.parse(retrievedData);
    
}

const  savedContainer = document.querySelector('.saved_container');

function loadSavedDataAuto(){
    var retrievedData = localStorage.getItem("LocalStorage");
    mainData = JSON.parse(retrievedData);
    console.log(mainData);
    if(mainData.length==0){
       
        savedContainer.innerHTML =
        `
            <div class="emptyCard">
                <p id="para2"> No Saved News Found </p>
            </div>
        `
    } else {
        clickSavedNews(mainData);
    }
}

loadSavedDataAuto();

let btnsavenews = document.getElementById('btn_newsSave');
btnsavenews.addEventListener('click', ()=>{
    loadSavedDataAuto();

}); 

let btnsavenews1 = document.getElementById('btn_newsSave1');
btnsavenews1.addEventListener('click', ()=>{
    loadSavedDataAuto();
});

let btn_news = document.getElementById('btn_newsLoad1');

btn_news.addEventListener('click',()=>{
    getNewsData(0);
});



function clickSavedNews(mainData){
    savedContainer.innerHTML = null;
    for(let i=0; i<mainData.length; i++){
        savedContainer.innerHTML +=` 
        <div class="savedOne">
            <span class="savedAuthor" id="savedA1"> <strong>${mainData[i].author}</strong></span>
            <span class="savedCategory" id="savedC1" > <strong>${mainData[i].category}</strong></span>
            <p class="savedNews" id="savedN1"> ${mainData[i].news}</p>
            <a class = "savedUrl" id="savedU1" href= ${mainData[i].url}> Read More</a></br>
            <i class="fa-solid fa-heart likedNews" id="unlike${i}" style="color: red;"></i>
        </div>  `
    }
}




//----Delete Saved News--------------
const btnUnlike = document.querySelector('likedNews');
savedContainer.addEventListener('click',(e)=>{
    const unlike = e.target.id;
    const idd = unlike.substring(0,unlike.length-1);
    // console.log(idd);
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


