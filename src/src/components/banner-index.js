import config from 'banner/config';
import methods from 'banner/methods';
import lib from 'banner/';

export class Banner {
  constructor(school) {
    if (arguments.length < 1 || school === undefined || school === null) {
      throw new Error('Must provide school');
    }
    if (config.schools[school] === undefined) {
      throw new Error(`Unsupported school "${school}"`);
    }
    this.School = school;
    config.schools[school].methods.forEach(method => {
      this[methods[method].displayName] = lib[methods[method].displayName];
    });
  }
}

export default Banner;
