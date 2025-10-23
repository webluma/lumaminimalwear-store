# 🛍️ MinimalWear - E-commerce Demo

> **Live Demo de E-commerce Moderno com Next.js, Stripe e Design Responsivo**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe)](https://stripe.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## 🎯 Sobre o Projeto

**MinimalWear** é uma demonstração completa de um e-commerce moderno, desenvolvido para mostrar as melhores práticas em desenvolvimento web. O projeto apresenta uma loja de acessórios minimalistas com integração completa de pagamentos, carrinho persistente e design responsivo.

### ✨ Características Principais

- 🛒 **Carrinho de Compras Persistente** - Dados salvos no localStorage
- 💳 **Integração Stripe Completa** - Pagamentos seguros e funcionais
- 📱 **Design 100% Responsivo** - Mobile-first approach
- ⚡ **Performance Otimizada** - Next.js 15 com App Router
- 🎨 **UI/UX Moderna** - Design minimalista e elegante
- 🔍 **Sistema de Busca** - Busca inteligente de produtos
- ❤️ **Lista de Favoritos** - Funcionalidade completa de wishlist

## 🚀 Live Demo

### [🌐 Acessar Demo Online](https://minimalwear-demo.vercel.app)

**Credenciais de Teste:**

- **Cartão de Sucesso:** `4242 4242 4242 4242`
- **Data:** Qualquer data futura
- **CVC:** Qualquer 3 dígitos

## 🛠️ Stack Tecnológica

### Frontend

- **Next.js 15.5.5** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Framer Motion** - Animações fluidas
- **Lucide React** - Ícones modernos

### Backend & Integrações

- **Stripe API** - Processamento de pagamentos
- **Next.js API Routes** - Endpoints serverless
- **localStorage** - Persistência de dados do cliente

### Design & UX

- **Mobile-First** - Design responsivo otimizado
- **Componentes Reutilizáveis** - Arquitetura modular
- **Animações Suaves** - Transições e micro-interações
- **Acessibilidade** - Padrões WCAG

## 📱 Funcionalidades Demonstradas

### 🛒 E-commerce Core

- ✅ Catálogo de produtos com filtros
- ✅ Páginas individuais de produtos
- ✅ Carrinho de compras funcional
- ✅ Sistema de favoritos
- ✅ Busca inteligente
- ✅ Checkout completo

### 💳 Integração de Pagamentos

- ✅ Stripe Checkout integrado
- ✅ Processamento seguro de pagamentos
- ✅ Páginas de sucesso e cancelamento
- ✅ Limpeza automática do carrinho

### 📱 Responsividade

- ✅ Design mobile-first
- ✅ Breakpoints otimizados (sm, md, lg, xl)
- ✅ Touch-friendly interfaces
- ✅ Performance em dispositivos móveis

## 🎨 Design System

### Paleta de Cores

- **Primária:** Cinza escuro (#111827)
- **Secundária:** Cinza claro (#F9FAFB)
- **Acentos:** Preto (#000000)
- **Texto:** Escala de cinzas

### Tipografia

- **Headings:** Font-weight 300-700
- **Body:** Font-weight 400-500
- **Responsiva:** Escalas de 12px a 48px

### Componentes

- **Cards de Produto** - Layout consistente
- **Botões** - Estados hover e active
- **Formulários** - Validação visual
- **Modais** - Overlays elegantes

## 🔧 Instalação e Desenvolvimento

### Pré-requisitos

```bash
Node.js 18+
npm ou yarn
Conta Stripe (para pagamentos)
```

### Setup Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/minimalwear-demo.git
cd minimalwear-demo

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env.local

# Execute em desenvolvimento
npm run dev
```

### Variáveis de Ambiente

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_sua_chave_secreta
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_sua_chave_publica
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 📊 Performance

### Métricas Otimizadas

- **Lighthouse Score:** 95+ em todas as categorias
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1

### Otimizações Implementadas

- **Image Optimization** - Next.js Image component
- **Code Splitting** - Lazy loading de componentes
- **Bundle Analysis** - Otimização de tamanho
- **SEO** - Meta tags e structured data

## 🧪 Testes

### Cartões de Teste Stripe

- **Sucesso:** 4242 4242 4242 4242
- **Falha:** 4000 0000 0000 0002
- **3D Secure:** 4000 0025 0000 3155

### Cenários Testados

- ✅ Adicionar produtos ao carrinho
- ✅ Processar pagamento completo
- ✅ Navegação responsiva
- ✅ Persistência de dados
- ✅ Estados de erro

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Deploy automático
vercel --prod

# Ou conectar repositório GitHub
# Deploy automático a cada push
```

### Outras Plataformas

- **Netlify** - Compatível
- **Railway** - Suporte completo
- **AWS Amplify** - Configuração manual

## 📈 Roadmap

### Próximas Funcionalidades

- [ ] Sistema de avaliações
- [ ] Wishlist compartilhada
- [ ] Notificações push
- [ ] PWA (Progressive Web App)
- [ ] Analytics integrado
- [ ] Multi-idioma

## 🤝 Contribuição

Este é um projeto de demonstração, mas sugestões são bem-vindas!

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é de demonstração e está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

**Gabriel Lamsa**

- 🌐 [Portfolio](https://gabriellamsa.dev)
- 💼 [LinkedIn](https://linkedin.com/in/gabriellamsa)
- 📧 [Email](mailto:contato@gabriellamsa.dev)

---

<div align="center">
  <p>© 2025 Todos os direitos reservados</p>
</div>
