const _setRandomNumber = (min, max) => {
  return Math.trunc(Math.random() * (max - min + 1) + min);
};

for (let i = 0; i < 50; i++) {
  console.log(_setRandomNumber(1, 3));
}

async function toto() {
  await TypeMateriel.bulkCreate(types);
}
