function calculator1(){
    let carbon = document.querySelector(".input-carbon").value || 0;
    let hydrogen = document.querySelector(".input-hydrogen").value || 0;
    let sulfur = document.querySelector(".input-sulfur").value || 0;
    let nitrogen = document.querySelector(".input-nitrogen").value || 0;
    let oxygen = document.querySelector(".input-oxygen").value || 0;
    let moisture = document.querySelector(".input-moisture").value || 0;
    let ash = document.querySelector(".input-ash").value || 0;

    let conversionFactorFromWorkingToDryMass = 100 / (100 - moisture);
    let conversionFactorFromWorkingToCombustible = 100 / (100 - moisture - ash);

    document.getElementById("factorFromWorkingToDryMass").innerHTML = conversionFactorFromWorkingToDryMass.toFixed(2);
    document.getElementById("factorFromWorkingToCombustible").innerHTML = conversionFactorFromWorkingToCombustible.toFixed(2);

    let hydrogenDryMass = hydrogen * conversionFactorFromWorkingToDryMass;
    let carbonDryMass = carbon * conversionFactorFromWorkingToDryMass;
    let sulfurDryMass = sulfur * conversionFactorFromWorkingToDryMass;
    let nitrogenDryMass = nitrogen * conversionFactorFromWorkingToDryMass;
    let oxygenDryMass = oxygen * conversionFactorFromWorkingToDryMass;
    let ashDryMass = ash * conversionFactorFromWorkingToDryMass;

    document.getElementById("hydrogenDryMass").innerHTML = hydrogenDryMass.toFixed(2);
    document.getElementById("carbonDryMass").innerHTML = carbonDryMass.toFixed(2);
    document.getElementById("sulfurDryMass").innerHTML = sulfurDryMass.toFixed(2);
    document.getElementById("nitrogenDryMass").innerHTML = nitrogenDryMass.toFixed(2);
    document.getElementById("oxygenDryMass").innerHTML = oxygenDryMass.toFixed(2);
    document.getElementById("ashDryMass").innerHTML = ashDryMass.toFixed(2);

    let hydrogenCombustible = hydrogen * conversionFactorFromWorkingToCombustible;
    let carbonCombustible = carbon * conversionFactorFromWorkingToCombustible;
    let sulfurCombustible = sulfur * conversionFactorFromWorkingToCombustible;
    let nitrogenCombustible = nitrogen * conversionFactorFromWorkingToCombustible;
    let oxygenCombustible = oxygen * conversionFactorFromWorkingToCombustible;

    document.getElementById("hydrogenCombustible").innerHTML = hydrogenCombustible.toFixed(2);
    document.getElementById("carbonCombustible").innerHTML = carbonCombustible.toFixed(2);
    document.getElementById("sulfurCombustible").innerHTML = sulfurCombustible.toFixed(2);
    document.getElementById("nitrogenCombustible").innerHTML = nitrogenCombustible.toFixed(2);
    document.getElementById("oxygenCombustible").innerHTML = oxygenCombustible.toFixed(2);

    let lowerCalorificValue = ((339 * carbon) + (1030 * hydrogen) - (108.8 * (oxygen - sulfur)) - (25 * moisture)) / 1000;
    let heatPerDryMass = (lowerCalorificValue + 0.025 * moisture) * (100 / (100 - moisture));
    let heatPerCombustibleMass = (lowerCalorificValue + 0.025 * moisture) * (100 / (100 - moisture - ash));

    document.getElementById("lowerCalorificValue").innerHTML = lowerCalorificValue.toFixed(2);
    document.getElementById("heatPerDryMass").innerHTML = heatPerDryMass.toFixed(2);
    document.getElementById("heatPerCombustibleMass").innerHTML = heatPerCombustibleMass.toFixed(2);
    document.getElementById('calculator1-result').style.display = 'block';
}

function calculator2(){
    let carbon = document.querySelector(".input-carbon-calculator2").value || 0;
    let hydrogen = document.querySelector(".input-hydrogen-calculator2").value || 0;
    let oxygen = document.querySelector(".input-oxygen-calculator2").value || 0;
    let sulfur = document.querySelector(".input-sulfur-calculator2").value || 0;
    let cmofo = document.querySelector(".input-cmofo-calculator2").value || 0;
    let humidityOfWMOF = document.querySelector(".input-wmof-calculator2").value || 0;
    let ashContent = document.querySelector(".input-ash-content-calculator2").value || 0;
    let vanadiumContent = document.querySelector(".input-vanadium-content-calculator2").value || 0;

    let carbonWMOF = carbon * (100 - humidityOfWMOF - ashContent)/100;
    let hydrogenWMOF =  hydrogen * (100 - humidityOfWMOF - ashContent)/100;
    let oxygenWMOF = oxygen * (100 - humidityOfWMOF - ashContent)/100;
    let sulfurWMOF = sulfur * (100 - humidityOfWMOF - ashContent)/100;
    let ashWMOF = ashContent * (100 - humidityOfWMOF)/100;
    let vanadiumWMOF = vanadiumContent * (100 - humidityOfWMOF)/100;

    document.getElementById("carbonWMOF").innerHTML = carbonWMOF.toFixed(2);
    document.getElementById("hydrogenWMOF").innerHTML = hydrogenWMOF.toFixed(2);
    document.getElementById("oxygenWMOF").innerHTML = oxygenWMOF.toFixed(2);
    document.getElementById("sulfurWMOF").innerHTML = sulfurWMOF.toFixed(2);
    document.getElementById("ashWMOF").innerHTML = ashWMOF.toFixed(2);
    document.getElementById("vanadiumWMOF").innerHTML = vanadiumWMOF.toFixed(2);

    let lcvofo = cmofo * ((100 - humidityOfWMOF - ashContent)/100) - 0.025 * humidityOfWMOF;

    document.getElementById("lcvofo").innerHTML = lcvofo.toFixed(2);

    document.getElementById('calculator2-result').style.display = 'block';
}

function render_calculator2(){
    document.getElementById('form-calculator1').style.display = 'none';
    document.getElementById('form-calculator2').style.display = 'block';
    document.getElementById('calculator1-result').style.display = 'none';
    document.getElementById('calculator2-result').style.display = 'none';
    document.getElementById('calculator1-button').style.display = 'block';
    document.getElementById('calculator2-button').style.display = 'none';
}

function render_calculator1(){
    document.getElementById('form-calculator1').style.display = 'block';
    document.getElementById('form-calculator2').style.display = 'none';
    document.getElementById('calculator1-result').style.display = 'none';
    document.getElementById('calculator2-result').style.display = 'none';
    document.getElementById('calculator2-button').style.display = 'block';
    document.getElementById('calculator1-button').style.display = 'none';
}