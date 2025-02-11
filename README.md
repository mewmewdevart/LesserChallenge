<h1 align="center">
  Lesser Form Countdown (Em desenvolvimento)
</h1>

<p align="center">
	<b><i>
    💼 | Minha solução para o desafio técnico da vaga de Javascript Developer na Lesser.
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

## Sumário
1. [Desafio](#desafio)
2. [Sobre o Projeto](#sobre-o-projeto)
3. [Funcionalidades](#funcionalidades)
4. [Tecnologias Utilizadas](#tecnologias-utilizadas)
5. [Estrutura do Projeto](#estrutura-do-projeto)
6. [Instruções de Uso](#instruções-de-uso)
    - [Pré-requisitos](#pré-requisitos)
    - [Rodando o Projeto Localmente](#rodando-o-projeto-localmente)
7. [Testes](#testes)
9. [Referências](#referências)
10. [Licença](#licença)

---

## Desafio
O desafio consiste em criar um site que exibe um formulário com campos para "Nome", "Telefone" e "Email". O usuário deve preencher o formulário e enviá-lo dentro de um limite de 15 segundos. O site deve exibir um contador regressivo e modais de sucesso ou falha, dependendo do tempo de envio. Além disso, o site deve incluir uma página de candidato que exibe os dados preenchidos, com navegação entre as páginas sem interromper a contagem do tempo.

---

## Sobre o Projeto
O **Lesser Form Countdown** é um projeto desenvolvido como parte de um desafio técnico para a vaga de Javascript Developer na Lesser. O objetivo é simular um cenário onde o usuário precisa completar um formulário rapidamente, testando habilidades como manipulação de tempo, gerenciamento de estado e interação com o usuário.

---

## Funcionalidades
- **Formulário Interativo**: Campos para "Nome", "Telefone" e "Email".
- **Contador Regressivo**: Exibe o tempo restante em formato `mm:ss`.
- **Modais de Feedback**:
  - **Sucesso**: Exibido quando o formulário é enviado dentro do tempo limite.
  - **Falha**: Exibido quando o tempo acaba antes do envio.
- **Página do Candidato**: Exibe os dados preenchidos após o envio bem-sucedido.
- **Navegação**: Botões para alternar entre a página do formulário e a página do candidato sem interromper a contagem.
- **Validação**: Desabilita o botão de envio se os campos não estiverem preenchidos corretamente.

---

## Tecnologias Utilizadas
- **SvelteKit**: Framework para construção de aplicações web modernas.
- **TailwindCSS**: Framework CSS utilitário para estilização rápida e responsiva.
- **DaisyUI**: Biblioteca de componentes para TailwindCSS, utilizada para criar modais e botões estilizados.
- **TypeScript**: Adiciona tipagem estática ao JavaScript para maior segurança e produtividade.
- **Playwright**: Ferramenta de teste end-to-end para garantir a funcionalidade do projeto.

---

## Estrutura do Projeto
```
my-app/
├── src/
│   ├── lib/
│   │   └── stores.ts          # Gerenciamento de estado (tempo e dados do candidato)
│   ├── routes/
│   │   ├── +page.svelte       # Página principal com o formulário
│   │   ├── candidate/
│   │   │   └── +page.svelte   # Página do candidato
│   │   └── +layout.svelte     # Layout comum para as páginas
│   └── app.html               # Template HTML base
├── tests/
│   └── browser.spec.ts        # Testes end-to-end com Playwright
├── playwright.config.ts       # Configuração do Playwright
├── tailwind.config.cjs        # Configuração do TailwindCSS
├── svelte.config.js           # Configuração do SvelteKit
├── package.json               # Dependências e scripts do projeto
└── README.md                  # Documentação do projeto
```

---

## Instruções de Uso

### Pré-requisitos
- Node.js (v18 ou superior)
- PNPM (gerenciador de pacotes)

### Rodando o Projeto Localmente
1. Clone o repositório:
   ```sh
   git clone https://github.com/mewmewdevart/LesserFormCountdown.git
   cd LesserFormCountdown
   ```
2. Instale as dependências:
   ```sh
   pnpm install
   ```
3. Execute o projeto:
   ```sh
   pnpm run dev
   ```
4. Acesse o site em: `http://localhost:5173`.

---

## Testes
Para garantir que todas as funcionalidades estão funcionando corretamente, execute os testes com Playwright:
```sh
npx playwright test browser.spec.ts
```

## Testes
Os testes cobrem todos os cenários críticos do projeto, garantindo que a aplicação funcione conforme o esperado. Abaixo estão os principais cenários testados:
1. **Início do Desafio e Contador Regressivo**:
   - Verifica se o contador regressivo é exibido corretamente após o início do desafio.
   - Confirma que o tempo é decrementado a cada segundo.
2. **Validação do Formulário**:
   - Testa se os campos do formulário são validados corretamente.
   - Verifica se o botão de envio é desabilitado para entradas inválidas.
3. **Envio do Formulário Dentro do Tempo Limite**:
   - Confirma que, ao enviar o formulário dentro dos 15 segundos, a modal de sucesso é exibida.
   - Verifica se os dados do candidato são salvos corretamente.
4. **Exibição da Modal de Falha**:
   - Testa se a modal de falha é exibida quando o tempo acaba antes do envio do formulário.
5. **Navegação Entre Páginas**:
   - Verifica se a navegação entre a página do formulário e a página do candidato ocorre sem interromper a contagem regressiva.
   - Confirma que a página do candidato exibe os dados corretamente após o envio bem-sucedido.
6. **Fechamento das Modais**:
   - Testa se as modais de sucesso e falha podem ser fechadas clicando no botão de fechar (`X`) ou fora da modal.
7. **Acesso à Página do Candidato**:
   - Verifica se a página do candidato exibe uma mensagem de aviso caso o desafio não tenha sido concluído com sucesso.
   - Confirma que os detalhes do candidato são exibidos corretamente após o envio bem-sucedido.

---

## Referências
- [SvelteKit Documentation](https://kit.svelte.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [DaisyUI Documentation](https://daisyui.com/)
- [Playwright Documentation](https://playwright.dev/)

---

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).

---

<p align="center">
  Desenvolvido com muito ☕ por
  <a href="https://linktr.ee/mewmewdevart" target="_blank">Larissa Cristina Benedito</a>
</p>
