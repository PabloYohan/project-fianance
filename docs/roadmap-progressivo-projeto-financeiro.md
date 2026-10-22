# Roadmap progressivo — Sistema de Controle Financeiro Pessoal

> **Objetivo:** começar do absoluto básico e evoluir, por entregas verificáveis, até uma plataforma financeira confiável, segura, auditável e capaz de gerar análises e projeções.
>
> **Stack:** livre. Os exemplos descrevem comportamentos e conceitos, não dependem de linguagem, framework ou banco específico.
>
> **Estado inicial:** todas as caixas estão desmarcadas de propósito. Marque apenas o que você implementar e verificar, mesmo que já tenha desenvolvido parte do projeto.

## Como utilizar

- [X] Criar um repositório e colocar este arquivo na raiz.
- [X] Escolher uma cadência sustentável (sugestão: 3 a 5 sessões por semana, sem prazo rígido).
- [X] Trabalhar em uma etapa por vez; não antecipar tecnologias avançadas.
- [X] Para cada entrega, implementar, testar manualmente, registrar evidências e marcar os checkboxes.
- [X] Fazer um commit ao concluir cada etapa, preferencialmente com uma pequena demonstração no README.
- [X] Revisitar etapas anteriores quando novas regras exigirem refatoração.

**Definição de pronto para cada etapa:** funcionalidade executável, entradas inválidas tratadas, cenário feliz e ao menos um cenário de erro verificados, código versionado e breve registro do aprendizado.

**Progresso:** marque a conclusão de cada etapa somente quando todos os seus critérios obrigatórios estiverem atendidos. Desafios opcionais não bloqueiam o avanço.

---

# Nível 0 — Do zero ao primeiro programa

## Etapa 0.1 — Entender o produto
**Entrega:** especificação de uma página.

- [X] Escrever em 5 linhas o problema que o sistema resolve.
- [X] Definir quem utilizará o sistema inicialmente (uma pessoa).
- [X] Definir o que é receita e o que é despesa.
- [X] Definir a diferença entre data de lançamento, vencimento e pagamento.
- [X] Definir o escopo mínimo: cadastrar, listar, editar e excluir lançamentos.
- [X] Escrever 5 exemplos reais de lançamentos, sem dados sensíveis.

**Critério de conclusão:** explicar o produto e seu MVP sem citar tecnologias.

## Etapa 0.2 — Preparar o ambiente
**Entrega:** aplicação mínima executável.

- [X] Escolher uma linguagem e um ambiente de execução.
- [X] Inicializar repositório Git e criar README.
- [X] Configurar `.gitignore` e não versionar segredos.
- [X] Executar um programa que exibe `Sistema financeiro iniciado`.
- [X] Registrar instruções para executar localmente.
- [X] Fazer o primeiro commit.

**Aprendizado:** execução, estrutura de projeto, Git e documentação.

## Etapa 0.3 — Primeiro modelo, sem banco
**Entrega:** lançamentos armazenados temporariamente em memória.

- [ ] Definir os campos: identificador, descrição, valor, tipo e data.
- [ ] Representar receitas e despesas com tipos válidos explícitos.
- [ ] Criar uma função que adiciona um lançamento.
- [ ] Criar uma função que lista lançamentos.
- [ ] Calcular `receitas - despesas` em memória.
- [ ] Reiniciar a aplicação e observar que os dados se perdem.

**Critério de conclusão:** demonstrar o cálculo correto e explicar a limitação de não persistir os dados.

---

# Nível 1 — Primeiro CRUD funcional

## Etapa 1.1 — CRUD de categorias
**Entrega:** categorias como Alimentação, Transporte e Salário.

- [X] Criar modelo de categoria com ID, nome, tipo e status ativo.
- [X] Cadastrar categoria.
- [X] Listar categorias.
- [X] Consultar categoria pelo ID.
- [X] Editar nome e status.
- [X] Definir comportamento para exclusão (preferir desativação quando estiver em uso).
- [X] Rejeitar nome vazio e tipo inválido.
- [X] Verificar categoria inexistente.

**Aprendizado:** CRUD, identificadores, validação e ciclo de vida de entidades.

## Etapa 1.2 — CRUD de lançamentos
**Entrega:** cadastro completo de receitas e despesas.

