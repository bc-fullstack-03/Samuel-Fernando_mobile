# Samuel Fernando da Silva Tavares | Mobile - Parrot App
Meu projeto final de Mobile para a 3ª edição do Bootcamp Excelência FullStack - SysMap Solutions

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Tecnologias utilizadas
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)


# Configurando o BackEnd

O projeto conta com um docker-compose que contém todos os serviços de backend necessários. Abaixo está a configuração necessária para o pleno funcionamento dos serviços.

Clone o repositório:

```sh
git clone https://github.com/bc-fullstack-03/Samuel-Fernando_mobile.git
```

Entre no diretório raiz do projeto, e execute o docker-compose para iniciar todos os contêineres e criar todos os serviços de back-end necessários para ele ser funcional:

```sh
cd Samuel-Fernando_mobile
```

```sh
docker-compose up --build -d
```

Após os contêineres serem iniciados, será necessária a criação de um novo perfil e do S3 bucket no contêiner localstack-parrot para o upload de fotos ser funcional na aplicação. Para isso, será necessário executar os seguintes comandos:

```sh
docker exec -it localstack-parrot bash
```
```sh
aws configure --profile default
```
Será aberta uma série de configurações para o perfil, onde será preciso atribuir os seguintes dados:

- AWS Access Key ID [None]: myKey
- AWS Secret Access Key [None]: myKey
- Default region name [None]: us-west-2
- Default output format [None]: json

Após a criação do perfil, o bucket S3 para a aplicação poderá ser criado utilizando o seguinte comando:

```sh
aws s3 mb s3://demo-bucket --endpoint-url http://localhost:4566
```
Com o bucket S3 criado, a configuração do back-end estará completa.

# Configurando o mobile

Será necessário o preenchimento de duas variáveis de ambiente em um arquivo .env na raiz do projeto, sendo elas:

- API_URL = Deve ser preenchida com a URL base do BackEnd (utilizar o endereço IP local no host)

Exemplo:

```sh
http://xxx.xxx.x.xxx:8082/api/v1
```

- PHOTO_SERVICE_HOST = Deve ser preenchido com o endereço IP local (o mesmo utilizado na variável API_URL)

Exemplo:

```sh
xxx.xxx.x.xxx
```

# Iniciando o projeto

Na raiz do projeto, instale todas as depedências:

```sh
yarn
```
ou
```sh
npm install
```

Após as dependências serem instaladas, a aplicação poderá ser iniciada com o comando:

```sh
yarn android
```
ou
```sh
npm run android
```

## Repositório do BackEnd
O repositório com o código do backend do projeto pode ser encontrado [aqui](https://github.com/bc-fullstack-03/Samuel-Fernando_backend).
