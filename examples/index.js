var fs = require("fs");
var runtime = require("../src/runtime");
var allfiles = fs.readdirSync("./examples");
var slfiles = allfiles.filter(function (elm) { return elm.match(/.*\.sl/ig); });

slfiles.forEach(function (file) {
	var content = fs.readFileSync("examples/" + file, "UTF8");
	console.dir(runtime.execute(content, { left: "60", right: "15" }));
});
