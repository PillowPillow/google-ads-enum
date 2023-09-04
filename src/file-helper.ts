import {rimraf} from 'rimraf';
import * as Path from 'path';

export class FileHelper {

	static async cleanDir(dir: string): Promise<boolean> {
		return rimraf(Path.join(dir, '*'));
	}

}
