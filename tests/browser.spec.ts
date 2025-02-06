import { test, expect } from '@playwright/test';

test('Test all fields and functionalities of the challenge', async ({ page }) => {
    // Navegar até a página
    await page.goto('http://localhost:5173');

    const name = 'Larissa Cristina Benedito';
    const phone = '5511980491579';
    const email = 'mewmewdevart@gmail.com';

    // INICIO ======================================= 
    // Inicia do desafio, verifica se os campos estão vazios e preenche os campos, clica em "Enviar" e verifica se a mensagem de sucesso foi exibida no Modal
    await page.waitForSelector('button:text("Iniciar Desafio")');
    await page.click('button:text("Iniciar Desafio")');
    await expect(page.locator('input[id="name-address-icon"]')).toHaveValue('');
    await expect(page.locator('input[id="phone-address-icon"]')).toHaveValue('');
    await expect(page.locator('input[id="email-address-icon"]')).toHaveValue('');
    await page.waitForSelector('button:text("Enviar")');
    await page.fill('input[id="name-address-icon"]', name);
    await page.fill('input[id="phone-address-icon"]', phone);
    await page.fill('input[id="email-address-icon"]', email);
    const countdownText = await page.locator('text=Tempo restante: 00:15');
    await expect(countdownText).toBeVisible();
    await expect(countdownText).toContainText('00:15');
    await page.click('button:text("Enviar")');
    const successMessage = page.locator('text=Desafio finalizado com sucesso!');
    await expect(successMessage).toBeVisible({ timeout: 10000 });
    await page.click('button:text("✕")');
    await expect(successMessage).not.toBeVisible();


    // REINICIA ======================================= 
    // Reinicia o desafio, verifica se o contador foi resetado para "00:15", verifica se os campos foram limpos, preenche os campos, verifica se o contador foi iniciado e exibe "00:15", clica em "Enviar" e verifica se a mensagem de sucesso foi exibida no Modal e clica em "Ver Candidato"
    await page.click('button:text("Reiniciar Desafio")');
    const resetCountdownText = page.locator('text=Tempo restante: 00:15');
    await expect(resetCountdownText).toBeVisible();
    await expect(resetCountdownText).toContainText('00:15');
    await expect(page.locator('input[id="name-address-icon"]')).toHaveValue('');
    await expect(page.locator('input[id="phone-address-icon"]')).toHaveValue('');
    await expect(page.locator('input[id="email-address-icon"]')).toHaveValue('');
    await page.fill('input[id="name-address-icon"]', name);
    await page.fill('input[id="phone-address-icon"]', phone);
    await page.fill('input[id="email-address-icon"]', email);
    const countdownTextAfterReset = await page.locator('text=Tempo restante: 00:15');
    await expect(countdownTextAfterReset).toBeVisible();
    await expect(countdownTextAfterReset).toContainText('00:15');
    await page.click('button:text("Enviar")');
    const successMessageAfterReset = page.locator('text=Desafio finalizado com sucesso!');
    await expect(successMessageAfterReset).toBeVisible({ timeout: 10000 });
    await page.click('button:text("✕")');
    await expect(successMessageAfterReset).not.toBeVisible();
    await page.click('button:text("Ver Candidato")');


    await page.waitForSelector('button:text("Voltar ao Desafio")');
    const displayedName = await page.locator('text=' + name);
    const displayedPhone = await page.locator('text=' + phone);
    const displayedEmail = await page.locator('text=' + email);
    await expect(displayedName).toBeVisible();
    await expect(displayedPhone).toBeVisible();
    await expect(displayedEmail).toBeVisible();
    await page.click('button:text("Voltar ao Desafio")');


    // // Aguarda o tempo passar (15 segundos)
    // await page.waitForTimeout(16000); // Espera 16 segundos para garantir que o tempo tenha acabado

    // // Verifica se a mensagem de falha foi exibida
    // const failureMessage = page.locator('text=Desafio finalizado com falha!');
    // await expect(failureMessage).toBeVisible();

    // // Fecha o modal novamente
    // await page.click('button:text("✕")');
    // await expect(failureMessage).not.toBeVisible();
});
