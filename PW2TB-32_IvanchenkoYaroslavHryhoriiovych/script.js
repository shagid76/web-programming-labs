function calculator(){
    const solidFuels = {
        "DGSH": { 
            qri: 20.47,      
            ar: 25.2,
            gvn: 1.5              
        }
    };
    const oilFuels = {
        "HS-40": { 
            qdafi: 40.4,      
            wr: 2,
            ar: 0.15,
            gvn: 0       
        },
        "HS-100": { 
            qdafi: 40.03,      
            wr: 2,
            ar: 0.15,
            gvn: 0       
        },
        "HS-200": { 
            qdafi: 39.77,      
            wr: 1,
            ar: 0.3,
            gvn: 0       
        },
        "LS-40": { 
            qdafi: 41.24,      
            wr: 2,
            ar: 0.15,
            gvn: 0       
        },
        "LS-100": { 
            qdafi: 40.82,      
            wr: 2,
            ar: 0.15,
            gvn: 0       
        }
    };
    const naturalGases = {
        "UU": { 
            qri: 33.08,      
            ar: 0,
            gvn: 0       
        },
        "CAC": { 
            qri: 34.21,      
            ar: 0,
            gvn: 0       
        }
    };
    
    let nzy = 0.985;
    let solid_avn = 0.8;
    let oil_avn = 1;
    let gas_avn = 0;

    let solid_fuel = document.getElementById('solid-fuel').value;
    let oil_fuel = document.getElementById('oil-fuel').value;
    let gas_fuel = document.getElementById('natural-gas').value;
    let solid_fuel_emount = parseFloat(document.getElementById('solid-fuel-input').value) || 0;
    let oil_fuel_emount = parseFloat(document.getElementById('oil-fuel-input').value) || 0;
    let natural_gas_emount = parseFloat(document.getElementById('natural-gas-input').value) || 0;

    let solid_ktv = ((10 ** 6 ) / solidFuels[solid_fuel].qri) * solid_avn * ((solidFuels[solid_fuel].ar) / (100 - solidFuels[solid_fuel].gvn)) * (1 - nzy);
    let solid_etv = (10 ** (-6)) * solid_ktv * solidFuels[solid_fuel].qri * solid_fuel_emount;

    let oil_qri = oilFuels[oil_fuel].qdafi * (100 - oilFuels[oil_fuel].wr - oilFuels[oil_fuel].ar) / 100 - 0.025  * oilFuels[oil_fuel].wr;
    let oil_ktv = ((10 ** 6 ) / oil_qri) * oil_avn * ((oilFuels[oil_fuel].ar) / (100 - oilFuels[oil_fuel].gvn)) * (1 - nzy);
    let oil_etv = (10 ** (-6)) * oil_ktv * oil_qri * oil_fuel_emount;

    let gas_ktv = (( 10 ** 6) / naturalGases[gas_fuel].qri) * gas_avn * ((naturalGases[gas_fuel].ar) / (100 - naturalGases[gas_fuel].gvn)) * (1 - nzy);
    let gas_etv = (10 ** (-6)) * gas_ktv * naturalGases[gas_fuel].qri * natural_gas_emount;

    document.getElementById('solid-fuel-ktv').innerText = `${solid_ktv.toFixed(2)} г/ГДж`;
    document.getElementById('solid-fuel-etv').innerText = `${solid_etv.toFixed(2)} т`;
    document.getElementById('oil-fuel-ktv').innerText = `${oil_ktv.toFixed(2)} г/ГДж`;
    document.getElementById('oil-fuel-etv').innerText = `${oil_etv.toFixed(2)} т`;
    document.getElementById('natural-gas-ktv').innerText = `${gas_ktv.toFixed(2)} г/ГДж`;
    document.getElementById('natural-gas-etv').innerText = `${gas_etv.toFixed(2)} т`;
    
    document.getElementById('calculator-result').style.display = 'block';
}