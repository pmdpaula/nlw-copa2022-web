# Rocketseat - NWL Copa 2022

Projeto de bolão para Copa do mundo. Com backend e aplicações web e mobile

# Aula 01

## Passos

### Configuração

```
yarn create next-app --typescript
```

Nome do projeto: web

# Aula 02

## Passos

### Adição de pacotes

#### Tailwind CSS

```
yarn add -D tailwindcss postcss autoprefixer

npx tailwindcss init -p
```

Isto cria o arquivo `tailwind.config.js`

1. adicionar em content do arquivo criado

```
'./src/**/*.tsx',
```

2. Criado o arquivo `_document.tsx` para inserir as fontes do Google.

```
import { Html, Head, Main, NextScript } from 'next/document';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export default function Document(props: any) {
  return (
    <Html lang="pt-br">
      <Head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Asap:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>

      <body className="bg-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

#### Biblioteca Axios para chamadas HTTP

```
yarn add axios
```
