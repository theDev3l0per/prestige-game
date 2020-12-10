function format(x){
  if (new Decimal(x).gte("1e9")) {
    let loggers = new Decimal(x).log(10)
    ping = new Decimal(loggers.floor())
    pingery = new Decimal(loggers.sub(ping))
    e = Decimal.pow(10,pingery).times(1000).round().div(1000)
    return e.toString() + "e" + ping.toString()
} else return x.toString()
}