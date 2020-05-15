---
title:  "FsCheck: Mudando sua visão sobre Testes"
date: "2020-05-14"
slug: /fscheck-mudando-sua-visao-sobre-testes/
featuredImage: fscheck-01.jpg
tags: ["teste", "csharp", "fscheck"]
---


Existem momentos em um projeto que simplesmente testar os valores absolutos de entrada e saída de um método não são suficientes para eu me sentir seguro. Um exemplo simples é uma função de multiplicação, acho que nunca vou me sentir seguro de saber que pensei em todas entradas e saídas. Nestes casos uma opção é a criação de testes de propriedade, e para C# existe a biblioteca [FsCheck](https://github.com/fscheck/FsCheck).

A ideia desse post é apresentar a biblioteca FSCheck e como ela me ajudou a fazer um teste num projeto que estou participando.

---

## FSCheck
O projeto consiste em mostrar uma pergunta e a pessoa responde, se a pessoa erra a dificuldade da pergunta aumenta e se a pessoa acerta a dificuldade diminui. Isso influencia para saber a periodicidade que devo mostrar a pergunta para a pessoa.
> Esse post não tem a intenção de explicar conceitos básicos de teste de propriedade ou testes generativos  

Se acharem interessante fazer um post sobre isso, mandem nos comentários :)

Quem faz o cálculo dessa dificuldade nova, são uns algoritmos bem legais (mas que eu não criei). Existem vários, e na real, não me importa muito o que eles fazem. Porém, eu quero ter certeza de que se uma pergunta tinha um nível de dificuldade e a pessoa acertou, o novo nível de dificuldade deve ser menor que o anterior.

Resumindo, podemos ver que o meu método tem algumas propriedades:
 - Quando acertar, a dificuldade tem que diminuir;
 - Quando errar, a dificuldade tem que aumentar;

E é isso que quero testar, uma **propriedade** do meu método.

O código que tem a propriedade que quero testar é o método que é executado na primeira linha desse trecho de código:

```csharp{3}
public Cartão AtualizarDadosDeRevisão(ResultadoEnum resultado, IEstratégia estratégia)
{
  var novaDificuldade = estratégia.AjustarDificuldade(this, resultado);
  this.PorcentagemDificuldade = novaDificuldade;
  return this;
}
```

Em um teste que estamos acostumados a fazer iríamos ter um código mais ou menos assim:

```csharp
[Test]
public void DeveDiminuirDificuldadeQuandoAcertarAResposta()
{
  var estratégia = new SuperMemo2Estratégia();
  var cartão = new CartãoBuilder().ComPorcentagemDeDificuldade(100).Generate();
  
  var novaPorcentagem = estratégia.AjustarDificuldade(cartão, ResultadoEnum.Acertou);
  
  Assert.True(novaPorcentagem < cartão.PorcentagemDificuldade);

  //Temos que fazer esse Assert, pois como disse não sei (ou não me importo) com a implementação da estratégia.
  //Se tivesse certeza do resultado final, poderia fazer algo assim:
  //novaPorcentagem.Should().Be(96);
}
```

Esse teste em um primeiro momento, testa o que preciso e é bem simples. Porém, se for pensar, será que para a entrada 99 ele funciona? E para 98? E para 97? E para.. Bom acho que você entendeu hehehe
### Então como testar uma propriedade e tentar garantir um número maior de entradas?
**FSCheck** é uma biblioteca que provê formas para testar automaticamente código baseado em propriedades.
Como no projeto estamos utilizando NUnit para testes, precisamos adicionar uma versão específica: [FsCheck.NUnit](https://www.nuget.org/packages/FsCheck.Nunit/)

Com o FsCheck mudamos o teste de um teste de unidade para um teste de propriedade, portanto as duas primeiras alterações são:
 - Alterar a *annotation* de Test para Property;  
 - O retorno do método de teste agora é Property ao invés de void;  

Com a mudança do retorno, devemos agora retornar qual a propriedade que queremos testar, que no nosso caso é se a *novaPorcentagem* é menor que a anterior. Com essas mudanças nosso teste está assim por enquanto:

```csharp
[Property] 
public Property DeveDiminuirDificuldadeQuandoAcertarAResposta() 
{
 var estratégia = new SuperMemo2Estratégia();
 var cartão = new CartãoBuilder().ComPorcentagemDeDificuldade(100).Generate();
 var novaPorcentagem = estratégia.AjustarDificuldade(cartão, ResultadoEnum.Acertou);
 
 return (novaPorcentagem < cartão.PorcentagemDificuldade).ToProperty(); 
}
```

Nesse teste, fica explícita a propriedade que queremos testar! Porém, continuamos com o valor fixo de 100, caindo no mesmo problema anterior. O FsCheck consegue cuidar disso para nós, para isso basta eu dizer para ele que quero que ele gere, expondo como um parâmetro do meu teste o que ele precisa gerar.

Portanto vamos alterar a assinatura do nosso teste para receber a porcentagem e usá-la no teste:

```csharp{2,5} 
[Property] 
public Property DeveDiminuirDificuldadeQuandoAcertarAResposta(uint porcentagem) 
{
 var estratégia = new SuperMemo2Estratégia();
 var cartão = new CartãoBuilder().ComPorcentagemDeDificuldade(porcentagem).Generate();
 var novaPorcentagem = estratégia.AjustarDificuldade(cartão, ResultadoEnum.Acertou);
 
 return (novaPorcentagem < cartão.PorcentagemDificuldade).ToProperty(); 
}
```

E ao rodar o teste temos a seguinte saída:
```bash
Executando AstroCards.test.AstroCards.UnitTests.AstroCards.UnitTests.Specs.EstrategiasRevisao.SuperMemo2EstratégiaTestes.DeveAumentarDificuldadeQuandoErrarAResposta ...
Ok, passed 100 tests.
```
Isso pode gerar uma confusão, já que criamos apenas um teste. O que acontece é que o FsCheck por padrão gera 100 entradas para o nosso teste.

Se quiser ver as entradas, pode utilizar o método Collect:

```csharp
return (novaPorcentagem < porcentagem).ToProperty().Collect(porcentagem);
```

Ao rodar o teste teremos algo parecido com isso na saída:
```bash
Ok, passed 100 tests.
7% 3u.
5% 6u.
5% 17u.
4% 7u.
4% 28u.
3% 9u.
3% 8u.
3% 5u.
3% 4u.
3% 1u.
2% 64u.
2% 48u.
2% 47u.
2% 42u.
2% 40u.
2% 2u.
2% 29u.
etc...
```
Ele mostra todas as entradas que foram testadas e, a esquerda delas, qual a % de vezes que aquela mesma entrada foi usada.

O mais interessante, isso tudo rodou em 1.246s! Com isso consigo testar diversas entradas, e garantir que a propriedade do meu método funciona!

Agora um ponto de atenção, só dissemos para o FsCheck que queremos uma entrada do tipo *uint*, porém para nossa porcentagem queremos somente números de 0 até 100.

O FsCheck disponibiliza formas de lidar com isso, mas isso é um assunto para um próximo post!

---

Eai, gostou? Tem dúvidas? Quer saber mais sobre o FsCheck ou Testes de Propriedade?
Deixe um comentário :)

Abraços

Post original: *[High5Devs](http://high5devs.com/2020/05/fscheck-mudando-sua-visao-sobre-testes/)*  
*Imagem usada no post [Chris Liverani](https://unsplash.com/@chrisliverani?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText)*