const randomNumbers = (low, high, noOfElements) => {
  const quesIDs = [];
  while (noOfElements) {
    const random = getRandomInt(low, high);
    if (!quesIDs.includes(random)) {
      quesIDs.push(random);
      noOfElements--;
    }
  }
  return quesIDs;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  randomNumbers,
  getRandomInt,
};
