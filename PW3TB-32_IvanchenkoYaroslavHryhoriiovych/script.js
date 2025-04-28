function calculator(){
    let energy = parseFloat(document.querySelector(".input-energy").value) || 0;
    let old_sigma = parseFloat(document.querySelector(".input-old-sigma").value) || 0;
    let new_sigma = parseFloat(document.querySelector(".input-new-sigma").value) || 0;
    let price = parseFloat(document.querySelector(".input-price").value) || 0;

    let old_delta_w1 = NCDF((energy - energy * 0.05), (energy + energy * 0.05), energy, old_sigma);
    let old_delta_w2 = 1 - old_delta_w1;
    let old_profit = energy * 24 * price * (old_delta_w1 - old_delta_w2);

    let new_delta_w1 = NCDF((energy - energy * 0.05), (energy + energy * 0.05), energy, new_sigma);
    let new_delta_w2 = 1 - new_delta_w1;
    let new_profit = energy * 24 * price * (new_delta_w1 - new_delta_w2);

    let profit = new_profit - old_profit;

    document.getElementById('old-profit').innerText = `${old_profit.toFixed(2)} тис. грн.`;
    document.getElementById('new-profit').innerText = `${new_profit.toFixed(2)} тис. грн.`;
    document.getElementById('profit').innerText = `${profit.toFixed(2)} тис. грн.`;

    document.getElementById('calculator-result').style.display = 'block';
}

const NCDF = (fault1, fault2, energy, sigma) => {
    const upperLimit = (fault2 - energy) / (sigma * Math.sqrt(2));
    const lowerLimit = (fault1 - energy) / (sigma * Math.sqrt(2));
    return 0.5 * (math.erf(upperLimit) - math.erf(lowerLimit));
}