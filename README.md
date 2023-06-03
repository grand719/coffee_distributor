# Coffee distributor

Projekt "Automat do wydawania kawy" ma na celu zaimplementowanie systemu, który umożliwia użytkownikom wybieranie i otrzymywanie kawy w sposób automatyczny. W projekcie zastosowane zostały różne wzorce projektowe, aby zapewnić elastyczność, modularność i łatwość rozbudowy systemu

Głównym celem projektu było zaimplementowanie automatu do wydawania kawy przy pomocy wzorców projektowych

## Wprowadzenie

W tym projekcie zaimplementowano prosty system dystrybucji kawy. System umożliwia wybór kawy spośród dostępnych opcji, akceptację płatności i przygotowanie kawy. Użytkownik może wybierać spośród różnych rozmiarów kawy i opcjonalnego dodatku mleka.

## Struktura projektu

- `main.ts` zawiera:
  - Zawiera definicje typów używanych w projekcie.
  - Klasa Coffee i CoffeeBuilder, które reprezentują obiekty kawy i umożliwiają tworzenie różnych wariantów kawy.
  - Klasa CoffeeFactory, która zarządza dostępnymi typami kawy i umożliwia pobieranie kawy na podstawie identyfikatora.
  - Klasa CoffeeDistributor, która jest głównym kontrolerem systemu, obsługującym logikę wyboru kawy, akceptacji płatności i przygotowywania kawy.
- `main.test.ts` zawiera:
  - Testy jednostkowe
  - Testy Akceptacyjne
  - Testy integracyjne

## Scenariusze testowe

### Testy jednostkowe dla klasy `CoffeeBuilder`:

1. **Should create coffee builder**: Sprawdza, czy obiekt `coffee` jest instancją `CoffeeBuilder`.
2. **Should be without milk**: Sprawdza, czy kawa zbudowana z `coffee` nie ma mleka.
3. **Should add milk**: Sprawdza, czy po dodaniu mleka do `coffee`, kawa ma mleko.
4. **Should set size to Large**: Sprawdza, czy rozmiar kawy w `coffee` jest poprawnie ustawiany na `'large'`.
5. **Price and distribution number should be equal for large coffee definition**: Sprawdza, czy cena i numer dystrybucji kawy w `coffee` są poprawne dla kawy o rozmiarze `'large'`.
6. **Should build new coffee**: Sprawdza, czy obiekt `soldCoffee` jest instancją `Coffee`.
7. **Should add sold coffee to sold coffee array**: Sprawdza, czy każdy element w tablicy `soldCoffee` w `coffee` jest instancją `Coffee`.

### Testy jednostkowe dla klasy `CoffeeFactory`:

1. **Should create coffee factory**: Sprawdza, czy obiekt `coffeeFactory` jest instancją `CoffeeFactory`.
2. **Should return proper coffee**: Sprawdza, czy metoda `getCoffeeById` klasy `CoffeeFactory` zwraca właściwą kawę dla każdego identyfikatora.
3. **Should return proper sold coffee array**: Sprawdza, czy metoda `displaySoldCoffeeById` klasy `CoffeeFactory` zwraca poprawną tablicę sprzedanej kawy dla każdego identyfikatora.
4. **Should validate if provided coffee id is in coffeeType array**: Sprawdza, czy metoda `isNumberACoffeeType` klasy `CoffeeFactory` poprawnie waliduje identyfikatory kawy.

### Testy akceptacyjne klasy `CoffeeDistributor`:

1. **should display all coffee options**: Sprawdza, czy są wyświetlane wszystkie opcje kawy.
2. **should accept a valid payment and prepare the selected coffee**: Sprawdza, czy przyjęto poprawną płatność i przygotowano wybraną kawę.
3. **should display an error message for an invalid payment**: Sprawdza, czy wyświetlany jest komunikat o błędnej płatności.
4. **should shutdown the coffee distributor when selecting 0**: Sprawdza, czy wyłączany jest dystrybutor kawy po wybraniu opcji "0".

### Testy integracyjne klasy `CoffeeDistributor`:

1. **should display all coffee options**: Sprawdza, czy są wyświetlane wszystkie opcje kawy przy uruchomieniu dystrybutora.
2. **should pay for large coffee**: Sprawdza, czy można zapłacić za dużą kawę.
3. **should display an error message for an invalid coffee selection**: Sprawdza, czy wyświetlany jest komunikat o nieprawidłowym wyborze kawy.
4. **should display an error message for an invalid payment**: Sprawdza, czy wyświetlany jest komunikat o błędnej płatności.

## Opis bibliotek

1. **JEST**: Jest to framework testowy dla języka JavaScript i TypeScript. Jest wykorzystywany do tworzenia testów jednostkowych, integracyjnych i akceptacyjnych. Umożliwia pisanie testów w czytelny sposób i zapewnia narzędzia do asercji i sprawdzania zachowań kodu.

2. **TypeScript**: TypeScript to język programowania, który jest rozszerzeniem dla JavaScript. Zapewnia statyczną typizację, co oznacza, że programista może zdefiniować typy danych dla zmiennych, argumentów funkcji itp. Dzięki temu można wykrywać błędy na etapie kompilacji i poprawiać jakość kodu.

3. **PromptSync**: PromptSync to biblioteka do synchronicznego wczytywania danych wejściowych od użytkownika w języku JavaScript i TypeScript. Umożliwia łatwe interakcje z użytkownikiem, np. poprzez pobieranie danych z konsoli i wyświetlanie komunikatów.

## Problemy

Jedynym problemem było użycie JEST'owej metody spy na funkcji Prompt która nie chciało do końca działać i czasami zwracała niepoprawne wyniki. Rozwiązaniem było dodanie dodatkowego parametru do metody turnOn i mainLoop który zawierał mock danych które powinien wprowadzić użytkownik

## Instrukcje

Aby uruchomić system dystrybucji kawy, wykonaj następujące kroki:

1. Zainstaluj zależności, jeśli są wymagane.
2. Uruchom komendę npm run start

```shell
  npm run start
  npm run clean
  npm run prebuild
  npm run build
  npm run build:watch
  npm run build:release
  npm run test
  npm run test:watch
```
