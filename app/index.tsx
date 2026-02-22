import React, { useState, useRef, useEffect } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  Modal,
  Alert,
  LayoutChangeEvent
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { 
  useFonts, 
  Newsreader_400Regular, 
  Newsreader_400Regular_Italic, 
  Newsreader_700Bold, 
  Newsreader_700Bold_Italic 
} from '@expo-google-fonts/newsreader';

// --- IMAGENS LOCAIS ---
const imgHero = require('./assets/boloChocolate.png');
const imgCaseirinho = require('./assets/boloCaseirinho.png');
const imgMel = require('./assets/boloMelAmor.png');
const imgFrutado = require('./assets/boloFrutado.png');
const imgEncanto = require('./assets/boloEncanto.png');
const imgCaramelo = require('./assets/boloCaramelo.png');
const imgTropical = require('./assets/boloTropical.png');
const imgVeludo = require('./assets/boloVeludo.png');
const imgAbout = require('./assets/vitrine.png');
const imgOrder = require('./assets/carrinho.png');
const imgReviewWedding = require('./assets/reviewCasamento.png');
const imgReviewBirthday = require('./assets/reviewAniversario.png');
const imgReview15 = require('./assets/review15Anos.png');

// --- TIPAGENS (TYPESCRIPT) ---
interface Produto {
  id: string;
  nome: string;
  preco: number;
  imagem: any;
  descricao: string;
}

interface Pedido {
  id: string;
  data: string;
  itens: string[];
  total: number;
  status: string;
  etapa: number;
  tipo: string;
}

// 1. DADOS INICIAIS
const produtosIniciais: Produto[] = [
  { id: "caseirinho", nome: "Caseirinho", preco: 79.90, imagem: imgCaseirinho, descricao: "Bolo caseiro tradicional, perfeito para acompanhar um café da tarde." },
  { id: "mel-e-amor", nome: "Mel e Amor", preco: 82.90, imagem: imgMel, descricao: "Massa leve com toque de mel silvestre, recheado com creme suave." },
  { id: "frutado", nome: "Frutado", preco: 89.90, imagem: imgFrutado, descricao: "Bolo refrescante com pedaços de frutas vermelhas frescas." },
  { id: "encanto", nome: "Encanto", preco: 94.90, imagem: imgEncanto, descricao: "Nosso bolo mais charmoso. Massa de baunilha com recheio cremoso." },
  { id: "caramelo", nome: "Caramelo", preco: 85.90, imagem: imgCaramelo, descricao: "Explosão de sabor com camadas de caramelo salgado." },
  { id: "tropical", nome: "Tropical", preco: 85.90, imagem: imgTropical, descricao: "Sabor de verão com notas de maracujá e coco fresco." },
  { id: "veludo", nome: "Veludo", preco: 199.90, imagem: imgVeludo, descricao: "O clássico Red Velvet, para momentos inesquecíveis." },
];

const historicoPedidosMock: Pedido[] = [
  { id: '#1024', data: '10 Fev 2026', itens: ['Veludo'], total: 199.90, status: 'Entregue', etapa: 3, tipo: 'historico' },
  { id: '#1011', data: '02 Fev 2026', itens: ['Caseirinho', 'Mel e Amor'], total: 162.80, status: 'Cancelado', etapa: -1, tipo: 'historico' }
];

const { width } = Dimensions.get('window');

