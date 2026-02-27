# EasyWay English School - Guia de Deployment

## 📋 Visão Geral do Projeto

**EasyWay** é uma plataforma web completa de aprendizado de inglês com:

- **Dashboard do Aluno**: Acompanhamento de progresso, quizzes interativos, gamificação
- **Dashboard do Professor**: Gerenciamento de turmas, visualização de desempenho
- **Super Skills**: Educação socioemocional com tema de super-heróis
- **Livro Interativo**: Histórias em inglês com exercícios de compreensão
- **Sistema de Autenticação**: Login para alunos e professores

---

## 🗂️ Estrutura de Arquivos

```
easyway-website/
├── index.html                 # Página inicial
├── login.html                 # Página de login (alunos e professores)
├── student-dashboard.html     # Dashboard do aluno
├── teacher-dashboard.html     # Dashboard do professor
├── super-skills.html          # Educação socioemocional
├── storybook.html             # Livro interativo
├── public/
│   ├── logo.png              # Logo da EasyWay
│   └── favicon.ico           # Ícone do navegador
├── DEPLOYMENT.md             # Este arquivo
└── README.md                 # Documentação do projeto
```

---

## 🚀 Instruções de Deployment

### Opção 1: Hosting Estático (Recomendado)

#### Plataformas Suportadas:
- **Netlify** (Recomendado)
- **Vercel**
- **GitHub Pages**
- **AWS S3 + CloudFront**

#### Passos para Netlify:

1. **Criar conta em Netlify**
   - Acesse https://netlify.com
   - Faça login com GitHub, GitLab ou email

2. **Deploy via Drag & Drop**
   - Vá para https://app.netlify.com/drop
   - Arraste a pasta `easyway-website` para fazer upload
   - Netlify gerará um URL automaticamente

3. **Deploy via Git**
   ```bash
   # Fazer push do código para GitHub
   git init
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   
   # Conectar repositório no Netlify
   # Netlify fará deploy automático a cada push
   ```

4. **Configurar Domínio Personalizado**
   - Em Netlify: Site settings → Domain management
   - Adicione seu domínio (ex: easyway.com.br)
   - Configure DNS records

#### Passos para Vercel:

1. **Instalar Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Seguir as instruções interativas**

---

### Opção 2: Servidor Apache/Nginx

#### Requisitos:
- Servidor com Apache ou Nginx
- Acesso SSH
- Domínio configurado

#### Passos:

1. **Conectar ao servidor**
   ```bash
   ssh usuario@seu-servidor.com
   ```

2. **Criar diretório para o projeto**
   ```bash
   mkdir -p /var/www/easyway
   cd /var/www/easyway
   ```

3. **Upload dos arquivos**
   ```bash
   # Via SCP
   scp -r /caminho/local/easyway-website/* usuario@seu-servidor.com:/var/www/easyway/
   
   # Ou via Git
   git clone seu-repositorio.git .
   ```

4. **Configurar permissões**
   ```bash
   sudo chown -R www-data:www-data /var/www/easyway
   sudo chmod -R 755 /var/www/easyway
   ```

5. **Configurar Apache (Virtual Host)**
   ```apache
   <VirtualHost *:80>
       ServerName easyway.com.br
       ServerAlias www.easyway.com.br
       DocumentRoot /var/www/easyway
       
       <Directory /var/www/easyway>
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
       
       ErrorLog ${APACHE_LOG_DIR}/easyway-error.log
       CustomLog ${APACHE_LOG_DIR}/easyway-access.log combined
   </VirtualHost>
   ```

6. **Ativar o site**
   ```bash
   sudo a2ensite easyway
   sudo systemctl restart apache2
   ```

#### Configurar Nginx:

```nginx
server {
    listen 80;
    server_name easyway.com.br www.easyway.com.br;
    root /var/www/easyway;
    
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    error_log /var/log/nginx/easyway-error.log;
    access_log /var/log/nginx/easyway-access.log;
}
```

---

### Opção 3: Docker

#### Dockerfile:

```dockerfile
FROM nginx:alpine

# Copiar arquivos do projeto
COPY . /usr/share/nginx/html/

# Copiar configuração Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf:

```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
}
```

#### Build e Deploy:

```bash
# Build da imagem
docker build -t easyway:latest .

