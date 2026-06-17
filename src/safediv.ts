type Success<T> = { tag: 'success'; value: T };
type Failure = { tag: 'failure'; value: string };
type Maybe<T> = Success<T> | Failure;

type SafeDiv = (n1: number, n2: number) => Maybe<number>;
export const safediv: SafeDiv = (n1, n2) =>
    n2 === 0 
        ? { tag: 'failure', value: 'Division by zero is not allowed' } 
        : { tag: 'success', value: n1 / n2 };
