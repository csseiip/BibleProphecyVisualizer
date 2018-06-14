var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var axios = require('axios');
var fs = require("fs");
var startyearcount = 1900;
var endyearcount = 2017;
var allData = [];
for (var yearIndex = startyearcount; yearIndex <= endyearcount; yearIndex++) {
    allData.push(axios.get(getYearData(yearIndex)));
}
try {
    axios.all(allData);
}
catch (err) {
    console.log(err);
}
function getYearData(year) {
    return __awaiter(this, void 0, void 0, function () {
        var startdate, enddate, url, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startdate = year + "-01-01%2000:00:00";
                    enddate = year + "-12-31%2023:59:59";
                    url = "https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=" + startdate + "&endtime=" + enddate + "&minmagnitude=4.0&orderby=time";
                    return [4 /*yield*/, axios.get(url, { year: year })
                            .then(function (response) {
                            console.log(response.config.year);
                            console.log(response.data);
                            var currentyear = response.config.year;
                            fs.writeFile("./data/earthquakes-" + currentyear + ".json", JSON.stringify(response.data, null, 4), function (err) {
                                if (err) {
                                    console.error(err);
                                    writeErrFile(currentyear, err + "\n" + err.response.data);
                                    return;
                                }
                                ;
                                console.log("File has been created for " + currentyear + " Count: " + response.data.features.length);
                            });
                        })
                            .catch(function (err) {
                            console.log(err);
                            writeErrFile(year, err + "\n" + err.response.data);
                        })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function writeErrFile(currentyear, errRpt) {
    fs.writeFile("./data/earthquakes-" + currentyear + "-error.json", errRpt, function (err) {
        if (err) {
            console.error(err);
            return;
        }
        ;
        console.log("ERROR File has been created for " + currentyear);
    });
}
//# sourceMappingURL=app.js.map