# Odapp Challenge Mobile

O Odapp Challenge Mobile é a estrutura mobile de um desafio proposto pela empresa Odapp como forma de testar as habilidades na criação de um sistema simples para gerir as informações diarias em uma clinica. O App foi criado utilizando a pré-configuração do Create Expo Stack


# Tecnologias e Bibliotecas Utilizadas

- React-native
- Typescript
- Axios
- Expo
- Expo Router
- React Bootstrapp Icons


# Estrutura do Projeto

O Projeto segue uma estrutura de diretórios modularizada para facilitar a manutenção e escalabilidade:

```bash

/app
  layout.tsx
/assets
/components
/contexts
/serves
colors.ts
types.ts

```

# Instalaçao e Execução

  ## Instalar as dependências:

  ```
    npm install
  ```

  ## Execução

  Para executar um projeto com Expo, basta rodar o comando abaixo e será aberto um leque de opções para execução:
  ```
    npm start
  ```

  Após a execução, apresentará as opções padrão do expo:
  - Apertar "a" para rodar no android
  - Apertar "w" para rodar web
  - Apertar "r" para recarregar a aplicação
  - ...Dentre outros
  
# Funcionalidades

## Funcionalidades da Página Inicial

A página inicial do sistema oferece um painel com dados e visualizações importantes para o gerenciamento dos pacientes da clínica. Abaixo estão as funcionalidades detalhadas:

### 1. Dados Gerais de Pacientes
- Exibe a quantidade total de pacientes cadastrados.
- Mostra o número de estados diferentes de residência dos pacientes cadastrados.

### 2. Visualização de Gráficos
- **Gráfico de Distribuição por Estado**: Apresenta um gráfico que exibe a distribuição dos pacientes por estado de origem, facilitando a análise demográfica.
- **Gráfico de Distribuição por Faixa Etária**: Visualiza a quantidade de pacientes em faixas etárias pré-definidas, como:
  - Até 5 anos
  - Até 10 anos
  - Até 15 anos
  - Até 18 anos
  - Até 25 anos
  - Acima de 25 anos

### 3. Atualização Dinâmica de Dados
- A página utiliza o contexto global de pacientes, permitindo que os dados sejam atualizados em tempo real à medida que novos pacientes são cadastrados, atualizados ou removidos.
- Dados são buscados da API para preencher as informações da página, utilizando Axios para requisições e atualizando o estado local com os dados recebidos.

### 4. Estrutura e Estilização
- Componentes visuais organizados em contêineres responsivos.
- Estilização da página com SCSS, oferecendo uma experiência de usuário agradável e organizada.


## Funcionalidades da Página de Cadastro de Pacientes

A página de cadastro permite registrar novos pacientes no sistema, com validação dos campos e busca de estados e cidades usando a API do IBGE. Abaixo estão as funcionalidades principais:

### 1. Formulário de Cadastro de Paciente
- **Campos de Entrada**:
  - Nome Completo
  - Idade
  - Estado (campo dinâmico, preenchido automaticamente com dados do IBGE)
  - Cidade (campo dinâmico, preenchido com base no estado selecionado)
- **Validação de Dados**:
  - Verifica se todos os campos estão preenchidos antes de permitir o envio.
  - Emite um alerta caso algum campo esteja vazio.

### 2. Integração com a API do IBGE
- **Busca de Estados**: Ao carregar a página, uma chamada à API do IBGE busca e exibe todos os estados disponíveis para seleção.
- **Busca de Cidades**: Após o usuário selecionar um estado, uma nova chamada à API do IBGE busca e exibe as cidades pertencentes ao estado selecionado.

### 3. Envio de Dados e Atualização do Contexto Global
- **Envio do Cadastro**: Os dados preenchidos são enviados para a API backend através de uma requisição `POST` à rota `/novo-paciente`.
- **Atualização Automática da Lista de Pacientes**: Após um cadastro bem-sucedido, a lista global de pacientes é atualizada automaticamente e o usuário é redirecionado para a página inicial.

## Funcionalidades da Página de Alteração de Pacientes

A página de alteração de pacientes permite atualizar dados de um paciente existente, carregando os valores previamente salvos e facilitando a edição. Utiliza integração com a API do IBGE para a seleção dinâmica de estados e cidades, garantindo uma interface intuitiva e eficiente.

### 1. Carregamento Inicial dos Dados do Paciente
- **População Automática de Dados**: 
  - Carrega os dados do paciente selecionado (nome, idade, estado e cidade) automaticamente ao entrar na página.
  - Utiliza o contexto global para obter o paciente atualmente selecionado.
  
### 2. Campos de Entrada e Validação
- **Campos de Edição**:
  - Nome Completo
  - Idade
  - Estado (lista dinâmica carregada da API do IBGE)
  - Cidade (lista dinâmica, atualizada com base no estado selecionado)
- **Validação de Campos**:
  - Verifica se todos os campos obrigatórios estão preenchidos antes de permitir o envio.
  - Mostra uma mensagem de alerta caso algum campo esteja vazio.

### 3. Integração com a API do IBGE
- **Busca de Estados**: Ao carregar a página, uma chamada à API do IBGE obtém a lista de estados brasileiros.
- **Busca de Cidades**: Quando o usuário altera o estado selecionado, outra chamada à API carrega as cidades correspondentes, atualizando a lista de cidades dinamicamente.

### 4. Atualização dos Dados e Contexto Global
- **Envio da Atualização**: Quando o usuário confirma as alterações, os dados são enviados para a API backend através de uma requisição `PUT` à rota `/atualizar-paciente/:id`.
- **Atualização da Lista Global de Pacientes**: Após a confirmação de uma atualização bem-sucedida, a lista global de pacientes é recarregada automaticamente e o usuário é redirecionado para a página de listagem de pacientes.

## Funcionalidades da Página de Listagem de Pacientes

A página de listagem de pacientes exibe uma lista de pacientes cadastrados, com opções para visualização de detalhes, edição e exclusão. Abaixo está a descrição das funcionalidades para cada componente.

### 1.Visualização dos Detalhes do Paciente:
  - Exibe os detalhes como nome, idade, cidade, estado e data de cadastro formatada (`dd/MM/yyyy`).
  - Expansão dos detalhes: Ao clicar no nome do paciente, o usuário expande ou oculta as informações adicionais, com um ícone de seta indicando o estado.

### 2.Ações de Edição e Exclusão:
  - **Edição**: Ao clicar em "Editar", o paciente selecionado é definido no contexto global para ser acessado na página de edição, e o usuário é redirecionado para a rota `/editar-paciente`.
  - **Exclusão**: Ao clicar em "Deletar", o paciente é excluído através de uma requisição `DELETE` à API, e, após a exclusão bem-sucedida, a lista de pacientes é atualizada automaticamente.

### 3.Animações e Ícones:
  - Usa o ícone `ChevronDown` para indicar a expansão/colapso dos detalhes do paciente.
  - Inclui ícones de edição (`PencilSquare`) e exclusão (`Trash`) para uma experiência visual mais rica e intuitiva.

### 4.Navegação e Atualização em Tempo Real:
  - Após qualquer edição ou exclusão, a lista global de pacientes é atualizada em tempo real para refletir as alterações, mantendo a consistência dos dados exibidos.
  - Mensagens de confirmação são exibidas após operações como exclusão, proporcionando feedback visual ao usuário.

