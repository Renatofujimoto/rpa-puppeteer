import puppeteer from 'puppeteer';
import readlineSync from "readline-sync"

console.log("Bem vindo ao conversor de moeda");

async function rpa() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage();
    const valueSearchCoin = readlineSync.question("Informe a moeda para a busca: ") || "dolar";
    const valueFinalCoin = readlineSync.question("Informe a moeda para se converter: ") || "real";

    const coinUrl = `https://www.google.com/search?q=${valueSearchCoin}+para+${valueFinalCoin}&oq=${valueSearchCoin}+para+${valueFinalCoin}&aqs=chrome.0.69i59j0l7.1726j0j4&sourceid=chrome&ie=UTF-8`;
    await page.goto(coinUrl)

    const result = await page.evaluate(() => {
        const element = document.querySelector('#knowledge-currency__updatable-data-column > div.b1hJbf > div.dDoNo.ikb4Bb.gsrt.GDBPqd > span.DFlfde.SwHCTb');
        return element ? element.textContent : null;
    });

    console.log(`O valor de 1 ${valueSearchCoin} em ${valueFinalCoin} é ${result}`)

    await browser.close();

    // //inicia o navegador
    // const browser = await puppeteer.launch({
    //     headless: false,
    //     timeout: 60000,
    //     args: ["--no-sandbox", "--disable-setuid-sandbox"],
    // })

    // //cria uma nova aba no navegador
    // const page = await browser.newPage();

    // //entra no site
    // page.goto("https://youtube.com");

    // //espera até  que apareça o conteundo da pagina
    // await page.waitForSelector("div [id='contents']");

    // //pega o titulo do video
    // const titles = await page.$$("#video-title");

    // console.log(titles.length);

    // //mostra todos os titulos achados no console
    // for (let i = 0; i < titles.length; i++) {
    //     const title = await (await titles[i].getProperties('arialLabel')).jsonValue();
    //     console.log(title)
    // }

}

rpa();