class Expense {
  /**
   * Creates a new expense.
   *
   * @param {Object} expense - The expense object.
   * @param {Date} expense.inputDate - The date the expense was input.
   * @param {Date} expense.lastUpdated - The date the expense was last updated.
   * @param {number} expense.year - The year of the expense.
   * @param {number} expense.month - The month of the expense.
   * @param {number} expense.day - The day of the expense.
   * @param {string} expense.title - The title of the expense.
   * @param {string} expense.description - A description of the expense.
   * @param {number} expense.amount - The amount of the expense.
   * @param {number} expense.categoryId - The ID of the category the expense belongs to.
   * @param {string} expense.type - The type of the expense.
   * @param {number} [expense.id=null] - The ID of the expense.
   */
  constructor ({ inputDate, lastUpdated, year, month, day, title, description, amount, categoryId, type, id = null }) {
    this.inputDate = inputDate
    this.lastUpdated = lastUpdated
    this.year = year
    this.month = month
    this.day = day
    this.title = title
    this.description = description
    this.amount = amount
    this.categoryId = categoryId
    this.type = type
    this.id = id
  }

  async commit () {
    const response = await fetch('/api/upsertExpense', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputDate: this.inputDate,
        lastUpdated: this.lastUpdated,
        year: this.year,
        month: this.month,
        day: this.day,
        title: this.title,
        description: this.description,
        amount: Number(this.amount),
        categoryId: Number(this.categoryId),
        type: this.type,
        ...(this.id ? { id: this.id } : {})
      })
    })

    return await response.json()
  }

  async delete () {
    const response = await fetch('/api/deleteExpense', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...this
      })
    })

    return await response.json()
  }
}

// {
// "year": 2024,
// "month": 1,
// "day": 19,
// "inputDate": "2024-01-19",
// "lastUpdated": "2024-01-25",
// "amount": 1000,
// "categoryId": 10,
// "title": "スーパー",
// "description": "野菜果物買う",
// "type": 0,
// }

export default Expense
