/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */
/*'@typescript-eslint/no-empty-function': 'off'*/
import PromptSync from 'prompt-sync';
let prompt = (text: string) => {
  console.log(text);
  return '1';
};
if (typeof PromptSync === 'function') {
  prompt = PromptSync({ sigint: true });
}

export type mockType = {
  payment: string;
  selectedCoffee: string;
};

export enum CoffeeSizes {
  small = 'Small',
  medium = 'Medium',
  large = 'Large',
}

export const coffeeDetails = {
  LargeWithMilk: {
    price: 10,
    id: 1,
  },
  MediumWithMilk: {
    price: 8,
    id: 2,
  },
  SmallWithMilk: {
    price: 6,
    id: 3,
  },
  Large: {
    price: 8,
    id: 4,
  },
  Medium: {
    price: 6,
    id: 5,
  },
  Small: {
    price: 4,
    id: 6,
  },
};

export class Coffee {
  public milk: boolean;
  public size: CoffeeSizes;
  public price: number;
  public distributionNumber: number;
  constructor(build: CoffeeBuilder) {
    this.milk = build.milk;
    this.size = build.size;
    this.price = build.price;
    this.distributionNumber = build.distributionNumber;
  }

  getDistributionNumber(): number {
    return this.distributionNumber;
  }

  getDescription(): string {
    return `${this.size} coffee ${this.milk && 'with milk'}`;
  }

  getCoffeePrice(): number {
    return this.price;
  }

  static get Builder() {
    return CoffeeBuilder;
  }
}

export class CoffeeBuilder {
  public milk: boolean = false;
  public size: CoffeeSizes = CoffeeSizes.small;
  public soldCoffee: Coffee[] = [];

  constructor(public price: number, public distributionNumber: number) {}
  build() {
    const coffee = new Coffee(this);
    this.soldCoffee.push(coffee);
    return coffee;
  }

  addMilk() {
    this.milk = true;
    return this;
  }

  setLargeSize() {
    this.size = CoffeeSizes.large;
    return this;
  }

  setMediumSize() {
    this.size = CoffeeSizes.medium;
    return this;
  }

  setSmallSize() {
    this.size = CoffeeSizes.small;
    return this;
  }
}

export const coffeeTypes = [
  new Coffee.Builder(
    coffeeDetails.LargeWithMilk.price,
    coffeeDetails.LargeWithMilk.id,
  )
    .addMilk()
    .setLargeSize(),
  new Coffee.Builder(
    coffeeDetails.MediumWithMilk.price,
    coffeeDetails.MediumWithMilk.id,
  )
    .addMilk()
    .setMediumSize(),
  new Coffee.Builder(
    coffeeDetails.SmallWithMilk.price,
    coffeeDetails.SmallWithMilk.id,
  )
    .addMilk()
    .setSmallSize(),
  new Coffee.Builder(
    coffeeDetails.Large.price,
    coffeeDetails.Large.id,
  ).setLargeSize(),
  new Coffee.Builder(
    coffeeDetails.Medium.price,
    coffeeDetails.Medium.id,
  ).setMediumSize(),
  new Coffee.Builder(
    coffeeDetails.Small.price,
    coffeeDetails.Small.id,
  ).setSmallSize(),
];

export class CoffeeFactory {
  constructor(public coffeeTypes: CoffeeBuilder[]) {}

  public getCoffeeById(id: number): Coffee {
    const coffee = coffeeTypes.find((c) => c.distributionNumber === id);
    return coffee.build();
  }

  public displaySoldCoffeeById(id: number): Coffee[] {
    const coffee = coffeeTypes.find((c) => c.distributionNumber === id);
    return coffee.soldCoffee;
  }

  public isNumberACoffeeType(distributionNumber: string): boolean {
    return !!coffeeTypes.find(
      (c) => c.distributionNumber === parseInt(distributionNumber),
    );
  }
}

export class CoffeeDistributor {
  private static instance = new CoffeeDistributor();
  private coffeeFactory = new CoffeeFactory(coffeeTypes);
  public isOn = false;
  private constructor() {}

  public turnOn(mock?: mockType): void {
    this.isOn = true;
    this.mainLoop(mock);
  }
  public turnOff(): void {
    this.isOn = false;
  }

  private mainLoop(mock?: mockType): void {
    while (this.isOn) {
      this.writeAllOptions();
      const selectedNumber = mock
        ? mock.selectedCoffee
        : prompt('Select number from list above: ');
      if (selectedNumber === '0') {
        console.log('Shutdown coffee distributor');
        this.turnOff();
        return;
      }
      const selectedCoffeeBuilder = coffeeTypes.find(
        (c) => c.distributionNumber === parseInt(selectedNumber),
      );
      if (!selectedCoffeeBuilder) {
        console.log('Select correct number from list above');
        return;
      }

      const payment = mock
        ? mock.payment
        : prompt(`Pleas settle a payment (${selectedCoffeeBuilder.price}zł): `);

      if (parseInt(payment) !== selectedCoffeeBuilder.price) {
        console.log('Invalid payment value');
        return;
      }
      console.log('Payment accepted');
      const preparedCoffee = this.coffeeFactory.getCoffeeById(
        parseInt(selectedNumber),
      );
      console.log(`Preparing coffee: ${preparedCoffee.getDescription()}`);
      console.log(`${preparedCoffee.getDescription()} is ready`);
      mock && this.turnOff();
    }
  }

  private writeAllOptions(): void {
    console.log('All coffee options:');
    coffeeTypes.forEach((c) => {
      console.log(
        `${c.distributionNumber}. ${c.size} coffee ${c.milk && 'with milk'} - ${
          c.price
        }zł`,
      );
    });
    console.log('Enter 0 to quit');
  }

  static getInstance(): CoffeeDistributor {
    return this.instance;
  }
}

CoffeeDistributor.getInstance().turnOn();
