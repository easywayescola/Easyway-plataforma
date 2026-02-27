# 🚀 Guia Completo: Deploy no Netlify

**Tempo estimado**: 10-15 minutos  
**Dificuldade**: Muito Fácil  
**Resultado**: Site online em produção

---

## 📋 Pré-requisitos

- ✅ Conta no GitHub (gratuita)
- ✅ Conta no Netlify (gratuita)
- ✅ Arquivos do projeto prontos

---

## ✅ Passo 1: Criar Repositório no GitHub

### 1.1 Acessar GitHub

1. Vá para https://github.com
2. Faça login (ou crie conta se não tiver)
3. Clique em "+" no canto superior direito
4. Selecione "New repository"

### 1.2 Criar Repositório

Preencha os campos:

| Campo | Valor |
|-------|-------|
| **Repository name** | `easyway-website` |
| **Description** | `Plataforma de aprendizado de inglês com Super Skills e Livro Interativo` |
| **Public/Private** | Public (para Netlify acessar) |
| **Add .gitignore** | Não (já temos) |
| **Add license** | Não |

Clique em **"Create repository"**

### 1.3 Copiar URL do Repositório

Você verá uma URL como:
```
https://github.com/seu-usuario/easyway-website.git
```

**Copie essa URL** - você vai precisar!

---

## 📤 Passo 2: Fazer Upload para GitHub

### 2.1 Abrir Terminal/PowerShell

**Windows**: Abra PowerShell  
**Mac/Linux**: Abra Terminal

### 2.2 Navegar para Pasta do Projeto

```bash
cd /home/ubuntu/easyway-website
```

### 2.3 Configurar Git (Se Não Tiver)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@example.com"
```

### 2.4 Adicionar Repositório Remoto

```bash
git remote add origin https://github.com/seu-usuario/easyway-website.git
```

**Substitua `seu-usuario` pelo seu usuário do GitHub!**

### 2.5 Fazer Upload

```bash
git branch -M main
git push -u origin main
```

Será pedido seu **GitHub username** e **password** (ou token).

**Pronto!** Seus arquivos estão no GitHub! 🎉

---

## 🌐 Passo 3: Deploy no Netlify

### 3.1 Acessar Netlify

1. Vá para https://netlify.com
2. Clique em **"Sign up"** (ou faça login)
3. Escolha **"Sign up with GitHub"**
4. Autorize Netlify a acessar sua conta GitHub

### 3.2 Criar Novo Site

1. Clique em **"New site from Git"** (ou "Add new site")
2. Selecione **"GitHub"**
3. Procure por **"easyway-website"**
4. Clique para selecionar

### 3.3 Configurar Deploy

Você verá uma tela com:

| Campo | Valor |
|-------|-------|
| **Branch to deploy** | `main` |
| **Build command** | (deixe vazio) |
| **Publish directory** | `.` (ponto) |

**Clique em "Deploy site"**

### 3.4 Aguardar Deploy

Netlify vai:
1. Fazer download dos arquivos
2. Processar o site
3. Gerar URL automática

**Isso leva 1-2 minutos** ⏳

---

## 🎉 Passo 4: Seu Site Está Online!

### 4.1 Acessar o Site

Netlify vai gerar uma URL como:
```
https://easyway-website-abc123.netlify.app
```

**Clique no link para acessar seu site!** 🌐

### 4.2 Testar Funcionalidades

- [ ] Página inicial carrega
- [ ] Login funciona
- [ ] Super Skills abre
- [ ] Livro Interativo abre
- [ ] Áudios tocam
- [ ] Responsividade em mobile

---

## 🔗 Passo 5: Configurar Domínio Personalizado (Opcional)

### 5.1 Se Você Tem um Domínio

**Exemplo**: `easyway.com.br`

1. No Netlify, vá para **"Domain settings"**
2. Clique em **"Add custom domain"**
3. Digite seu domínio: `easyway.com.br`
4. Clique em **"Verify"**

### 5.2 Configurar DNS

Netlify vai mostrar os **nameservers** para configurar:

```
dns1.p01.nsone.net
dns2.p01.nsone.net
dns3.p01.nsone.net
dns4.p01.nsone.net
```

1. Vá para seu registrador de domínio (GoDaddy, Registro.br, etc.)
2. Encontre **DNS settings**
3. Adicione os **nameservers** do Netlify
4. Salve as mudanças

**Espere 24-48 horas** para propagação do DNS ⏳

### 5.3 Ativar HTTPS

Netlify ativa HTTPS automaticamente! ✅

---

## 🔄 Passo 6: Fazer Atualizações

### 6.1 Modificar Arquivos Localmente

```bash
# Editar arquivo
# Depois fazer commit

