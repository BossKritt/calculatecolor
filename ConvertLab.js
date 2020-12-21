function modal() {
    $('.modal').modal('show');
}

var url = "./Lab2.xlsx";
var dataKa = [];
var dataKw = [];
var dataKi = [];
var oReq = new XMLHttpRequest();
var ArrKa = [];
var ArrKw = [];
var ArrKi = [];
var dataSortKa = [];
var dataSortKw = [];
var dataSortKi = [];


oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";
oReq.onload = function (e) {
    modal();
    var arraybuffer = oReq.response;
    /* convert data to binary string */
    var data = new Uint8Array(arraybuffer);
    var arr = new Array();
    for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");

    /* Call XLSX */
    var workbook = XLSX.read(bstr, {
        type: "binary"
    });

    /* DO SOMETHING WITH workbook HERE */
    var first_sheet_name = workbook.SheetNames[0];
    /* Get worksheet */
    var worksheet = workbook.Sheets[first_sheet_name];
    dataKa = XLSX.utils.sheet_to_json(worksheet, {
        raw: true
    });
    var first_sheet_name = workbook.SheetNames[1];
    /* Get worksheet */
    var worksheet = workbook.Sheets[first_sheet_name];
    dataKw = XLSX.utils.sheet_to_json(worksheet, {
        raw: true
    });
    var first_sheet_name = workbook.SheetNames[2];
    /* Get worksheet */
    var worksheet = workbook.Sheets[first_sheet_name];
    dataKi = XLSX.utils.sheet_to_json(worksheet, {
        raw: true
    });
    console.log(dataKa);
    console.log(dataKw);
    console.log(dataKi);

    setTimeout(function () {
        // console.log('hejsan');
        $('.modal').modal('hide');
    }, 3000);
    return dataKa, dataKw, dataKi;
}

oReq.send();

function compare(a, b) {
    if (a.dataE < b.dataE) {
        return -1;
    }
    if (a.dataE > b.dataE) {
        return 1;
    }
    return 0;
}

function cmyk2rgb(c, m, y, k, normalized) {
    c = (c / 100);
    m = (m / 100);
    y = (y / 100);
    k = (k / 100);

    c = c * (1 - k) + k;
    m = m * (1 - k) + k;
    y = y * (1 - k) + k;

    var r = 1 - c;
    var g = 1 - m;
    var b = 1 - y;

    if (!normalized) {
        r = Math.round(255 * r);
        g = Math.round(255 * g);
        b = Math.round(255 * b);
    }
    return {
        r: r,
        g: g,
        b: b
    }
}

function myDeleteFunction() {
    let mytable1 = document.getElementById("myTable1").getElementsByTagName("th");
    let mytable2 = document.getElementById("myTable2").getElementsByTagName("th");
    let mytable3 = document.getElementById("myTable3").getElementsByTagName("th");
    if (mytable1 != 0) {
        for (let i = 0; i < 12; i++) {
            document.getElementById("myTable1").deleteRow(0);
            if (!document.getElementById("myTable1").getElementsByTagName("td")) {
                break;
            }
        }
    }
    if (mytable2 != 0) {
        for (let i = 0; i < 12; i++) {
            document.getElementById("myTable2").deleteRow(0);
            if (mytable2 == 0) {
                break;
            }
        }
    }
    if (mytable3 != 0) {
        for (let i = 0; i < 12; i++) {
            document.getElementById("myTable3").deleteRow(0);
            if (mytable3 == 0) {
                break;
            }
        }
    }
}

