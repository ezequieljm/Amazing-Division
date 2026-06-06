type RegularDiv = (n1: number, n2: number) => number;

// The developer didn't foresee the division by zero at all
export const div: RegularDiv = (n1, n2) => n1 / n2;