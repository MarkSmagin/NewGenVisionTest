let courses = [
    { name: "Courses in England", prices: [0, 100] }, 
    { name: "Courses in Germany", prices: [500, null] }, 
    { name: "Courses in Italy", prices: [100, 200] }, 
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [50, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
    { name: "Courses in France", prices: [null, null] },
];

let button = document.getElementById("search");
let result = document.getElementById("result");

button.addEventListener("click", function() {
    result.innerHTML = "";

    let leftRange = Number(document.getElementById("leftRange").value);
    let rightRange = Number(document.getElementById("rightRange").value);

    if (leftRange == 0){
        leftRange = null;
    }

    if (rightRange == 0){
        rightRange = null;
    }

    let filtered =  courses.filter(function(value) {
        return filterRange(value.prices, leftRange, rightRange);
    });
    
    result.classList.remove("hidden");

    for(let i = 0; i < filtered.length; i++){
        let newString = document.createElement("p");
        newString.innerHTML = `${filtered[i].name}`;
        newString.classList.add("line");
        result.appendChild(newString);
        console.log(filtered[i].prices);
    }
})

function filterRange(arr, a, b) {
    if (a === null && b === null){
        return arr
    } else if (a === null){
        return arr[0] <= b;
    } else if (b === null){
        return a <= arr[0] || a <= arr[1] || arr[1] === null;
    } else {
        return (a <= arr[1] || arr[1] === null) && (arr[0] <= b || arr[0] === null);
    }
}