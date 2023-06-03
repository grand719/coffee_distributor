import {
  Coffee,
  CoffeeSizes,
  coffeeDetails,
  CoffeeFactory,
  coffeeTypes,
  CoffeeBuilder,
  CoffeeDistributor,
  mockType,
} from '../src/main.js';

describe('Coffee builder', () => {
  const coffee = new Coffee.Builder(
    coffeeDetails.Large.price,
    coffeeDetails.Large.id,
  );

  it('Should create coffee builder', () => {
    expect(coffee).toBeInstanceOf(CoffeeBuilder);
  });

  it('Should be without milk', () => {
    expect(coffee.build().milk).toBeFalsy();
  });

  it('Should add milk', () => {
    coffee.addMilk();
    expect(coffee.build().milk).toBeTruthy();
  });

  it('Should set size to Large', () => {
    expect(coffee.size).toBe(CoffeeSizes.small);
    coffee.setLargeSize();
    expect(coffee.size).toBe(CoffeeSizes.large);
  });

  it('Price and distribution number should be equal for large coffee definition', () => {
    expect(coffee.price).toBe(coffeeDetails.Large.price);
    expect(coffee.distributionNumber).toBe(coffeeDetails.Large.id);
  });

  const soldCoffee = coffee.build();
  it('Should build new coffee', () => {
    expect(soldCoffee).toBeInstanceOf(Coffee);
  });

  it('Should add sold coffee to sold coffee array', () => {
    coffee.soldCoffee.forEach((c) => expect(c).toBeInstanceOf(Coffee));
  });
});

describe('Coffee factory', () => {
  const coffeeFactory = new CoffeeFactory(coffeeTypes);

  it('Should create coffee factory', () => {
    expect(coffeeFactory).toBeInstanceOf(CoffeeFactory);
  });

  it('Should return proper coffee', () => {
    coffeeTypes.forEach((coffeeType) => {
      const coffee = coffeeFactory.getCoffeeById(coffeeType.distributionNumber);
      expect(coffee).toBeInstanceOf(Coffee);
      expect(coffee.milk).toBe(coffeeType.milk);
      expect(coffee.price).toBe(coffeeType.price);
      expect(coffee.size).toBe(coffeeType.size);
      expect(coffee.getDescription()).toBe(
        `${coffeeType.size} coffee ${coffeeType.milk && 'with milk'}`,
      );
    });
  });

  it('Should return proper sold coffee array', () => {
    coffeeTypes.forEach((type) => {
      coffeeFactory.getCoffeeById(type.distributionNumber);
    });

    coffeeTypes.forEach((type) => {
      const array = coffeeFactory.displaySoldCoffeeById(
        type.distributionNumber,
      );
      expect(array.length).toBeGreaterThanOrEqual(1);
      array.forEach((coffee) => {
        expect(coffee.distributionNumber).toBe(type.distributionNumber);
      });
    });
  });

  it('Should validate if provided coffee id is in coffeeType array', () => {
    coffeeTypes.forEach((type) => {
      expect(
        coffeeFactory.isNumberACoffeeType(`${type.distributionNumber}`),
      ).toBeTruthy();
    });

    for (let i = 10; i <= 20; i++) {
      expect(coffeeFactory.isNumberACoffeeType(`${i}`)).toBeFalsy();
    }
  });
});

