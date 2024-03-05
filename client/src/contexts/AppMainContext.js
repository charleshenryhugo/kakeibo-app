import { createContext } from 'react'

/*
{
  '2024-02': [
    {}, {}, {}
  ],
  '2024-03': [
    {}, {}, ...
  ],
}
*/
export const LatestExpenseListContext = createContext({})

export const CategoriesContext = createContext([])
