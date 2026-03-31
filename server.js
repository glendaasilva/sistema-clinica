const SUPABASE_URL = 'https://ynvdpsykbaetzdswexlg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InludmRwc3lrYmFldHpkc3dleGxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NzQwMDcsImV4cCI6MjA5MDU1MDAwN30.Zc6F-2IwqYpqlpodwXX_sK4MmmTj9NA30WxWBE9MA3Y';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pacienteForm');
    
    // 1. CHAMA A FUNÇÃO PARA LISTAR ASSIM QUE ABRIR A PÁGINA
    buscarPacientes();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nomeValue = document.getElementById('nome').value;
        const emailValue = document.getElementById('email').value;
        const telefoneValue = document.getElementById('telefone').value;

        const { error } = await _supabase
            .from('pacientes') 
            .insert([{ nome: nomeValue, email: emailValue, telefone: telefoneValue }]);

        if (error) {
            alert('Erro ao cadastrar: ' + error.message);
        } else {
            alert('Paciente cadastrado com sucesso!');
            form.reset();
            buscarPacientes(); // 2. ATUALIZA A TABELA APÓS CADASTRAR
        }
    });
});

// FUNÇÃO PARA BUSCAR DADOS DO SUPABASE
async function buscarPacientes() {
    const { data, error } = await _supabase
        .from('pacientes')
        .select('*');

    if (error) {
        console.error('Erro ao buscar:', error.message);
    } else {
        const corpoTabela = document.getElementById('corpoTabela');
        corpoTabela.innerHTML = ''; // Limpa a tabela antes de preencher

        data.forEach(paciente => {
            corpoTabela.innerHTML += `
                <tr>
                    <td>${paciente.nome}</td>
                    <td>${paciente.email}</td>
                    <td>${paciente.telefone}</td>
                </tr>
            `;
        });
    }
}