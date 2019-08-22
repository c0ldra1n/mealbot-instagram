const School = require('node-school-kr');

const beautifyLine = (text) => {
    return text.replace(/([1-9]|1[0-8])\./g, "").replace(/\+/g, ", ");
}

const processRawMealData = (rawdata) => {
    const lines = rawdata.split('\n');
    var master = {};
    var iterationMenu;
    for (line of lines) {
        if (line.includes('[조식]') || line.includes('[중식]') || line.includes('[석식]')) {
            iterationMenu = line.substring(1, 3);
            master[iterationMenu] = [];
            continue;
        } else if (line.includes('간식')) {
            master['간식'] = [beautifyLine(line.substring(3))];
            continue;
        }
        master[iterationMenu].push(beautifyLine(line));
    }
    return master;
}

const getMeal = (date) => {
    return new Promise((resolve, reject) => {
        const school = new School()
        const CSIACode = 'J100005286'
        school.init(School.Type.HIGH, School.Region.GYEONGGI, CSIACode);
        school.getMeal(date.getFullYear(), date.getMonth() + 1).then((d) => {
            var processed = processRawMealData(d[date.getDate()]);
            processed.date = date;
            resolve(processed);
        }).catch(reject);
    })
}

module.exports = getMeal;