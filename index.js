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

    sortResult(filtered);
    
    result.classList.remove("hidden");

    for(let i = 0; i < filtered.length; i++){
        let newString = document.createElement("p");
        newString.innerHTML = `${filtered[i].name}`;
        newString.classList.add("line");
        result.appendChild(newString);
    }
})

// Функция фильтрации списка курсов по заданному диапазону цен
function filterRange(arr, a, b) {
    // Проверка на наличие левой и правой границ диапазона, которые задает пользователь, если их нет, то выдается весь список курсов
    if (a === null && b === null){
        return arr
    }
    // Проверка на наличие левой границы диапозона, если такой нет, то будет выдан список курсов, у которых самая низкая цена меньше, чем правая граница, которую задал пользователь
    else if (a === null){
        return arr[0] <= b;
    } 
    // Проверка на наличие правой границы диапозона, если такой нет, то будет выдан список курсов, у которых самая высокая цена больше, чем левая граница, которую задал пользователь,
    // либо если самая высокая цена у курса не задана
    else if (b === null){
        return a <= arr[1] || arr[1] === null;
    } 
    // Во всех остальных случаях будут выведены все курсы, у которых самая высокая цена больше левой границы заданного диапозона или, если самая высокая цена не указана, и, если самая низкая цена
    // курса меньше, чем правая граница заданного диапазона, или она не указана
    else {
        return (a <= arr[1] || arr[1] === null) && (arr[0] <= b || arr[0] === null);
    }
}

// Функция сортироки по возрастанию цены
function sortResult(arr) {
    arr.sort((a, b) => a.prices[0] > b.prices[0] ? 1 : -1);
}