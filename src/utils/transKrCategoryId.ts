export const transKrCategoryId = (categoryId: number) => {
  switch (categoryId) {
    case 1:
      return '스마트폰';
    case 2:
      return '컴퓨터';
    case 3:
      return '키오스크';
    case 4:
      return '외국어';
    case 5:
      return '운동';
    case 6:
      return '공예';
    case 7:
      return '부동산';
    case 8:
      return '심리';
    case 9:
      return '취업/창업';
    case 10:
      return '요리';
    case 11:
      return '악기';
    case 12:
      return '자산';

    default:
      return '';
  }
};

export const transEnCategoryId = (categoryId: number) => {
  switch (categoryId) {
    case 1:
      return 'smartPhone';
    case 2:
      return 'computer';
    case 3:
      return 'kiosk';
    case 4:
      return 'foreignLanguage';
    case 5:
      return 'exercise';
    case 6:
      return 'art';
    case 7:
      return 'estate';
    case 8:
      return 'mental';
    case 9:
      return 'employ';
    case 10:
      return 'cook';
    case 11:
      return 'instrument';
    case 12:
      return 'asset';
  }
};
