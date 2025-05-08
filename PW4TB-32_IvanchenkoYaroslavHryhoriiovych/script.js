function calculator1(){
    let Ik = document.querySelector(".input-Ik").value || 0;
    let tf = document.querySelector(".input-tf").value || 0;
    let Sm = document.querySelector(".input-Sm").value || 0;
    let Tm = document.querySelector(".input-Tm").value || 0;

    let im = (Sm / 2) / (Math.sqrt(tf) * 10);
   
    let j_ek = getJek(Tm);

    let sek = im / j_ek;

    let min = (Ik * 1000 * Math.sqrt(tf)) / 92;
    let final = findValue(sek, min);

    document.getElementById('cabel').innerHTML =  `ААБ 10 3х${final.toFixed(0)} мм²`;
    document.getElementById('calculator1-result').style.display = 'block';
}

let values = [10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240]; 

function getJek(Tm){
    if (Tm >= 1000 && Tm < 3000) {
        return 1.6;
    } else if (Tm >= 3000 && Tm < 5000) {
        return 1.4;
    } else if (Tm >= 5000) {
        return 1.2;
    } else {
        return null;
    }
}

function findValue(sek, min){
    const filtered = values.filter(value => value > min);

    if (filtered.length === 0) {
        return null;
    }

    let closestValue = filtered[0];
    let closestDiff = Math.abs(sek - closestValue);

    for (let i = 1; i < filtered.length; i++) {
        const diff = Math.abs(sek - filtered[i]);
        if (diff < closestDiff) {
            closestValue = filtered[i];
            closestDiff = diff;
        }
    }

    return closestValue;
}

function calculator2(){
    let Sk = document.querySelector(".input-Sk").value || 0;
    let xc = Math.pow(10.5, 2) / Sk; 
    let xt = 1.84;
    let x = xc+ xt;
    let start = 10.5 / (Math.sqrt(3) * x); 
    
    document.getElementById('start').innerHTML = `${start.toFixed(2)} кА`;

    document.getElementById('calculator2-result').style.display = 'block';
}

function calculator3(){
        let maxVoltage = parseFloat(document.querySelector(".input-max-voltage").value) || 0;
        let nvt = parseFloat(document.querySelector(".input-nvt").value) || 0;
        let mass = parseFloat(document.querySelector(".input-mass").value) || 0;
        let nvv = parseFloat(document.querySelector(".input-nvv").value) || 0;
        let ass = parseFloat(document.querySelector(".input-ass").value) || 0;
        let srs = parseFloat(document.querySelector(".input-srs").value) || 0;
        let msrs = parseFloat(document.querySelector(".input-msrs").value) || 0;
    
        let rspt = (nvv * Math.pow(maxVoltage, 2)) / (100 * nvt);
        let snmx = rspt + srs;
        let snmz = Math.sqrt(Math.pow(ass, 2) + Math.pow(snmx, 2)); 
        
        let snmxMin = rspt + msrs;
        let snmzMin = Math.sqrt(Math.pow(ass, 2) + Math.pow(snmxMin, 2));
    
        let sqrt3 = Math.sqrt(3);
        let iNormal = (maxVoltage * 1000) / (sqrt3 * snmz); 
        let iNormal2 = iNormal * (sqrt3 / 2);
        let iMin = (maxVoltage * 1000) / (sqrt3 * snmzMin); 
        let iMin2 = iMin * (sqrt3 / 2);
    
        document.getElementById('rspt').innerText = `${rspt.toFixed(2)} Ом`;
        document.getElementById('snmz').innerText = `${snmz.toFixed(2)} Ом`;
        document.getElementById('snmx').innerText = `${snmx.toFixed(2)} Ом`;
        document.getElementById('snmzMin').innerText = `${snmzMin.toFixed(2)} Ом`;
        document.getElementById('snmxMin').innerText = `${snmxMin.toFixed(2)} Ом`;
        document.getElementById('iNormal').innerText = `${iNormal.toFixed(2)} А`;
        document.getElementById('iNormal2').innerText = `${iNormal2.toFixed(2)} А`;
        document.getElementById('iMin').innerText = `${iMin.toFixed(2)} А`;
        document.getElementById('iMin2').innerText = `${iMin2.toFixed(2)} А`;
    
        document.getElementById('calculator3-result').style.display = 'block';
    }
    
function render_calculator2(){
    document.getElementById('form-calculator1').style.display = 'none';
    document.getElementById('form-calculator3').style.display = 'none';
    document.getElementById('form-calculator2').style.display = 'block';
    document.getElementById('calculator1-result').style.display = 'none';
    document.getElementById('calculator2-result').style.display = 'none';
    document.getElementById('calculator1-button').style.display = 'block';
    document.getElementById('calculator2-button').style.display = 'none';
    document.getElementById('calculator3-button').style.display = 'block';
    document.getElementById('calculator3-result').style.display = 'none';
}

function render_calculator1(){
    document.getElementById('form-calculator1').style.display = 'block';
    document.getElementById('form-calculator2').style.display = 'none';
    document.getElementById('form-calculator3').style.display = 'none';
    document.getElementById('calculator1-result').style.display = 'none';
    document.getElementById('calculator2-result').style.display = 'none';
    document.getElementById('calculator3-result').style.display = 'none';
    document.getElementById('calculator2-button').style.display = 'block';
    document.getElementById('calculator1-button').style.display = 'none';
    document.getElementById('calculator3-button').style.display = 'block';
}

function render_calculator3(){
    document.getElementById('form-calculator1').style.display = 'none';
    document.getElementById('form-calculator2').style.display = 'none';
    document.getElementById('form-calculator3').style.display = 'block';
    document.getElementById('calculator1-result').style.display = 'none';
    document.getElementById('calculator2-result').style.display = 'none';
    document.getElementById('calculator3-result').style.display = 'none';
    document.getElementById('calculator2-button').style.display = 'block';
    document.getElementById('calculator1-button').style.display = 'block';
    document.getElementById('calculator3-button').style.display = 'none';
}