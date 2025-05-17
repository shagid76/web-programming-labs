let hr = {
    "Шліфувальний верстат": { eta: 0.92, cosPhi: 0.9, Un: 0.38, n: 4, Pn: 20, Kv: 0.15, tgPhi: 1.33 },
    "Свердлильний верстат": { eta: 0.92, cosPhi: 0.9, Un: 0.38, n: 2, Pn: 14, Kv: 0.12, tgPhi: 1 },
    // Add other devices as necessary...
};

let big = {
    "Зварювальний трансформатор": { eta: 0.92, cosPhi: 0.9, Un: 0.38, n: 2, Pn: 100, Kv: 0.2, tgPhi: 3 },
    "Сушильна шафа": { eta: 0.92, cosPhi: 0.9, Un: 0.38, n: 2, Pn: 120, Kv: 0.8, tgPhi: 0 }
};

function calculate() {
    let hr_sum = {
        n: 0, un: 0, nPn: 0, kv: 0, nPnKv: 0, nPnKvTg: 0, nPn2: 0, ne: 0, kr: 0, pr: 0, qr: 0, sr: 0, ir: 0
    };
    let result1 = "";
    for (let name in hr) {
        let d = hr[name];
        let nPn = d.n * d.Pn;
        let nPnKv = d.n * d.Pn * d.Kv;
        let nPnKvTg = d.n * d.Pn * d.Kv * d.tgPhi;
        let nPn2 = d.n * Math.pow(d.Pn, 2);
        let Ir = nPn / (Math.sqrt(3) * d.Un * d.cosPhi * d.eta);
        result1 += `${name} - I<sub>р</sub> = <span class="highlighted">${Ir.toFixed(2)} А</span><br>`;
        hr_sum.n += d.n;
        hr_sum.un = (hr_sum.un + d.Un) / 2; 
        hr_sum.nPn += nPn;
        hr_sum.nPnKv += nPnKv;
        hr_sum.nPnKvTg += nPnKvTg;
        hr_sum.nPn2 += nPn2;
    }
    
    document.getElementById("dev_Ir").innerHTML = result1;
    document.querySelector(".result-box").style.display = 'block';
}

function renderTable() {
    const tbody = document.querySelector("#deviceTable tbody");
    tbody.innerHTML = "";
    for (let name in hr) {
        let d = hr[name];
        let row = `<tr>
            <td>${name}</td>
            <td><input type="number" value="${d.eta}" step="0.01" onchange="updateHr('${name}', 'eta', this.value)"></td>
            <td><input type="number" value="${d.cosPhi}" step="0.01" onchange="updateHr('${name}', 'cosPhi', this.value)"></td>
            <td><input type="number" value="${d.Un}" step="0.01" onchange="updateHr('${name}', 'Un', this.value)"></td>
            <td><input type="number" value="${d.n}" onchange="updateHr('${name}', 'n', this.value)"></td>
            <td><input type="number" value="${d.Pn}" onchange="updateHr('${name}', 'Pn', this.value)"></td>
            <td><input type="number" value="${d.Kv}" step="0.01" onchange="updateHr('${name}', 'Kv', this.value)"></td>
            <td><input type="number" value="${d.tgPhi}" step="0.01" onchange="updateHr('${name}', 'tgPhi', this.value)"></td>
        </tr>`;
        tbody.innerHTML += row;
    }
    for (let name in big) {
        let d = big[name];
        let row = `<tr>
            <td>${name}</td>
            <td><input type="number" value="${d.eta}" step="0.01" onchange="updateBig('${name}', 'eta', this.value)"></td>
            <td><input type="number" value="${d.cosPhi}" step="0.01" onchange="updateBig('${name}', 'cosPhi', this.value)"></td>
            <td><input type="number" value="${d.Un}" step="0.01" onchange="updateBig('${name}', 'Un', this.value)"></td>
            <td><input type="number" value="${d.n}" onchange="updateBig('${name}', 'n', this.value)"></td>
            <td><input type="number" value="${d.Pn}" onchange="updateBig('${name}', 'Pn', this.value)"></td>
            <td><input type="number" value="${d.Kv}" step="0.01" onchange="updateBig('${name}', 'Kv', this.value)"></td>
            <td><input type="number" value="${d.tgPhi}" step="0.01" onchange="updateBig('${name}', 'tgPhi', this.value)"></td>
        </tr>`;
        tbody.innerHTML += row;
    }
}

function updateHr(name, param, value) {
    hr[name][param] = parseFloat(value);
}
function updateBig(name, param, value) {
    big[name][param] = parseFloat(value);
}

renderTable();