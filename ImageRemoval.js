const fs = require('fs')
const lineReader = require('line-reader')
const createClient = require('webdav')
const resources = require('./resources')

var client = createClient(
	resources.webdavURL,
    resources.username,
    resources.password
)

//read the file one line at a time so that the memory buffer does not get overloaded
lineReader.eachLine(resources.fileToRead, function(catalogLine, catalogLast, catalogCB) {
	if (catalogLine.indexOf('<image path="') !== -1){
		//if we have an image, read the image file list line by line
		var imageCount = 0
		var image = ''
		var whitespace = catalogLine.match(/^\s*/)[0].length
		lineReader.eachLine(resources.fileListToCompare, function(imageLine, imageLast, imageCB) {
			if (catalogLine.indexOf(imageLine) !== -1) {
				//if we match an image, make a copy and store outside of scope
				imageCount++
				image = ' '.repeat(whitespace) + '<image path="' + imageLine + '"/>'
			}
			imageCB()
			if (imageLast) {
				if (imageCount !== 0) {
					//write the matched image to the file
					console.log(image)
					fs.appendFile(resources.newFileToWrite, image + '\n', function(err){
						if (err) throw err
						catalogCB()
					})
				} else {
					catalogCB()
				}
			}
		})
	} else {
		//If the line isn't an image, write the line
		fs.appendFile(resources.newFileToWrite, catalogLine + '\n', function(err){
			if (err) throw err
			catalogCB()
		})
	}
	if (catalogLast) {
		fs.appendFile(resources.newFileToWrite, catalogLine + '\n', function(err){
			if (err) throw err
		})
		return false; // stop reading
	}
});

