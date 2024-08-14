fetch('Carrotmuseumcsv.csv')
    .then(response => response.text())
    .then(csv => {
        const data = csvToArray(csv);
        displayArt(data);
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

function displayArt(artData) {
    const output = document.getElementById('output');
    output.innerHTML = ''; // Clear any existing content

    artData.forEach(item => {
        const artDiv = document.createElement('div');
        artDiv.className = 'art-item';

        const img = document.createElement('img');
        img.src = item.Photo;
        img.alt = item.Item;
        img.style.maxWidth = '300px'; // Adjust as needed

        const info = document.createElement('p');
        info.innerHTML = `<strong>${item.Item}</strong> by ${item.Artist}<br>Size: ${item.Size}`;

        artDiv.appendChild(img);
        artDiv.appendChild(info);
        output.appendChild(artDiv);
    });
}