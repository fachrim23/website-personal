document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn'); // Ambil semua tombol filter
    const portfolioItems = document.querySelectorAll('.portfolio-item'); // Ambil semua item portofolio

    // Tambahkan event listener untuk setiap tombol filter
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter'); // Ambil nilai filter dari data attribute

            portfolioItems.forEach(item => {
                // Tampilkan item yang sesuai dengan kategori yang dipilih
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block'; // Tampilkan item
                } else {
                    item.style.display = 'none'; // Sembunyikan item
                }
            });
        });
    });
});

// Smooth scrolling untuk navigasi
$(document).ready(function() {
    $('a.nav-link').on('click', function(event) {
        var target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 800);
        event.preventDefault();
    });
});

let isModalOpen = false; // Status modal
let scale = 1; // Level zoom
let isZoomedIn = false; // Status zoom

function toggleModal(element, imgSrc, imgTitle) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const modalCaption = document.getElementById("modalCaption");

    if (isModalOpen) {
        closeModal(); // Jika modal sudah terbuka, tutup modal
    } else {
        modal.style.display = "block"; // Tampilkan modal
        modalImg.src = imgSrc; // Set gambar modal
        modalCaption.innerText = imgTitle; // Set judul gambar
        isModalOpen = true; // Set status modal terbuka
        scale = 1; // Reset scale
        isZoomedIn = false; // Reset zoom status
        modalImg.style.transform = `scale(${scale})`; // Set transform
        modalImg.style.transformOrigin = 'center'; // Set default origin
    }
}

// Fungsi untuk menutup modal
function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none"; // Sembunyikan modal
    isModalOpen = false; // Reset status modal
    scale = 1; // Reset zoom saat modal ditutup
    isZoomedIn = false; // Reset zoom status
}

// Zoom gambar dengan klik
document.getElementById("modalImage").addEventListener('click', function(event) {
    const rect = this.getBoundingClientRect(); // Mendapatkan posisi gambar
    const x = event.clientX - rect.left; // Posisi X klik relatif terhadap gambar
    const y = event.clientY - rect.top; // Posisi Y klik relatif terhadap gambar

    // Mengubah transform-origin sesuai posisi klik
    this.style.transformOrigin = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;

    if (!isZoomedIn) {
        scale = 2; // Ubah nilai zoom sesuai keinginan
        this.style.transform = `scale(${scale})`; // Terapkan zoom
    } else {
        scale = 1; // Kembali ke ukuran semula
        this.style.transform = `scale(${scale})`; // Terapkan transformasi
    }
    isZoomedIn = !isZoomedIn; // Toggle status zoom
});

// Menutup modal ketika pengguna mengklik di luar gambar modal
window.onclick = function(event) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    
    // Jika modal terbuka dan area yang diklik bukan gambar modal
    if (isModalOpen && event.target === modal) { 
        closeModal(); // Panggil fungsi closeModal
    }
}

function openVideoModal(videoSrc) {
    document.getElementById('modalVideoSource').src = videoSrc;
    document.getElementById('modalVideo').load(); // Reload the video with the new source
    document.getElementById('videoModal').style.display = "block";
}

function closeVideoModal() {
    document.getElementById('videoModal').style.display = "none";
}
