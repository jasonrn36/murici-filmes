const sharp = require('sharp'); //instalar o pacote via terminal:npm install sharp --save-dev
const fs = require('fs-extra'); //instalar o pacote via terminal: npm install fs-extra --save-dev
const path = require('path');  
const glob = require('glob'); //instalar o pacote via terminal: npm install glob --save-dev
const { optimize } = require('svgo'); //instalar o pacote via terminal: npm install gulp-svgmin --save-dev
                                        //instalar o pacote via terminal: npm install gulp-imagemin --save-dev  
const pastaEntrada = 'src/images';
const pastaSaida = 'dist/images';

fs.ensureDirSync(pastaSaida);

// Arquivos raster
const arquivosRaster = glob.sync(`${pastaEntrada}/**/*.{jpg,jpeg,png,gif}`);

// Arquivos SVG
const arquivosSVG = glob.sync(`${pastaEntrada}/**/*.svg`);

(async () => {
if (arquivosRaster.length === 0 && arquivosSVG.length === 0) {
    console.log('⚠️ Nenhuma imagem encontrada para compressão.');
    return;
}

  // Processar imagens raster
for (const arquivo of arquivosRaster) {
    const extensao = path.extname(arquivo).toLowerCase();
    const nomeArquivo = path.basename(arquivo);
    const destino = path.join(pastaSaida, nomeArquivo);

    try {
    const imagem = sharp(arquivo);

    if (extensao === '.jpg' || extensao === '.jpeg') {
        await imagem.jpeg({ quality: 70 }).toFile(destino);
    } else if (extensao === '.png') {
        await imagem.png({ compressionLevel: 9 }).toFile(destino);
    } else if (extensao === '.gif') {
        await imagem.gif({ effort: 3 }).toFile(destino);
    }

    console.log(`✅ Imagem comprimida: ${arquivo} → ${destino}`);
    } catch (erro) {
    console.error(`❌ Erro ao processar ${arquivo}:`, erro.message);
    }
}

  // Processar SVGs
for (const arquivo of arquivosSVG) {
    const nomeArquivo = path.basename(arquivo);
    const destino = path.join(pastaSaida, nomeArquivo);

    try {
    const conteudo = await fs.readFile(arquivo, 'utf8');
    const resultado = optimize(conteudo, { path: arquivo });

    await fs.writeFile(destino, resultado.data, 'utf8');
    console.log(`✅ SVG otimizado: ${arquivo} → ${destino}`);
    } catch (erro) {
    console.error(`❌ Erro ao otimizar SVG ${arquivo}:`, erro.message);
    }
}

console.log('🎉 Compressão de imagens concluída com sucesso.');
})();