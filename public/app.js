document.addEventListener("click", ({ target }) => {
  if (target.dataset.type === "remove") {
    const id = target.dataset.id;

    removeNote(id).then(() => {
      target.closest("li").remove();
    });
  }

  if (target.dataset.type === "edit") {
    const id = target.dataset.id;

    editNote(id, target);
  }
});

async function removeNote(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function editNote(id, target) {
  const title = prompt("Введите новое название");

  if (title) {
    const response = await fetch(`/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ title, id }),
    });

    if (response.ok) {
      target.closest("li").querySelector(".note-title").innerText = title;
    }

    return response;
  }
}
