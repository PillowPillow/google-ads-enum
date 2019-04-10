import {FileMap} from './wsdl-consumer';
import * as Path from 'path';
import {GenDirPath} from './constant';
import * as Fs from 'fs';

export class IndexBuilder {

	constructor(protected map:FileMap) {}

	write() {
		const path = Path.join(GenDirPath, 'index.ts');
		const content = this.buildContent();
		Fs.writeFileSync(path, content);
	}

	protected buildContent() {
		const files = Array.from(this.map.keys());

		return files.map((name) => `export * from './${name}';`).join('\n');
	}

}