- [X] Criar lançamento com descrição, valor, tipo, data e categoria.
- [X] Listar e consultar lançamentos.
- [X] Editar lançamento.
- [X] Excluir lançamento com comportamento documentado.
- [X] Rejeitar valores zero ou negativos para o campo de valor absoluto.
- [X] Rejeitar categoria inexistente ou incompatível com o tipo.
- [X] Implementar filtros por tipo e período.
- [X] Adicionar ordenação por data.

**Critério de conclusão:** executar manualmente criação, leitura, edição, exclusão e entradas inválidas.

## Etapa 1.3 — Primeiros relatórios
**Entrega:** resumo mensal simples.

- [ ] Somar receitas de um mês.
- [ ] Somar despesas de um mês.
- [ ] Calcular resultado do mês.
- [ ] Agrupar despesas por categoria.
- [ ] Verificar mês sem lançamentos.
- [ ] Verificar lançamentos na virada do mês.

**Desafio opcional:** exportar o resumo como CSV.

---

# Nível 2 — Persistência e organização

## Etapa 2.1 — Guardar dados de verdade
**Entrega:** dados sobrevivem ao reinício.

- [ ] Escolher armazenamento persistente (um banco relacional é uma boa opção).
- [ ] Criar tabelas/coleções de categorias e lançamentos.
- [ ] Mapear o relacionamento entre categoria e lançamento.
- [ ] Criar uma camada responsável por salvar e consultar dados.
- [ ] Testar reinício sem perda de dados.
- [ ] Definir como executar o armazenamento localmente.

**Aprendizado:** persistência, chaves, relacionamentos e consultas.

## Etapa 2.2 — Evoluir o esquema com segurança
**Entrega:** primeira migração versionada.

- [ ] Criar migração inicial do esquema.
- [ ] Adicionar um novo campo usando outra migração.
- [ ] Testar migrações em banco vazio.
- [ ] Testar migrações em banco com dados existentes.
- [ ] Documentar backup antes de mudanças destrutivas.

## Etapa 2.3 — Separar responsabilidades
**Entrega:** código organizado sem excesso de camadas.

- [ ] Separar entrada/saída, regras de negócio e acesso a dados.
- [ ] Evitar regras financeiras diretamente nos endpoints ou na interface.
- [ ] Padronizar respostas de sucesso e erro.
- [ ] Criar erros específicos para recurso não encontrado e entrada inválida.
- [ ] Refatorar um fluxo existente sem mudar seu comportamento.

**Aprendizado:** separação de responsabilidades e refatoração.

---

# Nível 3 — Dinheiro correto e testes

## Etapa 3.1 — Regras monetárias
**Entrega:** cálculos previsíveis.

- [ ] Usar representação decimal exata ou unidades inteiras (centavos), nunca ponto flutuante binário para valores monetários.
- [ ] Definir moeda e política de arredondamento.
- [ ] Testar `0,10 + 0,20 = 0,30`.
- [ ] Definir o significado de valor positivo/negativo no domínio.
- [ ] Testar datas, fuso horário e limites de período.
- [ ] Evitar duplicar cálculos financeiros em vários lugares.

## Etapa 3.2 — Testes de verdade
**Entrega:** suíte inicial de testes automatizados.

- [ ] Testar criação de lançamento válido.
- [ ] Testar rejeição de valor inválido.
- [ ] Testar cálculo do saldo.
- [ ] Testar filtro mensal e mudança de ano.
- [ ] Testar categoria inexistente.
- [ ] Testar integração com persistência usando banco de teste.
- [ ] Executar todos os testes com um único comando.

**Critério de conclusão:** um erro proposital em uma regra deve fazer ao menos um teste falhar.

---

# Nível 4 — Contas financeiras e consistência

## Etapa 4.1 — Múltiplas contas
**Entrega:** carteira, conta corrente e poupança.

- [ ] Criar contas com nome, tipo, moeda e saldo inicial.
- [ ] Vincular lançamentos a contas.
- [ ] Calcular saldo por conta a partir do saldo inicial e dos movimentos.
- [ ] Calcular saldo consolidado sem dupla contagem.
- [ ] Impedir movimentações em conta inexistente ou inativa.
- [ ] Testar contas sem movimentos.

