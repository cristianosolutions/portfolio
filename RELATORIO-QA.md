# Revisão do portfólio — 21/10/2026

## Resultado atual
Não foram encontrados problemas funcionais nos testes locais da versão atual. Nenhuma alteração adicional no código foi necessária nesta revisão. As mudanças de script.js e style.css já estavam presentes antes da revisão.

## Verificações concluídas no Microsoft Edge
- Onze larguras (225, 320, 360, 390, 430, 640, 641, 768, 844, 1024 e 1440 px) em cada tema: 22 combinações sem rolagem horizontal ou sobreposição do seletor de tema com a navegação.
- Auditoria axe WCAG 2/2.1 A/AA nos dois temas: nenhuma violação encontrada nos critérios automatizados.
- Tema escuro inicial mesmo com sistema em modo claro; escolha do tema claro preservada após recarregar.
- Cabeçalho com exatamente Início, Sobre, Projetos e Vamos conversar.
- Menu por ícone: abrir, selecionar seção, fechar com Escape e ao tocar fora, com retorno do foco por Escape.
- URL fixa nos cliques, destaque do menu e preservação dos parâmetros de consulta.
- Links recebidos com #contato chegam à seção e o fragmento é removido após carregar.
- Navegação por teclado, link de pular conteúdo, zoom CSS de 200% e preferência por movimento reduzido.
- IDs únicos, destinos das âncoras existentes, imagens carregadas, arquivos locais acessíveis sem HTTP 4xx/5xx e sem erros JavaScript.
- Assets sem imagens não utilizadas; currículo com assinatura PDF válida.
- Formulário rejeita e-mail inválido e prepara a solicitação de abertura do aplicativo para dados válidos; conteúdo dos campos permanece preservado.
- Sem JavaScript: navegação, e-mail direto e currículo continuam acessíveis.
- Contato sem título extra; formulário e rodapé enquadrados juntos em 1440x900 e 1920x920.
- No celular, o rodapé apresenta copyright, link Voltar ao início e redes sociais nessa ordem.
- Animação de fogos removida; nenhum canvas presente.
- Sintaxe de script.js e theme.js e git diff --check aprovados.
- Conferência da captura completa de desktop.

## Limitações
- Revisão local; não comprova que as últimas alterações já estejam publicadas na Netlify.
- Safari, Firefox, leitores de tela e aparelhos físicos não foram testados nesta execução.
- Auditoria automatizada não equivale à conformidade integral de acessibilidade.
- O formulário usa mailto. Nenhuma mensagem foi enviada; abertura real do aplicativo e recebimento dependem do dispositivo do visitante.
- O selo injetado pela Netlify não existe na prévia local. Sua posição deve ser conferida no site publicado.
- Destinos externos das redes e repositórios não foram auditados nesta execução.
- Lighthouse e desempenho em rede real não foram medidos.
## Revalidação em 22/10/2026
- Testes repetidos na versão com analytics.js: 22 combinações de layout/tema aprovadas, axe sem violações nos critérios testados, menu, URL fixa, formulário, teclado, zoom e fallback sem JavaScript aprovados.
- Sintaxe dos três scripts aprovada. O Analytics não carrega no servidor local por definição; a coleta precisa ser confirmada no painel da Vercel após visitas ao site publicado.
- Commit local e main consultada diretamente no GitHub: 5089eae (integração Analytics), iguais no momento da consulta. Nenhum commit local aguardando push.
- Alterações ainda sem commit: style.css (espaçamento do contato), script.js (somente quebra de linha final), LEIA-ME.txt e este relatório.