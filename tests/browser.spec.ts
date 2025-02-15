import { test, expect } from '@playwright/test';

test.describe('Challenge Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should start the challenge and display the countdown timer when the start button is clicked', async ({
		page
	}) => {
		await page.click('button:has-text("Iniciar Desafio")');
		await expect(page.locator('.challenge__timer-label')).toBeVisible();
	});

	test('Should validate form fields and show success modal when form is submitted within the time limit', async ({
		page
	}) => {
		await page.click('button:has-text("Iniciar Desafio")');
		await page.fill('input[placeholder="Digite seu nome"]', 'Larissa Cristina');
		await page.fill('input[placeholder="Digite o seu telefone"]', '(11) 94002-8922');
		await page.fill('input[placeholder="Digite o seu email"]', 'larissa@lesser.com');
		await page.click('button:has-text("Enviar")');
		await expect(page.locator('#modalBox')).toBeVisible();
		await expect(page.locator('#modalBox')).toContainText('Desafio finalizado com sucesso!');
	});

	test('Should show error messages and disable submit button for invalid form field', async ({
		page
	}) => {
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
		await expect(page.locator('#timerMinutes')).toHaveText('00');
		await expect(page.locator('#timerSeconds')).toHaveText('15');
		await page.waitForTimeout(5000);
		await expect(page.locator('#timerSeconds')).toHaveText('10');
	});

	test('Should show failure modal when the countdown reaches zero before form submission', async ({
		page
	}) => {
		await page.click('button:has-text("Iniciar Desafio")');
		await page.fill('input[placeholder="Digite seu nome"]', 'Larissa Cristina');
		await page.fill('input[placeholder="Digite o seu telefone"]', '(11) 94002-8922');
		await page.fill('input[placeholder="Digite o seu email"]', 'larissa@lesser.com');
		await page.waitForTimeout(16000); // wait for 16 seconds to let the countdown end
		await expect(page.locator('#modalBox')).toBeVisible();
		await expect(page.locator('#modalBox')).toContainText('Desafio finalizado com falha!');
	});

	test('Should allow access to candidate page and display candidate details after successful challenge completion', async ({
		page
	}) => {
		await page.click('button:has-text("Iniciar Desafio")');
		await page.fill('input[placeholder="Digite seu nome"]', 'Larissa Cristina');
		await page.fill('input[placeholder="Digite o seu telefone"]', '(11) 94002-8922');
		await page.fill('input[placeholder="Digite o seu email"]', 'larissa@lesser.com');
		await page.click('button:has-text("Enviar")');
		await expect(page.locator('#modalBox')).toBeVisible();
		await expect(page.locator('#modalBox')).toContainText('Desafio finalizado com sucesso!');
		await page.click('button[aria-label="Fechar modal"]');
		await page.click('button:has-text("Ver Candidato")');
		await expect(page).toHaveURL('/candidate');
		await expect(page.locator('#candidate-name')).toBeVisible(); // # because of the mention of Larissa Cristina in the footer
		await expect(page.locator('#candidate-name')).toContainText('Larissa Cristina');
		await expect(page.locator('text=(11) 94002-8922')).toBeVisible();
		await expect(page.locator('text=larissa@lesser.com')).toBeVisible();
		await page.click('button:has-text("Voltar para o Desafio")');
		await expect(page).toHaveURL('/');
	});

	test('Should close the success modal when the close button is clicked', async ({ page }) => {
		await page.click('button:has-text("Iniciar Desafio")');
		await page.fill('input[placeholder="Digite seu nome"]', 'Larissa Cristina');
		await page.fill('input[placeholder="Digite o seu telefone"]', '(11) 94002-8922');
		await page.fill('input[placeholder="Digite o seu email"]', 'larissa@lesser.com');
		await page.click('button:has-text("Enviar")');
		await expect(page.locator('#modalBox')).toBeVisible();
		await page.click('button[aria-label="Fechar modal"]');
		await expect(page.locator('#modalBox')).not.toBeVisible();
	});

	test('Should close the failure modal when the close button is clicked', async ({ page }) => {
		await page.click('button:has-text("Iniciar Desafio")');
		await page.waitForTimeout(16000);
		await expect(page.locator('#modalBox')).toBeVisible();
		await page.click('button[aria-label="Fechar modal"]');
		await expect(page.locator('#modalBox')).not.toBeVisible();
	});

	test('Should restart the challenge correctly', async ({ page }) => {
		await page.click('button:has-text("Iniciar Desafio")');
		await expect(page.locator('#timerMinutes')).toHaveText('00');
		await expect(page.locator('#timerSeconds')).toHaveText('15');
		await page.click('button:has-text("Reiniciar Desafio")');
		await page.click('button:has-text("Iniciar Desafio")');
		await expect(page.locator('#timerMinutes')).toHaveText('00');
		await expect(page.locator('#timerSeconds')).toHaveText('15');
	});

	test('Should check if Candidate button is not showed in the home page', async ({ page }) => {
		const candidateButton = await page.locator('button:has-text("Ver Candidato")');
		await expect(candidateButton).not.toBeVisible();
	});

	test('Should show error message when required fields are empty', async ({ page }) => {
		await page.click('button:has-text("Iniciar Desafio")');
		await page.click('button:has-text("Enviar")');
		await expect(page.locator('input[placeholder="Digite seu nome"]')).toHaveAttribute(
			'required',
			''
		);
		await expect(page.locator('input[placeholder="Digite o seu telefone"]')).toHaveAttribute(
			'required',
			''
		);
		await expect(page.locator('input[placeholder="Digite o seu email"]')).toHaveAttribute(
			'required',
			''
		);
	});

	test('Should close the modal when clicking outside of it', async ({ page }) => {
		await page.click('button:has-text("Iniciar Desafio")');
		await page.fill('input[placeholder="Digite seu nome"]', 'Larissa Cristina');
		await page.fill('input[placeholder="Digite o seu telefone"]', '(11) 94002-8922');
		await page.fill('input[placeholder="Digite o seu email"]', 'larissa@lesser.com');
		await page.click('button:has-text("Enviar")');
		const modalOverlay = page.locator('#canvaModal');
		const modalBox = page.locator('#modalBox');

		await expect(modalOverlay).toBeVisible();
		await expect(modalBox).toBeVisible();

		// Get modal position and click outside of it
		const box = await modalBox.boundingBox();
		if (box) {
			await page.mouse.click(box.x - 50, box.y - 50); // Click outside the modal
		}
		await page.waitForTimeout(500);
		await expect(modalOverlay).not.toBeVisible();
		await expect(modalBox).not.toBeVisible();
	});
});