describe('CoffeeDistributor (Acceptation tests)', () => {
  let coffeeDistributor: CoffeeDistributor;

  beforeEach(() => {
    coffeeDistributor = CoffeeDistributor.getInstance();
  });

  afterEach(() => {
    coffeeDistributor.turnOff();
  });

  it('should display all coffee options', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    coffeeDistributor.turnOn();
    expect(consoleLogSpy).toHaveBeenCalledWith('All coffee options:');
    expect(consoleLogSpy).toHaveBeenCalledTimes(11);
  });

  it('should accept a valid payment and prepare the selected coffee', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const coffeeMock: mockType = {
      selectedCoffee: '1',
      payment: '10',
    };
    coffeeDistributor.turnOn(coffeeMock);
    expect(consoleLogSpy).toHaveBeenCalledWith('Payment accepted');
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Preparing coffee: Large coffee with milk',
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Large coffee with milk is ready',
    );
  });

  it('should display an error message for an invalid payment', () => {
    const coffeeMock: mockType = {
      selectedCoffee: '1',
      payment: '9',
    };
    const consoleLogSpy = jest.spyOn(console, 'log');
    coffeeDistributor.turnOn(coffeeMock);
    expect(consoleLogSpy).toHaveBeenCalledWith('Invalid payment value');
  });

  it('should shutdown the coffee distributor when selecting 0', () => {
    const coffeeMock: mockType = {
      selectedCoffee: '0',
      payment: '10',
    };
    const consoleLogSpy = jest.spyOn(console, 'log');
    coffeeDistributor.turnOn(coffeeMock);
    expect(consoleLogSpy).toHaveBeenCalledWith('Shutdown coffee distributor');
  });
});

describe('CoffeeDistributor (Integration test)', () => {
  let coffeeDistributor: CoffeeDistributor;

  beforeEach(() => {
    coffeeDistributor = CoffeeDistributor.getInstance();
  });

  afterEach(() => {
    coffeeDistributor.turnOff();
  });

  it('should display all coffee options', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    coffeeDistributor.turnOn();
    expect(consoleSpy).toHaveBeenCalledWith('All coffee options:');
    coffeeTypes.forEach((coffee) => {
      expect(consoleSpy).toHaveBeenCalledWith(
        `${coffee.distributionNumber}. ${coffee.size} coffee ${
          coffee.milk && 'with milk'
        } - ${coffee.price}zł`,
      );
    });
    expect(consoleSpy).toHaveBeenCalledWith('Enter 0 to quit');
    consoleSpy.mockRestore();
  });
  it('should pay for large coffee', () => {
    const coffeeMock: mockType = {
      selectedCoffee: '1',
      payment: '10',
    };
    const consoleSpy = jest.spyOn(console, 'log');
    coffeeDistributor.turnOn(coffeeMock);
    expect(consoleSpy).toHaveBeenCalledWith('All coffee options:');
    coffeeTypes.forEach((coffee) => {
      expect(consoleSpy).toHaveBeenCalledWith(
        `${coffee.distributionNumber}. ${coffee.size} coffee ${
          coffee.milk && 'with milk'
        } - ${coffee.price}zł`,
      );
    });
    expect(consoleSpy).toHaveBeenCalledWith('Enter 0 to quit');
    expect(consoleSpy).toHaveBeenCalledWith('Payment accepted');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Preparing coffee: Large coffee with milk',
    );
    expect(consoleSpy).toHaveBeenCalledWith('Large coffee with milk is ready');

    consoleSpy.mockRestore();
  });

  it('should display an error message for an invalid coffee selection', () => {
    const coffeeMock: mockType = {
      selectedCoffee: '22',
      payment: '10',
    };
    const consoleSpy = jest.spyOn(console, 'log');

    coffeeDistributor.turnOn(coffeeMock);
    expect(consoleSpy).toHaveBeenCalledWith('All coffee options:');
    coffeeTypes.forEach((coffee) => {
      expect(consoleSpy).toHaveBeenCalledWith(
        `${coffee.distributionNumber}. ${coffee.size} coffee ${
          coffee.milk && 'with milk'
        } - ${coffee.price}zł`,
      );
    });
    expect(consoleSpy).toHaveBeenCalledWith('Enter 0 to quit');

    expect(consoleSpy).toHaveBeenCalledWith(
      'Select correct number from list above',
    );

    consoleSpy.mockRestore();
  });

  it('should display an error message for an invalid payment', () => {
    const coffeeMock: mockType = {
      selectedCoffee: '1',
      payment: '9',
    };
    const consoleSpy = jest.spyOn(console, 'log');

    coffeeDistributor.turnOn(coffeeMock);

    expect(consoleSpy).toHaveBeenCalledWith('Invalid payment value');

    consoleSpy.mockRestore();
  });
});