git add .
git commit -m "Descrição da mudança"
git push origin main
```

### 6.2 Netlify Faz Deploy Automaticamente

Sempre que você fazer `git push`:
1. Netlify detecta mudança
2. Faz deploy automático
3. Site atualiza em 1-2 minutos

**Sem fazer nada manualmente!** 🤖

---

## 📊 Monitorar Seu Site

### 7.1 Dashboard do Netlify

No dashboard, você pode ver:

- ✅ Status do site (online/offline)
- ✅ Histórico de deploys
- ✅ Tempo de carregamento
- ✅ Erros (se houver)

### 7.2 Configurar Notificações

1. Vá para **"Site settings"**
2. Clique em **"Build & deploy"**
3. Configure notificações por email

---

## 🆘 Solução de Problemas

### Problema: "Erro 404 - Página não encontrada"

**Solução**: Certifique-se de que `index.html` está no repositório

```bash
ls -la /home/ubuntu/easyway-website/index.html
```

### Problema: "Áudios não tocam"

**Solução**: Verifique se pasta `audio/` está no repositório

```bash
ls -la /home/ubuntu/easyway-website/audio/
```

### Problema: "Netlify não encontra repositório"

**Solução**: Autorize Netlify a acessar GitHub

1. Vá para https://github.com/settings/applications
2. Procure por "Netlify"
3. Clique em "Authorize"

### Problema: "Deploy falhou"

**Solução**: Verifique logs no Netlify

1. No dashboard, clique em **"Deploys"**
2. Clique no deploy que falhou
3. Veja os logs de erro

---

## ✅ Checklist Final

Antes de considerar pronto:

- [ ] Repositório criado no GitHub
- [ ] Arquivos enviados para GitHub
- [ ] Site criado no Netlify
- [ ] URL gerada e funcionando
- [ ] Página inicial carrega
- [ ] Super Skills funciona
- [ ] Livro Interativo funciona
- [ ] Áudios tocam
- [ ] Responsividade OK
- [ ] Domínio configurado (opcional)
- [ ] HTTPS ativado

---

## 🎯 Resumo Rápido

| Etapa | Ação | Tempo |
|-------|------|-------|
| 1 | Criar repo GitHub | 2 min |
| 2 | Upload arquivos | 3 min |
| 3 | Conectar Netlify | 2 min |
| 4 | Deploy | 2 min |
| 5 | Testar | 3 min |
| **Total** | | **~12 min** |

---

## 📞 Suporte

### Se Tiver Dúvidas

- **Netlify Docs**: https://docs.netlify.com
- **GitHub Help**: https://docs.github.com
- **EasyWay Support**: contato@easyway.com.br

---

## 🎉 Parabéns!

Seu site está **online e acessível** para qualquer pessoa no mundo! 🌍

**URL do seu site**: `https://easyway-website-abc123.netlify.app`

---

**Próximos Passos:**
1. Compartilhar URL com alunos e professores
2. Coletar feedback
3. Fazer melhorias conforme necessário
4. Monitorar performance

---

*Desenvolvido com ❤️ para EasyWay Escola de Idiomas*

**"Olhando para o futuro com total confiança!"**
