import { test, expect, Page } from '@playwright/test';

const URL_INPUTS = 'https://practice.expandtesting.com/inputs';

async function acessarPagina(page: Page) {
  await page.goto(URL_INPUTS);
}

test('deve abrir a página de Web Inputs', async ({ page }) => {
  await acessarPagina(page);

  await expect(
    page.getByRole('heading', { name: 'Web inputs page for Automation Testing Practice' })
  ).toBeVisible();

  await expect(page.getByRole('button', { name: 'Display Inputs' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Clear Inputs' })).toBeVisible();
});

test('deve apresentar todos os campos de entrada', async ({ page }) => {
  await acessarPagina(page);

  await expect(page.getByLabel('Input: Number')).toBeVisible();
  await expect(page.getByLabel('Input: Text')).toBeVisible();
  await expect(page.getByLabel('Input: Password')).toBeVisible();
  await expect(page.getByLabel('Input: Date')).toBeVisible();
});

test('deve exibir o texto informado', async ({ page }) => {
  await acessarPagina(page);

  const textoDigitado = 'Teste com Playwright';
  const campoTexto = page.getByLabel('Input: Text');

  await campoTexto.fill(textoDigitado);
  await page.getByRole('button', { name: 'Display Inputs' }).click();

  await expect(campoTexto).toHaveValue(textoDigitado);

  await expect(page.getByText(textoDigitado)).toBeVisible();
});

test('deve exibir o número informado', async ({ page }) => {
  await acessarPagina(page);

  const numero = '2026';
  const campoNumero = page.getByLabel('Input: Number');

  await campoNumero.fill(numero);
  await page.getByRole('button', { name: 'Display Inputs' }).click();

  await expect(campoNumero).toHaveValue(numero);

  await expect(page.getByText(numero)).toBeVisible();
});

test('deve preencher e exibir todos os campos simultaneamente', async ({ page }) => {
  await acessarPagina(page);

  const numero = '16';
  const texto = 'SENAI';
  const senha = 'teste123';

  const data = '2026-09-16';

  const campoNumero = page.getByLabel('Input: Number');
  const campoTexto = page.getByLabel('Input: Text');
  const campoSenha = page.getByLabel('Input: Password');
  const campoData = page.getByLabel('Input: Date');

  await campoNumero.fill(numero);
  await campoTexto.fill(texto);
  await campoSenha.fill(senha);
  await campoData.fill(data);

  await page.getByRole('button', { name: 'Display Inputs' }).click();

  await expect(campoNumero).toHaveValue(numero);
  await expect(campoTexto).toHaveValue(texto);
  await expect(campoSenha).toHaveValue(senha);
  await expect(campoData).toHaveValue(data);
});

test('deve limpar os campos preenchidos', async ({ page }) => {
  await acessarPagina(page);

  const campoNumero = page.getByLabel('Input: Number');
  const campoTexto = page.getByLabel('Input: Text');
  const campoSenha = page.getByLabel('Input: Password');
  const campoData = page.getByLabel('Input: Date');

  await campoNumero.fill('16');
  await campoTexto.fill('SENAI');
  await campoSenha.fill('teste123');
  await campoData.fill('2026-09-16');

  await page.getByRole('button', { name: 'Clear Inputs' }).click();

  await expect(campoNumero).toHaveValue('');
  await expect(campoTexto).toHaveValue('');
  await expect(campoSenha).toHaveValue('');
  await expect(campoData).toHaveValue('');
});

test('deve preencher exibir e limpar os dados', async ({ page }) => {
  await acessarPagina(page);

  const texto = 'SENAI - Desenvolvimento de Sistemas';
  const numero = '2026';
  const senha = 'teste123';

  const campoTexto = page.getByLabel('Input: Text');
  const campoNumero = page.getByLabel('Input: Number');
  const campoSenha = page.getByLabel('Input: Password');

  await campoTexto.fill(texto);
  await campoNumero.fill(numero);
  await campoSenha.fill(senha);

  await page.getByRole('button', { name: 'Display Inputs' }).click();

  await expect(campoTexto).toHaveValue(texto);
  await expect(campoNumero).toHaveValue(numero);
  await expect(campoSenha).toHaveValue(senha);

  await page.getByRole('button', { name: 'Clear Inputs' }).click();

  await expect(campoTexto).toHaveValue('');
  await expect(campoNumero).toHaveValue('');
  await expect(campoSenha).toHaveValue('');
});

test('deve exibir o texto "Playwright"', async ({ page }) => {
  await acessarPagina(page);

  const campoTexto = page.getByLabel('Input: Text');
  await campoTexto.fill('Playwright');
  await page.getByRole('button', { name: 'Display Inputs' }).click();

  await expect(campoTexto).toHaveValue('Playwright');
});

test('deve exibir o texto "Teste automatizado 2026"', async ({ page }) => {
  await acessarPagina(page);

  const campoTexto = page.getByLabel('Input: Text');
  await campoTexto.fill('Teste automatizado 2026');
  await page.getByRole('button', { name: 'Display Inputs' }).click();

  await expect(campoTexto).toHaveValue('Teste automatizado 2026');
});

test('deve exibir o texto "SENAI - Desenvolvimento de Sistemas"', async ({ page }) => {
  await acessarPagina(page);

  const campoTexto = page.getByLabel('Input: Text');
  await campoTexto.fill('SENAI - Desenvolvimento de Sistemas');
  await page.getByRole('button', { name: 'Display Inputs' }).click();

  await expect(campoTexto).toHaveValue('SENAI - Desenvolvimento de Sistemas');
});

test('deve aceitar e exibir caracteres especiais no campo de texto', async ({ page }) => {
  await acessarPagina(page);

  const valorEspecial = 'Teste @#$% 123 !?';
  const campoTexto = page.getByLabel('Input: Text');

  await campoTexto.fill(valorEspecial);
  await page.getByRole('button', { name: 'Display Inputs' }).click();

  await expect(campoTexto).toHaveValue(valorEspecial);
});

test('deve tratar o clique em Display Inputs sem nenhum campo preenchido', async ({ page }) => {
  await acessarPagina(page);

  await page.getByRole('button', { name: 'Display Inputs' }).click();

  await expect(page.getByLabel('Input: Number')).toHaveValue('');
  await expect(page.getByLabel('Input: Text')).toHaveValue('');
});

test('deve exibir o texto informado corretamente (versão corrigida)', async ({ page }) => {
  await acessarPagina(page);

  const campoTexto = page.getByLabel('Input: Text');
  await campoTexto.fill('SENAI');
  await page.getByRole('button', { name: 'Display Inputs' }).click();

  await expect(campoTexto).toHaveValue('SENAI');
});

test('deve limpar manualmente o campo de senha ao preenchê-lo com valor vazio', async ({ page }) => {
  await acessarPagina(page);

  const campoSenha = page.getByLabel('Input: Password');

  await campoSenha.fill('senhaProvisoria123');
  await expect(campoSenha).toHaveValue('senhaProvisoria123');

  await campoSenha.fill('');
  await expect(campoSenha).toHaveValue('');
});


test('deve executar o fluxo completo do formulário', async ({ page }) => {

  await acessarPagina(page);


  await expect(page.getByRole('button', { name: 'Display Inputs' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Clear Inputs' })).toBeVisible();
  await expect(page.getByLabel('Input: Number')).toBeVisible();
  await expect(page.getByLabel('Input: Text')).toBeVisible();
  await expect(page.getByLabel('Input: Password')).toBeVisible();
  await expect(page.getByLabel('Input: Date')).toBeVisible();

  const numero = '16';
  const texto = 'SENAI';
  const senha = 'teste123';
  const data = '2026-09-16';

  const campoNumero = page.getByLabel('Input: Number');
  const campoTexto = page.getByLabel('Input: Text');
  const campoSenha = page.getByLabel('Input: Password');
  const campoData = page.getByLabel('Input: Date');

  await campoNumero.fill(numero);
  await campoTexto.fill(texto);
  await campoSenha.fill(senha);
  await campoData.fill(data);

  await page.getByRole('button', { name: 'Display Inputs' }).click();

  await expect(campoNumero).toHaveValue(numero);
  await expect(campoTexto).toHaveValue(texto);
  await expect(campoSenha).toHaveValue(senha);
  await expect(campoData).toHaveValue(data);

  await page.getByRole('button', { name: 'Clear Inputs' }).click();

  await expect(campoNumero).toHaveValue('');
  await expect(campoTexto).toHaveValue('');
  await expect(campoSenha).toHaveValue('');
  await expect(campoData).toHaveValue('');
});