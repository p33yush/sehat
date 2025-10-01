const notification = document.querySelector('.notification');
    const modal = document.getElementById('notificationModal');
    const closeModal = document.getElementById('closeModal');

    // Open modal on bell click
    // notification.addEventListener('click', () => {
    //   modal.style.display = 'flex';
    // });

    // Close modal on X click
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // Handle Accept / Reject clicks
    document.querySelectorAll('.btn-accept').forEach(btn => {
      btn.addEventListener('click', () => {
        alert("Checkup Accepted ✅");
      });
    });

    document.querySelectorAll('.btn-reject').forEach(btn => {
      btn.addEventListener('click', () => {
        alert("Checkup Rejected ❌");
      });
    });

    // Close modal if clicking outside content
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });