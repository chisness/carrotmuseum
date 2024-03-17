fetch('Carrotmuseumcsv.csv')
    .then(response => response.text())
    .then(csv => {
        const data = csvToArray(csv);
        document.getElementById('output').innerText = JSON.stringify(data, null, 2);
    });

function csvToArray(str, delimiter = ',') {
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    return rows.map(row => {
        const values = row.split(delimiter);
        return headers.reduce((object, header, index) => {
            object[header] = values[index];
            return object;
        }, {});
    });
}
