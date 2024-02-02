document.addEventListener("DOMContentLoaded", function () {

    // Função para filtrar a tabela com base no nome e na data
    window.filterTable = function () {
        var searchInput = document.getElementById("pesquisaNome").value.toLowerCase();
        var dateInput = document.getElementById("pesquisaData").value;

        var table = document.getElementById("custosTable");
        var rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

        for (var i = 0; i < rows.length; i++) {
            var rowData = rows[i].getElementsByTagName("td");
            var nome = rowData[1].textContent.toLowerCase();
            var dataPagamento = rowData[8].textContent;

            // Verificar se o nome contém o texto de pesquisa
            // e se a data de pagamento corresponde à data filtrada
            if (nome.includes(searchInput) && (dateInput === "" || moment(dataPagamento).isSame(dateInput, 'day'))) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    };

    let api = "https://script.google.com/macros/s/AKfycbwC77SRJuWx70oaAZk1dc52T_J0eWDIvMlfnRMd0zXWE25_u-hcrVwKrq9gnViBxt_a/exec";
    let form = document.querySelector("form");
    let add = document.querySelector(".add");
    let update = document.querySelector(".update");
    let tbody = document.querySelector("tbody")


    async function adicionar() {

        add.textContent = "Adicionando... ";
        let objeto = {
            descricao: form[0].value,
            tipo: form[1].value,
            valor: form[2].value,
            dataPagamento: form[3].value,
            dataVencimento: form[4].value
        };

        try {
            const response = await fetch(api, {
                method: "POST",
                body: JSON.stringify(objeto)
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

    // function adicionar(){
    //     add.textContent ="Adicionando..."
    //     let objeto = { 
    //         descricao: form[0].value,
    //         tipo: form[1].value,
    //         valor: form[2].value,
    //         dataPagamento: form[3].value,
    //         dataVencimento: form[4].value
    //     };

    // fetch(api,{
    //     method: "POST",
    //     body: JSON.stringify(obj)
    // })

    //     .then(res => res.text())
    //     .then(data =>{
    //         alert(data)
    //         add.textContent= "Adicionar"
    //         form.reset();
    //     });
    // }

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
                    <td class="item">${each[0]}</td>
                    <td class="descricao">${each[2]}</td>
                    <td class="tipo">${each[3]}</td>
                    <td class="valor">${each[3]}</td>
                    <td class="dataVencimento">${formatarData(each[2], 'dd MMM yyyy')}</td>
                    <td class="dataPagamento">${formatarData(each[2], 'dd MMM yyyy')}</td>
                    <td class="action-cell">
                        <button class="edit" onclick="updateCell(this, ${each[28]})"><i class="fas fa-edit"></i></button>
                        <button class="delete" onclick="deleteData(${each[28]})"><i class="fas fa-trash-alt"></i></button>
                    </td>
                </tr>
                `
            });
            tbody.innerHTML = trtd.join("");
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }

        $(document).ready(function () {
            $('#custosTable').DataTable({
                "order": [[0, "desc"]] // Isso classificará a primeira coluna (índice 0) em ordem decrescente.
            });
        });
    }

    readData();
});