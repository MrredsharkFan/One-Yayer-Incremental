layers = { "1": new Decimal(14), "1,1": new Decimal(23),"1,2": new Decimal(14) }



function removeLastTerm(x) {
    return expand(x,0,"true")
}

function RGBcurve(x) {
    var r = Math.max(Math.abs((x % 768) - 384) - 128,0)
    var g = Math.max(Math.abs(((x + 256) % 768) - 384) - 128,0)
    var b = Math.max(Math.abs(((x+512) % 768) - 384) - 128,0)
    return `rgb(${r+93},${g+93},${b+93})`
}

function generate_button(x, c,l,m) {
    return `<button style="background-color: ${RGBcurve(l * 100)}; width: 100%; height: 50%; font-size: ${2 ** (-l) * 200}px; border: none; outline: none; padding: none; margin: none; opacity: ${100 - Math.max(0, l * 40 - 100)}%">${x}<br><span style="font-size: ${2 ** (-l) * 100}px">${m}</span></button>`
}


function drawButtons(layers) {
    var rows = {}
    var p = 0
    for (var i in layers) {
        var p = p+1
        var j = i
        var l = j.split(",").length
        rows[l] = (typeof (rows[l]) == "undefined") ? 0 : rows[l] + 1
        for (m in rows) { if (m > l) { rows[m] = -1 } }
        var k = removeLastTerm(j)
        if (k == "") { k = "main" }
        dg(k).innerHTML = dg(k).innerHTML + `<div id="${j}" style="display: inline-block;z-index: 0;position: absolute; width: ${j == 1 ? 100 : 50 * (2 ** (-rows[l]))}%; top: ${j==1?0:50}%; height: ${j==1?100:50}%;left: ${100-100*(2**-rows[l])}%">${generate_button(j,p*10,l+rows[l],layers[i])}</div>`
    }
    console.log(rows)
}

drawButtons(layers)