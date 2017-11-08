var path = require('path');
var chunks = [];
var filePath = {
	srcPath: path.join(__dirname, '../src'),
	tplPath: path.join(__dirname, '../src'),
	build: path.join(__dirname, '../build'),
	devbuild: path.join(__dirname, '../devbuild'),
	publicPath: '/',
};

// var pages = [];

// var pagesToPath = function() {
//   var _p = [];
//   pages.forEach(function(_page) {
//     var _obj = {
//       name: _page.name,
//       entry: 'page/' + _page.entry,
//       ftl: _page.ftl,
//       templates: path.join(filePath.tplPath, _page.ftl),
//     };
//     _p.push(_obj);
//     chunks.push(_page.name);
//   });
//   return _p;
// };

module.exports = {
	filePath: filePath,
	port: 8080,
	chunks: chunks,
};