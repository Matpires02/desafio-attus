# 🔐 LoginComponent Cookie API (Spring Boot)

API de autenticação segura utilizando **Spring Boot 4**, com:

* ✅ LoginComponent com **JWT**
* ✅ Segurança com Spring Security
* ✅ Testes automatizados
* ✅ Banco H2 para desenvolvimento

---

# 🚀 Tecnologias

* Java 17
* Spring Boot 4
* Spring Security 7
* Spring Data JPA
* H2 Database
* JWT (jjwt)
* Swagger/OpenAPI
* MapStruct
* Lombok
* JUnit 5
* MockMvc

---

# 📦 Funcionalidades

## 🔑 Autenticação

* LoginComponent com email e senha
* Registro de usuário
* Geração de:

  * Token (15 min)

## Logs

## 🛡️ Segurança

### ✔️ Replay Attack Protection

* Cada token possui um `jti`

# 🚀 Como Executar o Projeto
## 📋 Pré-requisitos

Antes de iniciar, instale os seguintes softwares:

Java 17+
Maven 3.9+
Git

Verifique se estão instalados:
```bash
java -version
mvn -version
git --version
```

## 📥 Clonando o Projeto
```bash
git clone https://github.com/Matpires02/desafio-Attus.git
cd desafio-Attus
```
## ⚙️ Configuração
Crie o arquivo (Arquivo já foi criado para facilitar o uso)
 ```
 backend/src/main/resources/application.yml
 ```
Com o Conteúdo:
 ```yaml
 spring:
   datasource:
     url: jdbc:h2:mem:testdb
     driver-class-name: org.h2.Driver
     username: sa
     password:

   jpa:
     hibernate:
       ddl-auto: update

     show-sql: false

   h2:
     console:
       enabled: true

 jwt:
   secret: minha-chave-super-secreta-com-no-minimo-32-bytes
  ```

## 🔐 Gerando uma Secret JWT Segura

A chave JWT deve possuir pelo menos 32 bytes.

Você pode gerar uma facilmente:

Linux/Mac:
```bash
openssl rand -base64 32
```

Windows PowerShell:

```bash
[Convert]::ToBase64String((1..32 | ForEach-Object {Get-Random -Maximum 256}))
```


Substitua no:
```bash
jwt:
  secret: SUA_SECRET
```

## ▶️ Executando o Projeto
### Backend (Spring Boot)
#### Via Maven

```bash
cd backend
mvn spring-boot:run -Dspring.profiles.active=dev
```

#### Via IDE

Execute a classe:
```
LoginCookieApplication.java
```

### Frontend (Angular)
Abra outro terminal 
```bash
cd frontend
npm install
npm start
```
---
# 🧪 Testes

## Rodar testes
## Backend
Estando na pasta raiz do projeto:
```bash
cd backend
mvn test
```
## Frontend
Estando na pasta raiz do projeto:
```bash
cd frontend
npm run test
```

## Tipos de teste implementados

### UserControllerTest
* Registro de usuário
* Update de usuário

### ✔️ AuthControllerTest

* LoginComponent com sucesso
* LoginComponent inválido

### ✔️ JwtServiceTest

* Geração e validação de token

---

# 📦 Build do Projeto

Gerar o .jar:
```bash
mvn clean package
```
O arquivo será criado em:
```bash
backend/target/login-cookie-0.0.1-SNAPSHOT.jar
```
Executar o .jar:
Estando na pasta raiz do projeto:

```bash
java -jar backend/target/login-cookie-0.0.1-SNAPSHOT.jar
```
Para executar o projeto em modo de desenvolvimento:

```bash
java -jar backend/target/login-cookie-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev
```
---
# 📁 Estrutura do Projeto

```
src/
├── backend/
  ├── controller/
  ├── service/
  ├── security/
  ├── config/
  ├── entity/
  ├── repository/
  └── audit/
├── frontend/
  ├── src/
    ├── app/
      ├── components/
      ├── guards/
      ├── inteceptor/
      ├── models/
      ├── pages/
      ├── shared/
      ├── services/
      └── store/
```

---

# 🌐 URLs da Aplicação
## Front end
```
http://localhost:4200
```
## Swagger/OpenAPI
```
http://localhost:8080/swagger-ui/index.html
```
## Conteúdo da API
### 📌 Auth

#### ➕ Registrar usuário

```
POST /user/register
```

Body:

```json
{
  "email": "user@email.com",
  "password": "123456"
}
```

---

#### 🔑 LoginComponent

```
POST /auth/login
```

Resposta:

* Token JWT
```
{"token", token, "message", "Login successful"}
```

---

#### Current user

```
GET /auth/me
```

Resposta: 
* Usuário logado

---

#### 🚪 Logout

```
POST /auth/logout
```

---
# 📝 Logs da Aplicação com SLF4J

O projeto utiliza:

* SLF4J
* Logback (implementação padrão do Spring Boot)

Para geração de logs estruturados e profissionais.

---

# 🔐 Como funciona o JWT

### Claims:

* `sub` → email
* `roles` → permissões
* `jti` → ID único (anti replay)

---

# ⚠️ Problemas comuns resolvidos

### ❌ Erro JWT (ClassNotFound)

✔️ Solução: alinhar versões do jwt

### ❌ Forbidden em /auth

✔️ Solução: liberar rota no SecurityConfig e no filtro

### ❌ H2 erro com tabela "user"

✔️ Solução: renomear tabela ou usar escape (`users`)

### ❌ POST de update falhando

✔️ Solução: Alerando verificação de constaint unique do email para que essa verificação não leve em conta o email do usuário atual

---

# 🚀 Próximos passos

* 🔄 Refresh token com rotação
* 🐳 Docker
* ⚙️ CI/CD (GitHub Actions)
* 🎲 Banco de dados mais robusto (Ex: PostgreSQL)
* Rate Limit por Email + IP
---

