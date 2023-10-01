document.addEventListener("click", ({ target }) => {
  if (target.dataset.type === "remove") {
    const id = target.dataset.id;

    removeNote(id).then(() => {
      target.closest("li").remove();
    });
  }

  if (target.dataset.type === "edit") {
    const id = target.dataset.id;
    const title = prompt("Введите новое название");

    editNote(id, title).then(() => {
      target.closest("li").querySelector(".note-title").innerText = title;
    });
  }
});

async function removeNote(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function editNote(id, title) {
  if (title) {
    await fetch(`/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ title, id }),
    });
  }
}
