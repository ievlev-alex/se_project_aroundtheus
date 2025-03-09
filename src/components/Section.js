class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items = this._items, position = "append") {
    items.forEach((item) => {
      this.addItem(this._renderer(item), position);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;
