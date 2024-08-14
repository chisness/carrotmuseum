console.log('Script started');

fetch('../Carrotmuseumcsv.csv')
    .then(response => {
        console.log('Fetch response received');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(csv => {
        console.log('CSV data received');
        const data = csvToArray(csv);
        console.log('Parsed CSV data:', data);
        displayArt(data);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('output').innerHTML = 'Error loading data: ' + error.message + '<br>Please check the console for more details.';
    });

function csvToArray(str, delimiter = ',') {
    console.log('Converting CSV to array');
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter).map(header => header.trim());
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    return rows.map(row => {
        const values = row.split(delimiter);
        return headers.reduce((object, header, index) => {
            object[header] = values[index] ? values[index].trim() : '';
            return object;
        }, {});
    });
}

function displayArt(artData) {
    console.log('Displaying art data');
    const output = document.getElementById('output');
    output.innerHTML = ''; // Clear any existing content

    artData.forEach((item, index) => {
        console.log(`Processing item ${index}:`, item);
        const artDiv = document.createElement('div');
        artDiv.className = 'art-item';

        const img = document.createElement('img');
        if (item.Photo) {
            // Adjust the path to go up one directory and then to the images folder
            const photoPath = '../' + item.Photo.replace(/^\//, '');
            img.src = photoPath;
            console.log(`Image ${index} src:`, img.src);
        } else {
            console.warn(`No photo path for item ${index}`);
            img.src = '../path/to/placeholder-image.jpg'; // Replace with actual placeholder image path
        }
        img.alt = item.Item || `Art piece ${index + 1}`;
        img.style.maxWidth = '300px'; // Adjust as needed

        const info = document.createElement('p');
        info.innerHTML = `<strong>${item.Item || 'Untitled'}</strong> by ${item.Artist || 'Unknown'}<br>Size: ${item.Size || 'Not specified'}`;

        artDiv.appendChild(img);
        artDiv.appendChild(info);
        output.appendChild(artDiv);
    });
}