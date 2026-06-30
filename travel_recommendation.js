let travelData = {};

fetch('travel_recommendation_api.json')
.then(response => response.json())
.then(data => {
    travelData = data;
    console.log(data);
})
.catch(error => console.log(error));

function searchRecommendation() {
    const keyword = document.getElementById('searchInput')
    .value
    .toLowerCase();
    let results = [];

    if(keyword === "beach" || keyword === "beaches"){
        results = travelData.beaches;
    }
    else if(keyword === "temple" || keyword === "temples"){
        results = travelData.temples;
    }
    else if(keyword=="country" || keyword=="countries"){

        results=[];
    
        travelData.countries.forEach(country=>{
            results=results.concat(country.cities);
        });
    
    }
    else {
        alert("No recommendation found!");
        return;
    }

    displayResults(results);
}

function displayResults(results){
    const resultDiv = document.getElementById("results");
    resultDiv.innerHTML = "";
    results.forEach(place => {
        resultDiv.innerHTML += `
        <div class="card">
            <img src="${place.imageUrl}" alt="${place.name}"
            <h3>${place.name}</h3>
            <p>${place.description}</p>
        </div>`;
    });
}

function clearResults(){
    document.getElementById("results").innerHTML = "";
    document.getElementById("searchInput").value = "";
}