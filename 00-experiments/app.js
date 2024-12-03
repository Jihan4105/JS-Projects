const module = {
  x: 42,
  getX: function () {
    return this.x;
  },
  getMe: function () {
    return this.x + 10;
  }
};

const bindedGetMe = module.getMe.bind(module);
console.log(bindedGetMe());

const boundGetX = module.getX.bind(module);
console.log(boundGetX());
// Expected output: 42