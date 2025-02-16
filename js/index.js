// tailwind config start
tailwind.config = {
    theme: {
      extend: {
          screens: {
              'custom': '360px', // Custom breakpoint at 900px
            },
        colors: {
          clifford: '#da373d',
        }
      }
    }
  }
//   tailwind config end 
const lazyLoading = () =>{
    const spinnerSection = document.getElementById("spinnerSection");
    const bodyContent = document.getElementById("bodyContent")
    bodyContent.classList.add("hidden");
    setTimeout( () =>{
        spinnerSection.classList.add("hidden");
        bodyContent.classList.remove("hidden");

    },500)
}


lazyLoading();
const categoriesUrl = "https://openapi.programming-hero.com/api/phero-tube/categories/";
const categoryUrl = "https://openapi.programming-hero.com/api/phero-tube/category/"  // 1001

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
        `<button id="${categoryId}" onclick="loadCategoryVideos(${categoryId})" class="btn category text-base sm:text-xl hover:bg-[#ee0000] hover:text-white "> 
        ${categoryName}
        </button>
        `
        navButton.appendChild(categoryButton);
    })
    
}

loadCategories(categoriesUrl);
