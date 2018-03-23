var counter = 0;
var deleteButtonStr = '<button class="delete">X</button>';
var model = {
  init: function() {
    if (!localStorage.notes) {
      localStorage.notes = JSON.stringify([]);
	  localstorage.filterednotes = JSON.stringify([]);
      localStorage.currentFilterId = 'ALL';
    }
  },
  add: function(obj) {
    var data = JSON.parse(localStorage.notes);
    data.push(obj);
    localStorage.notes = JSON.stringify(data);
  },
  delete: function(noteId) {
    var data = JSON.parse(localStorage.notes);
    data = data.filter(note => note.id !== noteId);
    localStorage.notes = JSON.stringify(data);
  },
  toggleStatus(noteId) {
    var data = JSON.parse(localStorage.notes);
    var note = data.find(note => note.id === noteId);
    note.isDone = !note.isDone;
    localStorage.notes = JSON.stringify(data);
  },
  getAllNotes: function() {
    return JSON.parse(localStorage.notes);
  },
	getFilteredNotes: function() {
    return JSON.parse(localStorage.filterednotes);
  },
  togglebutton: function(buttonId) {
    
    localStorage.currentFilterId = JSON.stringify(buttonId);
	
    if (buttonId === "ALL") {
		
      var data = JSON.parse(localStorage.notes);
	  localStorage.filterednotes = JSON.stringify(data);
     
    } else if (buttonId === "DONE") {
		
      var data = JSON.parse(localStorage.notes);
      data = data.filter(note => note.isDone === true);
	  localStorage.filterednotes = JSON.stringify(data);
      
    } else if (buttonId === "PENDING") {
		
      var data = JSON.parse(localStorage.notes);
      data = data.filter(note => note.isDone === false);
	  localStorage.filterednotes = JSON.stringify(data);
  
    }
  },
  getCurrentId(){
    return JSON.parse(localStorage.currentFilterId);;
  },
};

var octopus = {
  addNewNote: function(noteStr) {
    model.add({
      id: counter++,
      content: noteStr,
      isDone: false
    });
    listView.render();
  },
  deleteNote: function(noteId) {
    model.delete(noteId);
    listView.render();
  },

  toggleNoteStatus(noteId) {
    console.log("toggle");
    model.toggleStatus(noteId);
    listView.render();
  },
  toggleFilterView(buttonId) {
    model.togglebutton(buttonId);
    listView.render();
    filterView.render();
  },

  getNotes: function() {
    return model.getAllNotes();
  },
  
  getFilteredNotes: function() {
    return model.getFilteredNotes();
  },
  
  getCurrentFilterId(){
    return model.getCurrentId();
  },

  init: function() {
    model.init();
    listView.init();
    filterView.init();
  }
};

var listView = {
  init() {
    this.buttonEl = document.getElementById("saveButton");
    this.inputEl = document.getElementById("in");
    this.listEl = document.getElementById("list");

    this.buttonEl.addEventListener("click", this.handleButtonClick.bind(this));
	this.inputEl.addEventListener('keypress', this.handleKeyPress.bind(this));
    this.listEl.addEventListener("click", this.handleListClick.bind(this));
    this.render();
  },
  handleButtonClick() {
    octopus.addNewNote(this.inputEl.value);
    this.inputEl.value = "";
  },
  handleKeyPress(e){
	var key = e.which || e.keyCode;
    if (key === 13){
	octopus.addNewNote(this.inputEl.value);
      this.inputEl.value = '';
	}
	},
  handleListClick(e) {
    var targetEl = e.target;
    var ancestorEl = targetEl.closest("li");
    var noteId = +ancestorEl.dataset.id;

    if (targetEl.tagName === "BUTTON") {
      octopus.deleteNote(noteId);
    } else if (targetEl.tagName === "SPAN") {
      octopus.toggleNoteStatus(noteId);
    } else if (targetEl.tagName === "INPUT") {
      octopus.toggleNoteStatus(noteId);
    }
  },
  render() {
    var htmlStr = "";
    octopus.getNotes().forEach(function(note) {
      htmlStr +=
        '<li class="note" data-id=' +
        note.id +
        ">" +
        '<input type="checkbox" '+(note.isDone ? 'checked' : '!checked' )+'>' +
        getContent(note) +
        deleteButtonStr;
      ("</li>");
    });
    this.listEl.innerHTML = htmlStr;
  }
};

function getContent(note) {
  return (
    '<span class="' +
    (note.isDone ? "note-done" : "note-pending") +
    '">' +
    note.content +
    "</span>"
  );
}

var filterView = {
  init() {
    this.filterListEl = document.getElementById("filterList");
	this.listEl = document.getElementById("list");

    this.filterListEl.addEventListener("click",this.handleFilterListClick.bind(this));
    this.render();
    listView.render();
  },
  handleFilterListClick(e) {
    var buttonId = e.target.dataset.id;

    if (e.target.tagName === "BUTTON") {
      octopus.toggleFilterView(buttonId);
    }
  },
  render() {
    
    var currentFilterId = octopus.getCurrentFilterId();
	
	var Str = "";
    octopus.getFilteredNotes().forEach(function(note) {
      Str +=
        '<li class="note" data-id=' +
        note.id +
        ">" +
        '<input type="checkbox" '+(note.isDone ? 'checked' : '!checked' )+'>' +
        getContent(note) +
        deleteButtonStr;
      ("</li>");
    });
    this.listEl.innerHTML = Str;
	
	
    var htmlStr =
      getFilterButton(
        "ALL",
        "All",
        currentFilterId === "ALL" ? "selected" : ""
      ) +
      getFilterButton(
        "DONE",
        "Done",
        currentFilterId === "DONE" ? "selected" : ""
      ) +
      getFilterButton(
        "PENDING",
        "Pending",
        currentFilterId === "PENDING" ? "selected" : ""
      );

    this.filterListEl.innerHTML = htmlStr;
  }
};

function getFilterButton(filterId, label, className) {
  return (
    '<button class="' +
    className +
    '" data-id="' +
    filterId +
    '">' +
    label +
    "</button>"
  );
}
octopus.init(); 