let api = "https://script.google.com/macros/s/AKfycbwvWE5KDQAS_q6BvOObwygNRPm9ng0MGW-k6BJEpJVd9jnYRdSSe8Kv3UT5vp58rSRsVw/exec";
let form = document.querySelector("form");
let add = document.querySelector(".add");
let update = document.querySelector(".update");
let tbody = document.querySelector("tbody");



async function addData() {
    add.textContent = "Adicionando... ";
    let obj = {
        nome: form[0].value,
        categoria: form[1].value,
        valor: form[2].value,
        status: document.getElementById("status").value
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
}

async function readData() {
    try {
        const res = await fetch(api);
        const data = await res.json();

        let dados = data.dados;
        let trtd = dados.map(each => {
            return `
                <tr>
                    <td class="id">${each[0]}</td>
                    <td class="nome">${each[1]}</td>
                    <td class="categoria">${each[2]}</td>
                    <td class="valor">${each[3]}</td>
                    <td class="status">${each[4]}</td>
                    <td class="action-cell">
                        <button class="edit" onclick="updateCell(this, ${each[0]})"><i class="fas fa-edit"></i></button>
                        <button class="delete" onclick="deleteData(${each[0]})"><i class="fas fa-trash-alt"></i></button>
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
    let categoria = elm.parentElement.querySelector(".categoria").textContent;
    let valor = elm.parentElement.querySelector(".valor").textContent;
    let status = elm.parentElement.querySelector(".status").textContent;

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

