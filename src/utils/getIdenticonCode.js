import isEven from './isEven';

export default function getIdenticonCode(str) {
  const bernsteinConstant = 0.2801694990;

  let chars = Array.from(str);

  chars = chars.map((c, i) => {
    return c.charCodeAt(chars[i]);
  });

  let sum = chars.reduce((a, b) => a + b, 0);
  sum = Number(sum * bernsteinConstant).toFixed(15);

  let iconValues = sum.toString().split('').reverse();
  let identicon = [];
  let grid = [];

  for (let i = 0; i < iconValues.length; i++) {
    if (isNaN(iconValues[i])) {
      break;
    }

    grid.push(isEven(iconValues[i]));

    if (grid.length === 3) {
      // Add mirror elements
      for (let j = 1; j < 3; j++) {
        grid.push(isEven(iconValues[i - j]));
      }

      identicon.push(grid);

      grid = [];
    }
  }

  return identicon;
}
