let hr = {
    "Шліфувальний верстат": { eta: 0.92, cosPhi: 0.9, Un: 0.38, n: 4, Pn: 20, Kv: 0.15, tgPhi: 1.33 },
    "Свердлильний верстат": { eta: 0.92, cosPhi: 0.9, Un: 0.38, n: 2, Pn: 14, Kv: 0.12, tgPhi: 1 },
    "Фугувальний верстат": { eta: 0.92, cosPhi: 0.9, Un: 0.38, n: 4, Pn: 42, Kv: 0.15, tgPhi: 1.33 },
    "Циркулярна пила": { eta: 0.92, cosPhi: 0.9, Un: 0.38, n: 1, Pn: 36, Kv: 0.3, tgPhi: 1.52 },
    "Прес": { eta: 0.92, cosPhi: 0.9, Un: 0.38, n: 1, Pn: 20, Kv: 0.5, tgPhi: 0.75 },
    "Полірувальний верстат": { eta: 0.92, cosPhi: 0.9, Un: 0.38, n: 1, Pn: 40, Kv: 0.2, tgPhi: 1 },
    "Фрезерний верстат": { eta: 0.92, cosPhi: 0.9, Un: 0.38, n: 2, Pn: 32, Kv: 0.2, tgPhi: 1 },
    "Вентилятор": { eta: 0.92, cosPhi: 0.9, Un: 0.38, n: 1, Pn: 20, Kv: 0.65, tgPhi: 0.75 }
};
let big = {
    "Зварювальний трансформатор": { eta: 0.92, cosPhi: 0.9, Un: 0.38, n: 2, Pn: 100, Kv: 0.2, tgPhi: 3 },
    "Сушильна шафа": { eta: 0.92, cosPhi: 0.9, Un: 0.38, n: 2, Pn: 120, Kv: 0.8, tgPhi: 0 }
};