function myFunction() {
    var rank = document.getElementById("myrank");
    if (rank.style.display === "block") {
        rank.style.display = "none";
        myDeleteFunction();
    }
    var checkBoxKa = document.getElementById("CheckKa");
    var checkBoxKw = document.getElementById("CheckKw");
    var checkBoxKi = document.getElementById("CheckKi");
    var inputL = document.getElementById("lvalue").value;
    var inputA = document.getElementById("avalue").value;
    var inputB = document.getElementById("bvalue").value;
    modal();

    // show ka kw ki
    if (checkBoxKa.checked && checkBoxKw.checked && checkBoxKi.checked == true) {

        for (let i = 1; i <= dataKa.length; i++) {
            if (i === dataKa.length) {
                break;
            }
            else if (!isNaN(dataKa[i].__EMPTY) === true) {
                var cal = Math.sqrt((Math.pow(inputL - dataKa[i].__EMPTY_4, 2)) + (Math.pow(inputA - dataKa[i].__EMPTY_5, 2)) + (Math.pow(inputB - dataKa[i].__EMPTY_6, 2)));
                var total = { C: dataKa[i].__EMPTY, M: dataKa[i].__EMPTY_1, Y: dataKa[i].__EMPTY_2, K: dataKa[i].__EMPTY_3, L2: dataKa[i].__EMPTY_4, A2: dataKa[i].__EMPTY_5, B2: dataKa[i].__EMPTY_6 };
                total.dataE = cal;
                ArrKa.push(total);
            }
        }
        dataSortKa = ArrKa.sort(compare);

        for (let i = 1; i <= dataKw.length; i++) {
            if (i === dataKw.length) {
                break;
            }
            else if (!isNaN(dataKw[i].__EMPTY) === true) {
                var cal = Math.sqrt((Math.pow(inputL - dataKw[i].__EMPTY_4, 2)) + (Math.pow(inputA - dataKw[i].__EMPTY_5, 2)) + (Math.pow(inputB - dataKw[i].__EMPTY_6, 2)));
                var total = { C: dataKw[i].__EMPTY, M: dataKw[i].__EMPTY_1, Y: dataKw[i].__EMPTY_2, K: dataKw[i].__EMPTY_3, L2: dataKw[i].__EMPTY_4, A2: dataKw[i].__EMPTY_5, B2: dataKw[i].__EMPTY_6 };
                total.dataE = cal;
                ArrKw.push(total);
            }
        }
        dataSortKw = ArrKw.sort(compare);

        for (let i = 1; i <= dataKi.length; i++) {
            if (i === dataKi.length) {
                break;
            }
            else if (!isNaN(dataKi[i].__EMPTY) === true) {
                var cal = Math.sqrt((Math.pow(inputL - dataKi[i].__EMPTY_4, 2)) + (Math.pow(inputA - dataKi[i].__EMPTY_5, 2)) + (Math.pow(inputB - dataKi[i].__EMPTY_6, 2)));
                var total = { C: dataKi[i].__EMPTY, M: dataKi[i].__EMPTY_1, Y: dataKi[i].__EMPTY_2, K: dataKi[i].__EMPTY_3, L2: dataKi[i].__EMPTY_4, A2: dataKi[i].__EMPTY_5, B2: dataKi[i].__EMPTY_6 };
                total.dataE = cal;
                ArrKi.push(total);
            }
        }
        dataSortKi = ArrKi.sort(compare);
        setTimeout(function () {
            $('.modal').modal('hide');
        }, 1500);

        //get table head;
        var tableRef = document.getElementById('myTable1').getElementsByTagName('thead')[0];

        //insert Row
        tableRef.insertRow().innerHTML =
            '<th colspan="6">Ka</th>';
        tableRef.insertRow().innerHTML =
            '<th scope="col" style="position: sticky; left:0; background-color:#0d6efd">Rank</th>' +
            '<th scope="col">L</th>' +
            '<th scope="col">A</th>' +
            '<th scope="col">B</th>' +
            '<th scope="col">Delta E</th>' +
            '<th>CMYK</th>'

        // get table body:
        var tableRef = document.getElementById('myTable1').getElementsByTagName('tbody')[0];

        for (let index = 0; index < 10; index++) {
            //insert Row
            let rgbKa = cmyk2rgb(dataSortKa[index].C, dataSortKa[index].M, dataSortKa[index].Y, dataSortKa[index].K);
            tableRef.insertRow().innerHTML =
                '<td style="position: sticky; left:0; background-color:white">' + (index + 1).toString() + "</td>" +
                "<td>" + dataSortKa[index].L2 + "</td>" +
                "<td>" + dataSortKa[index].A2 + "</td>" +
                "<td>" + dataSortKa[index].B2 + "</td>" +
                "<td>" + dataSortKa[index].dataE.toFixed(4) + "</td>" +
                "<td>" + '<div class="rectangle mx-auto" style="background-color: rgb(' + rgbKa.r + ', ' + rgbKa.g + ',' + rgbKa.b + ');"></div>' +
                '(' + dataSortKa[index].C + ',' + dataSortKa[index].M + ',' + dataSortKa[index].Y + ',' + dataSortKa[index].K + ')' + "</td>";
        }

        //get table head;
        var tableRef = document.getElementById('myTable2').getElementsByTagName('thead')[0];

        //insert Row
        tableRef.insertRow().innerHTML =
            '<th colspan="6">Kw</th>';
        tableRef.insertRow().innerHTML =
            '<th scope="col" style="position: sticky; left:0; background-color:#198754">Rank</th>' +
            '<th scope="col">L</th>' +
            '<th scope="col">A</th>' +
            '<th scope="col">B</th>' +
            '<th scope="col">Delta E</th>' +
            '<th>CMYK</th>'

        // get table body:
        var tableRef = document.getElementById('myTable2').getElementsByTagName('tbody')[0];

        for (let index = 0; index < 10; index++) {
            //insert Row
            let rgbKw = cmyk2rgb(dataSortKw[index].C, dataSortKw[index].M, dataSortKw[index].Y, dataSortKw[index].K);
            tableRef.insertRow().innerHTML =
                '<td style="position: sticky; left:0; background-color:white">' + (index + 1).toString() + "</td>" +
                "<td>" + dataSortKw[index].L2 + "</td>" +
                "<td>" + dataSortKw[index].A2 + "</td>" +
                "<td>" + dataSortKw[index].B2 + "</td>" +
                "<td>" + dataSortKw[index].dataE.toFixed(4) + "</td>" +
                "<td>" + '<div class="rectangle mx-auto" style="background-color: rgb(' + rgbKw.r + ', ' + rgbKw.g + ',' + rgbKw.b + ');"></div>' +
                '(' + dataSortKw[index].C + ',' + dataSortKw[index].M + ',' + dataSortKw[index].Y + ',' + dataSortKw[index].K + ')' + "</td>";
        }

        //get table head;
        var tableRef = document.getElementById('myTable3').getElementsByTagName('thead')[0];

        //insert Row
        tableRef.insertRow().innerHTML =
            '<th colspan="6">Ki</th>';
        tableRef.insertRow().innerHTML =
            '<th scope="col" style="position: sticky; left:0; background-color:#dc3545">Rank</th>' +
            '<th scope="col">L</th>' +
            '<th scope="col">A</th>' +
            '<th scope="col">B</th>' +
            '<th scope="col">Delta E</th>' +
            '<th>CMYK</th>'

        // get table body:
        var tableRef = document.getElementById('myTable3').getElementsByTagName('tbody')[0];

        for (let index = 0; index < 10; index++) {
            //insert Row
            let rgbKi = cmyk2rgb(dataSortKi[index].C, dataSortKi[index].M, dataSortKi[index].Y, dataSortKi[index].K);
            tableRef.insertRow().innerHTML =
                '<td style="position: sticky; left:0; background-color:white">' + (index + 1).toString() + "</td>" +
                "<td>" + dataSortKi[index].L2 + "</td>" +
                "<td>" + dataSortKi[index].A2 + "</td>" +
                "<td>" + dataSortKi[index].B2 + "</td>" +
                "<td>" + dataSortKi[index].dataE.toFixed(4) + "</td>" +
                "<td>" + '<div class="rectangle mx-auto" style="background-color: rgb(' + rgbKi.r + ', ' + rgbKi.g + ',' + rgbKi.b + ');"></div>' +
                '(' + dataSortKi[index].C + ',' + dataSortKi[index].M + ',' + dataSortKi[index].Y + ',' + dataSortKi[index].K + ')' + "</td>";
        }

        var rank = document.getElementById("myrank");
        if (rank.style.display === "none") {
            rank.style.display = "block";
        } else {
            rank.style.display = "none";
        }
        for (let i = dataSortKa.length; i > 0; i--) {
            dataSortKa.pop();
        }
        for (let i = dataSortKw.length; i > 0; i--) {
            dataSortKw.pop();
        }
        for (let i = dataSortKi.length; i > 0; i--) {
            dataSortKi.pop();
        }

    }

    // show ka kw
    else if (checkBoxKa.checked && checkBoxKw.checked == true) {
        for (let i = 1; i <= dataKa.length; i++) {
            if (i === dataKa.length) {
                break;
            }
            else if (!isNaN(dataKa[i].__EMPTY) === true) {
                var cal = Math.sqrt((Math.pow(inputL - dataKa[i].__EMPTY_4, 2)) + (Math.pow(inputA - dataKa[i].__EMPTY_5, 2)) + (Math.pow(inputB - dataKa[i].__EMPTY_6, 2)));
                var total = { C: dataKa[i].__EMPTY, M: dataKa[i].__EMPTY_1, Y: dataKa[i].__EMPTY_2, K: dataKa[i].__EMPTY_3, L2: dataKa[i].__EMPTY_4, A2: dataKa[i].__EMPTY_5, B2: dataKa[i].__EMPTY_6 };
                total.dataE = cal;
                ArrKa.push(total);
            }
        }
        dataSortKa = ArrKa.sort(compare);

        for (let i = 1; i <= dataKw.length; i++) {
            if (i === dataKw.length) {
                break;
            }
            else if (!isNaN(dataKw[i].__EMPTY) === true) {
                var cal = Math.sqrt((Math.pow(inputL - dataKw[i].__EMPTY_4, 2)) + (Math.pow(inputA - dataKw[i].__EMPTY_5, 2)) + (Math.pow(inputB - dataKw[i].__EMPTY_6, 2)));
                var total = { C: dataKw[i].__EMPTY, M: dataKw[i].__EMPTY_1, Y: dataKw[i].__EMPTY_2, K: dataKw[i].__EMPTY_3, L2: dataKw[i].__EMPTY_4, A2: dataKw[i].__EMPTY_5, B2: dataKw[i].__EMPTY_6 };
                total.dataE = cal;
                ArrKw.push(total);
            }

        }
        dataSortKw = ArrKw.sort(compare);
        setTimeout(function () {
            $('.modal').modal('hide');
        }, 1500);

        //get table head;
        var tableRef = document.getElementById('myTable1').getElementsByTagName('thead')[0];

        //insert Row
        tableRef.insertRow().innerHTML =
            '<th colspan="6">Ka</th>';
        tableRef.insertRow().innerHTML =
            '<th scope="col" style="position: sticky; left:0; background-color:#0d6efd">Rank</th>' +
            '<th scope="col">L</th>' +
            '<th scope="col">A</th>' +
            '<th scope="col">B</th>' +
            '<th scope="col">Delta E</th>' +
            '<th>CMYK</th>'

        // get table body:
        var tableRef = document.getElementById('myTable1').getElementsByTagName('tbody')[0];

        for (let index = 0; index < 10; index++) {
            //insert Row
            let rgbKa = cmyk2rgb(dataSortKa[index].C, dataSortKa[index].M, dataSortKa[index].Y, dataSortKa[index].K);
            tableRef.insertRow().innerHTML =
                '<td style="position: sticky; left:0; background-color:white">' + (index + 1).toString() + "</td>" +
                "<td>" + dataSortKa[index].L2 + "</td>" +
                "<td>" + dataSortKa[index].A2 + "</td>" +
                "<td>" + dataSortKa[index].B2 + "</td>" +
                "<td>" + dataSortKa[index].dataE.toFixed(4) + "</td>" +
                "<td>" + '<div class="rectangle mx-auto" style="background-color: rgb(' + rgbKa.r + ', ' + rgbKa.g + ',' + rgbKa.b + ');"></div>' +
                '(' + dataSortKa[index].C + ',' + dataSortKa[index].M + ',' + dataSortKa[index].Y + ',' + dataSortKa[index].K + ')' + "</td>";
        }

        //get table head;
        var tableRef = document.getElementById('myTable2').getElementsByTagName('thead')[0];

        //insert Row
        tableRef.insertRow().innerHTML =
            '<th colspan="6">Kw</th>';
        tableRef.insertRow().innerHTML =
            '<th scope="col" style="position: sticky; left:0; background-color:#198754">Rank</th>' +
            '<th scope="col">L</th>' +
            '<th scope="col">A</th>' +
            '<th scope="col">B</th>' +
            '<th scope="col">Delta E</th>' +
            '<th>CMYK</th>'

        // get table body:
        var tableRef = document.getElementById('myTable2').getElementsByTagName('tbody')[0];

        for (let index = 0; index < 10; index++) {
            //insert Row
            let rgbKw = cmyk2rgb(dataSortKw[index].C, dataSortKw[index].M, dataSortKw[index].Y, dataSortKw[index].K);
            tableRef.insertRow().innerHTML =
                '<td style="position: sticky; left:0; background-color:white">' + (index + 1).toString() + "</td>" +
                "<td>" + dataSortKw[index].L2 + "</td>" +
                "<td>" + dataSortKw[index].A2 + "</td>" +
                "<td>" + dataSortKw[index].B2 + "</td>" +
                "<td>" + dataSortKw[index].dataE.toFixed(4) + "</td>" +
                "<td>" + '<div class="rectangle mx-auto" style="background-color: rgb(' + rgbKw.r + ', ' + rgbKw.g + ',' + rgbKw.b + ');"></div>' +
                '(' + dataSortKw[index].C + ',' + dataSortKw[index].M + ',' + dataSortKw[index].Y + ',' + dataSortKw[index].K + ')' + "</td>";
        }

        var rank = document.getElementById("myrank");
        if (rank.style.display === "none") {
            rank.style.display = "block";
        } else {
            rank.style.display = "none";
        }
        for (let i = dataSortKa.length; i > 0; i--) {
            dataSortKa.pop();
        }
        for (let i = dataSortKw.length; i > 0; i--) {
            dataSortKw.pop();
        }
    }

    // show ka ki
    else if (checkBoxKa.checked && checkBoxKi.checked == true) {
        for (let i = 1; i <= dataKa.length; i++) {
            if (i === dataKa.length) {
                break;
            }
            else if (!isNaN(dataKa[i].__EMPTY) === true) {
                var cal = Math.sqrt((Math.pow(inputL - dataKa[i].__EMPTY_4, 2)) + (Math.pow(inputA - dataKa[i].__EMPTY_5, 2)) + (Math.pow(inputB - dataKa[i].__EMPTY_6, 2)));
                var total = { C: dataKa[i].__EMPTY, M: dataKa[i].__EMPTY_1, Y: dataKa[i].__EMPTY_2, K: dataKa[i].__EMPTY_3, L2: dataKa[i].__EMPTY_4, A2: dataKa[i].__EMPTY_5, B2: dataKa[i].__EMPTY_6 };
                total.dataE = cal;
                ArrKa.push(total);
            }
        }
        dataSortKa = ArrKa.sort(compare);

        for (let i = 1; i <= dataKi.length; i++) {
            if (i === dataKi.length) {
                break;
            }
            else if (!isNaN(dataKi[i].__EMPTY) === true) {
                var cal = Math.sqrt((Math.pow(inputL - dataKi[i].__EMPTY_4, 2)) + (Math.pow(inputA - dataKi[i].__EMPTY_5, 2)) + (Math.pow(inputB - dataKi[i].__EMPTY_6, 2)));
                var total = { C: dataKi[i].__EMPTY, M: dataKi[i].__EMPTY_1, Y: dataKi[i].__EMPTY_2, K: dataKi[i].__EMPTY_3, L2: dataKi[i].__EMPTY_4, A2: dataKi[i].__EMPTY_5, B2: dataKi[i].__EMPTY_6 };
                total.dataE = cal;
                ArrKi.push(total);
            }
        }
        dataSortKi = ArrKi.sort(compare);
        setTimeout(function () {
            $('.modal').modal('hide');
        }, 1500);
        var tableRef = document.getElementById('myTable1').getElementsByTagName('thead')[0];

        //insert Row
        tableRef.insertRow().innerHTML =
            '<th colspan="6">Ka</th>';
        tableRef.insertRow().innerHTML =
            '<th scope="col" style="position: sticky; left:0; background-color:#0d6efd">Rank</th>' +
            '<th scope="col">L</th>' +
            '<th scope="col">A</th>' +
            '<th scope="col">B</th>' +
            '<th scope="col">Delta E</th>' +
            '<th>CMYK</th>'

        // get table body:
        var tableRef = document.getElementById('myTable1').getElementsByTagName('tbody')[0];

        for (let index = 0; index < 10; index++) {
            //insert Row
            let rgbKa = cmyk2rgb(dataSortKa[index].C, dataSortKa[index].M, dataSortKa[index].Y, dataSortKa[index].K);
            tableRef.insertRow().innerHTML =
                '<td style="position: sticky; left:0; background-color:white">' + (index + 1).toString() + "</td>" +
                "<td>" + dataSortKa[index].L2 + "</td>" +
                "<td>" + dataSortKa[index].A2 + "</td>" +
                "<td>" + dataSortKa[index].B2 + "</td>" +
                "<td>" + dataSortKa[index].dataE.toFixed(4) + "</td>" +
                "<td>" + '<div class="rectangle mx-auto" style="background-color: rgb(' + rgbKa.r + ', ' + rgbKa.g + ',' + rgbKa.b + ');"></div>' +
                '(' + dataSortKa[index].C + ',' + dataSortKa[index].M + ',' + dataSortKa[index].Y + ',' + dataSortKa[index].K + ')' + "</td>";
        }

        var tableRef = document.getElementById('myTable2').getElementsByTagName('thead')[0];

        //insert Row
        tableRef.insertRow().innerHTML =
            '<th colspan="6">Ki</th>';
        tableRef.insertRow().innerHTML =
            '<th scope="col" style="position: sticky; left:0; background-color:#198754">Rank</th>' +
            '<th scope="col">L</th>' +
            '<th scope="col">A</th>' +
            '<th scope="col">B</th>' +
            '<th scope="col">Delta E</th>' +
            '<th>CMYK</th>'

        // get table body:
        var tableRef = document.getElementById('myTable2').getElementsByTagName('tbody')[0];

        for (let index = 0; index < 10; index++) {
            //insert Row
            let rgbKi = cmyk2rgb(dataSortKi[index].C, dataSortKi[index].M, dataSortKi[index].Y, dataSortKi[index].K);
            tableRef.insertRow().innerHTML =
                '<td style="position: sticky; left:0; background-color:white">' + (index + 1).toString() + "</td>" +
                "<td>" + dataSortKi[index].L2 + "</td>" +
                "<td>" + dataSortKi[index].A2 + "</td>" +
                "<td>" + dataSortKi[index].B2 + "</td>" +
                "<td>" + dataSortKi[index].dataE.toFixed(4) + "</td>" +
                "<td>" + '<div class="rectangle mx-auto" style="background-color: rgb(' + rgbKi.r + ', ' + rgbKi.g + ',' + rgbKi.b + ');"></div>' +
                '(' + dataSortKi[index].C + ',' + dataSortKi[index].M + ',' + dataSortKi[index].Y + ',' + dataSortKi[index].K + ')' + "</td>";
        }

        var rank = document.getElementById("myrank");
        if (rank.style.display === "none") {
            rank.style.display = "block";
        } else {
            rank.style.display = "none";
        }
        for (let i = dataSortKa.length; i > 0; i--) {
            dataSortKa.pop();
        }
        for (let i = dataSortKi.length; i > 0; i--) {
            dataSortKi.pop();
        }

    }

    // show kw ki
    else if (checkBoxKw.checked && checkBoxKi.checked == true) {
        for (let i = 1; i <= dataKw.length; i++) {
            if (i === dataKw.length) {
                break;
            }
            else if (!isNaN(dataKw[i].__EMPTY) === true) {
                var cal = Math.sqrt((Math.pow(inputL - dataKw[i].__EMPTY_4, 2)) + (Math.pow(inputA - dataKw[i].__EMPTY_5, 2)) + (Math.pow(inputB - dataKw[i].__EMPTY_6, 2)));
                var total = { C: dataKw[i].__EMPTY, M: dataKw[i].__EMPTY_1, Y: dataKw[i].__EMPTY_2, K: dataKw[i].__EMPTY_3, L2: dataKw[i].__EMPTY_4, A2: dataKw[i].__EMPTY_5, B2: dataKw[i].__EMPTY_6 };
                total.dataE = cal;
                ArrKw.push(total);
            }

        }
        dataSortKw = ArrKw.sort(compare);

        for (let i = 1; i <= dataKi.length; i++) {
            if (i === dataKi.length) {
                break;
            }
            else if (!isNaN(dataKi[i].__EMPTY) === true) {
                var cal = Math.sqrt((Math.pow(inputL - dataKi[i].__EMPTY_4, 2)) + (Math.pow(inputA - dataKi[i].__EMPTY_5, 2)) + (Math.pow(inputB - dataKi[i].__EMPTY_6, 2)));
                var total = { C: dataKi[i].__EMPTY, M: dataKi[i].__EMPTY_1, Y: dataKi[i].__EMPTY_2, K: dataKi[i].__EMPTY_3, L2: dataKi[i].__EMPTY_4, A2: dataKi[i].__EMPTY_5, B2: dataKi[i].__EMPTY_6 };
                total.dataE = cal;
                ArrKi.push(total);
            }
        }
        dataSortKi = ArrKi.sort(compare);
        setTimeout(function () {
            $('.modal').modal('hide');
        }, 1500);

        var tableRef = document.getElementById('myTable1').getElementsByTagName('thead')[0];

        //insert Row
        tableRef.insertRow().innerHTML =
            '<th colspan="6">Kw</th>';
        tableRef.insertRow().innerHTML =
            '<th scope="col" style="position: sticky; left:0; background-color:#0d6efd">Rank</th>' +
            '<th scope="col">L</th>' +
            '<th scope="col">A</th>' +
            '<th scope="col">B</th>' +
            '<th scope="col">Delta E</th>' +
            '<th>CMYK</th>'

        // get table body:
        var tableRef = document.getElementById('myTable1').getElementsByTagName('tbody')[0];

        for (let index = 0; index < 10; index++) {
            //insert Row
            let rgbKw = cmyk2rgb(dataSortKw[index].C, dataSortKw[index].M, dataSortKw[index].Y, dataSortKw[index].K);
            tableRef.insertRow().innerHTML =
                '<td style="position: sticky; left:0; background-color:white">' + (index + 1).toString() + "</td>" +
                "<td>" + dataSortKw[index].L2 + "</td>" +
                "<td>" + dataSortKw[index].A2 + "</td>" +
                "<td>" + dataSortKw[index].B2 + "</td>" +
                "<td>" + dataSortKw[index].dataE.toFixed(4) + "</td>" +
                "<td>" + '<div class="rectangle mx-auto" style="background-color: rgb(' + rgbKw.r + ', ' + rgbKw.g + ',' + rgbKw.b + ');"></div>' +
                '(' + dataSortKw[index].C + ',' + dataSortKw[index].M + ',' + dataSortKw[index].Y + ',' + dataSortKw[index].K + ')' + "</td>";
        }

        var tableRef = document.getElementById('myTable2').getElementsByTagName('thead')[0];

        //insert Row
        tableRef.insertRow().innerHTML =
            '<th colspan="6">Ki</th>';
        tableRef.insertRow().innerHTML =
            '<th scope="col" style="position: sticky; left:0; background-color:#198754">Rank</th>' +
            '<th scope="col">L</th>' +
            '<th scope="col">A</th>' +
            '<th scope="col">B</th>' +
            '<th scope="col">Delta E</th>' +
            '<th>CMYK</th>'

        // get table body:
        var tableRef = document.getElementById('myTable2').getElementsByTagName('tbody')[0];

        for (let index = 0; index < 10; index++) {
            //insert Row
            let rgbKi = cmyk2rgb(dataSortKi[index].C, dataSortKi[index].M, dataSortKi[index].Y, dataSortKi[index].K);
            tableRef.insertRow().innerHTML =
                '<td style="position: sticky; left:0; background-color:white">' + (index + 1).toString() + "</td>" +
                "<td>" + dataSortKi[index].L2 + "</td>" +
                "<td>" + dataSortKi[index].A2 + "</td>" +
                "<td>" + dataSortKi[index].B2 + "</td>" +
                "<td>" + dataSortKi[index].dataE.toFixed(4) + "</td>" +
                "<td>" + '<div class="rectangle mx-auto" style="background-color: rgb(' + rgbKi.r + ', ' + rgbKi.g + ',' + rgbKi.b + ');"></div>' +
                '(' + dataSortKi[index].C + ',' + dataSortKi[index].M + ',' + dataSortKi[index].Y + ',' + dataSortKi[index].K + ')' + "</td>";
        }

        var rank = document.getElementById("myrank");
        if (rank.style.display === "none") {
            rank.style.display = "block";
        } else {
            rank.style.display = "none";
        }
        for (let i = dataSortKw.length; i > 0; i--) {
            dataSortKw.pop();
        }
        for (let i = dataSortKi.length; i > 0; i--) {
            dataSortKi.pop();
        }

    }

    // show ka
    else if (checkBoxKa.checked == true) {
        for (let i = 1; i <= dataKa.length; i++) {
            if (i === dataKa.length) {
                break;
            }
            else if (!isNaN(dataKa[i].__EMPTY) === true) {
                var cal = Math.sqrt((Math.pow(inputL - dataKa[i].__EMPTY_4, 2)) + (Math.pow(inputA - dataKa[i].__EMPTY_5, 2)) + (Math.pow(inputB - dataKa[i].__EMPTY_6, 2)));
                var total = { C: dataKa[i].__EMPTY, M: dataKa[i].__EMPTY_1, Y: dataKa[i].__EMPTY_2, K: dataKa[i].__EMPTY_3, L2: dataKa[i].__EMPTY_4, A2: dataKa[i].__EMPTY_5, B2: dataKa[i].__EMPTY_6 };
                total.dataE = cal;
                ArrKa.push(total);
            }
        }
        dataSortKa = ArrKa.sort(compare);
        setTimeout(function () {
            $('.modal').modal('hide');
        }, 1500);

        var tableRef = document.getElementById('myTable1').getElementsByTagName('thead')[0];
        //insert Row
        tableRef.insertRow().innerHTML =
            '<th colspan="6">Ka</th>';
        tableRef.insertRow().innerHTML =
            '<th scope="col" style="position: sticky; left:0; background-color:#0d6efd">Rank</th>' +
            '<th scope="col">L</th>' +
            '<th scope="col">A</th>' +
            '<th scope="col">B</th>' +
            '<th scope="col">Delta E</th>' +
            '<th>CMYK</th>'

        // get table body:
        var tableRef = document.getElementById('myTable1').getElementsByTagName('tbody')[0];

        for (let index = 0; index < 10; index++) {
            //insert Row
            let rgbKa = cmyk2rgb(dataSortKa[index].C, dataSortKa[index].M, dataSortKa[index].Y, dataSortKa[index].K);
            tableRef.insertRow().innerHTML =
                '<td style="position: sticky; left:0; background-color:white">' + (index + 1).toString() + "</td>" +
                "<td>" + dataSortKa[index].L2 + "</td>" +
                "<td>" + dataSortKa[index].A2 + "</td>" +
                "<td>" + dataSortKa[index].B2 + "</td>" +
                "<td>" + dataSortKa[index].dataE.toFixed(4) + "</td>" +
                "<td>" + '<div class="rectangle mx-auto" style="background-color: rgb(' + rgbKa.r + ', ' + rgbKa.g + ',' + rgbKa.b + ');"></div>' +
                '(' + dataSortKa[index].C + ',' + dataSortKa[index].M + ',' + dataSortKa[index].Y + ',' + dataSortKa[index].K + ')' + "</td>";
        }

        var rank = document.getElementById("myrank");
        if (rank.style.display === "none") {
            rank.style.display = "block";
        } else {
            rank.style.display = "none";
        }
        for (let i = dataSortKa.length; i > 0; i--) {
            dataSortKa.pop();
        }

    }

    // show kw
    else if (checkBoxKw.checked == true) {
        for (let i = 1; i <= dataKw.length; i++) {
            if (i === dataKw.length) {
                break;
            }
            else if (!isNaN(dataKw[i].__EMPTY) === true) {
                var cal = Math.sqrt((Math.pow(inputL - dataKw[i].__EMPTY_4, 2)) + (Math.pow(inputA - dataKw[i].__EMPTY_5, 2)) + (Math.pow(inputB - dataKw[i].__EMPTY_6, 2)));
                var total = { C: dataKw[i].__EMPTY, M: dataKw[i].__EMPTY_1, Y: dataKw[i].__EMPTY_2, K: dataKw[i].__EMPTY_3, L2: dataKw[i].__EMPTY_4, A2: dataKw[i].__EMPTY_5, B2: dataKw[i].__EMPTY_6 };
                total.dataE = cal;
                ArrKw.push(total);
            }

        }
        dataSortKw = ArrKw.sort(compare);
        setTimeout(function () {
            $('.modal').modal('hide');
        }, 1500);
        var tableRef = document.getElementById('myTable1').getElementsByTagName('thead')[0];

        //insert Row
        tableRef.insertRow().innerHTML =
            '<th colspan="6">Kw</th>';
        tableRef.insertRow().innerHTML =
            '<th scope="col" style="position: sticky; left:0; background-color:#0d6efd">Rank</th>' +
            '<th scope="col">L</th>' +
            '<th scope="col">A</th>' +
            '<th scope="col">B</th>' +
            '<th scope="col">Delta E</th>' +
            '<th>CMYK</th>'

        // get table body:
        var tableRef = document.getElementById('myTable1').getElementsByTagName('tbody')[0];

        for (let index = 0; index < 10; index++) {
            //insert Row
            let rgbKw = cmyk2rgb(dataSortKw[index].C, dataSortKw[index].M, dataSortKw[index].Y, dataSortKw[index].K);
            tableRef.insertRow().innerHTML =
                '<td style="position: sticky; left:0; background-color:white">' + (index + 1).toString() + "</td>" +
                "<td>" + dataSortKw[index].L2 + "</td>" +
                "<td>" + dataSortKw[index].A2 + "</td>" +
                "<td>" + dataSortKw[index].B2 + "</td>" +
                "<td>" + dataSortKw[index].dataE.toFixed(4) + "</td>" +
                "<td>" + '<div class="rectangle mx-auto" style="background-color: rgb(' + rgbKw.r + ', ' + rgbKw.g + ',' + rgbKw.b + ');"></div>' +
                '(' + dataSortKw[index].C + ',' + dataSortKw[index].M + ',' + dataSortKw[index].Y + ',' + dataSortKw[index].K + ')' + "</td>";
        }

        var rank = document.getElementById("myrank");
        if (rank.style.display === "none") {
            rank.style.display = "block";
        } else {
            rank.style.display = "none";
        }
        for (let i = dataSortKw.length; i > 0; i--) {
            dataSortKw.pop();
        }

    }

    // show ki
    else if (checkBoxKi.checked == true) {
        for (let i = 1; i <= dataKi.length; i++) {
            if (i === dataKi.length) {
                break;
            }
            else if (!isNaN(dataKi[i].__EMPTY) === true) {
                var cal = Math.sqrt((Math.pow(inputL - dataKi[i].__EMPTY_4, 2)) + (Math.pow(inputA - dataKi[i].__EMPTY_5, 2)) + (Math.pow(inputB - dataKi[i].__EMPTY_6, 2)));
                var total = { C: dataKi[i].__EMPTY, M: dataKi[i].__EMPTY_1, Y: dataKi[i].__EMPTY_2, K: dataKi[i].__EMPTY_3, L2: dataKi[i].__EMPTY_4, A2: dataKi[i].__EMPTY_5, B2: dataKi[i].__EMPTY_6 };
                total.dataE = cal;
                ArrKi.push(total);
            }
        }
        dataSortKi = ArrKi.sort(compare);
        setTimeout(function () {
            $('.modal').modal('hide');
        }, 1500);
        var tableRef = document.getElementById('myTable1').getElementsByTagName('thead')[0];

        //insert Row
        tableRef.insertRow().innerHTML =
            '<th colspan="6">Ki</th>';
        tableRef.insertRow().innerHTML =
            '<th scope="col" style="position: sticky; left:0; background-color:#0d6efd">Rank</th>' +
            '<th scope="col">L</th>' +
            '<th scope="col">A</th>' +
            '<th scope="col">B</th>' +
            '<th scope="col">Delta E</th>' +
            '<th>CMYK</th>'

        // get table body:
        var tableRef = document.getElementById('myTable1').getElementsByTagName('tbody')[0];

        for (let index = 0; index < 10; index++) {
            //insert Row
            let rgbKi = cmyk2rgb(dataSortKi[index].C, dataSortKi[index].M, dataSortKi[index].Y, dataSortKi[index].K);
            tableRef.insertRow().innerHTML =
                '<td style="position: sticky; left:0; background-color:white">' + (index + 1).toString() + "</td>" +
                "<td>" + dataSortKi[index].L2 + "</td>" +
                "<td>" + dataSortKi[index].A2 + "</td>" +
                "<td>" + dataSortKi[index].B2 + "</td>" +
                "<td>" + dataSortKi[index].dataE.toFixed(4) + "</td>" +
                "<td>" + '<div class="rectangle mx-auto" style="background-color: rgb(' + rgbKi.r + ', ' + rgbKi.g + ',' + rgbKi.b + ');"></div>' +
                '(' + dataSortKi[index].C + ',' + dataSortKi[index].M + ',' + dataSortKi[index].Y + ',' + dataSortKi[index].K + ')' + "</td>";
        }

        var rank = document.getElementById("myrank");
        if (rank.style.display === "none") {
            rank.style.display = "block";
        } else {
            rank.style.display = "none";
        }
        for (let i = dataSortKi.length; i > 0; i--) {
            dataSortKi.pop();
        }

    }

    //show ka kw ki no press
    else {
        for (let i = 1; i <= dataKa.length; i++) {
            if (i === dataKa.length) {
                break;
            }
            else if (!isNaN(dataKa[i].__EMPTY) === true) {
                var cal = Math.sqrt((Math.pow(inputL - dataKa[i].__EMPTY_4, 2)) + (Math.pow(inputA - dataKa[i].__EMPTY_5, 2)) + (Math.pow(inputB - dataKa[i].__EMPTY_6, 2)));
                var total = { C: dataKa[i].__EMPTY, M: dataKa[i].__EMPTY_1, Y: dataKa[i].__EMPTY_2, K: dataKa[i].__EMPTY_3, L2: dataKa[i].__EMPTY_4, A2: dataKa[i].__EMPTY_5, B2: dataKa[i].__EMPTY_6 };
                total.dataE = cal;
                ArrKa.push(total);
            }
        }
        dataSortKa = ArrKa.sort(compare);

        for (let i = 1; i <= dataKw.length; i++) {
            if (i === dataKw.length) {
                break;
            }
            else if (!isNaN(dataKw[i].__EMPTY) === true) {
                var cal = Math.sqrt((Math.pow(inputL - dataKw[i].__EMPTY_4, 2)) + (Math.pow(inputA - dataKw[i].__EMPTY_5, 2)) + (Math.pow(inputB - dataKw[i].__EMPTY_6, 2)));
                var total = { C: dataKw[i].__EMPTY, M: dataKw[i].__EMPTY_1, Y: dataKw[i].__EMPTY_2, K: dataKw[i].__EMPTY_3, L2: dataKw[i].__EMPTY_4, A2: dataKw[i].__EMPTY_5, B2: dataKw[i].__EMPTY_6 };
                total.dataE = cal;
                ArrKw.push(total);
            }
        }
        dataSortKw = ArrKw.sort(compare);

        for (let i = 1; i <= dataKi.length; i++) {
            if (i === dataKi.length) {
                break;
            }
            else if (!isNaN(dataKi[i].__EMPTY) === true) {
                var cal = Math.sqrt((Math.pow(inputL - dataKi[i].__EMPTY_4, 2)) + (Math.pow(inputA - dataKi[i].__EMPTY_5, 2)) + (Math.pow(inputB - dataKi[i].__EMPTY_6, 2)));
                var total = { C: dataKi[i].__EMPTY, M: dataKi[i].__EMPTY_1, Y: dataKi[i].__EMPTY_2, K: dataKi[i].__EMPTY_3, L2: dataKi[i].__EMPTY_4, A2: dataKi[i].__EMPTY_5, B2: dataKi[i].__EMPTY_6 };
                total.dataE = cal;
                ArrKi.push(total);
            }
        }
        dataSortKi = ArrKi.sort(compare);
        setTimeout(function () {
            $('.modal').modal('hide');
        }, 1500);
        var tableRef = document.getElementById('myTable1').getElementsByTagName('thead')[0];

        //insert Row
        tableRef.insertRow().innerHTML =
            '<th colspan="6">Ka</th>';
        tableRef.insertRow().innerHTML =
            '<th scope="col" style="position: sticky; left:0; background-color:#0d6efd">Rank</th>' +
            '<th scope="col">L</th>' +
            '<th scope="col">A</th>' +
            '<th scope="col">B</th>' +
            '<th scope="col">Delta E</th>' +
            '<th>CMYK</th>'

        // get table body:
        var tableRef = document.getElementById('myTable1').getElementsByTagName('tbody')[0];

        for (let index = 0; index < 10; index++) {
            //insert Row
            let rgbKa = cmyk2rgb(dataSortKa[index].C, dataSortKa[index].M, dataSortKa[index].Y, dataSortKa[index].K);
            tableRef.insertRow().innerHTML =
                '<td style="position: sticky; left:0; background-color:white">' + (index + 1).toString() + "</td>" +
                "<td>" + dataSortKa[index].L2 + "</td>" +
                "<td>" + dataSortKa[index].A2 + "</td>" +
                "<td>" + dataSortKa[index].B2 + "</td>" +
                "<td>" + dataSortKa[index].dataE.toFixed(4) + "</td>" +
                "<td>" + '<div class="rectangle mx-auto" style="background-color: rgb(' + rgbKa.r + ', ' + rgbKa.g + ',' + rgbKa.b + ');"></div>' +
                '(' + dataSortKa[index].C + ',' + dataSortKa[index].M + ',' + dataSortKa[index].Y + ',' + dataSortKa[index].K + ')' + "</td>";
        }

        var tableRef = document.getElementById('myTable2').getElementsByTagName('thead')[0];

        //insert Row
        tableRef.insertRow().innerHTML =
            '<th colspan="6">Kw</th>';
        tableRef.insertRow().innerHTML =
            '<th scope="col" style="position: sticky; left:0; background-color:#198754">Rank</th>' +
            '<th scope="col">L</th>' +
            '<th scope="col">A</th>' +
            '<th scope="col">B</th>' +
            '<th scope="col">Delta E</th>' +
            '<th>CMYK</th>'

        // get table body:
        var tableRef = document.getElementById('myTable2').getElementsByTagName('tbody')[0];

        for (let index = 0; index < 10; index++) {
            //insert Row
            let rgbKw = cmyk2rgb(dataSortKw[index].C, dataSortKw[index].M, dataSortKw[index].Y, dataSortKw[index].K);
            tableRef.insertRow().innerHTML =
                '<td style="position: sticky; left:0; background-color:white">' + (index + 1).toString() + "</td>" +
                "<td>" + dataSortKw[index].L2 + "</td>" +
                "<td>" + dataSortKw[index].A2 + "</td>" +
                "<td>" + dataSortKw[index].B2 + "</td>" +
                "<td>" + dataSortKw[index].dataE.toFixed(4) + "</td>" +
                "<td>" + '<div class="rectangle mx-auto" style="background-color: rgb(' + rgbKw.r + ', ' + rgbKw.g + ',' + rgbKw.b + ');"></div>' +
                '(' + dataSortKw[index].C + ',' + dataSortKw[index].M + ',' + dataSortKw[index].Y + ',' + dataSortKw[index].K + ')' + "</td>";
        }

        var tableRef = document.getElementById('myTable3').getElementsByTagName('thead')[0];

        //insert Row
        tableRef.insertRow().innerHTML =
            '<th colspan="6">Ki</th>';
        tableRef.insertRow().innerHTML =
            '<th scope="col" style="position: sticky; left:0; background-color:#dc3545">Rank</th>' +
            '<th scope="col">L</th>' +
            '<th scope="col">A</th>' +
            '<th scope="col">B</th>' +
            '<th scope="col">Delta E</th>' +
            '<th>CMYK</th>'

        // get table body:
        var tableRef = document.getElementById('myTable3').getElementsByTagName('tbody')[0];

        for (let index = 0; index < 10; index++) {
            //insert Row
            let rgbKi = cmyk2rgb(dataSortKi[index].C, dataSortKi[index].M, dataSortKi[index].Y, dataSortKi[index].K);
            tableRef.insertRow().innerHTML =
                '<td style="position: sticky; left:0; background-color:white">' + (index + 1).toString() + "</td>" +
                "<td>" + dataSortKi[index].L2 + "</td>" +
                "<td>" + dataSortKi[index].A2 + "</td>" +
                "<td>" + dataSortKi[index].B2 + "</td>" +
                "<td>" + dataSortKi[index].dataE.toFixed(4) + "</td>" +
                "<td>" + '<div class="rectangle mx-auto" style="background-color: rgb(' + rgbKi.r + ', ' + rgbKi.g + ',' + rgbKi.b + ');"></div>' +
                '(' + dataSortKi[index].C + ',' + dataSortKi[index].M + ',' + dataSortKi[index].Y + ',' + dataSortKi[index].K + ')' + "</td>";
        }

        var rank = document.getElementById("myrank");
        if (rank.style.display === "none") {
            rank.style.display = "block";
        } else {
            rank.style.display = "none";
        }
        for (let i = dataSortKa.length; i > 0; i--) {
            dataSortKa.pop();
        }
        for (let i = dataSortKw.length; i > 0; i--) {
            dataSortKw.pop();
        }
        for (let i = dataSortKi.length; i > 0; i--) {
            dataSortKi.pop();
        }
    }
}

