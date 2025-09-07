javascript
const scanBtn = document.getElementById('scanBtn');
const imageInput = document.getElementById('imageInput');
const output = document.getElementById('output');
const progressBar = document.getElementById('progress-bar');

scanBtn.addEventListener('click', () => {
    const file = imageInput.files[0];
    if (!file) {
        alert("Choisis une image d'abord !");
        return;
    }

    progressBar.style.width = '0%';
    output.textContent = '';

    const reader = new FileReader();
    reader.onload = function() {
        Tesseract.recognize(
            reader.result,'fra',
            {
                logger: m => {
                    if (m.status === 'recognizing text') {
                        const progress = Math.round(m.progress * 100);
                        progressBar.style.width = progress + '%';
                    }
                }
            }
        ).then(({ data: { text } }) => {
            output.textContent = text;
            progressBar.style.width = '100%';
        });
    };
    reader.readAsDataURL(file);
});