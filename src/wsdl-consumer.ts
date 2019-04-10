import {AxiosAdapter} from 'axios';
import {GoogleAdsWsdlUrl} from './constant';
import chalk from 'chalk';
import {Spinner} from 'clui';

const Axios = require('axios');
const XmlReader = require('xml-reader');

export type EnumMap = Map<string, any[]>;
export type FileMap = Map<string, EnumMap>;

export class WSDLConsumer {

	axios:AxiosAdapter;
	fileMap:FileMap = new Map();

	constructor(version:string, protected endpoints:string[]) {
		this.axios = Axios.create({
			baseURL: `${GoogleAdsWsdlUrl}${version}`
		});
	}

	async queryWSDL(path) {
		try {
			const response = await this.axios({
				url: path,
				method: 'get',
				responseType: 'text'
			});

			const reader = XmlReader.create({stream: true});

			return new Promise((res) => {
				const types = [];
				reader.on('tag:simpleType', (data) => {
					types.push(data);
				});
				reader.on('done', (data) => {
					res(types);
				});
				reader.parse(response.data);
			});
		} catch(error) {
			console.error(error);
		}
	}

	indexWsdl(wsdl) {
		const spinner = new Spinner(chalk`{cyan Indexing downloaded wsdls...}`);
		spinner.start();
		for(const data of wsdl) {
			const name = data.attributes.name;
			const nameParts = name.split('.');

			let fileName = '';
			let constName = '';

			if(nameParts.length > 1) {
				fileName = nameParts[0];
				constName = nameParts[1].indexOf(nameParts[0]) === 0 ? nameParts[1] : nameParts.join('');
			}
			else {
				constName = fileName = nameParts[0];
			}

			if(!this.fileMap.has(fileName)) this.fileMap.set(fileName, new Map());
			if(this.fileMap.get(fileName).has(constName)) continue;

			const restrictions = data.children.find((e) => e.name === 'restriction');
			const enums = restrictions.children.map((r) => r.attributes.value);

			this.fileMap.get(fileName).set(constName, enums);
		}
		spinner.stop();
	}

	async consume():Promise<FileMap> {
		this.fileMap = new Map();
		for(const endpoint of this.endpoints) {
			const spinner = new Spinner(chalk`{cyan Downloading ${endpoint} wsdl...}`);

			spinner.start();
			const wsdl = await this.queryWSDL(`/${endpoint}?wsdl`);
			spinner.stop();

			this.indexWsdl(wsdl);
		}
		return this.fileMap;
	}
}
