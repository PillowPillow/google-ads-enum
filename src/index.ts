import { GenDirPath, GoogleAdsVersion, } from './constant';
import {default as chalk} from 'chalk';
import { Spinner } from 'clui';
import { FileHelper } from './file-helper';
import { PackageBuilder } from './package-builder';
import { EnumBuilder } from './enum-builder';

console.log(`GoogleAds enum builder (${GoogleAdsVersion})\n`);

FileHelper
	.cleanDir(GenDirPath)
	.then(() => PackageBuilder.write())
	.then(() => {
		const spinner = new Spinner('Generating enums...');
		spinner.start();
		const builder = new EnumBuilder(GoogleAdsVersion);
		builder.build();
		spinner.stop();
		console.log('Done');
	})
	.catch((e) => console.log(e));
