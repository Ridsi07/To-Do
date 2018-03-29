var deleteButtonStr = '<button class="delete-btn">x</button>';

function getContent(note) {
  return (
    '<label class="note-content ' +
    (note.isDone ? "note-done" : "note-pending") +
    '">' +
    note.content +
    "</label>"
  );
}

function getCheckbox(note) {
  return '<input type="checkbox" ' + (note.isDone ? 'checked' : '') + '>';
}

var notesView = {
  init() {
    this.buttonEl = document.getElementById('saveButton');
    this.inputEl = document.getElementById('notesInput');
    this.listEl = document.getElementById('list');

    this.buttonEl.addEventListener('click', this.handleButtonClick.bind(this));
    this.inputEl.addEventListener('keypress', this.handleKeyPress.bind(this));
    this.listEl.addEventListener('click', this.handleListClick.bind(this));
    this.render();
  },
  handleButtonClick() {
    if (this.inputEl.value != '') {
      controller.addNewNote(this.inputEl.value);
      this.inputEl.value = '';

    }
  },
  handleKeyPress(e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      if (this.inputEl.value !== '') {
        controller.addNewNote(this.inputEl.value);
        this.inputEl.value = '';
      }
    }
  },
  handleListClick(e) {
    var targetEl = e.target;
    var ancestorEl = targetEl.closest('li');
   
    if (targetEl.tagName === 'BUTTON') {
      controller.deleteNote(+ancestorEl.dataset.id);
    } else if (targetEl.tagName === 'LABEL') {
      controller.toggleNoteStatus(+ancestorEl.dataset.id);
    } else if (targetEl.tagName === 'INPUT') {
      controller.toggleNoteStatus(+ancestorEl.dataset.id);
    }
  },
  render() {
    var htmlStr = "";
    controller.getFilteredNotes().forEach(function (note) {
      htmlStr +=
        '<li class="note" data-id=' + note.id + ">" +
          getCheckbox(note) +
          getContent(note) +
          deleteButtonStr +
        '</li>';
    });
    this.listEl.innerHTML = htmlStr;
  }
};