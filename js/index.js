const loadData = async (url,id="",property) => 
    {
    try
    {
    let fullUrl = `${url}${id}`
    console.log(fullUrl);
    const res = await fetch(fullUrl)
    let data = await res.json();


    const typeOfData = typeof data;
    if(typeOfData !== "object"){
        throw new Error(`Expected object but it's ${typeOfData}` );
        }

    if(property !== ""){

    const subData = data[property];
     if (!subData) {
        throw new Error(`${property} does not exist in the data`);
      }
      destructDisplayArray(subData);

    }

    else{
        destructDisplayObject(data);
    }

    }
    catch ({ name, message }) 
    {
        console.log(name);
        console.log(message); 
    }
    }


const destructDisplayArray = (dataArray) => {
    
    console.log(dataArray);
    if(!Array.isArray(dataArray)){
        throw new Error(`Expected Array but it's ${typeOfData}` );
    }
    dataArray.forEach( (item) => {

        console.log(item);
    })

}

const destructDisplayObject = (dataObj) => {
    
    console.log(dataObj);
    for(let key in dataObj){
        console.log(dataObj[key]);
    }
}

const categoriesUrl = "https://openapi.programming-hero.com/api/phero-tube/categories/";
// const videoDetailsUrl = "https://openapi.programming-hero.com/api/phero-tube/video/";  
const categoryUrl = "https://openapi.programming-hero.com/api/phero-tube/category/"  // 1001


// loadData(categoriesUrl,"","categories"); 
// loadData(categoryUrl,"1001","category");  
// loadData(videoDetailsUrl,"aaaa","");


const loadCategories = async(url) => {
    try{
    let res = await fetch(url)
    const data = await res.json();
    // console.log(data);
    dispalayCategories(data.categories);
    }
    catch({name, message})
    {
        console.log(name);
        console.log(message);
    }
}

const dispalayCategories = (data) =>{
    const navButton = document.getElementById('categories');

        data.forEach((item) =>{
        const categoryName = item.category;
        const categoryId = item.category_id;
        // console.log(categoryName);
        const categoryButton = document.createElement('div');
        categoryButton.innerHTML = 
        `<button id="${categoryId}" onclick="loadCategoryVideos(${categoryId})" class="btn category text-xl hover:bg-[#ee0000] hover:text-white "> 
        ${categoryName}
        </button>
        `
        navButton.appendChild(categoryButton);
    })
    
}

loadCategories(categoriesUrl);