## Etapa 4.2 — Transferências
**Entrega:** movimentar dinheiro entre contas sem criar receita ou despesa.

- [ ] Definir transferência com origem, destino, valor e data.
- [ ] Impedir transferência para a mesma conta.
- [ ] Debitar origem e creditar destino como operação atômica.
- [ ] Testar falha no meio da operação sem saldo parcialmente alterado.
- [ ] Garantir que transferências não aumentam receita nem despesa.
- [ ] Definir regra para saldo insuficiente (permitido ou bloqueado, conforme tipo de conta).

**Aprendizado:** transações de banco, invariantes e consistência.

## Etapa 4.3 — Pagamentos pendentes
**Entrega:** diferenciar previsto de realizado.

- [ ] Criar estados `PENDENTE`, `PAGO` e `CANCELADO` (ou equivalentes).
- [ ] Separar data de vencimento da data de pagamento.
- [ ] Definir quando um lançamento afeta saldo realizado.
- [ ] Implementar pagamento e cancelamento sem dupla contabilização.
- [ ] Listar contas a pagar e a receber.
- [ ] Testar pagamentos atrasados e antecipados.

---

# Nível 5 — Planejamento financeiro

## Etapa 5.1 — Orçamento mensal
**Entrega:** limite de gasto por categoria.

- [ ] Definir orçamento para categoria e mês.
- [ ] Comparar limite com despesas realizadas.
- [ ] Calcular valor restante e percentual utilizado.
- [ ] Sinalizar 80% e 100% de utilização.
- [ ] Testar categoria sem despesas e gastos acima do limite.

## Etapa 5.2 — Recorrências
**Entrega:** aluguel e salário gerados periodicamente.

- [ ] Criar regra de recorrência mensal.
- [ ] Gerar ocorrências futuras sem duplicar.
- [ ] Pausar e encerrar uma regra.
- [ ] Editar uma ocorrência sem alterar a série inteira.
- [ ] Editar todas as ocorrências futuras.
- [ ] Definir comportamento para dias 29, 30 e 31 em meses curtos.
- [ ] Testar reexecução do gerador.

## Etapa 5.3 — Metas financeiras
**Entrega:** meta de reserva de emergência.

- [ ] Criar meta com valor-alvo e prazo opcional.
- [ ] Registrar contribuições sem confundi-las com despesas.
- [ ] Calcular progresso e valor restante.
- [ ] Estimar prazo com contribuição mensal fixa.
- [ ] Simular dois valores diferentes de contribuição.

## Etapa 5.4 — Previsão de fluxo de caixa
**Entrega:** saldo projetado em 7, 30 e 90 dias.

- [ ] Partir do saldo realizado atual.
- [ ] Considerar lançamentos futuros pendentes.
- [ ] Considerar recorrências e transferências.
- [ ] Não contar duas vezes ocorrências geradas.
- [ ] Sinalizar dias com saldo projetado negativo.
- [ ] Comparar previsto e realizado em um período passado.

---

# Nível 6 — Cartão de crédito

## Etapa 6.1 — Cartão e fatura
**Entrega:** compras organizadas por ciclo.

- [ ] Criar cartão com limite, dia de fechamento e vencimento.
- [ ] Registrar compras no cartão sem debitar imediatamente a conta bancária.
- [ ] Determinar a fatura correta conforme a data da compra.
- [ ] Calcular total e limite disponível.
- [ ] Fechar fatura e registrar pagamento sem duplicar despesa.
- [ ] Testar compras próximas ao fechamento.

## Etapa 6.2 — Parcelamento e exceções
**Entrega:** faturas com compras parceladas.

- [ ] Dividir uma compra em parcelas com soma exatamente igual ao total.
- [ ] Distribuir parcelas nas faturas corretas.
- [ ] Tratar estorno parcial e total.
- [ ] Tratar pagamento parcial da fatura.
- [ ] Definir comportamento de antecipação de parcelas.
- [ ] Testar arredondamento de parcelas.

**Critério de conclusão:** demonstrar que compras, parcelas, pagamentos e estornos não duplicam valores.

---

# Nível 7 — Dados e automação

## Etapa 7.1 — Importação simples
**Entrega:** importar extrato CSV.