# Executar container
docker run -d -p 80:80 --name easyway easyway:latest

# Com Docker Compose
docker-compose up -d
```

---

## 🔒 Segurança

### Recomendações:

1. **HTTPS/SSL**
   - Use Let's Encrypt (gratuito)
   - Ative redirecionamento de HTTP para HTTPS
   ```bash
   # Certbot para Let's Encrypt
   sudo certbot --nginx -d easyway.com.br
   ```

2. **Headers de Segurança**
   ```nginx
   add_header X-Content-Type-Options "nosniff" always;
   add_header X-Frame-Options "SAMEORIGIN" always;
   add_header X-XSS-Protection "1; mode=block" always;
   add_header Referrer-Policy "no-referrer-when-downgrade" always;
   ```

3. **Backup Regular**
   - Fazer backup diário dos arquivos
   - Armazenar em local seguro

4. **Monitoramento**
   - Configurar alertas de erro
   - Monitorar uso de banda e CPU

---

## 📊 Performance

### Otimizações Implementadas:

✅ CSS e JavaScript inline (carregamento rápido)
✅ Imagens otimizadas
✅ Design responsivo
✅ Sem dependências externas pesadas

### Melhorias Futuras:

- Implementar service workers para offline
- Adicionar compressão Gzip
- Usar CDN para assets
- Minificar CSS e JavaScript

---

## 🧪 Testes Pré-Deployment

### Checklist:

- [ ] Testar em Chrome, Firefox, Safari, Edge
- [ ] Testar em dispositivos móveis (iOS e Android)
- [ ] Verificar todos os links
- [ ] Testar formulários de login
- [ ] Verificar responsividade em diferentes tamanhos
- [ ] Testar performance (Google PageSpeed)
- [ ] Verificar acessibilidade (WCAG 2.1)

### Ferramentas:

```bash
# Google Lighthouse
# PageSpeed Insights: https://pagespeed.web.dev/

# Testar links
npm install -g broken-link-checker
blc https://seu-site.com -r
```

---

## 📈 Monitoramento Pós-Deployment

### Métricas Importantes:

1. **Uptime**: Manter acima de 99.9%
2. **Tempo de Carregamento**: < 3 segundos
3. **Taxa de Erro**: < 0.1%
4. **Usuários Ativos**: Acompanhar crescimento

### Ferramentas Recomendadas:

- **Uptime Robot** (gratuito): Monitorar disponibilidade
- **Google Analytics**: Acompanhar usuários
- **Sentry**: Rastrear erros
- **New Relic**: Performance monitoring

---

## 🔄 Atualizações e Manutenção

### Processo de Atualização:

1. **Desenvolver em branch separado**
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```

2. **Testar localmente**
   ```bash
   # Abrir em navegador local
   python -m http.server 8000
   ```

3. **Fazer commit e push**
   ```bash
   git add .
   git commit -m "Adicionar nova funcionalidade"
   git push origin feature/nova-funcionalidade
   ```

4. **Criar Pull Request e revisar**

5. **Merge para main**
   - Netlify/Vercel fará deploy automático

---

## 📞 Suporte e Contato

### Para Problemas:

1. Verificar logs do servidor
2. Contatar suporte de hosting
3. Revisar documentação
4. Abrir issue no repositório

### Contato EasyWay:

- **Email**: contato@easyway.com.br
- **WhatsApp**: (27) 99855-2277
- **Website**: https://easyway.com.br

---

## 📝 Changelog

### Versão 1.0 (Atual)

**Features:**
- ✅ Dashboard do Aluno
- ✅ Dashboard do Professor
- ✅ Super Skills (4 lições)
- ✅ Livro Interativo (6 histórias)
- ✅ Sistema de Login
- ✅ Gamificação com pontos e ranking

**Próximas Versões:**
- Backend com banco de dados
- Autenticação real
- Certificados e badges
- Integração com WhatsApp
- App mobile

---

## 📄 Licença

Todos os direitos reservados © 2026 EasyWay Escola de Idiomas

---

**Última atualização**: 27 de fevereiro de 2026
