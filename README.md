<h1 align="center">
  Lesser Form Countdown (Em Desenvolvimento)
</h1>

<p align="center">
    <b><i>
    💼 | Desafio Tecnico
  </i></b><br>
</p>

<p align="center">
    <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/mewmewdevart/LesserFormCountdown?color=054DFC" />
    <img alt="Main language" src="https://img.shields.io/github/languages/top/mewmewdevart/LesserFormCountdown?color=054DFC"/>
    <img alt="License" src="https://img.shields.io/github/license/mewmewdevart/LesserFormCountdown?color=054DFC"/>
</p>

<p align="center">
    <a href="#" target="_blank">Acesse o Site</a> 
</p>

## Sobre o Projeto
O **Lesser Form Countdown** é um projeto desenvolvido como parte de um desafio técnico. Ele consiste em um formulário de registro que deve ser preenchido dentro de um tempo limite de 15 segundos. O objetivo é simular um cenário onde o usuário precisa completar o formulário rapidamente para garantir sua vaga em uma expedição intergaláctica.

### Funcionalidades
- Iniciar o desafio e exibir um cronômetro de contagem regressiva.
- Validar os campos do formulário e exibir uma modal de sucesso ao enviar dentro do tempo limite.
- Exibir mensagens de erro e desabilitar o botão de envio para campos inválidos.
- Mostrar uma modal de falha se o tempo acabar antes do envio do formulário.
- Redirecionar para a página do candidato e exibir os detalhes do candidato após a conclusão bem-sucedida do desafio.

## Tech Stack
- SvelteKit
- TailwindCSS
- DaisyUI
- TypeScript
- Playwright

## Setup
Para configurar o projeto, siga os passos abaixo:

```sh
pnpm install  
pnpm run dev  
```

## Testes
Para rodar os testes, utilize o comando:

```sh
npx playwright test browser.spec.ts  
```

<p align="center">
  Desenvolvido com muito ☕ por
  <a href="https://linktr.ee/mewmewdevart" target="_blank">Larissa Cristina Benedito</a>
</p>
