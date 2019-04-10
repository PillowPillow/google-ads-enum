import {EnumMap, FileMap} from './wsdl-consumer';
import * as Path from 'path';
import {GenDirPath} from './constant';
import {TextHelper} from './text-helper';
import * as Fs from 'fs';

export const WarnComment = '// Do not edit - Generated from Google Ads WSDL\n\n';

export class EnumBuilder {

	constructor(protected fileName:string, protected enums:EnumMap) {}

	static fromFileMap(map:FileMap):EnumBuilder[] {
		return Array.from(map.entries()).map(([fileName, enums]) => new EnumBuilder(fileName, enums));
	}

	write() {
		const path = this.makeFilePath();
		const content = this.buildContent();
		Fs.writeFileSync(path, content);
	}

	protected buildContent() {
		const enums = Array.from(this.enums.entries());
		const enumStr:string[] = enums.map(([name, values]) => {
			const content = values.map((value) => `\t${TextHelper.snakeToPascal(value)} = '${value}',\n`).join('');
			return `export enum ${name} {\n${content}}`;
		});
		return WarnComment + enumStr.join('\n');
	}

	protected makeFilePath() {
		return Path.join(GenDirPath, this.fileName + '.ts');
	}

}
