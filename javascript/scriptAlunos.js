// Adicione o seguinte código no início do seu script
document.addEventListener("DOMContentLoaded", function () {
    // filterTable(); // Para carregar a tabela inicialmente

    // Função para filtrar a tabela com base no nome e na data
    window.filterTable = function () {
        var searchInput = document.getElementById("pesquisaNome").value.toLowerCase();
        var dateInput = document.getElementById("pesquisaData").value;

        var table = document.getElementById("alunosTable");
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

    let api = "https://script.google.com/macros/s/AKfycbyJBVAzbnyhEENbmvVoHA7GSrc4A6sFJnvz48sC5q0Dpq7CEPgdmpoHXLN1LKfRscbJnQ/exec";
    let form = document.querySelector("form");
    let add = document.querySelector(".add");
    let update = document.querySelector(".update");
    let tbody = document.querySelector("tbody");


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
                    <td class="email">${each[8]}</td>
                    <td class="telefone">${each[9]}</td>
                    <td class="foto"><a href="${each[11]}" target="_blank">${each[11]}</a></td>
                    <td class="plano">${each[13]}</td>
                    <td class="valor">${each[14]}</td>
                    <td class="status">${each[15]}</td>
                    <td class="dataPagamento">${formatarData(each[16], 'dd MMM yyyy')}</td>
                    <td class="action-cell">
                        <button class="edit" onclick="updateCell(this, ${each[13]})"><i class="fas fa-edit"></i>
                    </td>
                </tr>
                `
            });
            tbody.innerHTML = trtd.join("");
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }


    }

    readData();
});

