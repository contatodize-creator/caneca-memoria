# DizeCode

Plataforma de QR Codes dinâmicos que conecta produtos, presentes, embalagens, campanhas e materiais físicos a experiências digitais editáveis.

## O que funciona
- cadastro e login por e-mail/senha com Supabase Auth
- painel protegido por RLS
- criação, edição, pausa e exclusão de experiências
- upload privado de imagem, vídeo ou áudio
- QR permanente em SVG
- página pública `/m/[slug]`
- Edge Function `public-memory` para entrega segura da experiência pública
- URLs assinadas temporárias para arquivos privados
- contagem de escaneamentos
- planos e área comercial para revendedores

## Princípio do QR dinâmico
O QR impresso aponta para uma URL permanente da DizeCode. O conteúdo associado pode ser atualizado posteriormente sem reimprimir o QR.

A aplicação não depende de um domínio codificado no frontend. O endereço público deve ser definido pelo ambiente de produção e pelo domínio conectado ao deploy.

## Executar
```bash
npm install
npm run dev
```

As variáveis reais ficam em `.env.local`. A chave usada no frontend deve ser somente a chave publishable do Supabase. Nunca exponha `service_role` ou outras chaves secretas no frontend.

## Supabase
Os nomes internos existentes são mantidos para preservar compatibilidade com dados e QRs já criados:
- `public.memories` com RLS
- `public.memory_scans` com RLS
- bucket privado `memories`
- policies por `auth.uid()`
- Edge Function `public-memory`

Esses nomes são implementação interna; a interface pública utiliza a linguagem DizeCode, experiência e QR dinâmico.

## Fluxo principal
1. O cliente cria uma conta.
2. Cria uma experiência digital.
3. A DizeCode gera um slug opaco e um QR permanente.
4. O QR pode ser aplicado a qualquer produto ou material físico.
5. Ao escanear, a pessoa acessa `/m/{slug}`.
6. O conteúdo é entregue de forma segura.
7. O proprietário pode alterar o conteúdo sem trocar o QR impresso.

## Domínio
Quando o domínio oficial da DizeCode for adquirido, ele deverá ser conectado ao projeto de produção. Depois disso, os novos QRs usarão esse domínio automaticamente. Antes de imprimir QRs em produção, o domínio definitivo deve estar configurado.

## Próximas etapas
- finalizar a experiência pública de leitura do QR
- retirar textos remanescentes específicos de caneca da plataforma principal
- separar a oferta de caneca como um caso de uso/produto
- preparar integração comercial com Shopify e outros canais
- configurar domínio oficial antes da impressão dos QRs comerciais
