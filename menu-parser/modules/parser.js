const PDFParser = require('pdf2json');
// pdf constants
const PDF_PARAMS = require('../globals').pdfParameters

class Parser {
  constructor(file) {
    this.items = [];
    this.file = file;
    this.pdfParser = new PDFParser();
  }

  getMenu() {
    return new Promise((resolve, reject) => {
      this.pdfParser.on('pdfParser_dataReady', data => {
        this.convertInformation(data)
        resolve(this.menu);
      });
      this.pdfParser.on('pdfParser_dataError', reject);
      this.pdfParser.loadPDF(this.file);
    });
  }

  convertInformation(pdfRawData) {
    this.items = pdfRawData.formImage.Pages[0].Texts
      .slice(0, -3)
      .map(item => {
        return decodeURIComponent(item.R[0].T);
      })
      .map(item => item.trim());

    this.menu = {
      monday: this.getMenuFor('monday'),
      tuesday: this.getMenuFor('tuesday'),
      wednesday: this.getMenuFor('wednesday'),
      thursday: this.getMenuFor('thursday'),
      friday: this.getMenuFor('friday')
    }
  }

  getMenuFor(day) {
    const menuItems = this.getMenuItemsFor(day);
    return this.getDishes(menuItems);
  }

  getMenuItemsFor(day) {
    let firstDay;
    let firstIndex = 0;
    let lastDay;
    let lastIndex;

    switch(day) {
      case 'monday':
        firstDay = 'monday';
        lastDay = 'tuesday';
        break;
      case 'tuesday':
        firstDay = 'tuesday';
        lastDay = 'wednesday';
        break;
      case 'wednesday':
        firstDay = 'wednesday';
        lastDay = 'thursday';
        break;
      case 'thursday':
        firstDay = 'thursday';
        lastDay = 'friday';
        break;
      default:
        firstDay = 'friday';
    }

    firstIndex = this.items.indexOf(PDF_PARAMS[firstDay]) + 1;
    lastIndex = lastDay ? this.items.indexOf(PDF_PARAMS[lastDay]) : this.items.length;

    return this.items.slice(firstIndex, lastIndex);
  }

  getDishes(items) {
    return {
      soup: this.getMeal(PDF_PARAMS.soup, PDF_PARAMS.meat, items),
      meat: this.getMeal(PDF_PARAMS.meat, PDF_PARAMS.fish, items),
      fish: this.getMeal(PDF_PARAMS.fish, PDF_PARAMS.vegetarian, items),
      vegetarian: this.getMeal(PDF_PARAMS.vegetarian, null, items)
    };
  }

  getMeal(firstMeal, secondMeal, items) {
    const firstIndex = items.indexOf(firstMeal) + 1;
    const lastIndex = secondMeal ? items.indexOf(secondMeal) : items.length;

    return items.slice(firstIndex, lastIndex)
      .join()
      .replace(',', ' ');
  }
}

module.exports = Parser;
