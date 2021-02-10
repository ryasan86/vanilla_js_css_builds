// ==============================
// ABSTRACT
// 1. Create template with data structure of a home
// a. Foundations
// b. Wall
// c. Roof
// 2. Add method to build homes
// ==============================

abstract class Home {
    public abstract foundations(): string;
    public abstract walls(): string;
    public abstract roof(): string;

    public build(): string {
        return `
            Construction of a new home:
                1. Building ${this.foundations()}
                2. Building ${this.walls()}
                3. Building ${this.roof()}
        `;
    }
}

// ==============================
// CONCRETE - Building, House
// 1. Create concretes with assigned properties
// a. Assigned properties come from the individual concrete's data structure
// b. All concretes share the same abstract method "build" to create homes
// ==============================

class House extends Home {
    public foundations(): string {
        return 'House foundations';
    }

    public walls(): string {
        return 'House walls';
    }

    public roof(): string {
        return 'House roof';
    }
}

class Apartment extends Home {
    public foundations(): string {
        return 'Apartment foundations';
    }

    public walls(): string {
        return 'Apartment walls';
    }

    public roof(): string {
        return 'Apartment roof';
    }
}

// ==============================
// EXERCISE
// ==============================

// prettier-ignore
const house = new House(), 
      apartment = new Apartment();

console.log(house.build());
console.log(apartment.build());