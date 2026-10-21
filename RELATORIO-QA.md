# Revisão do portfólio — 21/10/2026

## Resultado
A versão local foi revisada e testada no Microsoft Edge sem janela, via servidor HTTP local. As melhorias recentes de conteúdo, seção Experiência, tema por preferência do sistema e fechamento do menu ao tocar fora foram preservadas.

## Correção realizada
A alteração recente em initializeSectionLinks voltou a permitir que cliques acrescentassem fragmentos à URL. Foi restaurado o comportamento solicitado: rolar e mover o foco para a seção sem mudar o endereço. Um fragmento recebido num link externo abre a seção e é removido do endereço após o carregamento, preservando parâmetros de consulta.

## Verificações concluídas
- Sintaxe de script.js e theme.js e git diff --check.
- Onze larguras (225, 320, 360, 390, 430, 640, 641, 768, 844, 1024 e 1440 px) nos dois temas: sem rolagem horizontal nem sobreposição dos links com o seletor de tema.
- Imagens carregadas e referências locais acessíveis por HTTP.
- IDs únicos e destinos existentes para todas as âncoras internas.
- Tema inicial do sistema e restauração da escolha explícita após recarregar.
- Menu móvel: abrir, fechar por Escape, devolver o foco, fechar ao tocar fora e selecionar uma seção.
- Navegação para Experiência com destaque do menu correto e URL fixa.
- Link recebido com #contato e parâmetros: seção acessível, fragmento removido e parâmetros preservados.
- Link para pular conteúdo e foco do destino por teclado.
- Zoom CSS de 200% sem rolagem horizontal e preferência por movimento reduzido.
- Formulário: e-mail inválido rejeitado; campos válidos solicitam abrir o aplicativo; mensagem preservada. Nenhuma mensagem enviada.
- Sem JavaScript: menu, e-mail direto e link do currículo disponíveis.
- Auditoria axe WCAG 2/2.1 A/AA nos dois temas: zero violações encontradas.
- Sem erros JavaScript nem respostas HTTP de erro no carregamento testado.
- Capturas completas de celular e desktop inspecionadas visualmente.

## Limitações
- Testes feitos na versão local, não comprovam que o mesmo código já foi publicado na Netlify.
- Safari, Firefox e aparelhos físicos não foram testados nesta revisão.
- Auditoria automática não comprova conformidade integral de acessibilidade nem substitui avaliação com leitores de tela.
- O formulário usa mailto: a abertura e o envio efetivos dependem do aplicativo do visitante. O recebimento de e-mail não foi testado.
- Destinos externos de redes sociais e repositórios não foram auditados nesta execução.
- Lighthouse e métricas de desempenho em rede real não foram executados.

## Publicação
Enviar todos os arquivos modificados, incluindo theme.js e este relatório. Depois do deploy, conferir a versão pública e testar o formulário no aparelho usado pelo visitante.