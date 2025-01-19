
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

---

## Description

This project is built with the [NestJS](https://nestjs.com/) framework and initially integrates the [TomTom API](https://developer.tomtom.com/) to provide address suggestions based on partial address inputs. The implementation restricts the results to Australian addresses and allows configuration through a `.env` file.

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
git clone https://github.com/Skydrol/QuickRoute.git
cd QuickRoute
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

## Project Structure

```plaintext
src/
├── address/
│   ├── address.controller.spec.ts          # Unit tests for the address controller
│   ├── address.controller.ts               # Address controller
│   ├── address.module.ts                   # Address module
├── providers/
│   ├── address-provider.interface.ts       # Interface for address providers
│   ├── address-provider.manager.spec.ts    # Unit tests for the provider manager
│   ├── address-provider.manager.ts         # Manager to handle multiple address providers
├── services/
│   ├── address.service.spec.ts             # Unit tests for the address service
│   ├── address.service.ts                  # Address service logic
│   ├── app.service.ts                      # General application service
├── tomtom/
│   ├── tomtom.provider.spec.ts             # Unit tests for the TomTom provider
│   ├── tomtom.provider.ts                  # TomTom-specific provider implementation
├── app.controller.spec.ts                  # Unit tests for the main application controller
├── app.controller.ts                       # Main application controller
├── app.module.ts                           # Main application module
├── main.ts                                 # Entry point for the application
test/                                       # E2E test setup and configuration
.env.example                                # Example environment file
```

---

## API Endpoints

### Address Suggestions

#### GET `/address/suggestions`

**Query Parameters**:
- `query` (string, required): The partial address input for suggestions.
- `limit` (number, required): The maximum number of suggestions to return.

**Example Request**:

```bash
curl "http://localhost:3000/address/suggestions?query=123%20Example%20St&limit=5&provider=tomtom"
```

**Example Response**:

```json
{
  "results": [
    {
      "address": "123 Example St, Sydney, NSW 2000, Australia",
      "country": "Australia",
      "municipality": "Sydney",
      "latitude": -33.8688,
      "longitude": 151.2093
    }
  ]
}
```

---

## Deployment

For best practices and tips on deploying a NestJS application, refer to the [official documentation](https://docs.nestjs.com/deployment).

---

## Contributing

Feel free to open issues or submit pull requests if you have ideas for improving the project.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
