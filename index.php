<?php
require_once "../funcoes/Conexao.php";
require_once "../funcoes/Key.php";
$pegadadosgerais 	= $connect->query("SELECT * FROM adm WHERE Id='1'");
$dadosgerais		= $pegadadosgerais->fetch(PDO::FETCH_OBJ);
$idlX		 		= $dadosgerais->Id;
$nomeX		 		= $dadosgerais->nome;
?>
<!DOCTYPE html>
<html>

<head><meta charset="utf-8">
  
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="img/favicon.png">
  <title><?=$dadosgerais->nomedosite;?> - Cardápio digital</title>
  <meta name="description" content="Facilidade para você e para o seu cliente! Aumente suas vendas em até 60% - Adicione produtos ilimitados no seu catálogo, altere preços e muito mais...">
  <meta name="keywords" content="Seu Cardápio digital de produtos integrado com whatsapp">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css">
  <link rel="stylesheet" href="css/meupedido.css">
  <script src="js/navbar-ontop.js"></script>
  <script src="js/animate-in.js"></script>
</head>

<body>
  <nav class="navbar navbar-expand-md fixed-top bg-light navbar-light" style="background-color:#CCCCCC">
    <div class="container"> <a class="navbar-brand" href="#"><img class="img-fluid d-block" src="img/logo.png" width="300" style=""></a> <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar2SupportedContent" aria-controls="navbar2SupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button>
      <div class="collapse navbar-collapse text-center justify-content-end" id="navbar2SupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item mx-2"> <a class="nav-link" href="#inicio">Início</a> </li>
          <li class="nav-item mx-2"> <a class="nav-link" href="#video">Como Funciona?</a> </li>
        </ul> <a class="btn navbar-btn mx-2 btn-primary text-light" href="novocliente/"><b>Começar Agora!</b></a>
      </div>
    </div>
  </nav>
  <!-- Cover -->
  <div class="bg-light pt-5" id="inicio" style="	background-image: url(&quot;img/bg2.png&quot;), url(&quot;img/bg.jpg&quot;);	background-position: center, left top;	background-size: cover, cover;	background-repeat: no-repeat, no-repeat;">
    <div class="container pt-5 pb-4">
      <div class="row">
        <div class="text-lg-left text-left align-self-left pt-4 col-md-6 py-3" style="">
          <h2 class="text-dark"><b class="">Pedidos completos direto no seu <b class="text-success">WhatsApp</b> por apenas <b class="bg-success">R$1</b> por dia. </b></h2>
          <p class="text-dark"><b>Facilidade para você e para o seu cliente!<br></b><br>
            <i class="fa fa-check-circle text-primary" aria-hidden="true"></i> Você envia o seu catálogo através de um link ou qrcode<br>
            <i class="fa fa-check-circle text-primary" aria-hidden="true"></i> O cliente escolhe os produtos, e monta o pedido<br>
            <i class="fa fa-check-circle text-primary" aria-hidden="true"></i> Preenche todas as informações necessárias para entrega<br>
            <i class="fa fa-check-circle text-primary" aria-hidden="true"></i> Você recebe o pedido no seu WhatsApp e no Painel de Vendas<br>
            <i class="fa fa-check-circle text-primary" aria-hidden="true"></i> O cliente acompanha o status do pedido direto no seu WhatsApp<br>
            <i class="fa fa-check-circle text-primary" aria-hidden="true"></i> Gere relatórios de vendas por datas<br>
          </p>
		  <br>
          <a class="btn btn-lg btn-primary" href="https://olhardigital.xyz/delivery2.5.6/clientedemo/" target="blank"><b>Ver demostração</b></a>
        </div>
        <div class="col-md-6" style=""> <img class="d-block mx-auto img-fluid" src="img/phone.png" width="500"> </div>
      </div>
    </div>
  </div>
  <!-- passo -->
  <div class="text-center py-5">
    <div class="container">
      <div class="col-md-12 text-center">
        <h1>Processo rápido e simples!</h1>
        <p>Comece hoje mesmo a vender online e não perca pedidos por falta de atendimento no WhatsApp.</p>
      </div>
      <div class="row">
        <div class="col-lg-4 p-3">
          <div class="card">
            <div class="card-body p-4"> <img class="img-fluid d-block mb-3 mx-auto" src="img/1.png" width="230">
              <p class="lead"><b>Cadastre seu estabelecimento e produtos grátis por 7 dias</b></p>
              <p class="mb-0">Crie produtos, descrições, insira fotos e muito mais. Personalize seu cardápio e explore ao máximo as funcionalidades e recursos, oferecendo opções de delivery ou retirada no local ao seu cliente.</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 p-3 col-md-6">
          <div class="card">
            <div class="card-body p-4"> <img class="img-fluid d-block mb-3 mx-auto" src="img/2.png" width="230">
              <p class="lead"><b>Compartilhe o seu qr code ou link nas Redes Socias.</b></p>
              <p class="mb-0">Ao construir seu cardápio e ativá-lo, será gerado um qr code e um link para divulgação. Compartilhe por e-mail, redes sociais e Whatsapp. Crie novas formas de vender seus produtos.</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 p-3 col-md-6">
          <div class="card">
            <div class="card-body p-4" style=""> <img class="img-fluid d-block mb-3 mx-auto" src="img/3.png" width="230">
              <p class="lead"><b>Receba os pedidos no seu Whatsapp e PDV.</b></p>
              <p class="mb-0">Seu cliente acessa de forma simples e escolhe os itens do pedido. Em seguida você recebe o pedido diretamente no Whatsapp e Ponto de Venda, fácil de organizar e entregar!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- passo -->
  <!-- Article style section -->
  <div class="py-3">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          <h2>Porque ter um catálogo ou cardápio digital?</h2>
          <p><b>Veja algumas das vantagens ao adquirir o nosso serviço</b></p>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-4 col-md-6 p-4">
          <div class="row">
            <div class="col-3 p-0 d-flex align-items-center"> <img class="img-fluid d-block" src="img/icon4.jpg"> </div>
            <div class="col-9">
              <p class="lead mb-1"> <b>Sem taxas</b></p>
              <p class="mb-0" contenteditable="true">Não pagar nenhuma taxa sobre as vendas</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 p-4">
          <div class="row">
            <div class="col-3 p-0 d-flex align-items-center"> <img class="img-fluid d-block" src="img/icon5.jpg"> </div>
            <div class="col-9">
              <p class="lead mb-1"> <b>Sem aplicativos</b></p>
              <p class="mb-0">O usuário não precisa instalar nenhum aplicativo </p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 p-4">
          <div class="row">
            <div class="col-3 p-0 d-flex align-items-center"> <img class="img-fluid d-block" src="img/icon6.jpg"> </div>
            <div class="col-9">
              <p class="lead mb-1"> <b>Interface</b></p>
              <p class="mb-0">Interface fácil e amigável para o cliente pedir</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 p-4">
          <div class="row">
            <div class="col-3 p-0 d-flex align-items-center"> <img class="img-fluid d-block" src="img/icon7.jpg"> </div>
            <div class="col-9">
              <p class="lead mb-1"> <b>Modificação</b></p>
              <p class="mb-0">Editar facilmente preços e produtos em tempo real</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 p-4">
          <div class="row">
            <div class="col-3 p-0 d-flex align-items-center"> <img class="img-fluid d-block" src="img/icon8.jpg"> </div>
            <div class="col-9">
              <p class="lead mb-1"> <b>Organização</b></p>
              <p class="mb-0">Adicionar categorias e subcategorias de produtos </p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 p-4">
          <div class="row">
            <div class="col-3 p-0 d-flex align-items-center"> <img class="img-fluid d-block rounded-circle" src="img/icon9.jpg"> </div>
            <div class="col-9">
              <p class="lead mb-1"> <b>Fidelidade</b></p>
              <p class="mb-0">Fidelize seu cliente com um site com sua marca e cores </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="py-4" style="">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
        </div>
      </div>
      <div class="row pt-3">
        <div class="align-self-center text-md-left col-lg-6 px-4 text-left" style="" id="video">
          <img class="img-fluid d-block" src="img/img2.jpg">
        </div>
        <div class="align-self-center col-lg-6" style="">
          <div class="align-self-center text-md-left col-lg-12 text-left px-4 pt-3" style="">
            <h2 class="text-left">Quem pode usar a <b>ferramenta?</b></h2>
            <h5 class="text-left mb-3">É indicada para todos os negócios que atendam com delivery ou retirada no local, principalmente nichos do Foodservice. Basta realizar o cadastro em nossa plataforma para ter acesso ao painel e poder usar a ferramenta em seguida.<br><br>Seus clientes compram pelo sistema e você recebe o pedido no seu WhatsApp tudo organizado e sem taxas!</h5> <a class="btn shadowed mt-2 btn-lg btn-block btn-primary" href="novocliente/">Começar Agora!</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- porque ter um catálogo -->
  <!-- porque ter um catálogo -->
  <!-- garantia -->
  <div class="my-4 bg-dark py-4" style="">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
        </div>
      </div>
      <div class="row pt-3 mb-2">
        <div class="align-self-center text-md-left col-lg-5 px-4 text-left" style="">
          <div class="p-0 col-lg-12 order-2 order-lg-1" style=""> <img class="img-fluid d-block mx-auto" src="img/garantia.png"> </div>
        </div>
        <div class="align-self-center col-lg-7" style="">
          <div class="align-self-center text-md-left col-lg-12 text-left px-4 pt-3   " style="">
            <h3 class="">&nbsp;Um canal próprio de vendas e interação com seu cliente</h3>
            <p class="mb-0" align="justify"><b>Iremos ajudar sua empresa ou negócio a se preparar para retomada da econômia. Ao criar sua conta você ganha <span style="color:#FFFF00; font-size:28px"><b><?=$dadosgerais->dias;?> dias</b></span> para testar todas as funcionalidades do nosso sistema. </p>
          </div>
        </div>
      </div>
      <hr class="mt-0">
    </div>
  </div>
  <!-- garantia -->
  <div class="text-center py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 p-3">
          <div class="card">
            <div class="card-body p-4"> <img class="img-fluid d-block mb-3 mx-auto rounded-circle" src="img/icon1.jpg" width="130">
              <p class="lead"><b>Painel</b></p>
              <p class="mb-0">Acesse o painel por qualquer dispositivo, para adicionar produtos, modificar preços e muito mais...&nbsp;</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 p-3 col-md-6">
          <div class="card">
            <div class="card-body p-4"> <img class="img-fluid d-block mb-3 mx-auto rounded-circle" src="img/icon2.jpg" width="130">
              <p class="lead"><b>Vendas</b></p>
              <p class="mb-0">Aumente suas vendas em até 60% enviando o seu catálogo e evitando aplicativos com produtos de terceiros.</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 p-3 col-md-6">
          <div class="card">
            <div class="card-body p-4" style=""> <img class="img-fluid d-block mb-3 mx-auto rounded-circle" src="img/icon3.jpg" width="130">
              <p class="lead"><b>Pedidos</b></p>
              <p class="mb-0">Receba os pedidos no WhatsApp da sua empresa e aumente a facilidade na busca dos produtos para o seu cliente.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- FAQ -->
  <div class="py-5 my-3 bg-primary" id="plano" style="	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url(&quot;img/bg3.jpg&quot;);	background-position: top center;	background-size: cover;	background-repeat: no-repeat;">
    <div class="container">
      <div class="row">
        <div class="text-center col-md-12">
          <h2 class="mb-0">Uma experiência única de cardápio digital para pedidos online e na loja.</h2>
          <p>+ de <?php $todia = $connect->query("SELECT id FROM config"); print $todia->rowCount();?> negócios já estão usando em todo o Brasil</p>
        </div>
      </div>
      <div class="row">
        
		 
		
		 
		
	  </div> 
       
		
     
    </div>
  </div>
  <div class="py-5">
    <div class="container">
      <div class="row">
        <div class="text-center col-md-12">
          <h1>Dúvidas</h1>
        </div>
        <div class="col-12 mx-auto">
          <div class="accordion" id="faqExample">
            <div class="card">
              <div class="card-header p-2" id="headingOne">
                <h5 class="mb-0">
                  <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"> <i class="fa fa-arrow-right" aria-hidden="true"></i> Preciso ter um site? </button>
                </h5>
              </div>
              <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#faqExample">
                <div class="card-body"> Não, com nossa plataforma você terá uma URL exemplo: (<?=$dadosgerais->urlsite;?>suaepresa) mas você pode optar por comprar um domínio próprio, exemplo: seudelivery.com e apontar para nosso servidor.</div>
              </div>
            </div>
            <div class="card">
              <div class="card-header p-2" id="headingTwo">
                <h5 class="mb-0">
                  <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"> <i class="fa fa-arrow-right" aria-hidden="true"></i> Posso gerenciar meus produtos? </button>
                </h5>
              </div>
              <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#faqExample">
                <div class="card-body"> Sim, você terá total acesso ao painel administrativo e pode mudar preços, adicionar produtos e muito mais... (se precisar de ajuda basta falar com o nosso suporte) </div>
              </div>
            </div>
            <div class="card">
              <div class="card-header p-2" id="headingThree">
                <h5 class="mb-0">
                  <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"> <i class="fa fa-arrow-right" aria-hidden="true"></i> Posso usar outros aplicativos tipo Ifood? </button>
                </h5>
              </div>
              <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#faqExample">
                <div class="card-body"> Sim, você pode vender em quantos aplicativos quiser! </div>
              </div>
            </div>
            <div class="card">
              <div class="card-header p-2" id="headingFour">
                <h5 class="mb-0">
                  <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour"> <i class="fa fa-arrow-right" aria-hidden="true"></i> O pedido chega onde? </button>
                </h5>
              </div>
              <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#faqExample">
                <div class="card-body"> Quando alguém fizer o pedido no seu cardápio, ele será enviado diretamente no WhatsApp cadastrado para receber os pedidos ou no seu painel administrativo. </div>
              </div>
            </div>
             
          </div>
        </div>
      </div>
      <!--/row-->
    </div>
    <!--container-->
  </div>
  <!-- FAQ FINAL-->
  <!-- Features -->
  <!-- Features -->
  <!-- Carousel reviews -->
  <!-- Call to action -->
  <div class="section-parallax" id="download" style="background-color:#0E828F; background-position: top left;	background-size: 100%;	background-repeat: repeat;">
    <div class="container">
      <div class="row py-3">
        <div class="col-md-12 align-self-center text-center text-md-left">
          <h1 class="text-center"><b style="color:#FFFFFF">Continua com dúvidas?</b></h1>
          <p class="text-light text-center" style="">Entre em contato atráves do nosso <br>WhatsApp <?=$dadosgerais->celular;?></p>
        </div>
      </div>
    </div>
  </div>
  <!-- Footer -->
  <div class="pt-5 bg-dark">
    <div class="container">
      <div class="row">
        <div class="col-md-12 my-3 text-center">
          <p class="text-muted">© <?=date("Y");?> - <?=$dadosgerais->nomedosite;?> - Todos direitos reservados.</p>
        </div>
      </div>
    </div>
  </div>
  <!-- JavaScript dependencies -->
  <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
  <!-- Script: Smooth scrolling between anchors in the same page -->
  <script src="js/smooth-scroll.js"></script>
  <!-- botão whats -->
  <script type="text/javascript">
    (function() {
      var options = {
        whatsapp: "+55<?=$dadosgerais->celular;?>", // WhatsApp number
        call_to_action: "Fale Conosco", // Call to action
        position: "right", // Position may be 'right' or 'left'
      };
      var proto = document.location.protocol,
        host = "getbutton.io",
        url = proto + "//static." + host;
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = url + '/widget-send-button/js/init.js';
      s.onload = function() {
        WhWidgetSendButton.init(host, proto, options);
      };
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
    })();
  </script>
  <!-- /botão whats -->
</body>

</html>