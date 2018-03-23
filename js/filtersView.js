function getFilterButton(filterId, label, className) {
  return (
    '<button class="' + className + '" data-id="' + filterId + '">' +
    label +
    "</button>"
  );
}

var filterView = {
  init() {
    this.filterListEl = document.getElementById('filterList');

    this.filterListEl.addEventListener('click', this.handleFilterListClick);
    this.render();
  },
  handleFilterListClick(e) {
    var filterId = e.target.dataset.id;

    if (e.target.tagName === 'BUTTON') {
      controller.changeFilterView(filterId);
    }
  },
  render() {
    var currentFilterId = controller.getCurrentFilterId();
    var filterListStr = '';

    FILTERS_LIST.forEach(function (filter, index) {
      filterListStr += getFilterButton(
        filter.id,
        filter.label,
        currentFilterId === filter.id ? 'selected' : ''
      );
    });

    this.filterListEl.innerHTML = filterListStr;
  }
};