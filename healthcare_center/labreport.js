const modal = document.getElementById("modal");
    const openBtn = document.getElementById("openModal");
    const closeBtn = document.getElementById("closeModal");
    const cancelBtn = document.getElementById("cancelBtn");
    const submitBtn = document.getElementById("submitBtn");
    const folderInput = document.getElementById("folderInput");

    // Open modal
    openBtn.onclick = () => {
      modal.style.display = "flex";
      document.body.classList.add("modal-open");
    };

    // Close modal
    const closeModal = () => {
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
    };
    closeBtn.onclick = closeModal;
    cancelBtn.onclick = closeModal;

    // Submit folder
    submitBtn.onclick = () => {
      if (folderInput.files.length === 0) {
        alert("Please select a folder first!");
        return;
      }

      const formData = new FormData();
      for (let file of folderInput.files) {
        formData.append("files[]", file, file.webkitRelativePath);
      }

      fetch("/upload-folder", {
        method: "POST",
        body: formData
      }).then(res => {
        if (res.ok) {
          alert("Folder uploaded successfully!");
          closeModal();
        } else {
          alert("Upload failed.");
        }
      });
    };