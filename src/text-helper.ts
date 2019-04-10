export class TextHelper {

	static snakeToPascal(text) {
		text = text.toLowerCase().replace(
			/(_\w)/g,
			(matches) => matches[1].toUpperCase()
		);
		return text[0].toUpperCase() + text.slice(1);
	}

}
