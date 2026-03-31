
const SUPABASE_URL = 'SUA_URL_DO_SUPABASE_AQUI';
const SUPABASE_KEY = 'SUA_CHAVE_ANON_AQUI';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById('pacienteForm');
const msg = document.getElementById('mensagem');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.innerText = "Enviando...";

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;

    const { data, error } = await _supabase
        .from('pacientes')
        .insert([{ nome, email, telefone }]);

    if (error) {
        msg.style.color = "red";
        msg.innerText = "Erro: " + error.message;
    } else {
        msg.style.color = "green";
        msg.innerText = "Paciente cadastrado com sucesso!";
        form.reset(); 
    }
});