# Notas de Tradução

Escrita por: Ennui Langeweile, a tradutora por trás da Pull Request da tradução

---

## Sobre a tradução

A tradução do site da Quilt para o português brasileiro há uma história até que interessante! Eu fui parte da comunidade da Quilt desde que ela foi feita pública, e enquanto eu já fui contribuindo para ela desde o começo? Só foi depois que eu sair do armário e perto do lançamento dela no dia 20/04/2022 que eu acabei se tornando uma membra importante da equipe em geral, e assim? O foco meu acabou se convertendo em uma de fortaceler a toolchain o máximo possível, e bom? Acredito que tive sucesso nessa área, mas ainda quero fazer mais!

Porém, durante todo esse tempo na comunidade, o que eu percebi é o quanto sozinha eu estive em termos de nacionalidades. Houve váries estadunidenses e europies<!-- agradeço ao dicionário™ por dar esse termo neutro maravilhoso; "européies", porém, daria certo se "europeus" virasse "européios"; ahhhh, "europies" para neutro e "européies" para ê/elu/e especificamente, eis é o meu sonho -->, mas brasileires? Por um longo período, fui a única que foi ativa na comunidade, com outres membres passando por aqui mas acabam sumindo com o tempo, e assim, eu começei a ver uma necessidade de acomodar brasileires de alguma forma. Enquanto uma tradução para o português brasileiro não tem como o objetivo primário atrair brasileires para a comunidade anglofônica, ela irá permitir uma acessibilidade maior para que brasileires possam usar a Quilt, e com os esforços para traduzir o site? Permitir que nosses membres, atives ou não, possam contribuir e colaborar para fortalecer a presença da toolchain Quilt na comunidade brasileira.

Nessa tradução, eu fiz a grande decisão de fazer o uso de pronomes neutros no lugar do "masculino neutro". Com a Quilt sendo construída para acomodar a comunidade queer e com ela sendo o coração dela? Não faz sentido fazer essa tradução com pronomes masculinos como padrão e contaminando grupos, isso não seria uma tradução que encaixaria nos fundamentos da Quilt.

Sim, pronomes neutros infelizmente ainda necessitam de mais apoio na nossa sociedade e sim, iremos atrair controversas com isso, mas no fim? A nossa língua precisa evoluir, e se podemos substituir um "ele" desnecessariamente masculino com um "elu", por que não fazer isso agora? Elus falam que "elu" soa estranho e assim não é possível usar ela, mas estranheza? Ela vem pois "elu" realmente é fora do comum, mas sendo que estranheza vem de algo ser fora do comum? Significa que essa estranheza irá sumir se fizermos um uso maior desses pronomes, e ao se acostumar com elu? É possível perceber que "elu" é mais natural do que "ele", pois "elu" é realmente neutro, mas "ele"? É apenas aceito pois deixamos a binariedade afogar quaisquer outras alternativas, e com o viés à masculinidade? ele acaba sendo escolhido para uma falsa sensação de neutralidade.

---

## Notas Gerais

### Escolhas de internacionalização

#### 1)

Toolchain! Essa foi uma decisão super interessante e simples: se o termo não faz sentido traduzido? Fique com o termo original! Fiz o uso da tag `<abbr>` para explicar o que o termo significa, e em outras instâncias? Tentei reinforçar de que trabalhar na toolchain significa trabalhar na parte técnica da Quilt.

#### 2)

Mods, mod-loader, termos que váries jogadores do Minecraft modificado já adquiriram costume, o que é bom para nós pois não precisamos ficar falando "modificações modificações modificações"!

Porém, quando chegamos à termos como "modder" e "modding"? As coisas ficam complicadas. Eu optei em localizar isso como "a criação de mods" e "es criadores de mods" ao invés de usar o termo inglês. Há um limite para a quantidade de inglês que ume brasileire sem um certo nível de fluência nisso entenderia, e manter "modder" e "modding"? Talvez extrapolariam do limite.

#### 3)

É oficial! As palavras "Quilt", "Fabric" e "Forge" fazem uso dos pronomes a/ela/a! Essa decisão foi tomada pois "a \<X>" pode ser considerada uma encurtação de "a toolchain \<X>" e pois em geral? o/ele/o não soa bem com "o Quilt" e "o Fabric"; talvez "o Forge" funciona (e eu vi instâncias disso antes), mas para consistência? Optei por ir com "a Forge".

#### 3b)

Launchers, launchers, launchers. Ainda estou super em dúvida sobre o gênero gramatical delu. Eu começei com o/ele/o, troquei para a/ela/a, depois troquei para o/ele/o de novo, e lá vai eu com a/ela/a de novo. Eu prefiro o inglês ;-;

