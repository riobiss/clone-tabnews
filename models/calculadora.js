function somar(n1, n2) {
  if (typeof n1 !== "number") return "Erro"
  return n1 + n2;
}

exports.somar = somar;
