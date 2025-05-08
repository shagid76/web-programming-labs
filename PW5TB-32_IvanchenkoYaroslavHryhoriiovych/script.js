function calculator1(){
    let pl110 = document.querySelector(".input-pl110").value || 0;
    let v110 = document.querySelector(".input-v110").value || 0;
    let t110 = document.querySelector(".input-t110").value || 0;
    let v110m = document.querySelector(".input-v110m").value || 0;
    let tires = document.querySelector(".input-tires").value || 0;

    let woc = (0.007 * pl110) + (0.01 * v110) + (0.015 * t110) + (0.02 * v110m) + (0.03 * tires);
    let tvoc = ((0.007 * pl110 * 10) + (0.01 * v110 * 30) + (0.015 * t110 * 100) + (0.02 * v110m * 15) + (0.03 * tires * 2)) / woc;
    let kaoc = (woc * tvoc) / 8760;
    let kpmax = 0;
    if (v110 != 0) {
        kpmax = 43;
    }
    else if (pl110 != 0) {
        kpmax = 5.845
    }
    else if (v110m != 0) {
        kpmax = 3;
    }
    else if (tires != 0) {
        kpmax = 0.835;
    }

    let kpoc = 1.2 * kpmax / 8760;
    let wdk = 2 * woc * (kaoc + kpoc);

    let wdc = wdk + 0.02;

    document.getElementById('woc').innerHTML = `${woc.toFixed(3)} Рік<sup>-1</sup>`;
    document.getElementById('tvoc').innerHTML = `${tvoc.toFixed(2)} год`;
    document.getElementById('kaoc').innerHTML = `${kaoc.toFixed(5)}`;
    document.getElementById('kpoc').innerHTML = `${kpoc.toFixed(5)}`;
    document.getElementById('wdk').innerHTML = `${wdk.toFixed(5)} Рік<sup>-1</sup>`;
    document.getElementById('wdc').innerHTML = `${wdc.toFixed(4)} Рік<sup>-1</sup>`;
    document.getElementById('calculator1-result').style.display = 'block';
}


function calculator2(){
    let zpera = document.querySelector(".input-zpera").value || 0;
    let zperp = document.querySelector(".input-zperp").value || 0;
    let omega = document.querySelector(".input-omega").value || 0;
    let tb = document.querySelector(".input-tb").value || 0;
    let kp = document.querySelector(".input-kp").value || 0;
    let pm = document.querySelector(".input-pm").value || 0;
    let tm = document.querySelector(".input-tm").value || 0;
    
    let m_wneda = omega * tb * pm * tm;
    let m_wnedp = kp * pm * tm;
    let m_zper = zpera * m_wneda + zperp * m_wnedp;

    document.getElementById('m-wneda').innerText = `${m_wneda.toFixed(2)} кВт⋅год`;
    document.getElementById('m-wnedp').innerText = `${m_wnedp.toFixed(2)} кВт⋅год`;
    document.getElementById('m-zper').innerText = `${m_zper.toFixed(2)} грн`;
    document.getElementById('calculator2-result').style.display = 'block';
}

function render_calculator1(){
    document.getElementById('form-calculator1').style.display = 'block';
    document.getElementById('form-calculator2').style.display = 'none';
    document.getElementById('calculator1-result').style.display = 'none';
    document.getElementById('calculator2-result').style.display = 'none';
    document.getElementById('calculator2-button').style.display = 'block';
    document.getElementById('calculator1-button').style.display = 'none';
}

    
function render_calculator2(){
    document.getElementById('form-calculator1').style.display = 'none';
    document.getElementById('form-calculator2').style.display = 'block';
    document.getElementById('calculator1-result').style.display = 'none';
    document.getElementById('calculator2-result').style.display = 'none';
    document.getElementById('calculator1-button').style.display = 'block';
    document.getElementById('calculator2-button').style.display = 'none';
}