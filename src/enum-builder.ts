import { protos } from 'google-ads-node';
import fs from 'fs';
import * as Path from 'path';
import { GenDirPath } from './constant';

export const WarnComment = '// Do not edit - Generated from Google Ads WSDL\n\n';

export class EnumBuilder {
	protected enums: any;

	constructor(protected version: string) {
		this.enums = protos.google.ads.googleads[version].enums;
	}

	public build() {
		const stream = fs.createWriteStream(this.makeFilePath());
		stream.write(`/* Autogenerated File! Do Not Edit */\n`);

		// Put all the enums inside an "enum" namespace
		stream.write('\n// eslint-disable-next-line\n');

		for (const [fullName, def] of Object.entries(this.enums)) {

			const [name] = fullName.split('Enum');
			const values = def[name];

			if(!values) continue;

			const pairs = Object.keys(values).map((key) => {
				const protoVal = values[key];
				return `${key} = '${key}', // ${protoVal}`;
			});
			const enumStr = `export enum ${name} {${pairs.join('\n')}
}`;

			const docsLink = this.buildEnumLink(this.version, fullName, name);

			stream.write(`\n/**
* @name ${fullName}.${name}
* @link ${docsLink}
*/`);
			stream.write(`\n${enumStr}\n`);
		}

		stream.end();
	}

	protected makeFilePath() {
		return Path.join(GenDirPath, 'index.ts');
	}

	protected buildEnumLink(version, fullName, shortName) {
		return `https://developers.google.com/google-ads/api/reference/rpc/${version}/${fullName}.${shortName} `;
	}

}
