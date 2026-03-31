const { createClient } = require('@supabase/supabase-js');


const supabaseUrl = 'https://sua-url-aqui.supabase.co';
const supabaseKey = 'sua-chave-anon-aqui';
const supabase = createClient(supabaseUrl, supabaseKey);

async function salvarPaciente(nome, email, telefone) {
    const { data, error } = await supabase
        .from('pacientes') // Nome da tabela que você criou
        .insert([{ nome, email, telefone }]);

    if (error) {
        console.error('Erro ao salvar:', error.message);
    } else {
        console.log('Paciente salvo!', data);
    }
}