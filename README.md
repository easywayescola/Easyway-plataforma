# 🌍 EasyWay - Plataforma de Aprendizado de Inglês

Uma plataforma web moderna e interativa para ensino de inglês com foco em educação socioemocional e gamificação.

![EasyWay](public/logo.png)

---

## ✨ Características Principais

### 📚 Para Alunos

- **Dashboard Personalizado**: Acompanhe seu progresso em tempo real
- **Quizzes Interativos**: Pratique em diferentes níveis (A1, A2, B1)
- **Gamificação**: Ganhe pontos, desbloqueie badges e compete no ranking
- **Super Skills**: Desenvolva habilidades socioemociais com histórias de super-heróis
- **Livro Interativo**: Leia histórias em inglês com exercícios de compreensão
- **Flashcards**: Memorize vocabulário de forma divertida

### 👨‍🏫 Para Professores

- **Gerenciamento de Turmas**: Organize e acompanhe seus alunos
- **Análise de Desempenho**: Visualize progresso detalhado de cada aluno
- **Relatórios**: Gere relatórios de desempenho
- **Atribuição de Tarefas**: Crie e distribua atividades personalizadas

### 🎓 Conteúdo Educacional

#### Super Skills (Educação Socioemocional)

Quatro lições focadas em desenvolvimento de liderança:

1. **Confidence** (Confiança)
   - Faça boas escolhas
   - Tente novamente
   - Acredite em si mesmo

2. **Kindness** (Gentileza)
   - Seja gentil
   - Ajude os outros
   - Compartilhe

3. **Perseverance** (Persistência)
   - Não desista
   - Continue tentando
   - Seja forte

4. **Leadership** (Liderança)
   - Seja um líder
   - Inspire outros
   - Lidere pelo exemplo

#### Livro Interativo

Seis histórias em inglês com diferentes níveis:

- **A1 - Iniciante**
  - The Little Cat 🐱
  - My Best Friend 👫
  - A Day at the Park 🌳

- **A2 - Elementar**
  - The Rainbow 🌈
  - My Family 👨‍👩‍👧‍👦
  - The Adventure 🗺️

Cada história inclui:
- Texto completo em inglês
- Vocabulário destacado com tradução
- Exercícios de compreensão
- Perguntas abertas para reflexão

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Design responsivo e moderno
- **JavaScript**: Interatividade
- **Responsive Design**: Funciona em desktop, tablet e mobile

**Sem dependências externas** - Tudo em vanilla HTML/CSS/JS para máxima compatibilidade e performance.

---

## 📁 Estrutura do Projeto

```
easyway-website/
├── index.html                    # Página inicial
├── login.html                    # Login para alunos e professores
├── student-dashboard.html        # Dashboard do aluno
├── teacher-dashboard.html        # Dashboard do professor
├── super-skills.html             # Educação socioemocional
├── storybook.html                # Livro interativo
├── public/
│   ├── logo.png                 # Logo da EasyWay
│   └── favicon.ico              # Ícone do navegador
├── README.md                     # Este arquivo
├── DEPLOYMENT.md                 # Guia de deployment
└── .gitignore                    # Arquivos ignorados pelo Git
```

---

## 🚀 Como Começar

### Desenvolvimento Local

1. **Clonar o repositório**
   ```bash
   git clone https://github.com/seu-usuario/easyway.git
   cd easyway-website
   ```

2. **Abrir em um servidor local**
   ```bash
   # Usando Python 3
   python -m http.server 8000
   
   # Ou usando Node.js
   npx http-server
   
   # Ou usando PHP
   php -S localhost:8000
   ```

3. **Acessar no navegador**
   ```
   http://localhost:8000
   ```

### Estrutura de Navegação

```
Home (index.html)
├── Login (login.html)
│   ├── Aluno → Student Dashboard
│   └── Professor → Teacher Dashboard
├── Student Dashboard (student-dashboard.html)
│   ├── Super Skills (super-skills.html)
│   ├── Storybook (storybook.html)
│   └── Quizzes por Nível
└── Teacher Dashboard (teacher-dashboard.html)
    ├── Gerenciamento de Turmas
    └── Análise de Desempenho
```

---

## 📱 Responsividade

A plataforma é totalmente responsiva:

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

Testado em:
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

---

## 🎨 Design e UX

