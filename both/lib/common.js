/**
 * Common functions to work with from anywhere
 */

import { languages } from '../../stores/languages';


const nonRankingFeatures = ['DNS', 'DNF', 'DQ', 'R', 'RC'];

export default class Common {
  static getPrettyUnit(standardUnit) {
    let toReturn = '';
    switch (standardUnit) {
      case 'KGM':
        toReturn = 'kg';
        break;
      case 'LBR':
        toReturn = 'lb';
        break;
      case 'MTR':
        toReturn = 'm';
        break;
      case 'SMI':
        toReturn = 'mile';
        break;
      default:
        break;
    }
    return toReturn;
  }
  static getLanguageOptions() {
    return languages;
  }
  static isValidJSON(jsonString) {
    try {
      JSON.parse(jsonString);
    } catch (e) {
      return false;
    }
    return true;
  }
  static getDistanceUnitAbbr(code) {
    switch (code) {
      case 'MTR':
        return 'm';
      case 'SMI':
        return 'miles';
      default:
        break;
    }
    return '';
  }
  static unixTimeNow() {
    return Math.floor(Date.now() / 1000);
  }
}
