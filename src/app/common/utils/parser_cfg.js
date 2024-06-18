const fs = require('fs');
const ini = require('ini');

function parseConfig(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const config = ini.parse(fileContent);
    return config;
}

module.exports = parseConfig;