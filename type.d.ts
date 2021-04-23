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

export function fms(tensor: Tensor, el: HTMLCanvasElement, options?: fmsOption): void;

export class Tensor {
  constructor(options: TensorOption);

  static fromStrikeDipRake(strike: number, dip: number, rake: number, moment: number): Tensor;
}

