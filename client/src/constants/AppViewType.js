export const AppViewType = {
  expenseForm: 0,
  calendarView: 1,
  reportView: 2,
  menuView: 3
}

export const AppViewTypeToText = {
  [AppViewType.expenseForm]: '入力',
  [AppViewType.calendarView]: 'カレンダー',
  [AppViewType.reportView]: 'レポート',
  [AppViewType.menuView]: 'メニュー'
}

export const AppViewTypeIconName = {
  [AppViewType.expenseForm]: 'LuPencil',
  [AppViewType.calendarView]: 'LuCalendarDays',
  [AppViewType.reportView]: 'LuPieChart',
  [AppViewType.menuView]: 'LuMenu'
}
