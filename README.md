# EVOA — Jardim das Origens

MVP de jogo mobile de fusão de criaturas, construído como PWA e pronto para publicação na Vercel.

## Como jogar

- Toque em **Despertar vida** para ocupar um casulo vazio.
- Selecione duas criaturas iguais para fundi-las.
- Cada fusão descobre uma criatura mais rara e gera Lúmen.
- Complete o Bestiário das 12 formas de vida.
- O progresso fica salvo automaticamente no dispositivo.

## Executar localmente

Não há dependências nem etapa de build. Sirva a pasta por HTTP:

```bash
python3 -m http.server 4173
```

Abra `http://localhost:4173`.

## Publicar na Vercel

1. Importe este repositório na Vercel.
2. Em **Framework Preset**, escolha `Other`.
3. Deixe **Build Command** vazio.
4. Deixe **Output Directory** como `.`.
5. Clique em **Deploy**.

## Stack

HTML, CSS e JavaScript puros, Web Audio, `localStorage`, Service Worker e Web App Manifest.
