import { createContext } from 'react'

/*
{
  '2024-02': {
    '2024-02-01': [{}, {}, ...],
    '2024-02-02': [{}, {}, ...],
    '2024-02-03': [{}, {}, ...],
    ...,
    '2024-02-29': [{}, {}, ...],
  },
  '2024-03': {
    '2024-03-01': [{}, {}, ...],
    '2024-03-02': [{}, {}, ...],
    '2024-03-03': [{}, {}, ...],
    ...,
    '2024-03-31': [{}, {}, ...],
  },
}
*/
export const ExpenseContext = createContext({})
