const CALCULATE = document.getElementById('calculate');
const ERROR = document.getElementById('error');
const MAN = document.getElementById('man');
const FLU = document.getElementById('flu');
const METHOD = document.getElementById('method'); 
let history = [];

CALCULATE.addEventListener('click', () => {
    let pesoinput= document.getElementById('peso')
    const PESO = parseInt(pesoinput.value);
    MAN.innerHTML = '';
    FLU.innerHTML = '';
    METHOD.innerHTML = '';
    pesoinput.addEventListener("input", ()=>{
        ERROR.style.display = 'none';
        FLU.style.display = 'none';
        MAN.style.display = 'none';
        METHOD.style.display = 'none';
    })
    if (PESO > 0) {
        let flujo = calcFlujo(PESO);
        METHOD.innerHTML = 'Método utilizado: Holliday-Segar'; 
        if (PESO > 30) {
            let flujo1500 = flujo * 1500;
            flujo1500 = Math.floor(flujo1500);
            flujo = flujo * 2000;
            let mantenimiento2 = flujo1500 * 1.5;
            FLU.innerHTML = 'Flujo: ' + flujo1500 + ' cc/h o ';
            MAN.innerHTML = 'Mantenimiento: ' + mantenimiento2 + ' cc/hr o ';
            METHOD.innerHTML = 'Método utilizado: Superficie Corporal'; 
        } 
            flujo = Math.floor(flujo);
            let mantenimiento = flujo * 1.5;
            FLU.innerHTML +=  'Flujo: ' + flujo + ' cc/h';
            MAN.innerHTML += 'Mantenimiento: ' + mantenimiento + ' cc/hr';
            

        FLU.style.display = 'block';
        MAN.style.display = 'block';
        METHOD.style.display = 'block'; 
        let method = PESO <= 30 ? "Método Holliday-Segar" : "Método de Superficie Corporal";
        let result = {
            peso: PESO,
            flujo: FLU.innerHTML,
            mantenimiento: MAN.innerHTML,
            metodo: method
        };
        history.push(result);
        updateHistory();
    } else {
       
    }
});

function calcFlujo(peso) {
    let volumen = 0;
    if (peso <= 30) {
        if (peso <= 10) {
            volumen = peso * 100;
        } else if (peso <= 20) {
            volumen = 1000 + (peso - 10) * 50;
        } else {
            volumen = 1500 + (peso - 20) * 20;
        }
    } else {
        volumen = ((peso * 4) + 7) / ( + 90);
    }
    return volumen / 24;
}

function updateHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = ''; 
    let recentHistory = history.slice(-5).reverse();
    for (let item of recentHistory) {
        let listItem = document.createElement('li');
        listItem.innerHTML = `
            Peso: ${item.peso}kg - 
            ${item.flujo} - 
            ${item.mantenimiento} - 
            ${item.metodo}
        `;
        historyList.appendChild(listItem);
    }
}
