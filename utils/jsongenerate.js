var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('input.json', 'utf8'));

obj.forEach(function (item) {
    var date =  new Date()
    date.setFullYear(date.getFullYear() - item.age);
    item.birthDate = date;
    var dateCreate = new Date();
    dateCreate.setDate(date.getDate() - Math.random()*1000);
    item.createTime = dateCreate;
    });

fs.writeFile("output.json", JSON.stringify(obj, null, 4), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});