Mas é, apreciaria feedback sobre qual ficaria melhor.

#### 4)

"Here be dragons!"? Misericórdia, do nada terei que lidar com dragoes??? De onde surgiu essa de dragoes??? <!-- "mas cadê o acento?" isso foi intencional, é o plural de "dragoe", não "dragão" -->

Talvez essa expressão foi uma das piores nessa missão de internacionalizar o site, pois não há uma alternativa boa que capture 100% dela!

Nesse momento? Optei por imitar o Firefox e sua decisão de usar "siga com cautela" como uma substituta desta expressão. O interessante é a tradução do Minecraft, que utiliza "É por sua conta e risco!" como substituta, que é muito mais local, porém ela soa mais perigosa.

#### 5)

Care, cares, caring, são palavras até que complicadas de internacionalizar!

A tagline, "the mod-loader that cares"? Ele pode se tornar "o mod-loader que importa", porém há um significado ambíguo. Seria "the mod-loader that cares"?, "the mod-loader that matters"? Talvez "se importa" seria menos ambíguo, ou talvez pior. Vamos tentar ir com "se importa" por enquanto.

E sobre o cartão "Caring" na página principal? É pior ainda! Ainda tenho que traduzir essa linha, pois ainda não tenho certeza em uma boa tradução. Talvez "Gentil" funcionaria? Talvez não.

#### 6)

Ah, pluralidade. Os espaços de comunidade da Quilt foram excelentes nesse quisito, com vários sistemas plurais frequentando eles e com uma enorme aceitação nessa área. Mesmo sendo uma singlet? Eu agradeço muito por isso! O único problema, porém, é que devido aos espaços serem anglofônicos, toda a terminologia que eu conheço é em inglês.

Caso uma tradução da página da PluralKit acaba sendo necessária (veja: a seção "Outras considerações")? Eu não gostaria de ter uma mismatch entre uma versão semi-traduzida da terminologia em inglês e a terminologia usada localmente. Assim, eu agradeceria muito se fontes e recursos sobre pluralidade em português pudessem ser compartilhadas.

#### Considerações:

#### 1)

Algo que ainda não foi resolvido é o como que marcamos as informações relacionados aos espaços de comunidade como anglofônicas, pois nesse momento? Elas estão sendo traduzida, mas de uma forma que é como se os espaços de comunidade usassem a mesma língua que o site em português.

Seria interessante conversar com es desenvolvedores do site para ver a melhor opção que possa ser tomada.

#### 2)

Pineapple, ê famose mascote da Quilt, como que internacionalizaremos elu? Considerações importantes são de que os pronomes it/its não possuem uma tradução direta, e que se a palavra "abacaxi" for usada, "o abacaxi" não daria certo, teria que ser "ê Abacaxi". Na verdade? "ê Abacaxi" parece ser uma boa internacionalização! Mas ao mesmo tempo? "ê Pineapple" ainda funcionaria como uma ótima opção.

Mas no final? Será importante consultar com membres da comunidade sobre qual deverá ser a internacionalizaçaõ do nome. Essa decisão não pode ser tomada por apenas uma pessoa.

### Pronomes neutros

