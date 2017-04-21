//credentials for webdav to access
const username = 'username'
const password = 'password'
const webdavURL = 'https://dev04-webstore-chalktalksports.demandware.net/on/demandware.servlet/webdav'
//example: 'https://dev04-webstore-chalktalksports.demandware.net/on/demandware.servlet/webdav'
const webdavDirectory = '/Sites/Catalogs/ChalkTalk_SPORTS_master/default'
//should usually be '/Sites/{directory}'

//local file name to write webdav filenames to
const webdavWriteToFile = 'ImageList.txt'

//local xml to read, such as a catalog export xml
const fileToRead = 'catalog.xml'

//local txt file to read file names from and compare that to fileToRead. 
//Should be the same as webdavWriteToFile
const fileListToCompare = 'ImageList.txt'

//new file to write to
const newFileToWrite = 'NewCatalog.xml'

module.exports = {
	username: username,
	password: password,
	webdavURL: webdavURL,
	webdavDirectory: webdavDirectory,
	webdavWriteToFile: webdavWriteToFile,
	fileToRead: fileToRead,
	fileListToCompare: fileListToCompare,
	newFileToWrite: newFileToWrite
}