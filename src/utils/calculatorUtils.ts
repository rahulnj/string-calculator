const DEFAULT_DELIMITER = /[,\n]/;

export function extractCustomDelimiter(lines: string[]): RegExp {
  const delimiterLine = lines[0];
  const customDelimiterMatch = delimiterLine.match(/\/\/(.+)/);
  if (customDelimiterMatch) {
    const customDelimiter = customDelimiterMatch[1].trim();
    return new RegExp(customDelimiter, 'g');
  }
  return DEFAULT_DELIMITER;
}

export function validateNumbers(numbers: number[]): void {
  if (numbers.some(isNaN)) {
    throw new Error('Invalid input');
  }

  const negativeNumbers = numbers.filter((num) => num < 0);
  if (negativeNumbers.length > 0) {
    throw new Error(
      `Negative numbers not allowed: ${negativeNumbers.join(', ')}`
    );
  }
}

export function add(input: string): number {
  try {
    const lines = input.split('\n');
    let delimiter = DEFAULT_DELIMITER;
    if (lines[0].startsWith('//')) {
      delimiter = extractCustomDelimiter(lines);
      lines.shift();
    }

    const numbers = lines.join(',').split(delimiter);
    const cleanedNumbers = numbers
      .filter((num) => num.trim() !== '')
      .map((num) => Number(num.replace(/^,/, '').trim()));

    validateNumbers(cleanedNumbers);
    return cleanedNumbers.reduce((sumAcc, num) => sumAcc + num, 0);
  } catch (error) {
    throw error;
  }
}
