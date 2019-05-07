const async = require('async');
const dav = require('dav');
const util = require('util');

const fs = require('fs');

const postWriter = require('./PostWriter');

const DAV_HOST = process.env.DAV_HOST;


var xhr = new dav.transport.Basic(
  new dav.Credentials({
    username: process.env.DAV_USERNAME,
    password: process.env.DAV_PASSWORD
  })
);

var client = new dav.Client(xhr);

//dav.debug.enabled = true;


function processWackyIdeas(calendar) {
//    console.log('BEFORE SYNC Calendar data for ' + calendar.displayName);
//    console.log(calendar);

    var actions = calendar.objects.map(postWriter.writePost); // array of promises for all items
    return Promise.all(actions);
}

function processMaps(calendar) {
  return new Promise(resolve => {
    resolve('processed ' + calendar.displayName);
  });
}

function processCalendar(calendar) {
  return new Promise(function(resolve) {
    if (calendar.displayName === 'Wacky ideas') {
      resolve(processWackyIdeas(calendar));
    }
    if (calendar.displayName === 'ben/36eaba54-ce4e-11e8-8dd9-0800271b0601') {
      resolve(processMaps(calendar));
    }
    resolve('Skipped ' + calendar.displayName);
  });
}

function readCalendar() {

client.createAccount({
  server: DAV_HOST,
  accountType: 'caldav',
  loadCollections: true,
  loadObjects: true,
  filters: []
})
.then(function(account) {
//  fs.writeFileSync('calendar.json', util.inspect(account));
  fs.writeFileSync('out.txt', util.inspect(account.calendars[0].objects[0], {compact: false, depth: 4}));
//  console.log(util.inspect(account, {compact: false, depth: 4}));
  return new Promise(resolve => resolve(account));
})
.then(function(account) {
  // https://stackoverflow.com/a/31414472/567039
  var actions = account.calendars.map(processCalendar);
  return Promise.all(actions);
})
//.then(console.log)
.catch(function(err) {
  console.log(err);
  process.exit(1);
});


}

function main() {
//  console.log('User: ' + process.env.DAV_USERNAME + '@' + DAV_HOST);
  readCalendar();
}

main();
