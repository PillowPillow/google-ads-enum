import rimraf from 'rimraf';
import * as Path from 'path';

export class FileHelper {

	static async cleanDir(dir: string): Promise<void> {
		return new Promise((resolve, reject) => {
			rimraf(Path.join(dir, '*'), (e) => {
				if (e) reject(e);
				else resolve();
			});
		});
	}

}
