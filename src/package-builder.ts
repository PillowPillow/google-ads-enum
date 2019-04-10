import * as Fs from 'fs';
import * as Path from 'path';
import {GenDirPath, PackageVersion} from './constant';

export class PackageBuilder {

	static write() {
		const packageJsonContent = Fs.readFileSync(Path.join(__dirname, '..', '.package.json')).toString();

		const path = Path.join(GenDirPath, 'package.json');
		const content = packageJsonContent.replace('{{version}}', PackageVersion);

		Fs.writeFileSync(path, content);
	}

}
