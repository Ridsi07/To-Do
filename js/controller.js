var controller = {
  addNewNote: function (noteStr) {
    model.add({
      content: noteStr,
      isDone: false
    });
    notesView.render();
  },
  deleteNote: function (noteId) {
    model.delete(noteId);
    notesView.render();
  },

  toggleNoteStatus(noteId) {
    model.toggleStatus(noteId);
    notesView.render();
  },

  changeFilterView(filterId) {
    model.changeFilterID(filterId);
    notesView.render();
    filterView.render();
  },

  getFilteredNotes: function () {
    return model.getFilteredNotes();
  },

  getCurrentFilterId() {
    return model.getCurrentId();
  },

  init: function () {
    model.init();
    notesView.init();
    filterView.init();
  }
};
