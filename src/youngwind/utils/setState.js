const setState = function (data, option) {
  // 更新数据
  this._data = data;
  // 可选的更新option
  this._option = option ? option : this._option;
  // 重绘
  this.render();
}

export { setState }