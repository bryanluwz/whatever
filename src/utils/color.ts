export const randomHexColor = () =>
  '#' +
  Math.floor(Math.random() * 0x1000000)
    .toString(16)
    .padStart(6, '0');

export const hsvToHex = (h: number, s: number, v: number) => {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
  };

  return (
    '#' +
    [f(5), f(3), f(1)]
      .map((x) =>
        Math.round(x * 255)
          .toString(16)
          .padStart(2, '0')
      )
      .join('')
  );
};

export const hexToRgb = (hex: string) => {
  const cleanHex = hex.replace(/^#/, '');

  let fullHex = cleanHex;
  if (cleanHex.length === 3) {
    // in case shorthand hex
    fullHex = cleanHex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  if (fullHex.length !== 6) {
    return null; // invalid color
  }

  const num = parseInt(fullHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
};

export const getColorSimilarity = (hex1: string, hex2: string, sensitivity = 2.5) => {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) {
    throw new Error('Invalid hex color format provided.');
  }

  // Calculate Euclidean distance in 3D RGB space
  const distance = Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) + Math.pow(rgb1.g - rgb2.g, 2) + Math.pow(rgb1.b - rgb2.b, 2)
  );

  // Maximum possible distance in RGB space is between black (0,0,0) and white (255,255,255)
  const maxDistance = Math.sqrt(3 * Math.pow(255, 2));

  // Convert distance to a percentage similarity
  const normalisedDistance = distance / maxDistance;

  return Math.pow(1 - normalisedDistance, sensitivity);
};
