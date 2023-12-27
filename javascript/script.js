let api = "https://script.google.com/macros/s/AKfycbyJBVAzbnyhEENbmvVoHA7GSrc4A6sFJnvz48sC5q0Dpq7CEPgdmpoHXLN1LKfRscbJnQ/exec";
let form = document.querySelector("form");
let add = document.querySelector(".add");
let update = document.querySelector(".update");
let tbody = document.querySelector("tbody");




async function adicionar() {

    add.textContent = "Adicionando... ";
    let obj = {
        nome: form[0].value,
        dataNascimento: form[1].value,
        endereco: form[3].value,
        bairro: form[4].value,
        cep: form[2].value,
        cidade: form[5].value,
        uf: form[6].value,
        email: form[7].value,
        telefone: form[8].value,
        profissao: form[9].value,

    };

    try {
        const response = await fetch(api, {
            method: "POST",
            body: JSON.stringify(obj)
        });

        if (response.ok) {
            const data = await response.json();
            alert("Adicionado " + data);
            add.textContent = "Adicionar";
            form.reset();
            readData();
        } else {
            throw new Error('Erro na solicitação.');
        }
    } catch (error) {
        console.error("Erro ao enviar dados:", error);
        add.textContent = "Adicionar";

    }
    form.reset();
    readData();
}

async function deleteData(id) {
    try {
        const response = await fetch(api + `?del=true&id=${id}`);
        if (response.ok) {
            const data = await response.text();
            readData();
            alert(data);
        } else {
            throw new Error('Erro na solicitação.');
        }
    } catch (error) {
        console.error("Erro ao excluir dados:", error);
    }
    readData();
}

function formatarData(data, formato) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const dataFormatada = new Date(data).toLocaleString(undefined, options);

    // Se um formato personalizado for fornecido, use-o
    if (formato) {
        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        const dia = dataFormatada.split(',')[0].trim().split('/')[0];
        const mes = meses[parseInt(dataFormatada.split(',')[0].trim().split('/')[1]) - 1];
        const ano = dataFormatada.split(',')[0].trim().split('/')[2];
        const hora = dataFormatada.split(',')[1].trim();
        return formato
            .replace('dd', dia)
            .replace('MMM', mes)
            .replace('yyyy', ano)
            .replace('HH:mm:ss', hora);
    } else {
        console.log('Data Invalida');
    }

    return dataFormatada;
}


async function readData() {
    try {
        const res = await fetch(api);
        const data = await res.json();
        let dados = data.dados;
        let trtd = dados.map(each => {
            return `
                <tr>
                    <td class="id">${each[12]}</td>
                    <td class="nome">${each[1]}</td>
                    <td class="nascimento">${formatarData(each[2], 'dd MMM yyyy')}</td>
                    <td class="endereco">${each[3]}</td>
                    <td class="bairro">${each[4]}</td>
                    <td class="cep"> ${each[5]}</td>
                    <td class="cidade"> ${each[6]}</td>
                    <td class="email"> ${each[8]}</td>
                    <td class="telefone"> ${each[9]}</td>
                    <td class="foto"><a href="${each[11]}" target="_blank">${each[11]}</a></td>
                    <td class="action-cell">
                        <button class="edit" onclick="updateCell(this, ${each[13]})"><i class="fas fa-edit"></i></button>
                        <button class="delete" onclick="deleteData(${each[28]})"><i class="fas fa-trash-alt"></i></button>
                    </td>
                </tr>
                `
        });
        tbody.innerHTML = trtd.join("");
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}

async function updateCell(elm, id) {
    add.style.display = "none";
    update.style.display = "unset";

    let nome = elm.parentElement.querySelector(".nome").textContent;

    form[0].value = nome;
    form[1].value = categoria;
    form[2].value = valor.value;
    form[3].value = status;

    update.setAttribute("onclick", `updateData(${id})`);
}

async function updateData(id) {
    try {
        const response = await fetch(api + `?update=true&id=${id}&nome=${form[0].value}&categoria=${form[1].value}&valor=${form[2].value}&status=${document.getElementById("status").value}`);
        if (response.ok) {
            const data = await response.text();
            readData();
            alert(data);
        } else {
            throw new Error('Erro na solicitação.');
        }
    } catch (error) {
        console.error("Erro ao atualizar dados:", error);
    }
}

readData();

async function buscarEndereco(cep){

    var mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = "";

    try{
        const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();

        if(consultaCEP.erro){
            throw Error('Cep não existe');
        }
        console.log(consultaCEPConvertida);

        var cidade = document.getElementById('cidade');
        var endereco = document.getElementById('endereco');
        var bairro = document.getElementById('bairro');
        var uf = document.getElementById('estado');

        cidade.value = consultaCEPConvertida.localidade;
        endereco.value = consultaCEPConvertida.logradouro;
        bairro.value = consultaCEPConvertida.bairro;
        uf.value = consultaCEPConvertida.uf;

        console.log(consultaCEPConvertida);

        return consultaCEPConvertida;

    }catch(erro){
        mensagemErro.innerHTML += `<p>CEP Invalido! Tente Novamente</p>`;
        console.log(erro);
    }
}

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscarEndereco(cep.value));