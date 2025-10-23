# Configuração do Stripe - LUMA Minimal Wear

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_SUA_CHAVE_SECRETA_AQUI
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_SUA_CHAVE_PUBLICA_AQUI

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 📋 Passos para Configuração

### 1. Criar Conta no Stripe

- Acesse [stripe.com](https://stripe.com)
- Crie uma conta gratuita
- Acesse o Dashboard do Stripe

### 2. Obter as Chaves de API

- No Dashboard, vá em **Developers** > **API Keys**
- Copie a **Publishable key** (começa com `pk_test_`)
- Copie a **Secret key** (começa com `sk_test_`)

### 3. Configurar Variáveis de Ambiente

- Crie o arquivo `.env.local` na raiz do projeto
- Substitua `SUA_CHAVE_SECRETA_AQUI` pela sua Secret Key
- Substitua `SUA_CHAVE_PUBLICA_AQUI` pela sua Publishable Key

### 4. Testar a Integração

- Execute `npm run dev`
- Acesse `http://localhost:3000`
- Teste o fluxo de compra

## 🔒 Segurança

⚠️ **IMPORTANTE**:

- Nunca commite as chaves reais no Git
- Use apenas chaves de teste para desenvolvimento
- Para produção, use chaves live (após aprovação do Stripe)

## 🚀 Deploy

Para deploy em produção:

1. Configure as variáveis de ambiente no seu provedor
2. Use chaves live do Stripe (após aprovação)
3. Configure webhooks se necessário

## 📞 Suporte

Para dúvidas sobre integração Stripe:

- [Documentação Stripe](https://stripe.com/docs)
- [Stripe Checkout](https://stripe.com/docs/checkout)
- [Webhooks](https://stripe.com/docs/webhooks)
