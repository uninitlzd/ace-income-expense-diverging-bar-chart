export type DataRecord = {
  x: number;
  y: number;
  y2: number;
  yValueFormatted: string;
  y2ValueFormatted: string;
  type: string;
};

export function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export enum DisplayType {
  Monthly = 'Monthly',
  Quarter = 'Quarter',
  Anually = 'Anually',
}

export const data = (
  x: number,
  displayType: keyof typeof DisplayType = DisplayType.Anually,
  type: string
): DataRecord[] => {
  // get days in month by month number
  let n = {
    1: 31,
    2: 29,
    3: 30,
    4: 28,
    5: 30,
    6: 28,
    7: 30,
    8: 28,
    9: 30,
    10: 28,
    11: 30,
    12: 31,
  }[x];

  if (displayType == DisplayType.Quarter) {
    n = 4;
  }

  if (displayType == DisplayType.Anually) {
    n = 3;
  }

  return Array.from(Array(n).keys()).map((_, i) => {
    const yValue = randomInteger(1000, 9999);
    const y2Value = randomInteger(1000, 9999);
    const yValueDivided = yValue / 1000;
    const y2ValueDivided = y2Value / 1000;

    let currency = new Intl.NumberFormat();

    const yValueFormatted = `$${currency.format(yValue)}`;
    const y2ValueFormatted = `$${currency.format(y2Value)}`;

    return {
      x: i + 1,
      y: yValueDivided,
      y2: y2ValueDivided,
      yValueFormatted,
      y2ValueFormatted,
      type,
    };
  });
};
