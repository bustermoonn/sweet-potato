window.addEventListener('load', () => {
  Swal.fire({
    title: 'Mau sambil dengerin musik enggak ?',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'mau banget',
    cancelButtonText: 'G mksh😒',
    showClass: {
      popup: ''
    },
    hideClass: {
      popup: ''
    }
    
  }).then((result) => {
    const audio = document.querySelector('.song');

    const startAnimation = () => {
      // Hapus freeze
      document.body.classList.remove("not-loaded");

      // Tampilkan judul satu per satu
      const titles = 'This is a flower for you, anyway i like you a lot '.split('');
      const titleElement = document.getElementById('title');
      let index = 0;

      function appendTitle() {
        if (index < titles.length) {
          titleElement.innerHTML += titles[index];
          index++;
          setTimeout(appendTitle, 300);
        }
      }

      appendTitle();
    };

    if (result.isConfirmed) {
      audio.play().then(() => {
        // Musik berhasil diputar: mulai animasi
        document.body.classList.remove("not-loaded");
        startAnimation();
      }).catch(() => {
        // Autoplay gagal → tunggu klik user
        alert("Musik tidak bisa diputar otomatis. Klik dimanapun untuk memulai.");
        document.addEventListener("click", () => {
          audio.play().then(() => {
            document.body.classList.remove("not-loaded");
            startAnimation();
          });
        }, { once: true });
      });
    } else {
      // Jika user tidak ingin musik → tetap tunggu beberapa detik agar sinkron
      setTimeout(() => {
        document.body.classList.remove("not-loaded");
        startAnimation();
      }, 500); // atau atur jadi 0 kalau langsung
    }
  });
});