# Caneca Memória V3

V3 conectada ao projeto Supabase real `Caneca Memória`.

## O que funciona
- cadastro e login por e-mail/senha (Supabase Auth)
- painel protegido por RLS
- criação, edição, pausa e exclusão de memórias
- upload privado de imagem, vídeo ou áudio
- QR permanente em SVG
- página pública `/m/[slug]`
- Edge Function `public-memory` que entrega somente uma memória pelo slug
- URLs assinadas temporárias para arquivos privados
- contagem de escaneamentos

## Executar
```bash
npm install
npm run dev
```

As variáveis reais do projeto estão em `.env.local`. A chave usada é **publishable**, própria para frontend. Nunca adicione `service_role` ou secret key ao frontend.

## Supabase já configurado
- `public.memories` com RLS
- `public.memory_scans` com RLS
- bucket privado `memories`
- policies por `auth.uid()`
- Edge Function `public-memory` ativa

## Fluxo
1. Cliente cria conta em `/login`.
2. Cria memória em `/criar`.
3. O arquivo é salvo em `memories/{user_id}/{memory_id}/...`.
4. A memória gera um slug opaco e QR permanente.
5. O presenteado escaneia `/m/{slug}`.
6. A Edge Function busca só aquela memória, cria URL assinada por 1h e registra o acesso.
7. O comprador pode editar o conteúdo sem alterar o QR.

## Próximo passo comercial
Conectar o checkout Shopify: `orders/paid` cria um pedido de memória e entrega ao comprador um link seguro de personalização.
