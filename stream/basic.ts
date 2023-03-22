import { createReadStream, createWriteStream, } from 'fs';
import { createGzip, createUnzip } from 'zlib';

const readableSrc = createReadStream('./stream/text.txt');

const writeDesc = createWriteStream('./stream/write.txt');

// readableSrc.pipe(writeDesc);
// readableSrc.on('data', chunk => {
// 	writeDesc.write(chunk);
// });
// readableSrc.on('end', () => {
// 	writeDesc.end();
// });

// readableSrc.pipe(createGzip()).pipe(createWriteStream('./stream/text.gz'));
createReadStream('./stream/text.gz').pipe(createUnzip()).pipe(createWriteStream('./stream/unzip.txt'));
