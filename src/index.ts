import {GenDirPath, GoogleAdsVersion,} from './constant';
import chalk from 'chalk';
import {Spinner} from 'clui';
import {FileHelper} from './file-helper';
import {PackageBuilder} from './package-builder';
import {EnumBuilder} from './enum-builder';

console.log(chalk`{yellow GoogleAds enum builder (${GoogleAdsVersion})\n}`);

FileHelper
	.cleanDir(GenDirPath)
	.then(() => PackageBuilder.write())
	.then(() => {
		const spinner = new Spinner(chalk`{cyan Generating enums...}`);
		spinner.start();
		const builder = new EnumBuilder(GoogleAdsVersion);
		builder.build();
		spinner.stop();

		console.log(chalk`{cyan Done}`);
	})
	.catch((e) => console.log(e));
