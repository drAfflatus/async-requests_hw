
chFile = document.querySelector('#file');
chFile.onchange = function(event) {
let file = this.files[0];
// console.log(file);
let inpChang = document.querySelector('.input__wrapper-desc');
let savedPrompt = inpChang.textContent;
inpChang.textContent = file.name;

document.getElementById('send').onclick = function() {
    const request = new XMLHttpRequest;
    request.upload.onprogress = function (event) {
        const progressBar = document.querySelector('#progress');
        progressBar.value = (event.loaded / event.total).toFixed(3);
        // console.log(progressBar.value);
        }
        request.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
        request.send(file);
        inpChang.textContent = savedPrompt;
        return false;
    }
}