- [ ] Definir um formato CSV de entrada.
- [ ] Validar cabeçalhos, datas e valores.
- [ ] Exibir prévia antes de confirmar importação.
- [ ] Registrar linhas rejeitadas com motivo.
- [ ] Detectar possíveis duplicatas por chave/critério documentado.
- [ ] Testar o mesmo arquivo importado duas vezes.

## Etapa 7.2 — Mais formatos e classificação
**Entrega:** pipeline de importação extensível.

- [ ] Adicionar OFX.
- [ ] Adicionar XML quando houver formato concreto relevante.
- [ ] Separar parsing, normalização, validação, deduplicação e gravação.
- [ ] Criar regras de classificação por descrição.
- [ ] Permitir correção manual de classificação.
- [ ] Testar descrições ambíguas e regras conflitantes.

## Etapa 7.3 — Processamento assíncrono, somente se necessário
**Entrega:** importação grande sem bloquear a interação.

- [ ] Medir tempo e consumo de uma importação grande.
- [ ] Se necessário, implementar job em segundo plano.
- [ ] Exibir status do job e resultado final.
- [ ] Garantir reprocessamento sem duplicação.
- [ ] Avaliar fila externa apenas quando processamento local não for suficiente.

**Aprendizado:** ETL, jobs, idempotência e filas.

---

# Nível 8 — Usuários, segurança e auditoria

## Etapa 8.1 — Identidade e autorização
**Entrega:** cada usuário acessa apenas seus dados.

- [ ] Definir identidade do usuário e propriedade dos recursos.
- [ ] Implementar autenticação adequada ao tipo de aplicação.
- [ ] Proteger credenciais e segredos.
- [ ] Verificar autorização por recurso, não apenas por rota.
- [ ] Testar acesso de usuário A a dados de usuário B.
- [ ] Definir limites para tentativas abusivas.
- [ ] Avaliar login social somente se houver utilidade.

## Etapa 8.2 — Compartilhamento
**Entrega:** conta compartilhada com permissões.

- [ ] Criar papéis `OWNER`, `MEMBER` e `READ_ONLY` (ou equivalentes).
- [ ] Permitir convite e remoção de participantes.
- [ ] Restringir edição a papéis autorizados.
- [ ] Testar remoção de acesso e recursos privados.

## Etapa 8.3 — Auditoria
**Entrega:** histórico de mudanças relevantes.

- [ ] Registrar autor, momento e operação.
- [ ] Registrar valores anteriores e novos de campos relevantes.
- [ ] Auditar alterações de valor, status e conta.
- [ ] Evitar registrar senhas, tokens e dados sensíveis desnecessários.
- [ ] Definir política de retenção e acesso aos logs.
- [ ] Testar rastreabilidade de uma correção financeira.

---

# Nível 9 — Análises e qualidade de engenharia

## Etapa 9.1 — Dashboard
**Entrega:** visão financeira por período.

- [ ] Mostrar receitas, despesas e resultado.
- [ ] Mostrar gastos por categoria.
- [ ] Comparar mês atual com meses anteriores.
- [ ] Calcular taxa de poupança com definição explícita.
- [ ] Mostrar evolução patrimonial sem confundir transferência com receita.
- [ ] Testar filtros e intervalos vazios.

## Etapa 9.2 — Performance medida
**Entrega:** consultas mais rápidas com evidência.

- [ ] Gerar massa de dados de teste.
- [ ] Medir consultas mais lentas.
- [ ] Inspecionar planos de execução e avaliar índices.
- [ ] Comparar antes e depois.
- [ ] Considerar cache apenas se ainda existir gargalo.
- [ ] Documentar invalidação de cache se for implementado.

## Etapa 9.3 — Eventos internos
**Entrega:** ações desacopladas dentro da aplicação.

- [ ] Identificar evento de negócio real (ex.: orçamento excedido).
- [ ] Publicar evento interno após operação confirmada.
- [ ] Criar consumidor para alerta ou registro.
- [ ] Testar falha do consumidor sem corromper operação principal.
- [ ] Avaliar outbox, mensageria externa e retries somente quando necessários.

---

# Nível 10 — Operação e produção

## Etapa 10.1 — Ambiente reproduzível
**Entrega:** qualquer desenvolvedor consegue executar o projeto.

