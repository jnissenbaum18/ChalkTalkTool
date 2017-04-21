const fs = require('fs')
const lineReader = require('line-reader')
const createClient = require('webdav')
const resources = require('./resources')

var client = createClient(
	resources.webdavURL,
    resources.username,
    resources.password
)

var writeStream = fs.createWriteStream(resources.webdavWriteToFile)

writeStream.on('error', function(err){
	console.log(err)
})

writeStream.on('finish', () => {
	console.log('Finished writing')
})

client.getDirectoryContents(resources.webdavDirectory)
	.then(function (contents) {
		//Read the file names. Could be very slow for large folders
		for (var i = contents.length - 1; i >= 0; i--) {
			if (contents[i].type !== 'directory') {
				writeStream.write(contents[i].basename + '\n')
			}
		}
	})
	.catch(function(err){
		console.error(err)
	})