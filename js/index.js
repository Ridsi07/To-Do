var counter = 0;
var deleteButtonStr = '<button class="delete">delete</button>';
var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
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
      toggleStatus(noteId){
          var data = JSON.parse(localStorage.notes);
          var note = data.find(note => note.id === noteId);
          note.isDone = !note.isDone;
          localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                id: counter++,
                content: noteStr,
                isDone: false,
            });
            listView.render();
        },
        deleteNote: function(noteId) {
            model.delete(noteId);
            listView.render();
        },
      
        toggleNoteStatus(noteId) {
          console.log('toggle');
          model.toggleStatus(noteId);
          listView.render();
        },

        getNotes: function() {
            return model.getAllNotes();
        },

        init: function() {
            model.init();
            listView.init();
        }
    };

  var listView = {
    init() {
      this.buttonEl = document.getElementById('saveButton');
      this.inputEl = document.getElementById('in');
      this.listEl = document.getElementById('list');
      
      

      this.buttonEl.addEventListener('click', this.handleButtonClick.bind(this));
      this.listEl.addEventListener('click', this.handleListClick.bind(this));
      this.render();
      
    },
    handleButtonClick() {
      octopus.addNewNote(this.inputEl.value);
      this.inputEl.value = '';
    },
    handleListClick(e) {
      var targetEl = e.target;
      var ancestorEl = targetEl.closest('li');
      var noteId = +ancestorEl.dataset.id;

      if(targetEl.tagName === "BUTTON") {
          octopus.deleteNote(noteId);
        } else if (targetEl.tagName ==="SPAN") {
          octopus.toggleNoteStatus(noteId);
        }
    },
    render(){
      var htmlStr = '';
      octopus.getNotes().forEach(function(note){
        htmlStr += '<li class="note" data-id='+ note.id +'>'+
           getContent(note) + deleteButtonStr
          '</li>';
      });
      this.listEl.innerHTML = htmlStr;
    }
  }
  
  function getContent(note){
return '<span class="'+ ( note.isDone ? 'note-done' : 'note-pending') + '">'+note.content+'</span>'
  }
  
  octopus.init();