
let axios = require('axios');
let fs = require("fs");


let startyearcount = 1900;
let endyearcount = 2017;

let allData: Promise<any>[] = [];

for (let yearIndex = startyearcount; yearIndex <= endyearcount; yearIndex++) {
    allData.push(axios.get(getYearData(yearIndex)));
}

try {
    axios.all(allData);
}
catch (err) {
    console.log(err);
}


async function getYearData(year) {
    let startdate: string = `${year}-01-01%2000:00:00`;
    let enddate: string = `${year}-12-31%2023:59:59`;
    let url = `https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=${startdate}&endtime=${enddate}&minmagnitude=4.0&orderby=time`;

    let result = await axios.get(url, { year: year })
        .then(response => {
            console.log(response.config.year);
            console.log(response.data);
            let currentyear = response.config.year;

            fs.writeFile(`./data/earthquakes-${currentyear}.json`, JSON.stringify(response.data, null, 4), (err) => {
                if (err) {
                    console.error(err);
                    writeErrFile(currentyear, err + "\n" + err.response.data  );
                    return;
                };
                console.log(`File has been created for ${currentyear} Count: ${response.data.features.length}`);
            });
        })
        .catch(err => {
            console.log(err);
            writeErrFile(year, err + "\n" + err.response.data );
        });
    return result;
}

function writeErrFile(currentyear, errRpt:string){
    fs.writeFile(`./data/earthquakes-${currentyear}-error.json`, errRpt, (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log(`ERROR File has been created for ${currentyear}`);
    });
}



