export type Override<T, U> = Omit<T, keyof U> & U
