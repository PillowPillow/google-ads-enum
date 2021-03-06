import {FileMap, WSDLConsumer} from './wsdl-consumer';
import {GenDirPath, GoogleAdsVersion, WSDLEndpoints} from './constant';
import chalk from 'chalk';
import {Spinner} from 'clui';
import {FileHelper} from './file-helper';
import {PackageBuilder} from './package-builder';
import {IndexBuilder} from './index-builder';
import {EnumBuilder} from './enum-builder';

const consumer = new WSDLConsumer(GoogleAdsVersion, WSDLEndpoints);

console.log(chalk`{yellow GoogleAds enum builder (${GoogleAdsVersion})\n}`);

FileHelper
	.cleanDir(GenDirPath)
	.then(() => PackageBuilder.write())
	.then(() => consumer.consume())
	.then((map:FileMap) => {
		const spinner = new Spinner(chalk`{cyan Generating enum files...}`);
		(new IndexBuilder(map)).write();

		spinner.start();
		const builders:EnumBuilder[] = EnumBuilder.fromFileMap(map);
		builders.forEach((builder) => builder.write());
		spinner.stop();

		console.log(chalk`{cyan Generated ${builders.length as any} files}`);
	})
	.catch((e) => console.log(e));
