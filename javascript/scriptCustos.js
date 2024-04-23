    let api = "https://script.google.com/macros/s/AKfycbwZoNpEJcWz0P58SyEMAcytW4MAgsHTllqxYVSsGZdSP0LJ6k-YIj_xRPMsUz_4y2s/exec";
    let form = document.querySelector("form");
    let add = document.querySelector(".add");
    let update = document.querySelector(".update");
    let tbody = document.querySelector("tbody")


    async function adicionarCusto() {

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

    function filtrarPorIntervalo() {
        var dataInicial = document.getElementById("filtroDataInicial").value;
        var dataFinal = document.getElementById("filtroDataFinal").value;

        var table = $('#custosTable').DataTable();

        // Formatando as datas para o formato esperado pelo DataTables (AAAA-MM-DD)
        var dataInicialFormatada = dataInicial.split("-").reverse().join("-");
        var dataFinalFormatada = dataFinal.split("-").reverse().join("-");

        // Construindo o filtro com o intervalo de datas
        var filtro = dataInicialFormatada + " to " + dataFinalFormatada;

        table.columns(5).search(filtro, true, false).draw();
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
                    <td class="item">${each[0]}</td>
                    <td class="descricao">${each[1]}</td>
                    <td class="tipo">${each[2]}</td>
                    <td class="valor">${each[3]}</td>
                    <td class="dataVencimento">${formatarData(each[4], 'dd MMM yyyy')}</td>
                    <td class="dataPagamento">${formatarData(each[5], 'dd MMM yyyy')}</td>
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


    }

    readData();
