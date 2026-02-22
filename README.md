# 🍰 Velvet Slice - Aplicativo Mobile (Cliente)

Bem-vindos ao repositório do aplicativo mobile da **Velvet Slice**! 
Este é o aplicativo voltado para o **cliente final**, onde é possível visualizar o catálogo de bolos, adicionar itens ao carrinho, realizar pedidos e acompanhar o rastreio das entregas.

Este projeto foi construído utilizando **React Native** e **Expo**.

---

## 🛠️ O que precisa ser instalado (Pré-requisitos)

Para rodar e editar este projeto no seu computador, você precisará ter instalado:

1. **[Node.js](https://nodejs.org/)** (Baixe a versão LTS - Recomendada para a maioria dos usuários).
2. **[Git](https://git-scm.com/)** (Para versionamento e trabalho em grupo).
3. **[VS Code](https://code.visualstudio.com/)** (O nosso editor de código).
4. **App Expo Go** (Baixe na Play Store ou App Store no seu celular para testar o app ao vivo).

---

## 🚀 Como rodar o projeto localmente

Siga os passos abaixo na primeira vez que for rodar o projeto no seu computador:

1. Clone este repositório para a sua máquina:
   ```bash
   git clone URL_DO_NOSSO_REPOSITORIO_AQUI
Entre na pasta do projeto:

Bash
cd velvet-slice
Instale todas as dependências (Bibliotecas, fontes, ícones):

Bash
npm install
Inicie o servidor do Expo (limpando o cache por segurança):

Bash
npx expo start -c
Abra o app Expo Go no seu celular, escaneie o QR Code que apareceu no terminal e pronto!

🛡️ Como fazer edições seguras e subir para o GitHub (Trabalho em Grupo)
Trabalhar em grupo exige organização para que o código de uma pessoa não apague o da outra. A REGRA DE OURO É: NUNCA faça commits direto na branch main (principal).

Siga este fluxo (Git Flow) sempre que for criar algo novo:

1. Atualize o seu código antes de começar:
Sempre puxe as atualizações mais recentes que os seus colegas fizeram.

Bash
git checkout main
git pull origin main
2. Crie uma nova "Branch" (ramificação) para a sua tarefa:
Dê um nome que explique o que você vai fazer.

Bash
git checkout -b feature/nome-da-sua-tarefa
# Exemplo: git checkout -b feature/tela-de-pagamento
3. Faça as suas alterações no VS Code e teste no Expo Go.

4. Salve e envie as suas alterações:

Bash
git add .
git commit -m "Explique o que você fez. Ex: Adiciona integração com PIX"
git push origin feature/nome-da-sua-tarefa
5. Crie um Pull Request (PR) no GitHub:
Vá até a página do repositório no GitHub. Vai aparecer um botão verde dizendo "Compare & pull request". Clique nele. Peça para outro membro do grupo revisar o seu código. Se estiver tudo OK, vocês clicam em Merge para juntar o seu código com a branch main.

🔮 O Futuro: Integração com o App Admin e Banco de Dados
Atualmente, o aplicativo funciona como uma Vitrine Interativa Frontend. Os dados dos bolos e do histórico de pedidos estão salvos localmente em variáveis (produtosIniciais e historicoPedidosMock).

No futuro, vamos criar um Banco de Dados (ex: Firebase, Supabase ou API Node.js) e um App Admin. Veja como a mágica vai acontecer:

1. O Papel do Banco de Dados (A Nuvem)
O banco de dados será a nossa fonte da verdade. Ele guardará 3 tabelas principais:

Usuários: Dados de login, endereços e telefones.

Produtos: Nome, preço, foto e descrição dos bolos.

Pedidos: Quem comprou, o que comprou, total pago e o status do rastreio.

2. O Papel do App Admin
O administrador (dono da confeitaria) usará um app separado ou painel web para:

Adicionar/Editar/Excluir Produtos: Quando o Admin salvar um bolo novo, o app Admin envia esses dados para o Banco de Dados.

Gerenciar Pedidos: O Admin verá os pedidos novos. Quando ele clicar em "Mudar status para A Caminho", o app Admin atualiza o Banco de Dados.

3. Como este App (Cliente) vai mudar
Quando o Banco de Dados estiver pronto, a nossa mudança aqui será muito pequena e fácil. Em vez de usarmos os dados fixos que escrevemos no código, usaremos requisições (fetch ou bibliotecas do Firebase) dentro de um useEffect no momento em que o app abrir.

Exemplo prático de como o código vai mudar:

Como é hoje (Dados Fixos):

JavaScript
const [produtos, setProdutos] = useState(produtosIniciais);
Como será amanhã (Conectado ao Banco de Dados):

JavaScript
const [produtos, setProdutos] = useState([]);

useEffect(() => {
  // Função que vai lá no Firebase buscar a lista real de bolos cadastrados pelo Admin
  async function carregarBolos() {
    const bolosDoBanco = await fetch('URL_DA_NOSSA_API/produtos');
    setProdutos(bolosDoBanco); // A vitrine do cliente atualiza na hora!
  }
  
  carregarBolos();
}, []);
O mesmo servirá para o Rastreio de Pedidos: O nosso app cliente vai "escutar" o banco de dados. Quando o Admin mudar o status lá no app dele, o banco de dados avisa este app, e a barrinha de progresso muda de "Preparando" para "A Caminho" automaticamente na tela do cliente.