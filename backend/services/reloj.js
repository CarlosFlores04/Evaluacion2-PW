class Reloj {
  constructor(segundosPorDefecto) {
    const segundos = Number(process.env.DURACION_SEGUNDOS) || segundosPorDefecto;
    this.duracion = segundos * 1000;
    this.reiniciar();
  }

  reiniciar() {
    this.inicio = null;
    this.fin = null;
  }

  arrancar() {
    if (!this.inicio) {
      this.inicio = Date.now();
    }
  }

  detener() {
    this.fin = Date.now();
  }

  transcurrido() {
    if (!this.inicio) {
      return 0;
    }
    return (this.fin || Date.now()) - this.inicio;
  }

  haTerminado() {
    return this.transcurrido() >= this.duracion;
  }

  segundosRestantes() {
    const restante = this.duracion - this.transcurrido();
    return Math.max(0, Math.ceil(restante / 1000));
  }
}

module.exports = Reloj;