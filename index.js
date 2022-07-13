let idSistema = 0;
const lembretes = []
let dataSistema = new Date();


class Lembretes {
    id = idSistema++
    descricao;
    data;

    constructor(descricaoParam, dataParam) {
        this.descricao = descricaoParam
        this.data = dataParam
    }
}

const adicionaLembrete = () => {
    const descricao = prompt(`Descrição do lembrete: `)
    const mes = prompt(`Mês do lembrete: `)
    const ano = prompt(`Ano do lembrete: `)
    const hora = prompt(`hora do lembrete: `)

    const novaData = new Date(ano, mes, '', hora)
    const lembrete = new Lembretes(descricao, novaData)
    lembretes.push(lembrete)
    atualizaLista(dataSistema)
}

const atualizaLista = (data) => {
    const filtrado = lembretes.filter(lembrete => {
        return (lembrete.data.getMonth() === data.getMonth() && lembrete.data.getFullYear() === data.getFullYear())
    })

    const ul = document.getElementById('ulPai')
    ul.textContent = ''

    filtrado.forEach(lembrete => {
        console.log(lembrete)
        const li = document.createElement('li')
        const descricao = document.createElement('p')
        const hora = document.createElement('p')
        descricao.textContent = lembrete.descricao
        hora.textContent = lembrete.data.getHours()
        const ul = document.getElementById('ulPai')
        li.append(descricao, hora)
        ul.appendChild(li)
    })
}

const mudaMes = (dataParam) => {
    let data = document.getElementById('mesSistema')
    let mes = dataParam.toLocaleString('default', { month: 'long' })
    mes = mes.substr(0, 3)
    mes = mes[0].toUpperCase() + mes[1] + mes[2]
    let str = `${mes}, ${dataParam.getFullYear()}`
    data.textContent = str
}

const incrementaData = () => {
    dataSistema.setMonth(dataSistema.getMonth() + 1)
    mudaMes(dataSistema)
    atualizaLista(dataSistema)
}

const decrementaData = () => {
    dataSistema.setMonth(dataSistema.getMonth() + -1)
    mudaMes(dataSistema)
    atualizaLista(dataSistema)
}

const programa = () => {
    mudaMes(dataSistema)
}

programa()