function calculate() {
    let hr_sum = {
        n: 0,
        un: 0,
        nPn: 0,
        kv: 0,
        nPnKv: 0,
        nPnKvTg: 0,
        nPn2: 0,
        ne: 0,
        kr: 0,
        pr: 0,
        qr: 0,
        sr: 0,
        ir: 0
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
        if (hr_sum.un == 0) {
            hr_sum.un += d.Un;
        }
        else {
            hr_sum.un = (hr_sum.un + d.Un) / 2;
        }

        hr_sum.nPn += nPn;
        hr_sum.nPnKv += nPnKv;
        hr_sum.nPnKvTg += nPnKvTg;
        hr_sum.nPn2 += nPn2;
    }
    for (let name in big) {
        let d = big[name];
        let nPn = d.n * d.Pn;
        let Ir = nPn / (Math.sqrt(3) * d.Un * d.cosPhi * d.eta);
        result1 += `${name} - I<sub>р</sub> = <span class="highlighted">${Ir.toFixed(2)} А</span><br>`;
    }
    document.getElementById("dev_Ir").innerHTML = result1;

    hr_sum.kv = hr_sum.nPnKv / hr_sum.nPn;
    hr_sum.ne = (hr_sum.nPn ** 2) / hr_sum.nPn2;
    hr_sum.kr = getkrM(hr_sum.ne, hr_sum.kv);
    hr_sum.pr = hr_sum.kr * hr_sum.nPnKv;
    hr_sum.qr = hr_sum.nPnKvTg;
    hr_sum.sr = Math.sqrt((hr_sum.pr ** 2) + (hr_sum.qr ** 2));
    hr_sum.ir = hr_sum.pr / hr_sum.un;

    let total_nPn = parseFloat(document.getElementById("total_nPn").value);
    let total_nPnKv = parseFloat(document.getElementById("total_nPnKv").value);
    let total_nPnKvTg = parseFloat(document.getElementById("total_nPnKvTg").value);
    let total_nPn2 = parseFloat(document.getElementById("total_nPn2").value);

    let total_kv = total_nPnKv / total_nPn;
    let total_ne = (total_nPn ** 2) / total_nPn2;
    let total_kr = getkrT(total_ne, total_kv);
    let total_pr = total_kr * total_nPnKv;
    let total_qr = total_kr * total_nPnKvTg;
    let total_sr = Math.sqrt((total_pr ** 2) + (total_qr ** 2));
    let total_ir = total_pr / 0.38;

    document.getElementById("result2").innerHTML = `
        Груповий коефіцієнт використання для ШР1=ШР2=ШР3: <span class="highlighted">${hr_sum.kv.toFixed(4)};</span><br>
        Ефективна кількість ЕП для ШР1=ШР2=ШР3: <span class="highlighted">${hr_sum.ne.toFixed(0)};</span><br>
        Розрахунковий коефіцієнт активної потужності для ШР1=ШР2=ШР3: <span class="highlighted">${hr_sum.kr.toFixed(2)};</span><br>
        Розрахункове активне навантаження для ШР1=ШР2=ШР3: <span class="highlighted">${hr_sum.pr.toFixed(2)} кВт;</span><br>
        Розрахункове реактивне навантаження для ШР1=ШР2=ШР3: <span class="highlighted">${hr_sum.qr.toFixed(2)} квар.;</span><br>
        Повна потужність для ШР1=ШР2=ШР3: <span class="highlighted">${hr_sum.sr.toFixed(4)} кВ*А;</span><br>
        Розрахунковий груповий струм для ШР1=ШР2=ШР3: <span class="highlighted">${hr_sum.ir.toFixed(2)} А;</span><br>
        Коефіцієнти використання цеху в цілому: <span class="highlighted">${total_kv.toFixed(2)};</span><br>
        Ефективна кількість ЕП цеху в цілому: <span class="highlighted">${total_ne.toFixed(0)};</span><br>
        Розрахунковий коефіцієнт активної потужності цеху в цілому: <span class="highlighted">${total_kr.toFixed(2)};</span><br>
        Розрахункове активне навантаження на шинах 0,38 кВ ТП: <span class="highlighted">${total_pr.toFixed(2)} кВт;</span><br>
        Розрахункове реактивне навантаження на шинах 0,38 кВ ТП: <span class="highlighted">${total_qr.toFixed(2)} квар;</span><br>
        Повна потужність на шинах 0,38 кВ ТП: <span class="highlighted">${total_sr.toFixed(2)} кВ*А;</span><br>
        Розрахунковий груповий струм на шинах 0,38 кВ ТП: <span class="highlighted">${total_ir.toFixed(2)} А.</span>
    `;

    document.querySelector(`.result-box`).classList.remove('hidden');
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

function getkrM(ne, Kv) {
    const neValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 25, 30, 35, 40, 50, 60, 80, 100];

    const kvValues = [0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];

    const krTable = [
        [8.00, 5.33, 4.00, 2.67, 2.00, 1.60, 1.33, 1.14, 1.00],
        [6.22, 4.33, 3.39, 2.45, 1.98, 1.60, 1.33, 1.14, 1.00],
        [4.06, 2.89, 2.31, 1.74, 1.45, 1.34, 1.22, 1.14, 1.00],
        [3.24, 2.35, 1.91, 1.47, 1.25, 1.21, 1.12, 1.06, 1.00],
        [2.84, 2.09, 1.72, 1.35, 1.16, 1.16, 1.08, 1.03, 1.00],
        [2.64, 1.96, 1.62, 1.28, 1.14, 1.13, 1.06, 1.01, 1.00],
        [2.49, 1.86, 1.54, 1.23, 1.12, 1.10, 1.04, 1.00, 1.00],
        [2.37, 1.78, 1.48, 1.19, 1.10, 1.08, 1.02, 1.00, 1.00],
        [2.27, 1.71, 1.43, 1.16, 1.09, 1.07, 1.01, 1.00, 1.00],
        [2.18, 1.65, 1.39, 1.13, 1.07, 1.05, 1.00, 1.00, 1.00],
        [2.04, 1.56, 1.32, 1.08, 1.05, 1.03, 1.00, 1.00, 1.00],
        [1.94, 1.49, 1.27, 1.05, 1.02, 1.00, 1.00, 1.00, 1.00],
        [1.85, 1.43, 1.23, 1.02, 1.00, 1.00, 1.00, 1.00, 1.00],
        [1.78, 1.39, 1.19, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        [1.72, 1.35, 1.16, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        [1.60, 1.27, 1.10, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        [1.51, 1.21, 1.05, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        [1.44, 1.16, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        [1.40, 1.13, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        [1.30, 1.07, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        [1.25, 1.03, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        [1.20, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        [1.16, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00]
    ];

    function findClosestValue(value, arr) {
        return arr.reduce((prev, curr) => Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
    }

    const closestNe = findClosestValue(ne, neValues);
    const closestKv = findClosestValue(Kv, kvValues);

    const neIndex = neValues.indexOf(closestNe);
    const kvIndex = kvValues.indexOf(closestKv);

    return krTable[neIndex][kvIndex];
}

function getkrT(ne, Kv) {
    const table = [
        { range: [0, 1], values: [8.00, 5.33, 4.00, 2.67, 2.00, 1.60, 1.33, 1.14] },
        { range: [2, 2], values: [5.01, 3.44, 2.69, 1.90, 1.52, 1.24, 1.11, 1.00] },
        { range: [3, 3], values: [2.40, 2.17, 1.80, 1.42, 1.23, 1.14, 1.08, 1.00] },
        { range: [4, 4], values: [2.28, 1.73, 1.46, 1.19, 1.06, 1.04, 1.00, 0.97] },
        { range: [5, 5], values: [1.31, 1.12, 1.02, 1.00, 0.98, 0.96, 0.94, 0.93] },
        { range: [6, 8], values: [1.20, 1.00, 0.96, 0.95, 0.94, 0.93, 0.92, 0.91] },
        { range: [9, 10], values: [1.10, 0.97, 0.91, 0.90, 0.90, 0.90, 0.90, 0.90] },
        { range: [10, 25], values: [0.80, 0.80, 0.80, 0.85, 0.85, 0.85, 0.85, 0.90] },
        { range: [25, 50], values: [0.75, 0.75, 0.75, 0.75, 0.75, 0.80, 0.85, 0.85] },
        { range: [51, Infinity], values: [0.65, 0.65, 0.65, 0.70, 0.70, 0.75, 0.80, 0.80] }
    ];

    const Kv_values = [0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7];

    const row = table.find(({ range }) => ne >= range[0] && ne <= range[1]);

    if (!row) return null;

    let KvIndex = Kv_values.findIndex(value => Kv <= value);
    if (KvIndex === -1) KvIndex = Kv_values.length - 1;

    return row.values[KvIndex];
}

renderTable();