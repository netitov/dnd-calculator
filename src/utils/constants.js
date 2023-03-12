export const numberArr = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ','];
export const symbolsArr = ['/', 'x', '-', '+'];
export const equalArr = ['='];
export const ItemTypes = {
  CALCBLOCK: 'calcblock',
  CALCDISPLAY: 'calcdisplay',
}

export const calcData = [
  {
    contClass: 'calculator__disp-cont',
    btnArr: [],
    id: 1
  },
  {
    contClass: 'calculator__symb-cont',
    btnArr: symbolsArr,
    id: 2
  },
  {
    contClass: 'calculator__num-cont',
    btnArr: numberArr,
    id: 3
  },
  {
    contClass: 'calculator__equal-cont',
    btnArr: equalArr,
    id: 4
  },
];


