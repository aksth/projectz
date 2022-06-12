export const getHsvColor = (percent) => {
  let color = 'rgb(244, 113, 113)';
  switch(true){
    case (percent < 10):
      color = 'rgb(244, 113, 113)';
      break;
    case (percent < 20):
      color = 'rgb(244, 139, 113)';
      break;
    case (percent < 30):
      color = 'rgb(244, 163, 113)';
      break;
    case (percent < 40):
      color = 'rgb(244, 179, 113)';
      break;
    case (percent < 50):
      color = 'rgb(232, 186, 107)';
      break;
    case (percent < 60):
      color = 'rgb(224, 205, 96)';
      break;
    case (percent < 70):
      color = 'rgb(205, 212, 74)';
      break;
    case (percent < 80):
      color = 'rgb(178, 212, 74)';
      break;
    case (percent < 90):
      color = 'rgb(150, 212, 74)';
      break;
    case (percent < 101):
      color = 'rgb(102, 201, 52)';
      break;
    default:
      color = 'rgb(102, 201, 52)';
  }
  return color;
}