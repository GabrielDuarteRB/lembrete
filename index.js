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

const adicionaLembrete = (descricaoRecebida, mesRecebida, anoRecebida) => {
    const descricao = descricaoRecebida ? descricaoRecebida : prompt(`Descrição do lembrete: `)
    if(!descricao.length){
        alert("Adicione uma descrição válida")
        return adicionaLembrete()
    }

    const mes = mesRecebida ? mesRecebida : prompt(`Mês do lembrete: `)
    if(isNaN(mes) || mes < 0 || mes > 32){
        alert("Adicione um mês válido!")
        return adicionaLembrete(descricao)
    }

    const ano = anoRecebida ? anoRecebida : prompt(`Ano do lembrete: `)
    if(isNaN(ano)){
        alert("Adicione um ano válido!")
        return adicionaLembrete(descricao, mes)
    }

    let tempo = prompt(`hora do lembrete: `)   
    tempo = tempo.split(':') 

    let ehHoraValida = isNaN(tempo[0]) || tempo[0] < 0 || tempo[0] > 24
    let ehMinutoValido = (isNaN(tempo[1]) && tempo[1] !== undefined ) || tempo[1] < 0 || tempo[1] > 60

    if(ehHoraValida || ehMinutoValido){
        alert("Adicione um hora válida!")
        return adicionaLembrete(descricao, mes, ano)
    }

    const hora = tempo[0]
    const minuto = tempo[1] !== undefined ? tempo[1] : '00'

    const novaData = new Date(ano, mes, '', hora, minuto)
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
        hora.textContent = `${corrigirHorario(lembrete.data.getHours())}:${corrigirHorario(lembrete.data.getMinutes())}`
        const ul = document.getElementById('ulPai')
        li.append(descricao, hora)
        ul.appendChild(li)
    })
}

const corrigirHorario = (horario) =>{
    if(horario < 10){
        return `0${horario}`
    }
    return horario
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