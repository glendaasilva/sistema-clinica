// 1. Configurações de Conexão (Suas chaves estão corretas!)
const SUPABASE_URL = 'https://ynvdpsykbaetzdswexlg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InludmRwc3lrYmFldHpkc3dleGxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NzQwMDcsImV4cCI6MjA5MDU1MDAwN30.Zc6F-2IwqYpqlpodwXX_sK4MmmTj9NA30WxWBE9MA3Y'
// Inicializa o cliente do Supabase
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Garantir que o código só rode quando o formulário existir na tela
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pacienteForm');

    if (!form) {
        console.error("ERRO: O formulário 'pacienteForm' não foi encontrado no HTML!");
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        // Captura os valores no momento do clique
        const nomeValue = document.getElementById('nome').value;
        const emailValue = document.getElementById('email').value;
        const telefoneValue = document.getElementById('telefone').value;

        console.log("Tentando cadastrar:", { nomeValue, emailValue, telefoneValue });

        // 3. ENVIO PARA O BANCO
        const { data, error } = await _supabase
            .from('pacientes') 
            .insert([
                { 
                    nome: nomeValue, 
                    email: emailValue, 
                    telefone: telefoneValue 
                }
            ]);

        // 4. RESPOSTA AO USUÁRIO
        if (error) {
            console.error('Erro detalhado do Supabase:', error);
            alert('Erro ao cadastrar: ' + error.message);
        } else {
            console.log('Sucesso ao inserir:', data);
            alert('Paciente cadastrado com sucesso!');
            form.reset(); // Limpa os campos
        }
    });
});