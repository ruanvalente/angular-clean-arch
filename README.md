Este `README.md` detalha a implementação da **Arquitetura Limpa (Clean Architecture)** no projeto Angular, estruturada para garantir escalabilidade, testabilidade e independência de frameworks ou APIs externas.

![Structure project image](image.png)

---

# Task Manager - Clean Architecture (Angular Moderno)

Este projeto utiliza os princípios da Arquitetura Limpa para separar as regras de negócio da infraestrutura técnica e da interface do usuário.

## Estrutura de Pastas e Responsabilidades

### 1. `core/` (Camada de Domínio)

O coração da aplicação. Esta camada é pura e não deve depender de nada do Angular (exceto para injeção de dependência via tokens).

- **`models/`**: Define as entidades de negócio (interfaces). Ex: `task.model.ts`.
- **`repositories/`**: Contém as classes abstratas (contratos) que definem como os dados devem ser manipulados, sem implementar a lógica de acesso a dados.
- **`use-cases/`**: Implementa as regras de negócio da aplicação. Cada arquivo representa uma única ação do usuário (ex: `get-all-tasks.usecase.ts`), orquestrando o fluxo de dados entre o domínio e os repositórios.

### 2. `infrastructure/` (Camada de Infraestrutura)

Responsável por implementar os detalhes técnicos.

- **`repositories/`**: Contém as implementações reais dos contratos definidos no `core`. Aqui vive o `task-api.repository.ts`, que utiliza o `HttpClient` para se comunicar com APIs externas. Se mudarmos para Firebase ou LocalStorage, apenas esta pasta é afetada.

### 3. `presentation/` (Camada de Interface)

Onde o framework Angular vive. É dividida para separar a lógica de visualização da lógica de orquestração.

- **`pages/`**: Componentes de alto nível que representam telas completas (ex: `tasks-page`). Eles organizam o layout e agregam os widgets.
- **`tasks/ui/`**: **Dumb Components**. Componentes puramente visuais (ex: `task-item.component.ts`) que recebem dados via `@Input` e emitem eventos via `@Output`. Não possuem lógica de negócio.
- **`tasks/widgets/`**: **Smart Components**. Componentes que injetam os `UseCases`, gerenciam o estado (Signals) e coordenam os componentes de UI. Eles são os "cérebros" de partes específicas da tela.

### 4. `shared/` (Recursos Globais)

- **`ui/`**: Componentes reutilizáveis em toda a aplicação que não pertencem a um domínio específico, como `header.component.ts` ou `footer.component.ts`.

### 5. Configurações e Ambiente

- **`app.config.ts`**: Onde a Inversão de Dependência acontece. Mapeamos o `TaskRepository` (Contrato) para o `TaskApiRepository` (Implementação).
- **`environments/`**: Armazena variáveis específicas de ambiente, como a `baseUrl` da API.

---

## Fluxo de Dados (Exemplo: Toggle Task)

1. O Usuário clica no checkbox no `task-item.component.ts` (**UI**).
2. O componente de UI emite um evento para o `task-list-widget.component.ts` (**Widget**).
3. O Widget chama o método `execute()` do `toggle-task.usecase.ts` (**UseCase**).
4. O UseCase chama o repositório através da interface `TaskRepository`.
5. O Angular injeta a implementação `TaskApiRepository` (**Infrastructure**) que realiza a chamada HTTP.
6. A resposta volta pelo mesmo caminho, atualizando o `Signal` no Widget e refletindo na UI.

---
