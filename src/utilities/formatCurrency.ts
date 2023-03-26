const CurrencyFormatter = new Intl.NumberFormat(undefined , {
    currency: "USD",
    style: "currency",
})

const formatCurrency = (number : number) => {
  return (
    CurrencyFormatter.format(number)
  )
}

export default formatCurrency