- [ ] Documentar dependências e variáveis de ambiente.
- [ ] Criar execução local reproduzível.
- [ ] Adicionar contêineres apenas se simplificarem a execução.
- [ ] Separar configuração local, teste e produção.
- [ ] Validar inicialização do zero.

## Etapa 10.2 — Integração contínua
**Entrega:** alterações validadas automaticamente.

- [ ] Executar testes a cada alteração enviada ao repositório.
- [ ] Executar build e análise estática.
- [ ] Bloquear integração de alterações que falham nos testes.
- [ ] Verificar dependências e exposição de segredos.

## Etapa 10.3 — Primeiro deploy
**Entrega:** sistema acessível em ambiente controlado.

- [ ] Escolher hospedagem com base em custo e necessidade.
- [ ] Configurar HTTPS, variáveis e acesso ao banco.
- [ ] Definir backups e testar restauração.
- [ ] Executar migrações com procedimento seguro.
- [ ] Registrar procedimento de rollback.
- [ ] Fazer smoke test após deploy.

## Etapa 10.4 — Observabilidade e resiliência
**Entrega:** detectar e diagnosticar falhas.

- [ ] Criar logs estruturados com identificador de requisição.
- [ ] Medir taxa de erro, latência e disponibilidade.
- [ ] Monitorar consultas lentas e falhas em jobs.
- [ ] Definir alertas úteis.
- [ ] Testar falha de banco e recuperação.
- [ ] Executar teste de carga com cenário representativo.
- [ ] Avaliar timeouts, retries, circuit breaker e filas apenas diante de falhas observadas.

---

# Nível 11 — Desafios avançados opcionais

Estas tarefas não são requisitos para considerar o projeto concluído.

- [ ] Implementar conciliação entre extrato importado e lançamentos existentes.
- [ ] Criar regras configuráveis de classificação de transações.
- [ ] Garantir idempotência em comandos e consumidores assíncronos.
- [ ] Testar concorrência em pagamentos e transferências.
- [ ] Implementar notificações confiáveis com reprocessamento.
- [ ] Avaliar mensageria externa com retry e dead-letter queue.
- [ ] Avaliar projeções/materialized views para relatórios pesados.
- [ ] Implementar rastreamento distribuído se houver serviços ou fluxos que justifiquem.
- [ ] Avaliar separação em serviços apenas mediante problema comprovado.

---

# Marcos de evolução

- [ ] **Marco A — Protótipo:** cadastrar lançamentos e calcular resultado em memória (Nível 0).
- [ ] **Marco B — MVP:** CRUD de categorias e lançamentos + resumo mensal (Nível 1).
- [ ] **Marco C — Aplicação persistente:** banco, migrações, organização e testes (Níveis 2–3).
- [ ] **Marco D — Financeiro confiável:** contas, transferências e pagamentos pendentes (Nível 4).
- [ ] **Marco E — Planejador financeiro:** orçamento, recorrências, metas e previsão (Nível 5).
- [ ] **Marco F — Gestão ampliada:** cartões, importação, usuários e auditoria (Níveis 6–8).
- [ ] **Marco G — Produto operacional:** dashboard, CI/CD, deploy, monitoramento e backups (Níveis 9–10).

# Diário de evolução (copie este modelo a cada sessão)

```md
## Sessão — AAAA-MM-DD
**Etapa atual:**
**O que implementei:**
- 
**O que testei:**
- 
**O que deu errado / como resolvi:**
- 
**O que aprendi:**
- 
**Próxima tarefa concreta:**
- [ ] 
```

# Regras permanentes do projeto

1. **Evolução incremental:** cada etapa deve deixar algo funcionando.
2. **Sem complexidade prematura:** não começar por microsserviços, Redis, Kafka ou infraestrutura elaborada.
3. **Corretude antes de recursos:** valores monetários, datas, duplicidade e consistência precisam estar corretos.
4. **Testar o comportamento:** não basta o endpoint responder; o saldo e os estados precisam fazer sentido.
5. **Revisitar o desenho:** refatorar é parte do aprendizado, não sinal de fracasso.
6. **Tecnologia é consequência:** escolher ferramentas depois de compreender o problema.

**Resultado esperado:** sair de um programa mínimo para um sistema financeiro pessoal robusto, preservando um histórico claro de decisões, testes, refatorações e novas competências adquiridas.
