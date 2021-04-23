export interface fmsOption {
  axisSize?: number;
  bgColor?: string;
  fillColor?: string;
  labelAxes?: boolean;
  labelAxesFont?: string;
  labelPlanes?: boolean;
  labelPlanesFont?: string;
  lineColor?: string;
  lineWidth?: number;
  plotAxes?: boolean;
  plotPlanes?: boolean;
  radius?: number;
  size?: number;
  height?: number;
  width?: number;
  x0?: number;
  y0?: number;
}

interface TensorOptionC1 {
  mtt: number;
  mpp: number;
  mrr: number;
  mrt: number;
  mrp: number;
  mtp: number;
}

interface TensorOptionC2 {
  mxx: number;
  myy: number;
  mzz: number;
  mxz: number;
  myz: number;
  mxy: number;
}

export type TensorOption = TensorOptionC1 | TensorOptionC2;

export interface TensorMatrix<Name extends string> {
  name: Name;
  eigenvalue: number;
  vector: any;
}

export interface TensorStrikeDipRake<Name extends string> {
  name: Name;
  strike: number;
  dip: number;
  rake: number;
}

export function fms(tensor: Tensor, el: HTMLCanvasElement, options?: fmsOption): void;

export class Tensor {
  N: TensorMatrix<'N'>;
  P: TensorMatrix<'P'>;
  T: TensorMatrix<'T'>;

  NP1: TensorStrikeDipRake<'NP1'>;
  NP2: TensorStrikeDipRake<'NP2'>;

  exponent: number;
  fCLVD: number;
  forceNormal: number;
  forceStrikeSlip: number;
  forceThrust: number;
  magnitude: number;
  matrix: {
    data: number[];
    m: number;
    n: number;
  };
  moment: number;
  momentLog10: number;
  mtt: number;
  mpp: number;
  mrr: number;
  mrt: number;
  mrp: number;
  mtp: number;
  percentDC: number;
  scale: number;
  units: 'N-m';

  constructor(options: TensorOption);

  static fromStrikeDipRake(strike: number, dip: number, rake: number, moment: number): Tensor;
}

