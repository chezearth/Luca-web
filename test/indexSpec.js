/*
 *
 * Test for the spreadhseet scraper
 */

var expect = require('chai').expect,
   webdriver = require('selenium-webdriver'),
   test = require('selenium-webdriver/testing')


test.describe('Index', function() {
   this.timeout(15000);
   var driver;

   test.before(() => {
      driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
   });

   test.it('should open the browser', function() {
      driver.get('http://localhost:3000');
      driver.getTitle().then(function(title) {
         expect(title).to.contain('Load spreadsheet')
      })
   });

   test.it('should retrieve the heading', function() {
      driver.findElement(webdriver.By.tagName('h1')).getText().then(function(text) {
//         console.log('Text is:', text);
         expect(text).to.contain('HEA Analysis Spreadsheet loader');
      });
   });

   test.it('should have a label saying \'Enter the path and file name of your spreadsheet here\'', function() {
      driver.findElement(webdriver.By.id('lblInputBox')).getText().then(function(text) {
         expect(text).to.contain('Enter the path and file name of your spreadsheet here');
      });
   });

   test.it('should have a single-line text input box, size 60, with \'path/to/file/\' shown in it', function() {
      var element = driver.findElement(webdriver.By.id('txtPathToFile'));
      element.getAttribute('placeholder').then(function(text) {
         expect(text).to.contain('/path/to/file/');
      });
      element.getAttribute('size').then(function(value) {
         expect(value).to.equal("60");
      });
      element.sendKeys('/Users/Charles/Documents/hea_analysis/south_africa/2016.04/spreadsheets/');
   });

   test.it('should have a \'Browse\' button', function() {
      driver.findElement(webdriver.By.id('btnChooseFile')).getAttribute("accept").then(function(text) {
         var arr = text.split(',');
         arr = arr.sort();
         expect(arr).to.deep.equal(['.xls','.xlsx']);
      });
   });

   test.it('should a have an \'Upload\' button', function() {
      driver.findElement(webdriver.By.id('btnUploadFile')).getAttribute('value').then(function(text) {
         expect(text).to.contain('Upload');
      });
   });


   test.it('The path should be made default for the choose', function() {
      element = driver.findElement(webdriver.By.id('btnChooseFile'));
      element.click().then(function(value) {
         console.log(element.finally);
      });

//      driver.wait(function() {
//         expect(true).to.equal(true);
//      }, 10000);
   });

/*   test.it('should a have a submit button', function() {
      driver.findElement(webdriver.By.name('loadFile').click().then(function()) {

      }
   })*/

   test.after(function() {
      driver.quit();
   });
});