export default function App() {
  let [fontesCarregadas] = useFonts({
    Newsreader_400Regular,
    Newsreader_400Regular_Italic,
    Newsreader_700Bold,
    Newsreader_700Bold_Italic,
  });

  // --- ESTADOS GLOBAIS COM TIPAGEM ---
  const [produtos, setProdutos] = useState<Produto[]>(produtosIniciais);
  const [pedidos, setPedidos] = useState<Pedido[]>(historicoPedidosMock);
  
  const [telaAtual, setTelaAtual] = useState<string>('Inicio');
  const [menuAberto, setMenuAberto] = useState<boolean>(false);
  const [termoPesquisa, setTermoPesquisa] = useState<string>('');
  const [pesquisaAtiva, setPesquisaAtiva] = useState<boolean>(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [carrinho, setCarrinho] = useState<Produto[]>([]);
  
  // Autenticação e Navegação de Pedidos
  const [usuarioLogado, setUsuarioLogado] = useState<boolean>(false);
  const [metodoPagamento, setMetodoPagamento] = useState<string | null>(null);
  const [abaPedidos, setAbaPedidos] = useState<string>('em_andamento');

  // Dados do Usuário e Edição de Perfil
  const [nomeUsuario, setNomeUsuario] = useState<string>('Miguel Lima');
  const [emailUsuario, setEmailUsuario] = useState<string>('miguel@email.com');
  const [enderecoUsuario, setEnderecoUsuario] = useState<string>('Rua das Flores, 123 - São Paulo');
  const [telefoneUsuario, setTelefoneUsuario] = useState<string>('(11) 98765-4321');

  // Estados temporários do Perfil
  const [nomeEditado, setNomeEditado] = useState<string>(nomeUsuario);
  const [enderecoEditado, setEnderecoEditado] = useState<string>(enderecoUsuario);
  const [telefoneEditado, setTelefoneEditado] = useState<string>(telefoneUsuario);

  // Sistema de Scroll Seguro da Home
  const scrollViewRef = useRef<ScrollView>(null);
  const [posicoesSecoes, setPosicoesSecoes] = useState<Record<string, number>>({});
  const [secaoAlvo, setSecaoAlvo] = useState<string | null>(null);

  useEffect(() => {
    if (telaAtual === 'Inicio' && secaoAlvo) {
      const yPos = posicoesSecoes[secaoAlvo];
      
      if (yPos !== undefined) {
        const temporizador = setTimeout(() => {
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: yPos, animated: true });
          }
          setSecaoAlvo(null);
        }, 150);
        
        return () => clearTimeout(temporizador);
      }
    }
  }, [telaAtual, secaoAlvo, posicoesSecoes]);

  if (!fontesCarregadas) return <View style={{flex: 1, backgroundColor: '#fff6e9'}} />;

  // --- FUNÇÕES GERAIS ---
  const navegar = (tela: string, produto: Produto | null = null) => {
    setProdutoSelecionado(produto);
    setTelaAtual(tela);
    setMenuAberto(false);
  };

  const navegarParaSecao = (secao: string) => {
    setMenuAberto(false);
    if (telaAtual !== 'Inicio') {
      setTelaAtual('Inicio');
    }
    setSecaoAlvo(secao);
  };

  const registrarPosicaoSecao = (secao: string) => (evento: LayoutChangeEvent) => {
    const { y } = evento.nativeEvent.layout;
    setPosicoesSecoes(estadoAnterior => ({ ...estadoAnterior, [secao]: y }));
  };

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho([...carrinho, produto]);
    Alert.alert('Sucesso', `${produto.nome} adicionado ao carrinho!`);
  };

  const totalCarrinho = carrinho.reduce((total, item) => total + item.preco, 0);
  const produtosFiltrados = produtos.filter(p => p.nome.toLowerCase().includes(termoPesquisa.toLowerCase()));

  const finalizarPedido = () => {
    const novoPedido: Pedido = {
      id: `#${Math.floor(1000 + Math.random() * 9000)}`,
      data: new Date().toLocaleDateString('pt-BR'),
      itens: carrinho.map(item => item.nome),
      total: totalCarrinho,
      status: 'Recebido',
      etapa: 0, 
      tipo: 'em_andamento'
    };
    
    setPedidos([novoPedido, ...pedidos]);
    setCarrinho([]);
    Alert.alert('Sucesso', 'Seu pedido foi confirmado!');
    setAbaPedidos('em_andamento');
    navegar('Pedidos');
  };

  const salvarPerfil = () => {
    setNomeUsuario(nomeEditado);
    setEnderecoUsuario(enderecoEditado);
    setTelefoneUsuario(telefoneEditado);
    Alert.alert('Sucesso', 'Seus dados foram atualizados!');
  };

  // ================= RENDERIZADORES DE TELA =================
  const renderizarInicio = () => (
    <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
      <View onLayout={registrarPosicaoSecao('inicio')} style={estilos.secaoHero}>
        <Text style={estilos.tituloHero}>Sua confeitaria online</Text>
        <Text style={estilos.subtituloHero}>Delicadeza que derrete na boca</Text>
        <Image source={imgHero} style={estilos.imagemHero} resizeMode="cover" />
      </View>

      <View onLayout={registrarPosicaoSecao('produtos')} style={estilos.secaoCatalogo}>
        <Text style={estilos.tituloSecao}>Catálogo</Text>
        <View style={estilos.gradeProdutos}>
          {produtosFiltrados.map((produto) => (
            <TouchableOpacity key={produto.id} style={estilos.cartaoProduto} onPress={() => navegar('DetalhesProduto', produto)}>
              <View style={estilos.containerImagem}>
                <Image source={produto.imagem} style={estilos.imagemProduto} resizeMode="cover" />
              </View>
              <View style={estilos.infoProduto}>
                <Text style={estilos.nomeProduto}>{produto.nome}</Text>
                <View style={estilos.badgePreco}>
                  <Text style={estilos.precoProduto}>R$ {produto.preco.toFixed(2).replace('.', ',')}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View onLayout={registrarPosicaoSecao('como_pedir')} style={estilos.secaoGeral}>
        <Text style={estilos.tituloSecao}>Como pedir?</Text>
        <View style={estilos.cartaoFormulario}>
          <Text style={estilos.subtituloFormulario}>Informe seus dados para contato rápido!</Text>
          <TextInput style={estilos.inputBox} placeholder="Seu nome completo" />
          <TextInput style={estilos.inputBox} placeholder="(00) 00000-0000" keyboardType="phone-pad" />
          <TouchableOpacity style={estilos.botaoPrimario}><Text style={estilos.textoBotaoPrimario}>Enviar</Text></TouchableOpacity>
        </View>
      </View>

      <View onLayout={registrarPosicaoSecao('reviews')} style={estilos.secaoReviews}>
        <Text style={estilos.tituloSecao}>Avaliações</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={estilos.scrollReviews}>
          <View style={estilos.cartaoReview}>
            <Image source={imgReviewWedding} style={estilos.imagemReview} resizeMode="cover" />
            <Text style={estilos.tituloReview}>Casamento</Text>
            <Text style={estilos.textoReview}>"Queremos agradecer imensamente à Velvet Slice pelo trabalho incrível. Os bolos estavam lindos e deliciosos!"</Text>
          </View>
          <View style={estilos.cartaoReview}>
            <Image source={imgReview15} style={estilos.imagemReview} resizeMode="cover" />
            <Text style={estilos.tituloReview}>Festa de 15 anos</Text>
            <Text style={estilos.textoReview}>"Nosso agradecimento especial à Velvet Slice pelo excelente trabalho. Perfeito!"</Text>
          </View>
          <View style={estilos.cartaoReview}>
            <Image source={imgReviewBirthday} style={estilos.imagemReview} resizeMode="cover" />
            <Text style={estilos.tituloReview}>Aniversário</Text>
            <Text style={estilos.textoReview}>"Obrigado por tornar a festa inesquecível! O bolo estava maravilhoso!"</Text>
          </View>
        </ScrollView>
      </View>

      <View onLayout={registrarPosicaoSecao('sobre')} style={estilos.secaoSobre}>
        <Image source={imgAbout} style={estilos.imagemSobre} resizeMode="cover" />
        <Text style={[estilos.tituloSecao, { color: '#6c2f09', textAlign: 'left', marginTop: 20 }]}>Sobre nós...</Text>
        <Text style={estilos.textoSobre}>A Velvet Slice nasceu da paixão por confeitaria artesanal e do desejo de transformar momentos simples em memórias inesquecíveis.</Text>
        <Text style={[estilos.textoSobre, { fontWeight: 'bold' }]}>
          <Text style={{fontWeight: 'normal', color: '#b85026'}}>Nosso segredo: </Text>
          fazer tudo com propósito. Da escolha do recheio à decoração, tudo é feito pensando em você.
        </Text>
      </View>
    </ScrollView>
  );

  const renderizarRastreio = (etapaAtual: number) => {
    const etapas: { titulo: string, icone: keyof typeof Ionicons.glyphMap }[] = [
      { titulo: 'Recebido', icone: 'receipt-outline' },
      { titulo: 'Preparando', icone: 'restaurant-outline' },
      { titulo: 'A Caminho', icone: 'bicycle-outline' },
      { titulo: 'Entregue', icone: 'checkmark-circle-outline' }
    ];

    return (
      <View style={estilos.containerRastreio}>
        {etapas.map((etapa, index) => {
          const ativo = etapaAtual >= index;
          const ultimo = index === etapas.length - 1;
          return (
            <View key={index} style={estilos.etapaRastreioWrapper}>
              <View style={estilos.caixaIconeRastreio}>
                <Ionicons name={etapa.icone} size={20} color={ativo ? '#e6642f' : '#ccc'} />
              </View>
              <Text style={[estilos.textoRastreio, ativo && estilos.textoRastreioAtivo]}>{etapa.titulo}</Text>
              {!ultimo && <View style={[estilos.linhaRastreio, ativo && etapaAtual > index && estilos.linhaRastreioAtiva]} />}
            </View>
          );
        })}
      </View>
    );
  };

  const renderizarPedidos = () => {
    const pedidosFiltrados = pedidos.filter(p => p.tipo === abaPedidos);

    return (
      <View style={{flex: 1}}>
        <View style={estilos.cabecalhoTelaComVoltar}>
          <TouchableOpacity style={estilos.botaoVoltarMini} onPress={() => navegar('Perfil')}>
            <Ionicons name="arrow-back" size={24} color="#873b0b" />
          </TouchableOpacity>
          <Text style={estilos.tituloTelaEmLinha}>Meus Pedidos</Text>
        </View>

        <View style={estilos.abasPedidos}>
          <TouchableOpacity style={[estilos.botaoAba, abaPedidos === 'em_andamento' && estilos.botaoAbaAtiva]} onPress={() => setAbaPedidos('em_andamento')}>
            <Text style={[estilos.textoAba, abaPedidos === 'em_andamento' && estilos.textoAbaAtiva]}>Em Andamento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[estilos.botaoAba, abaPedidos === 'historico' && estilos.botaoAbaAtiva]} onPress={() => setAbaPedidos('historico')}>
            <Text style={[estilos.textoAba, abaPedidos === 'historico' && estilos.textoAbaAtiva]}>Histórico</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={estilos.containerTela}>
          {pedidosFiltrados.length === 0 ? (
            <Text style={estilos.textoVazio}>Nenhum pedido nesta aba.</Text>
          ) : (
            pedidosFiltrados.map((pedido, index) => (
              <View key={index} style={estilos.cartaoPedido}>
                <View style={estilos.cabecalhoPedido}>
                  <Text style={estilos.idPedido}>{pedido.id}</Text>
                  <Text style={estilos.dataPedido}>{pedido.data}</Text>
                </View>
                
                <View style={estilos.corpoPedido}>
                  {pedido.itens.map((item, idx) => (
                    <Text key={idx} style={estilos.textoItemPedido}>• 1x {item}</Text>
                  ))}
                </View>

                {abaPedidos === 'em_andamento' && renderizarRastreio(pedido.etapa)}

                <View style={estilos.rodapePedido}>
                  <Text style={estilos.totalPedido}>R$ {pedido.total.toFixed(2).replace('.', ',')}</Text>
                  <View style={[
                    estilos.badgeStatus, 
                    pedido.status === 'Entregue' ? {backgroundColor: '#d1fada'} : 
                    pedido.status === 'Cancelado' ? {backgroundColor: '#fee2e2'} : {backgroundColor: '#ffe3d4'} 
                  ]}>
                    <Text style={[
                      estilos.textoStatus,
                      pedido.status === 'Entregue' ? {color: '#166534'} : 
                      pedido.status === 'Cancelado' ? {color: '#991b1b'} : {color: '#bd4819'}
                    ]}>{pedido.status}</Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    );
  };

  const renderizarPerfil = () => (
    <ScrollView style={estilos.containerTela}>
      <Text style={estilos.tituloTela}>Meu Perfil</Text>
      
      <View style={estilos.cabecalhoPerfil}>
        <View style={estilos.containerAvatar}>
          <Ionicons name="person" size={50} color="#fff" />
          <TouchableOpacity style={estilos.botaoEditarAvatar}>
            <Ionicons name="camera" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={estilos.nomePerfil}>{nomeUsuario}</Text>
        <Text style={estilos.emailPerfil}>{emailUsuario}</Text>
      </View>

      <TouchableOpacity style={estilos.botaoAtalhoPedidos} onPress={() => navegar('Pedidos')}>
        <Ionicons name="receipt-outline" size={24} color="#e6642f" />
        <Text style={estilos.textoAtalhoPedidos}>Meus Pedidos</Text>
        <Ionicons name="chevron-forward" size={24} color="#873b0b" />
      </TouchableOpacity>

      <View style={estilos.cartaoFormulario}>
        <Text style={estilos.labelInput}>Nome de Exibição</Text>
        <TextInput style={estilos.inputBox} value={nomeEditado} onChangeText={setNomeEditado} />
        
        <Text style={estilos.labelInput}>Endereço de Entrega</Text>
        <TextInput style={estilos.inputBox} value={enderecoEditado} onChangeText={setEnderecoEditado} />
        
        <Text style={estilos.labelInput}>Telefone</Text>
        <TextInput style={estilos.inputBox} value={telefoneEditado} onChangeText={setTelefoneEditado} />

        <TouchableOpacity style={estilos.botaoPrimario} onPress={salvarPerfil}>
          <Text style={estilos.textoBotaoPrimario}>Salvar Alterações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[estilos.botaoPrimario, {backgroundColor: '#fff', borderWidth: 1, borderColor: '#e6642f', marginTop: 15}]} onPress={() => { setUsuarioLogado(false); navegar('Inicio'); }}>
          <Text style={[estilos.textoBotaoPrimario, {color: '#e6642f'}]}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderizarCheckout = () => (
    <ScrollView style={estilos.containerTela}>
      <TouchableOpacity style={estilos.botaoVoltar} onPress={() => navegar('Carrinho')}>
        <Ionicons name="arrow-back" size={24} color="#873b0b" />
        <Text style={estilos.textoVoltar}>Voltar ao Carrinho</Text>
      </TouchableOpacity>

      <Text style={estilos.tituloTela}>Pagamento</Text>
      <View style={estilos.cartaoPagamento}>
        <Text style={estilos.labelPagamento}>Escolha como deseja pagar:</Text>
        
        <TouchableOpacity style={[estilos.metodoPagamento, metodoPagamento === 'cartao' && estilos.metodoPagamentoAtivo]} onPress={() => setMetodoPagamento('cartao')}>
          <Ionicons name="card-outline" size={24} color={metodoPagamento === 'cartao' ? '#e6642f' : '#873b0b'} />
          <Text style={[estilos.textoMetodo, metodoPagamento === 'cartao' && estilos.textoMetodoAtivo]}>Cartão de Crédito</Text>
        </TouchableOpacity>
        
        {metodoPagamento === 'cartao' && (
          <View style={estilos.areaExpandidaPagamento}>
            <TextInput style={estilos.inputBox} placeholder="Número do Cartão" keyboardType="numeric" />
            <View style={{flexDirection: 'row', gap: 10}}>
              <TextInput style={[estilos.inputBox, {flex: 1}]} placeholder="Validade (MM/AA)" />
              <TextInput style={[estilos.inputBox, {flex: 1}]} placeholder="CVV" keyboardType="numeric" secureTextEntry />
            </View>
            <TextInput style={estilos.inputBox} placeholder="Nome impresso no cartão" />
          </View>
        )}

        <TouchableOpacity style={[estilos.metodoPagamento, metodoPagamento === 'pix' && estilos.metodoPagamentoAtivo]} onPress={() => setMetodoPagamento('pix')}>
          <Ionicons name="qr-code-outline" size={24} color={metodoPagamento === 'pix' ? '#e6642f' : '#873b0b'} />
          <Text style={[estilos.textoMetodo, metodoPagamento === 'pix' && estilos.textoMetodoAtivo]}>PIX</Text>
        </TouchableOpacity>

        {metodoPagamento === 'pix' && (
          <View style={estilos.areaExpandidaPagamento}>
            <View style={estilos.caixaQrCodeFake}>
              <Ionicons name="qr-code" size={80} color="#4f2c1d" />
            </View>
            <Text style={{textAlign: 'center', marginBottom: 15, fontFamily: 'Newsreader_400Regular'}}>Escaneie o QR Code ou copie o código abaixo:</Text>
            <TouchableOpacity style={estilos.botaoCopiar}>
              <Ionicons name="copy-outline" size={20} color="#fff" />
              <Text style={estilos.textoBotaoCopiar}>Copiar Código PIX</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={[estilos.metodoPagamento, metodoPagamento === 'boleto' && estilos.metodoPagamentoAtivo]} onPress={() => setMetodoPagamento('boleto')}>
          <Ionicons name="document-text-outline" size={24} color={metodoPagamento === 'boleto' ? '#e6642f' : '#873b0b'} />
          <Text style={[estilos.textoMetodo, metodoPagamento === 'boleto' && estilos.textoMetodoAtivo]}>Boleto Bancário</Text>
        </TouchableOpacity>

        {metodoPagamento === 'boleto' && (
          <View style={estilos.areaExpandidaPagamento}>
            <Text style={{textAlign: 'center', marginBottom: 10, fontFamily: 'Newsreader_700Bold', fontSize: 16}}>34191.09008 63571.277308 71444.640008 5 900000000000</Text>
            <TouchableOpacity style={estilos.botaoCopiar}>
              <Ionicons name="barcode-outline" size={20} color="#fff" />
              <Text style={estilos.textoBotaoCopiar}>Copiar Código de Barras</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {metodoPagamento && (
        <TouchableOpacity style={estilos.botaoPrimario} onPress={finalizarPedido}>
          <Text style={estilos.textoBotaoPrimario}>Finalizar Compra (R$ {totalCarrinho.toFixed(2).replace('.', ',')})</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );

  return (
    <SafeAreaProvider>
      <View style={estilos.container}>
        <SafeAreaView style={estilos.cabecalho} edges={['top']}>
          <TouchableOpacity onPress={() => setMenuAberto(true)}>
            <Ionicons name="menu-outline" size={32} color="#873b0b" />
          </TouchableOpacity>
          
          {!pesquisaAtiva ? (
            <Text style={estilos.logoCabecalho} onPress={() => navegar('Inicio')}>Velvet Slice</Text>
          ) : (
            <TextInput 
              style={estilos.barraPesquisa}
              placeholder="Pesquisar bolos..."
              value={termoPesquisa}
              onChangeText={setTermoPesquisa}
              autoFocus
            />
          )}

          <View style={estilos.iconesCabecalho}>
            <TouchableOpacity onPress={() => setPesquisaAtiva(!pesquisaAtiva)}>
              <Ionicons name={pesquisaAtiva ? "close" : "search-outline"} size={26} color="#873b0b" style={{marginRight: 15}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navegar('Carrinho')}>
              <Ionicons name="cart-outline" size={26} color="#873b0b" />
              {carrinho.length > 0 && (
                <View style={estilos.badgeCarrinho}><Text style={estilos.textoBadgeCarrinho}>{carrinho.length}</Text></View>
              )}
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <Modal visible={menuAberto} animationType="fade" transparent={true}>
          <View style={estilos.overlayMenu}>
            <View style={estilos.conteudoMenu}>
              <TouchableOpacity style={estilos.botaoFecharMenu} onPress={() => setMenuAberto(false)}>
                <Ionicons name="close" size={32} color="#873b0b" />
              </TouchableOpacity>
              
              <Text style={estilos.tituloMenu}>Menu</Text>
              
              <TouchableOpacity style={estilos.itemMenu} onPress={() => navegarParaSecao('inicio')}>
                <Ionicons name="home-outline" size={24} color="#e6642f" /><Text style={estilos.textoItemMenu}>Início</Text>
              </TouchableOpacity>
              <TouchableOpacity style={estilos.itemMenu} onPress={() => navegarParaSecao('produtos')}>
                <Ionicons name="grid-outline" size={24} color="#e6642f" /><Text style={estilos.textoItemMenu}>Produtos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={estilos.itemMenu} onPress={() => navegarParaSecao('como_pedir')}>
                <Ionicons name="help-circle-outline" size={24} color="#e6642f" /><Text style={estilos.textoItemMenu}>Como Pedir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={estilos.itemMenu} onPress={() => navegarParaSecao('reviews')}>
                <Ionicons name="chatbubbles-outline" size={24} color="#e6642f" /><Text style={estilos.textoItemMenu}>Avaliações</Text>
              </TouchableOpacity>
              <TouchableOpacity style={estilos.itemMenu} onPress={() => navegarParaSecao('sobre')}>
                <Ionicons name="information-circle-outline" size={24} color="#e6642f" /><Text style={estilos.textoItemMenu}>Sobre nós</Text>
              </TouchableOpacity>

              <View style={estilos.separadorMenu} />

              <TouchableOpacity style={estilos.itemMenu} onPress={() => navegar('Carrinho')}>
                <Ionicons name="cart-outline" size={24} color="#e6642f" /><Text style={estilos.textoItemMenu}>Carrinho</Text>
              </TouchableOpacity>
              
              {usuarioLogado ? (
                <>
                  <TouchableOpacity style={estilos.itemMenu} onPress={() => navegar('Pedidos')}>
                    <Ionicons name="receipt-outline" size={24} color="#e6642f" /><Text style={estilos.textoItemMenu}>Meus Pedidos</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={estilos.itemMenu} onPress={() => navegar('Perfil')}>
                    <Ionicons name="person-circle-outline" size={24} color="#e6642f" /><Text style={estilos.textoItemMenu}>Perfil</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={estilos.itemMenu} onPress={() => {setUsuarioLogado(false); navegar('Inicio');}}>
                    <Ionicons name="log-out-outline" size={24} color="#e6642f" /><Text style={estilos.textoItemMenu}>Sair</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity style={estilos.itemMenu} onPress={() => navegar('Login')}>
                    <Ionicons name="log-in-outline" size={24} color="#e6642f" /><Text style={estilos.textoItemMenu}>Entrar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={estilos.itemMenu} onPress={() => navegar('Cadastro')}>
                    <Ionicons name="person-add-outline" size={24} color="#e6642f" /><Text style={estilos.textoItemMenu}>Cadastro</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            <TouchableOpacity style={estilos.cliqueFundoMenu} onPress={() => setMenuAberto(false)} />
          </View>
        </Modal>

        <View style={estilos.conteudoPrincipal}>
          {telaAtual === 'Inicio' && renderizarInicio()}
          {telaAtual === 'Perfil' && renderizarPerfil()}
          {telaAtual === 'Pedidos' && renderizarPedidos()}
          {telaAtual === 'Checkout' && renderizarCheckout()}
          
          {telaAtual === 'DetalhesProduto' && produtoSelecionado && (
            <ScrollView style={estilos.containerTela}>
              <TouchableOpacity style={estilos.botaoVoltar} onPress={() => navegar('Inicio')}>
                <Ionicons name="arrow-back" size={24} color="#873b0b" />
                <Text style={estilos.textoVoltar}>Voltar</Text>
              </TouchableOpacity>
              <Image source={produtoSelecionado.imagem} style={estilos.imagemDetalhe} resizeMode="cover" />
              <Text style={estilos.tituloDetalhe}>{produtoSelecionado.nome}</Text>
              <Text style={estilos.precoDetalhe}>R$ {produtoSelecionado.preco.toFixed(2).replace('.', ',')}</Text>
              <Text style={estilos.descricaoDetalhe}>{produtoSelecionado.descricao}</Text>
              <TouchableOpacity style={estilos.botaoPrimario} onPress={() => adicionarAoCarrinho(produtoSelecionado)}>
                <Ionicons name="cart" size={20} color="#fff" style={{marginRight: 10}}/>
                <Text style={estilos.textoBotaoPrimario}>Adicionar ao Carrinho</Text>
              </TouchableOpacity>
            </ScrollView>
          )}

          {telaAtual === 'Carrinho' && (
            <ScrollView style={estilos.containerTela}>
              <Text style={estilos.tituloTela}>Seu Carrinho</Text>
              {carrinho.length === 0 ? <Text style={estilos.textoVazio}>Seu carrinho está vazio.</Text> : (
                <View>
                  {carrinho.map((item, i) => (
                    <View key={i} style={estilos.itemCarrinho}>
                      <Image source={item.imagem} style={estilos.imagemItemCarrinho} />
                      <View>
                        <Text style={estilos.nomeItemCarrinho}>{item.nome}</Text>
                        <Text style={estilos.precoItemCarrinho}>R$ {item.preco.toFixed(2).replace('.', ',')}</Text>
                      </View>
                    </View>
                  ))}
                  <TouchableOpacity style={estilos.botaoPrimario} onPress={() => {
                    if(usuarioLogado) {
                      navegar('Checkout');
                    } else {
                      Alert.alert('Atenção', 'Você precisa fazer login para finalizar a compra.');
                      navegar('Login');
                    }
                  }}>
                    <Text style={estilos.textoBotaoPrimario}>Ir para Pagamento (R$ {totalCarrinho.toFixed(2).replace('.', ',')})</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          )}

          {telaAtual === 'Login' && (
            <View style={estilos.containerAuth}>
              <Text style={estilos.tituloTela}>Entrar</Text>
              <TextInput style={estilos.inputAuth} placeholder="E-mail" keyboardType="email-address" />
              <TextInput style={estilos.inputAuth} placeholder="Senha" secureTextEntry />
              <TouchableOpacity style={estilos.botaoPrimario} onPress={() => { setUsuarioLogado(true); navegar('Inicio'); }}>
                <Text style={estilos.textoBotaoPrimario}>Fazer Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navegar('Cadastro')} style={{marginTop: 20}}>
                <Text style={estilos.textoLink}>Não tem conta? Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {telaAtual === 'Cadastro' && (
            <View style={estilos.containerAuth}>
              <Text style={estilos.tituloTela}>Cadastro</Text>
              <TextInput style={estilos.inputAuth} placeholder="Nome completo" />
              <TextInput style={estilos.inputAuth} placeholder="E-mail" keyboardType="email-address" />
              <TextInput style={estilos.inputAuth} placeholder="Senha" secureTextEntry />
              <TouchableOpacity style={estilos.botaoPrimario} onPress={() => { setUsuarioLogado(true); navegar('Inicio'); }}>
                <Text style={estilos.textoBotaoPrimario}>Criar Conta</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navegar('Login')} style={{marginTop: 20}}>
                <Text style={estilos.textoLink}>Já tem conta? Faça login</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaProvider>
  );
}

// --- ESTILOS ---
const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff6e9' },
  conteudoPrincipal: { flex: 1 },
  cabecalho: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 15, backgroundColor: '#fff6e9', elevation: 4, zIndex: 10 },
  logoCabecalho: { fontFamily: 'Newsreader_700Bold_Italic', fontSize: 28, color: '#873b0b' },
  iconesCabecalho: { flexDirection: 'row', alignItems: 'center' },
  barraPesquisa: { flex: 1, backgroundColor: '#fff', marginHorizontal: 15, borderRadius: 20, paddingHorizontal: 15, height: 40, borderWidth: 1, borderColor: '#e6642f', fontFamily: 'Newsreader_400Regular' },
  badgeCarrinho: { position: 'absolute', top: -5, right: -5, backgroundColor: '#e6642f', borderRadius: 10, width: 18, height: 18, justifyContent: 'center', alignItems: 'center' },
  textoBadgeCarrinho: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  overlayMenu: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)' },
  conteudoMenu: { width: width * 0.75, backgroundColor: '#fff6e9', height: '100%', padding: 20, paddingTop: 50 },
  cliqueFundoMenu: { flex: 1 },
  botaoFecharMenu: { alignSelf: 'flex-end', marginBottom: 20 },
  tituloMenu: { fontFamily: 'Newsreader_700Bold_Italic', fontSize: 32, color: '#873b0b', marginBottom: 30 },
  itemMenu: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  textoItemMenu: { fontFamily: 'Newsreader_400Regular', fontSize: 20, color: '#4f2c1d', marginLeft: 15 },
  separadorMenu: { height: 1, backgroundColor: 'rgba(230, 100, 47, 0.2)', marginVertical: 20 },
  secaoHero: { padding: 20, alignItems: 'center' },
  tituloHero: { fontFamily: 'Newsreader_700Bold_Italic', fontSize: 42, color: '#873b0b', textAlign: 'center', marginBottom: 10 },
  subtituloHero: { fontFamily: 'Newsreader_400Regular_Italic', fontSize: 22, color: '#e6642f', textAlign: 'center', marginBottom: 20 },
  imagemHero: { width: width * 0.9, height: 250, borderRadius: 20 },
  secaoCatalogo: { padding: 20 },
  tituloSecao: { fontFamily: 'Newsreader_700Bold_Italic', fontSize: 36, color: '#873b0b', textAlign: 'center', marginBottom: 20 },
  gradeProdutos: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  cartaoProduto: { width: '48%', backgroundColor: '#fff', borderRadius: 15, marginBottom: 15, overflow: 'hidden', elevation: 3 },
  containerImagem: { width: '100%', height: 180 },
  imagemProduto: { width: '100%', height: '100%' },
  infoProduto: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10, backgroundColor: 'rgba(0,0,0,0.6)' },
  nomeProduto: { fontFamily: 'Newsreader_700Bold', color: '#fff', fontSize: 16, marginBottom: 5 },
  badgePreco: { backgroundColor: 'rgba(255,255,255,0.9)', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 15 },
  precoProduto: { fontFamily: 'Newsreader_700Bold', color: '#e6642f', fontSize: 14 },
  secaoGeral: { padding: 20 },
  cartaoFormulario: { backgroundColor: '#fff', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(230, 100, 47, 0.1)', elevation: 4 },
  subtituloFormulario: { color: '#bd4819', fontSize: 16, marginBottom: 20, textAlign: 'center', fontFamily: 'Newsreader_400Regular' },
  labelInput: { fontFamily: 'Newsreader_700Bold', color: '#4f2c1d', marginBottom: 5 },
  inputBox: { backgroundColor: '#fff6e9', borderWidth: 1, borderColor: 'rgba(230, 100, 47, 0.2)', borderRadius: 10, padding: 12, marginBottom: 15, fontSize: 16, fontFamily: 'Newsreader_400Regular' },
  botaoPrimario: { backgroundColor: '#e6642f', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 15, borderRadius: 30, elevation: 2 },
  textoBotaoPrimario: { fontFamily: 'Newsreader_700Bold', color: '#fff', fontSize: 18 },
  secaoReviews: { paddingVertical: 20, backgroundColor: '#fff' },
  scrollReviews: { paddingLeft: 20 },
  cartaoReview: { width: width * 0.7, marginRight: 20, alignItems: 'center' },
  imagemReview: { width: 150, height: 150, borderRadius: 75, borderWidth: 4, borderColor: '#fff6e9', marginBottom: 15 },
  tituloReview: { fontFamily: 'Newsreader_700Bold', color: '#bd4819', fontSize: 20, marginBottom: 10 },
  textoReview: { fontFamily: 'Newsreader_400Regular_Italic', color: '#4f2c1d', textAlign: 'center', lineHeight: 22 },
  secaoSobre: { padding: 20, paddingBottom: 40, backgroundColor: '#fff6e9' },
  imagemSobre: { width: '100%', height: 250, borderRadius: 15 },
  textoSobre: { fontFamily: 'Newsreader_400Regular_Italic', color: '#6c2f09', fontSize: 16, lineHeight: 24, marginBottom: 15 },
  containerTela: { flex: 1, padding: 20 },
  tituloTela: { fontFamily: 'Newsreader_700Bold_Italic', fontSize: 32, color: '#873b0b', marginBottom: 20, textAlign: 'center' },
  botaoVoltar: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  textoVoltar: { fontFamily: 'Newsreader_400Regular', fontSize: 18, color: '#873b0b', marginLeft: 5 },
  textoVazio: { fontFamily: 'Newsreader_400Regular_Italic', fontSize: 18, textAlign: 'center', color: '#873b0b', marginTop: 50 },
  imagemDetalhe: { width: '100%', height: 300, borderRadius: 20, marginBottom: 20 },
  tituloDetalhe: { fontFamily: 'Newsreader_700Bold_Italic', fontSize: 32, color: '#873b0b', marginBottom: 10 },
  precoDetalhe: { fontFamily: 'Newsreader_700Bold', fontSize: 24, color: '#e6642f', marginBottom: 15 },
  descricaoDetalhe: { fontFamily: 'Newsreader_400Regular', fontSize: 18, color: '#4f2c1d', lineHeight: 26, marginBottom: 30 },
  itemCarrinho: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, borderRadius: 15, marginBottom: 15, alignItems: 'center' },
  imagemItemCarrinho: { width: 80, height: 80, borderRadius: 10, marginRight: 15 },
  nomeItemCarrinho: { fontFamily: 'Newsreader_700Bold', fontSize: 18, color: '#4f2c1d', marginBottom: 5 },
  precoItemCarrinho: { fontFamily: 'Newsreader_700Bold', fontSize: 16, color: '#e6642f' },
  containerAuth: { flex: 1, padding: 30, justifyContent: 'center' },
  inputAuth: { backgroundColor: '#fff', borderWidth: 1, borderColor: 'rgba(230, 100, 47, 0.2)', borderRadius: 10, padding: 15, marginBottom: 15, fontFamily: 'Newsreader_400Regular', fontSize: 16 },
  textoLink: { fontFamily: 'Newsreader_400Regular_Italic', fontSize: 16, color: '#e6642f', textAlign: 'center' },
  cartaoPagamento: { backgroundColor: '#fff', padding: 20, borderRadius: 15, marginBottom: 30 },
  labelPagamento: { fontFamily: 'Newsreader_700Bold', fontSize: 18, color: '#4f2c1d', marginBottom: 15 },
  metodoPagamento: { flexDirection: 'row', alignItems: 'center', padding: 15, borderWidth: 1, borderColor: '#e6642f', borderRadius: 10, marginBottom: 10, backgroundColor: '#fff6e9' },
  metodoPagamentoAtivo: { backgroundColor: '#ffe3d4', borderColor: '#bd4819' },
  textoMetodo: { fontFamily: 'Newsreader_700Bold', fontSize: 16, color: '#873b0b', marginLeft: 15 },
  textoMetodoAtivo: { color: '#bd4819' },
  areaExpandidaPagamento: { backgroundColor: '#fff', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#eee', marginBottom: 15, marginTop: -5 },
  caixaQrCodeFake: { alignSelf: 'center', padding: 20, borderWidth: 2, borderColor: '#873b0b', borderRadius: 10, marginBottom: 15, borderStyle: 'dashed' },
  botaoCopiar: { backgroundColor: '#873b0b', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 12, borderRadius: 20 },
  textoBotaoCopiar: { fontFamily: 'Newsreader_700Bold', color: '#fff', marginLeft: 10 },
  cabecalhoPerfil: { alignItems: 'center', marginBottom: 30 },
  containerAvatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#bd4819', justifyContent: 'center', alignItems: 'center', marginBottom: 10, elevation: 4 },
  botaoEditarAvatar: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#e6642f', padding: 8, borderRadius: 20, borderWidth: 2, borderColor: '#fff' },
  nomePerfil: { fontFamily: 'Newsreader_700Bold_Italic', fontSize: 24, color: '#873b0b' },
  emailPerfil: { fontFamily: 'Newsreader_400Regular', fontSize: 16, color: '#e6642f' },
  cabecalhoTelaComVoltar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, marginBottom: 20 },
  botaoVoltarMini: { marginRight: 15 },
  tituloTelaEmLinha: { fontFamily: 'Newsreader_700Bold_Italic', fontSize: 28, color: '#873b0b' },
  abasPedidos: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#e6642f', marginBottom: 15, marginHorizontal: 20 },
  botaoAba: { flex: 1, paddingVertical: 10, alignItems: 'center' },
  botaoAbaAtiva: { borderBottomWidth: 3, borderColor: '#bd4819' },
  textoAba: { fontFamily: 'Newsreader_700Bold', fontSize: 16, color: '#873b0b' },
  textoAbaAtiva: { color: '#bd4819' },
  cartaoPedido: { backgroundColor: '#fff', borderRadius: 15, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: '#ffe3d4', elevation: 2 },
  cabecalhoPedido: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#f3f4f6', paddingBottom: 10, marginBottom: 10 },
  idPedido: { fontFamily: 'Newsreader_700Bold', fontSize: 16, color: '#4f2c1d' },
  dataPedido: { fontFamily: 'Newsreader_400Regular', fontSize: 14, color: '#6b7280' },
  corpoPedido: { marginBottom: 15 },
  textoItemPedido: { fontFamily: 'Newsreader_400Regular', fontSize: 16, color: '#4f2c1d', marginBottom: 4 },
  containerRastreio: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, paddingVertical: 10, paddingHorizontal: 5 },
  etapaRastreioWrapper: { flex: 1, alignItems: 'center', position: 'relative' },
  caixaIconeRastreio: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff6e9', justifyContent: 'center', alignItems: 'center', zIndex: 2 },
  textoRastreio: { fontFamily: 'Newsreader_400Regular', fontSize: 10, color: '#999', marginTop: 5, textAlign: 'center' },
  textoRastreioAtivo: { fontFamily: 'Newsreader_700Bold', color: '#e6642f' },
  linhaRastreio: { position: 'absolute', top: 20, right: '-50%', width: '100%', height: 2, backgroundColor: '#f3f4f6', zIndex: 1 },
  linhaRastreioAtiva: { backgroundColor: '#e6642f' },
  rodapePedido: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTopWidth: 1, borderColor: '#f3f4f6' },
  totalPedido: { fontFamily: 'Newsreader_700Bold', fontSize: 18, color: '#e6642f' },
  badgeStatus: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  textoStatus: { fontFamily: 'Newsreader_700Bold', fontSize: 12 },
  botaoAtalhoPedidos: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 15, marginBottom: 25, borderWidth: 1, borderColor: '#ffe3d4', elevation: 2 },
  textoAtalhoPedidos: { flex: 1, fontFamily: 'Newsreader_700Bold', fontSize: 18, color: '#4f2c1d', marginLeft: 15 },
});