Com esta tradução, os pronomes neutros [ê/elu/e](https://pt.pronouns.page/elu) são usados para manter a neutralidade do texto original. É uma decisão simples, porém, em um mundo afogado de [o/ele/o](https://pt.pronouns.page/ele) = neutro? É impactante!

#### Considerações:

#### 1)

Os pronomes [o/ele/o](https://pt.pronouns.page/ele) ainda possui uma grande quantidade de special-casing que [a/ela/a](https://pt.pronouns.page/ela) e [ê/elu/e](https://pt.pronouns.page/elu) não possui. Isso significa que para o termo "desenvolvedore"? a/ela/a faria "a desenvolvedora" e ê/elu/e faria "ê desenvolvidore", porém, o/ele/o faria "o desenvolvedor" quando a lógica pede para "desenvolvedoro", assim, "desenvolvedores" acaba podendo significar "os desenvolvedores" ou "es desenvolvedores.

Pessoalmente? A solução não seria fazer com que "ê desenvolvedore" se torne "ê desenvolvedoro", isso apenas prejudicará o futuro; é o conjunto o/ele/o que necessita adotar "o desenvolvedoro", pois assim? "ê desenvolvedor" poderá se tornar neutro em geral e "ê desenvolvedore" se torne específico para não-bináries em um mundo onde esse viés foi esquecido. Nesse momento, porém, não é possível ter isso hoje, mas se pavimentar o caminho até lá? Já seria uma grande ajuda.

Esse é o meu sonho, porém, não sei se eu estou sozinha nesta proposta ou não. Nesta versão preliminar, ela está em mente quando eu penso em como neutralizar um termo, porém, a grande etapa que faz tudo fazer sentido? É, eu gostaria de feedback para que eu possa ir à frente com confiança.

#### 2)

Enquanto eu acho que consegui evitar o uso de termos "neutros", como "pessoa", isso aponta para uma coisa: precisamos de equivalentes verdadeiramente neutros para estas palavras, pois sim, na prática, "pessoa" é neutra, mas use isso para além de algo para misturar com termos "neutros" masculinos e desastre acontecerá. Eu veria um problema potencial em usar "pessoa" para se referir a ume pessoe não-binárie transmasculina se elu se sentir desconfortável com pronomes a/ela/a.

É importante explorar alternativas, talvez "pessoe", ou talvez algo que considere a história do termo, ou talvez algo que se inspira de uma outra língua! Eu estaria interessada em uma versão portuguesa de "folks"! Mas é, é necessário explorar a construção de termos que são 100% neutros.

#### 3)

O projeto da tradução é a primeira vez que eu realmente fiz uso de pronomes neutros para obter uma neutralidade pura de tanto medo que eu tive de usar (ê/elu/e para se referir à alguém? pior que é mais tranquilo). E eu tenho que admitir: eu sou uma ser medrosa, talvez até paranóica, e eu realmente tive medo de fazer os esforços dessa tradução pública. Agora? Eu consegui superar esse medo inicial, mas ainda há mais para ser feito, como anunciar esta PR para todes.

Mas é, com isso? A tradução talvez não possa ser perfeita, mas estou fazendo o meu melhor para fazer ela a melhor possível. Eu realmente apreciaria feedback nessa área pois é, eu realmente quero aprender ainda mais sobre usar pronomes neutros no Português! Só não quero "eh, o/ele/o melhor!" :P

Mas é, realmente, esta tradução está sendo feita com as melhores das minhas intenções. Não estou fazendo isso como um ato performativo, estou fazendo isso realmente como um pequeno passo para uma sociedade melhor, e se eu desviar da linha? Tenha em mente que não tive malícia! Me corrija! Eu apreciaria feedback para tudo que eu fiz até agora.

### Outras considerações

#### 1)

Enquanto esta tradutora (eu) possui um inglês textual fluente e um português que existe? Infelizmente eu fui colonizada pesadamente. Isso significa que internacionalizar o Inglês para o Português é uma grande dificuldade minha, e isso também significa que eu infelizmente não tenho muito contato com a comunidade brasileira online.

Essas duas coisas significam que irei precisar da ajuda de contribuidores para poder garantir a tradução seja perfeita para jogadores brasileires. Eu tento o meu melhor para evitar estranhezas (eu sou uma perfeccionista :P) mas isso significa que eu prefiro mais deixar uma lacuna em inglês do que falhar em internacionalizar ela.

"Um futuro melhor" já é um grande motor para praticamente tudo que eu faço, e esse motor impulsiona esse projeto também. Porém, sendo que traduzir as coisas não é minha profissão primária? Irei precisar da maior quantidade de ajuda possível para fazer essa tradução se tornar completa, e isso significa que qualquer ajuda conta! Mesmo se houver apenas um pequeno feedback? Isso já irá ajudar bastante nesse processo todo. Assim, não tenha medo em contribuir, pois toda a ajuda é bem-vinda!

#### 2)

Ah, o escopo da tradução. Pior que eu estou em dúvida se traduzir 100% das páginas é necessária! Um bom exemplo seria o blog e páginas que são específicas demais para os espaço de comunidade anglofônicas. Se conseguirmos determinar o escopo? Seria melhor.

Ainda tento traduzir páginas que talvez não seriam uma boa ideia traduzir, porém, um limite é necessário e ele deve ser estabelecido.

---

## Fontes e recursos

 - [A versão portuguesa de pronouns.page](https://pt.pronouns.page): Mesmo com ela tendo um foco no português europeu um pouco mais forte, este site foi uma fonte excelente sobre pronomes neutros! Eu realmente recomendo ela para quem quiser aprender mais sobre o seu uso.
 - [LanguageTool](https://languagetool.org/pt/): Fora da ferramenta não ter suporte para conjuntos como ê/elu/e? Ela foi útil para melhorar o português em certas ocasiões! Bom, pelo menos quando eu não tive preguiça de usar ela :P
 - Wiktionary ([Português](https://pt.wiktionary.org), [Inglês](https://en.wiktionary.org)): Esses foram os dicionários que foram utilizados para a tradução do site.
