const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const { bgGreen, bgRed, bgYellow } = chalk;

const notesPath = path.join(__dirname, "./db.json");

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });

  return JSON.parse(notes) || [];
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await saveNotes(notes);

  console.log(bgGreen.bold("Note was added!!!"));
}

async function removeNote(id) {
  const notes = await getNotes();
  const filteredNotes = notes.filter((note) => note.id !== id);

  await saveNotes(filteredNotes);

  console.log(bgRed.bold("Note was removed!!!"));
}

async function editNote(id, title) {
  const notes = await getNotes();

  const editableNote = notes.map((note) => {
    if (note.id === id) {
      return { ...note, title };
    }

    return note;
  });

  await saveNotes(editableNote);

  console.log(bgYellow.bold("Note was changed!!!"));
}

module.exports = {
  addNote,
  getNotes,
  editNote,
  removeNote,
};
