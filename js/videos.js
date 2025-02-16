
const videosUrl = " https://openapi.programming-hero.com/api/phero-tube/videos/";  
const loadVideos = async (url) =>{
    try{
    let res = await fetch(url)
    const data = await res.json();
    console.log(data.videos);
    displayVideos(data.videos);
    }
    catch({name, message})
    {
        console.log(name);
        console.log(message);
    }
    
}

const displayVideos = (data) => {
    const videoSection = document.getElementById('videos');

    // console.log(videoSection);


    data.forEach((items) =>{

        const card = document.createElement('div');
        card.id =items.category_id;
        card.classList="w-[350px] video mx-auto mt-5 flex justify-center items-center rounded-lg"
        card.classList.add(items.category_id);
        const verifiedIcon = items.authors[0].verified? `<img src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000" class="w-5 h-5">` : "";
        const time = items.others.posted_date;

        let yr = time / (3600*24*365);
        yr = Math.floor(yr);
        let remainingSec = time % (3600* 24 * 365);
        let month = remainingSec / (3600* 24 * 30);
        month = Math.floor(month);
        remainingSec = remainingSec % (3600 * 24 *30);
        let day = remainingSec / (3600 * 24);
        day = Math.floor(day);
        remainingSec = remainingSec % (3600 * 24);
        let hr = remainingSec/3600;
        hr = Math.floor(hr);
        remainingSec = remainingSec % 3600;
        let min = remainingSec / 60;
        min = Math.floor(min);
        const sec = remainingSec % 60;

        if(yr > 0){ timeleft = `${yr} years `}
        else if(month > 0){timeleft = ` ${month} months `}
        else if(day > 0){timeleft = `${day} days `}
        else if(hr > 0){timeleft = ` ${hr} hour `}
        else if(min > 0){timeleft = `${min} min `}
        else {timeleft = ` ${sec} sec `}

        const timeLeftStr = time? `<p class="absolute bottom-2 right-2 bg-black text-white rounded-lg px-4 py-2">${timeleft} ago</p>` : ""
        const videoId = items.video_id;
        console.log(videoId);
        card.innerHTML =
        `
            <div class="card card-compact" >
            

            <figure class="relative">
                <img
                src="${[items.thumbnail]}"
                class=" w-[350px] h-[200px] object-cover"
                alt="${items.title}" />
                ${timeLeftStr}
            </figure>


            <div class="card-body flex flex-col">

            <div class="flex flex-row gap-5">

                    <div>
                        <img src="${[items.authors[0].profile_picture]}" class="w-10 h-10 rounded-full object-cover" alt="${items.title}" />
                       
                    </div>

                    <div>
                        <h2 class="card-title">${items.title}</h2>
                        <div class="flex flex-row gap-2">
                            <div> <p class="font-bold opacity-50">${items.authors[0].profile_name}</p></div>
                            <div>${verifiedIcon}</div>
                        </div>
                    </div>
            </div>
            <div class="card-actions -mt-4 justify-end">
                <button onclick="modal('${videoId}')" class="btn btn-error text-white">details</button>
            </div>
            </div>
        `
        videoSection.appendChild(card);
    })
}


const loadCategoryVideos = (category_id) =>{
    const videos = document.getElementsByClassName("video");
    const spinner = document.getElementById('spinner');
    const categories = document.getElementsByClassName("category");
    const activeCategory = document.getElementById(category_id);

    for(let video of videos)
    {
        video.classList.add("hidden");
        
    }
    for(let category of categories)
        {
            category.classList.remove("bg-error","text-white");
        }
    activeCategory.classList.add("bg-error","text-white");
    
    spinner.classList.remove("hidden");
    spinner.classList.add("flex");
    
    setTimeout( () =>{
        spinner.classList.remove("flex");
        spinner.classList.add("hidden");    
    
    const videoCategory = document.getElementsByClassName(category_id)
    for(let video of videoCategory)
    {
        video.classList.remove("hidden");
    }
    
},1000)
    
}

const videoDetailsUrl = "https://openapi.programming-hero.com/api/phero-tube/video/";  // aaaa
const modal = async (videoId) =>{
    my_modal_5.showModal();
    const modal = document.getElementById("modal-content");

    url = `${videoDetailsUrl}${videoId}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    console.log(data.video.thumbnail);
    console.log(data.video.description);
    modal.innerHTML =
    `
    <div class = "space-y-2">
    <img src="${[data.video.thumbnail]}"   class=" w-full h-[200px] object-cover rounded-t-lg"   alt="${data.video.title}" />
    
    <p class="font-lg opacity-80 text-[#000000]" >${data.video.description}</p>
    </div>
    `
}
loadVideos(videosUrl);