### Paleta de Cores

| Cor | Código | Uso |
|-----|--------|-----|
| Primária | #FF6B6B | Botões, títulos, destaques |
| Secundária | #4ECDC4 | Gradientes, acentos |
| Escura | #2C3E50 | Texto principal |
| Clara | #F7F9FC | Fundo |
| Destaque | #FFE66D | Badges, alertas |

### Tipografia

- **Fonte**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Tamanhos**: 0.85rem - 3rem
- **Pesos**: 400, 600, 700

### Componentes

- Cards com sombra e hover effects
- Botões com feedback visual
- Barras de progresso animadas
- Modais interativos
- Tabelas responsivas
- Formulários validados

---

## 🔐 Segurança

### Implementações Atuais

- Validação de formulários no cliente
- Proteção contra XSS (HTML escaping)
- Links seguros (target="_blank" com rel)

### Recomendações para Produção

1. Implementar autenticação real (OAuth, JWT)
2. Usar HTTPS/SSL
3. Adicionar CORS headers
4. Implementar rate limiting
5. Usar Content Security Policy (CSP)
6. Validar dados no servidor
7. Implementar logging de segurança

---

## 📊 Gamificação

### Sistema de Pontos

- **Quiz Correto**: +10 pontos
- **Atividade Completa**: +5 pontos
- **Streak (7 dias)**: +50 pontos bônus
- **Nível Desbloqueado**: +100 pontos

### Badges

- 🥇 Iniciante (10 pontos)
- 🥈 Aprendiz (50 pontos)
- 🥉 Proficiente (100 pontos)
- 👑 Mestre (500 pontos)

### Ranking

Competição saudável entre alunos com:
- Posição na turma
- Pontos totais
- Nível atual
- Atividades completadas

---

## 🌐 Deployment

Para instruções detalhadas de deployment, veja [DEPLOYMENT.md](DEPLOYMENT.md)

### Opções Rápidas

**Netlify** (Recomendado):
```bash
npm install -g netlify-cli
netlify deploy
```

**Vercel**:
```bash
npm install -g vercel
vercel
```

**GitHub Pages**:
```bash
git push origin main
# Ativar GitHub Pages nas configurações
```

---

## 📈 Roadmap

### Versão 1.1
- [ ] Backend com Node.js/Express
- [ ] Banco de dados (PostgreSQL)
- [ ] Autenticação real
- [ ] Persistência de dados

### Versão 1.2
- [ ] App mobile (React Native)
- [ ] Integração com WhatsApp
- [ ] Certificados digitais
- [ ] Sistema de notificações

### Versão 2.0
- [ ] IA para feedback personalizado
- [ ] Reconhecimento de fala
- [ ] Aulas ao vivo
- [ ] Comunidade de alunos

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📞 Suporte

### Contato EasyWay

- **Email**: contato@easyway.com.br
- **WhatsApp**: (27) 99855-2277
- **Website**: https://easyway.com.br
- **Localização**: Aracruz, ES

### Reportar Bugs

Encontrou um bug? Abra uma issue no GitHub com:
- Descrição do problema
- Passos para reproduzir
- Navegador e versão
- Screenshots (se aplicável)

---

## 👥 Autores

**EasyWay Escola de Idiomas**
- Fundadora e Diretora: Hesione Aquino
- Missão: Transformar vidas através da educação bilíngue

---

## 🙏 Agradecimentos

- Aos alunos e professores da EasyWay
- À comunidade de desenvolvimento web
- Aos contribuidores e testers

---

## 📚 Recursos Adicionais

- [MDN Web Docs](https://developer.mozilla.org/)
- [Can I Use](https://caniuse.com/)
- [Web.dev](https://web.dev/)
- [A11y Project](https://www.a11yproject.com/)

---

**Última atualização**: 27 de fevereiro de 2026

**Status**: ✅ Produção Pronto

---

## 🎯 Visão da EasyWay

> "Olhando para o futuro com total confiança!"

Acreditamos que aprender inglês deve ser:
- 🎓 **Educativo**: Conteúdo de qualidade
- 🎮 **Divertido**: Gamificação e interatividade
- 🌱 **Transformador**: Desenvolvimento socioemocional
- 🌍 **Inclusivo**: Acessível para todos

---

**Obrigado por usar EasyWay! 🌟**
