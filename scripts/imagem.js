document.addEventListener('DOMContentLoaded', function () {
    const imgItemInput = document.getElementById('imgItem');
    const previewImage = document.getElementById('previewImage');

    imgItemInput.addEventListener('change', function () {
      const file = imgItemInput.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
          previewImage.src = e.target.result;
        };

        reader.readAsDataURL(file);
      }
    });
  });