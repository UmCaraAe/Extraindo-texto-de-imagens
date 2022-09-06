const inputImage = document.querySelector('#arquivo')
const btn = document.querySelector('.addImagens')
const saidaTexto = document.querySelector('.text')
const imgPreview = document.querySelector('.preview')
const barraProgresso = document.querySelector('.barraProgresso')

function controlarProgresso(n){
    barraProgresso.style.width = `${n}%`
}

async function extrairTexto(img){
    const worker = Tesseract.createWorker({
        logger: function(m){
            console.log(m)
            controlarProgresso(m.progress * 100)
        }
    });
      
    await worker.load();
    await worker.loadLanguage('eng+por');
    await worker.initialize('eng+por');
    const { data: { text } } = await worker.recognize(img);
    saidaTexto.value = text
    await worker.terminate();
}

btn.addEventListener('click', function(){
    inputImage.click()
})

inputImage.addEventListener('change', function(){
    let fileImage = inputImage.files[0]

    imgPreview.src = URL.createObjectURL(fileImage)

    try {
        let texto = extrairTexto(fileImage)
        console.log(texto)
    } catch (e) {
        console.log('erro', e)
    }
})