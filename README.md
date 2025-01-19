
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

---

## Description

This project is built with the [NestJS](https://nestjs.com/) framework and integrates the [TomTom API](https://developer.tomtom.com/) to provide address suggestions based on partial address inputs. The implementation restricts the results to Australian addresses and allows configuration through a `.env` file.

---

## Features

- Integration with the TomTom API for address suggestions.
- Australian address filtering using the `countrySet` parameter.
- Configurable API key via `.env` file.
- Includes unit tests for service and controller layers.

---

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory based on the provided `.env.example` file:

```bash
cp .env.example .env
```

Add your TomTom API key in the `.env` file:

```
TOMTOM_API_KEY=your-tomtom-api-key
```

---

## Running the Application

### Development Mode

```bash
npm run start
```

### Watch Mode

```bash
npm run start:dev
```

### Production Mode

```bash
npm run start:prod
```

---

## Running Tests

### Unit Tests

```bash
npm run test
```

### Test Coverage

```bash
npm run test:cov
```

---

## API Endpoints

### Address Suggestions

#### GET `/tomtom/suggestions`

**Query Parameters**:
- `query` (string, required): The partial address input for suggestions.
- `limit` (number, optional): The maximum number of suggestions to return (default is 5).

**Example Request**:

```bash
curl "http://localhost:3000/tomtom/suggestions?query=123%20Example%20St&limit=5"
```

**Example Response**:

```json
{
  "results": [
    {
      "address": {
        "freeformAddress": "123 Example St, Sydney, NSW 2000, Australia"
      }
    }
  ]
}
```

---

## Deployment

For best practices and tips on deploying a NestJS application, refer to the [official documentation](https://docs.nestjs.com/deployment).

---

## Project Structure

```plaintext
src/
├── app.controller.ts      # Root controller
├── app.module.ts          # Root module
├── app.service.ts         # Root service
├── tomtom/                # Module for TomTom API integration
│   ├── tomtom.module.ts   # TomTom-specific module
│   ├── tomtom.service.ts  # Service for interacting with TomTom API
│   ├── tomtom.controller.ts # Controller for TomTom endpoints
├── tests/                 # Unit and integration tests
.env.example               # Example environment variable file
```

---

## Contributing

Feel free to open issues or submit pull requests if you have ideas for improving the project.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
