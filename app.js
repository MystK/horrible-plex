var fs = require('fs')
var animePath = 'D:\\Media\\Anime\\'
var downloadsPath = 'D:\\Downloads\\Torrents\\Completed\\'
var dPDA = fs.readdirSync(downloadsPath).filter(function (e) {
  return /\[HorribleSubs\].*\]\.mkv/.test(e)
})
var aPDA = fs.readdirSync(animePath).filter(function (e) {
  return !/\./.test(e)
})

// First check which mode
process.argv[2]? process.argv[2].match(/ - \d{2,} \[\d{3,}p].mkv/)?
  checkOne(process.argv[2]): // DO SINGLE MODE
  dPDA.length != 0? // DO NOTHING
    checkAll() // DO ALL
    : console.log('No new files')
  : dPDA.length != 0? // DO NOTHING
    checkAll() // DO ALL
    : console.log('No new files')
// Move just one anime file
function checkOne (fileName) {
  var animeName = fileName.slice(15, fileName.match(/ - \d{2,} \[\d{3,}p].mkv/).index)
  checkForFolderOrCreate(animeName = fileName.slice(15, fileName.match(/ - \d{2,} \[\d{3,}p].mkv/).index), function (folderName) {
    moveAnime(fileName, folderName)
  })
}
// ----------------------------------------

// Move all anime files
function checkAll () {
  console.log('DEPRECATING FOR NOW')
  process.exit()
  createGroupedDPDA(function (list) {
    // Now check if folder is already made and make if not.
    var d = 0 // Used for line 59 of getting anime ID
    for (var i in list) {
      checkForFolderOrCreate(i, function (folderName) {
        for (var j in list[i]) {
          moveAnime(list[i][j], folderName)
        }
      })
    }
  })
}
// ----------------------------------------
// Group same anime first by creating new array. If no anime in downloads, start on IDs
function createGroupedDPDA (callback) {
  var groupedDPDA = []
  var i = 0
  dPDA.forEach(function (e) {
    var animeName = e.slice(15, e.match(/ - \d{2,} \[\d{3,}p].mkv/).index)
    if (! groupedDPDA[animeName]) {
      groupedDPDA[animeName] = dPDA.filter(function (e) {return new RegExp(animeName).test(e)})
    }
    if (dPDA.length == ++i) callback(groupedDPDA)
  })
}
// ----------------------------------------
// Function to check for and/or create anime folder
function checkForFolderOrCreate (name, callback) {
  var i = 0
  var folderName
  var nameSplit = name.split(' ')
  var nameToCheck = name
  while (! folderName) {
    var possibleFolderNames = aPDA.filter(function (e) { return RegExp(nameToCheck, 'i').test(e) })

    switch (possibleFolderNames.length) {
      case 1:
        callback(folderName = possibleFolderNames[0])
        break
      case 0:
      default:
        if (nameToCheck.match(/ \S*$/)) nameToCheck = nameToCheck.slice(0, nameToCheck.match(/ \S*$/).index)
        else if (!possibleFolderNames.length) {
          folderName = name
          fs.mkdir(animePath + folderName , function () {  // Make the folder and move anime in callback
            callback(folderName)
          })
        } else console.log(folderName = 'Multiple matches to name!')
    }
  }
}
// ----------------------------------------

// Function to move the files
var util = require('util')
function moveAnime (name, folderName) {  // Make the folder and move anime in callback //test one
  fs.rename(downloadsPath + name, animePath + folderName + '/' + name, function (err) {
    if (err) {
      switch (err.errno) {
        case -4048:
          console.error('Cannot move ' + name + ' to ' + folderName + '. Filename already exists there.')
          break
        case -4082: // Being used
          setTimeout(function () {
            moveAnime(name, folderName)
          }, 500)
          break
        default:
          console.log(err)
      }
    } else {
      console.log('Moved ' + name + ' to ' + folderName)
    }
  })
// if (++d==++groupedDPDA.length) startGettingAnimeID() //Mark for when making folder is done
}
// ----------------------------------------

// Functions to get anime ID from theTVdb
function getIDfromXML (xml) {
  var id = xml.split('\n').filter(function (e) {return e.match(/<id>/)})
  if (id.length != 1) return 'Unknown'
  else return id[0].slice(4, id.length - 6)
}

function getAnimeID (folderName, callback) {
  var http = require('http')
  var xml = ''
  http.get('http://thetvdb.com/api/GetSeries.php?seriesname=' + folderName, function (res) {
    res.on('data', function (data) {
      xml = xml.concat(data)
    })
    res.on('end', function () {
      callback(getIDfromXML(xml))
      fs.writeFileSync(animePath + folderName + '/raw.xml', xml)
    })
  })
}

function startGettingAnimeID () {
  aPDA.forEach(function (e) {
    if (fs.readdirSync(animePath + e).filter(function (e) {return e == 'id'}) == '') {
      getAnimeID(e, function (data) {
        fs.writeFileSync(animePath + e + '/id', data)
      })
      console.log('No ID found')
    }
  })
}

// New one in progress
/* function startGettingAnimeID() {
  aPDA.forEach(function (e) {
    if (fs.readdirSync(animePath+e).filter(function (e) {return ! /\.mkv/.test(e)}).length!=2) {
      getAnimeID(e, function (data) {
        fs.writeFileSync(animePath+e+'/id',data)
      })
      console.log('No ID found')
    }
  })
}

fs.readdirSync(animePath+e).filter(function (e) {return ! /\.mkv/.test(e)}).length!=2 */

// ------------------------------------
