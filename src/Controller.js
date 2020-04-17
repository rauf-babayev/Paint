function Controller(model, view) {
    this._model = model;
    this._view = view;
}

Controller.prototype.init = function() {
    this._view.init();
}

module.exports = Controller;