document.addEventListener("DOMContentLoaded", function () { 

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

    let api = "https://script.google.com/macros/s/AKfycbxshvE36vZ1XnyjX4alsM6H8qePga2RjFMZbeTCkBToUjYAPyVDSLE6pyXBsHu_uRRP/exec";
    let form = document.querySelector("form");
    let add = document.querySelector(".add");
    let update = document.querySelector(".update");
    let tbody = document.querySelector("tbody")

    function adicionar(){
        add.textContent ="Adicionando..."
        let objeto = { 
            descricao: form[0].value,
            tipo: form[1].value,
            valor: form[2].value,
            dataPagamento: form[3].value,
            dataVencimento: form[4].value
        };

    fetch(api,{
        method: "POST",
        body: JSON.stringify(obj)
    })

        .then(res => res.text())
        .then(data =>{
            alert(data)
            add.textContent= "Adicionar"
            form.reset();
        });
    }

    
});