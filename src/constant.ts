import * as Path from 'path';

const pkg = require('../package.json');

export const PackageVersion = pkg.version;
export const GoogleAdsVersion = 'v' + pkg.version.split('.')[0];
export const GenDirPath = Path.join(__dirname, '..', 'lib');
