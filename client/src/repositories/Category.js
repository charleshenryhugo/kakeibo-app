class Category {
  constructor ({ id = null, text, iconColor, iconName, order, expenseType }) {
    this.id = id
    this.text = text
    this.iconColor = iconColor
    this.iconName = iconName
    this.order = order
    this.expenseType = expenseType
  }

  async commit () {
    const response = await fetch('/api/upsertCategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: this.text,
        iconColor: this.iconColor,
        iconName: this.iconName,
        order: this.order,
        expenseType: this.expenseType,
        ...(this.id ? { id: this.id } : {})
      })
    })

    return await response.json()
  }

  async delete () {
    const response = await fetch('/api/deleteCategory', {
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

export default Category
