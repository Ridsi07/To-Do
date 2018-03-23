var model = {
  init: function () {
    if (!localStorage.notes) {
      localStorage.notes = JSON.stringify([]);
      localStorage.currentFilterId = FILTER_TYPES.ALL.id;
    }
  },
  add: function (obj) {
    var data = JSON.parse(localStorage.notes);
    data.push(Object.assign({},obj,{id: data.length}));
    localStorage.notes = JSON.stringify(data);
  },
  delete: function (noteId) {
    var data = JSON.parse(localStorage.notes);
    data = data.filter(function (note) {
      return note.id !== noteId
    });
    localStorage.notes = JSON.stringify(data);
  },
  toggleStatus: function (noteId) {
    var data = JSON.parse(localStorage.notes);
    var note = data.find(function (note) {
      return note.id === noteId
    });
    note.isDone = !note.isDone;
    localStorage.notes = JSON.stringify(data);
  },
  getFilteredNotes: function () {
    if (localStorage.currentFilterId === FILTER_TYPES.ALL.id) {
      var data = JSON.parse(localStorage.notes);
      return data;
    } else if (localStorage.currentFilterId === FILTER_TYPES.DONE.id) {
      var data = JSON.parse(localStorage.notes);
      data = data.filter(note => note.isDone === true);
      return data;
    } else if (localStorage.currentFilterId === FILTER_TYPES.PENDING.id) {
      var data = JSON.parse(localStorage.notes);
      data = data.filter(note => note.isDone === false);
      return data;
    }
  },
  changeFilterID: function (filterId) {
    localStorage.currentFilterId = filterId;
  },
  getCurrentId: function () {
    return localStorage.currentFilterId;
  },
};