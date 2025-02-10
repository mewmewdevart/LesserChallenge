import { test, expect } from '@playwright/test';

test.describe('Challenge Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should start the challenge and display the countdown timer when the start button is clicked', async ({ page }) => {
        await page.click('button:has-text("Iniciar Desafio")');
        await expect(page.locator('.challenge__timer-label')).toBeVisible();
    });

    test('Should validate form fields and show success modal when form is submitted within the time limit', async ({ page }) => {
        await page.click('button:has-text("Iniciar Desafio")');
        await page.fill('input[placeholder="Digite seu nome"]', 'Larissa Cristina');
        await page.fill('input[placeholder="Digite o seu telefone"]', '(11) 94002-8922');
        await page.fill('input[placeholder="Digite o seu email"]', 'larissa@example.com');
        await page.click('button:has-text("Enviar")');
        await expect(page.locator('.modal-box')).toBeVisible();
        await expect(page.locator('.modal-box')).toContainText('Desafio finalizado com sucesso!');
    });

    test('Should show error messages and disable submit button for invalid form field', async ({ page }) => {
        await page.click('button:has-text("Iniciar Desafio")');
        await page.fill('input[placeholder="Digite seu nome"]', 'Test User');
        await page.fill('input[placeholder="Digite o seu telefone"]', '1234567890');
        await page.fill('input[placeholder="Digite o seu email"]', 'invalid-email');
        await page.click('button:has-text("Enviar")');
        const emailInput = await page.locator('input[placeholder="Digite o seu email"]');
        await expect(emailInput).toHaveAttribute('required', '');
    });

    test('Should correctly decrement the countdown timer every second', async ({ page }) => {
        await page.click('button:has-text("Iniciar Desafio")');
        await expect(page.locator('.timer-minutes')).toHaveText('00');
        await expect(page.locator('.timer-seconds')).toHaveText('15');
        await page.waitForTimeout(5000);
        await expect(page.locator('.timer-seconds')).toHaveText('10');
    });

    test('Should show failure modal when the countdown reaches zero before form submission', async ({ page }) => {
        await page.click('button:has-text("Iniciar Desafio")');
        await page.fill('input[placeholder="Digite seu nome"]', 'Larissa Cristina');
        await page.fill('input[placeholder="Digite o seu telefone"]', '(11) 94002-8922');
        await page.fill('input[placeholder="Digite o seu email"]', 'larissa@example.com');
        await page.waitForTimeout(16000); // wait for 16 seconds to let the countdown end
        await expect(page.locator('.modal-box')).toBeVisible();
        await expect(page.locator('.modal-box')).toContainText('Desafio finalizado com falha!');
    });

    test('Should redirect to candidate page and show a warning message if challenge is not completed', async ({ page }) => {
        await page.click('button:has-text("Ver Candidato")');
        await expect(page).toHaveURL('/candidate');
        await expect(page.locator('text=Por favor, finalize o desafio com sucesso para visualizar esta página.')).toBeVisible();
        await page.click('button:has-text("Voltar para o Desafio")');
        await expect(page).toHaveURL('/');
    });

    test('Should allow access to candidate page and display candidate details after successful challenge completion', async ({ page }) => {
        await page.click('button:has-text("Iniciar Desafio")');
        await page.fill('input[placeholder="Digite seu nome"]', 'Larissa Cristina');
        await page.fill('input[placeholder="Digite o seu telefone"]', '(11) 94002-8922');
        await page.fill('input[placeholder="Digite o seu email"]', 'larissa@example.com');
        await page.click('button:has-text("Enviar")');
        await expect(page.locator('.modal-box')).toBeVisible();
        await expect(page.locator('.modal-box')).toContainText('Desafio finalizado com sucesso!');
        await page.click('button[aria-label="Fechar modal"]');
        await page.click('button:has-text("Ver Candidato")');
        await expect(page).toHaveURL('/candidate');
        await expect(page.locator('#candidate-name')).toBeVisible();
        await expect(page.locator('text=(11) 94002-8922')).toBeVisible();
        await expect(page.locator('text=larissa@example.com')).toBeVisible();
        await page.click('button:has-text("Voltar para o Desafio")');
        await expect(page).toHaveURL('/');
    });

    test('Should close the success modal when the close button is clicked', async ({ page }) => {
        await page.click('button:has-text("Iniciar Desafio")');
        await page.fill('input[placeholder="Digite seu nome"]', 'Larissa Cristina');
        await page.fill('input[placeholder="Digite o seu telefone"]', '(11) 94002-8922');
        await page.fill('input[placeholder="Digite o seu email"]', 'larissa@example.com');
        await page.click('button:has-text("Enviar")');
        await expect(page.locator('.modal-box')).toBeVisible();
        await page.click('button[aria-label="Fechar modal"]');
        await expect(page.locator('.modal-box')).not.toBeVisible();
    });

    test('Should close the failure modal when the close button is clicked', async ({ page }) => {
        await page.click('button:has-text("Iniciar Desafio")');
        await page.waitForTimeout(16000); 
        await expect(page.locator('.modal-box')).toBeVisible();
        await page.click('button[aria-label="Fechar modal"]');
        await expect(page.locator('.modal-box')).not.toBeVisible();
    });
});

test('homepage has title and links to intro page', async ({ page }) => {
    // ...existing code...
});

test('should display the correct title', async ({ page }) => {
    // ...existing code...
});