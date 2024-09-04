function getTime() {

const clockElement = document.getElementById('clock'); 
const curr = new Date();

let hours = String(curr.getHours()).padStart(2,'0'); 
let minutes = String(curr.getMinutes()).padStart(2,'0');
let seconds = String(curr.getSeconds()).padStart(2,'0');

clockElement.textContent = `${hours}:${minutes}:${seconds}`; 

return clockElement.textContent;

}

function getDate() {

    const dateElement = document.getElementById("current-date");
    
    if (dateElement) {
        const date = new Date();
        const montharr = ["January", "Feburary","March","April","May","June","July","August","September","October",
            "November","December"];
        const weekdayarr = ["Sunday","Monday", "Tuesday" ,"Wendesday" ,"Thursday" ,
            "Friday" , "Saturday"];

        let month = montharr[date.getMonth()]; 
        let weekday = weekdayarr[date.getDay()]; 
        let day = date.getDate().toString(); 
        let year = date.getFullYear().toString(); 

        dateElement.textContent = `${weekday}, ${month} ${day} ${year}`;



        return day;  
        console.log("worked sucessfully");
    }

    else {


        console.error("Error date unabled to be fetched.");
    }







}

function getFact() {


    const apiKey = '...'; //add a fact api key from api-ninjas

    const apiUrl = 'https://api.api-ninjas.com/v1/facts';

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey} })

     .then(response => response.json())
     .then(data => {
        const fact = data[0].fact;


        const fact_container = document.getElementById('info-container');

        fact_container.textContent = fact;





     })
     .catch(error => {
        console.error('Error when fetching the fact: ', error);
     });


    


}

function getImages() {
    fetch('/api/images')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response error');
        }
        return response.json();
    })
    .then(data => {
        const img = document.getElementById('wallpapers');
        let curr = 0;

        if (data.length > 0) {
            updateImages(img,curr,data);

            setInterval(() =>  { 
                curr = (curr + 1) % data.length;
                updateImages(img,curr,data);



            }, 3000); 
            
        } else {
            console.log("No images found");
        }
    })
    .catch(error => {
        console.error('Error fetching image data:', error);
    });
}

function updateImages(image,index,urls) { 
    const path = urls[index].path; 
    image.src = path; 
    console.log(path);



} 






let ndate = new Date();

if (ndate.getDate().toString() != getDate()) { 
    getDate();
}



setInterval(getTime,1000); 
setInterval(getFact,600000); 


getTime();

getDate();

getFact();
getImages();

