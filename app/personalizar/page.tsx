"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "../../components/Nav";

type Mode = "self" | "assisted";

const SHOPIFY_CART_URL = "https://canekim.myshopify.com/cart/add";
const VARIANT_SELF = "49171883884727";
const VARIANT_ASSISTED = "49171883917495";

export default function PersonalizarPage() {
  const [mode, setMode] = useState<Mode>("self");
  const isSelf = mode === "self";

  return (
    <main>
      <Nav />
      <div className="container">
        <section className="section buyFlow">
          <span className="eyebrow">compra + personalização</span>
          <h1>Monte sua caneca do seu jeito.</h1>
          <p className="lead">
            Escolha se prefere preencher a homenagem agora ou se quer que a gente faça isso com você.
            Ao continuar, você será levado ao pagamento seguro da nossa loja Shopify.
          </p>

          <div className="choiceGrid">
            <button
              type="button"
              className={`choiceCard ${isSelf ? "selected" : ""}`}
              onClick={() => setMode("self")}
            >
              <span className="choiceCheck">{isSelf ? "✓" : "1"}</span>
              <strong>Eu mesmo personalizo</strong>
              <span>R$ 49,90</span>
              <small>Preencha mensagem, destinatário e tema. Você pode completar a mídia depois.</small>
            </button>

            <button
              type="button"
              className={`choiceCard ${!isSelf ? "selected" : ""}`}
              onClick={() => setMode("assisted")}
            >
              <span className="choiceCheck">{!isSelf ? "✓" : "2"}</span>
              <strong>Quero que montem para mim</strong>
              <span>R$ 69,90</span>
              <small>Ideal para idosos ou para quem prefere atendimento humano e mais simples.</small>
            </button>
          </div>

          <div className="formCard purchaseCard">
            <div className="purchaseHeader">
              <div>
                <span className="eyebrow">{isSelf ? "personalização simples" : "atendimento assistido"}</span>
                <h2>{isSelf ? "Conte um pouco sobre o presente" : "Deixe seus dados e nós ajudamos"}</h2>
              </div>
              <div className="priceTag">{isSelf ? "R$ 49,90" : "R$ 69,90"}</div>
            </div>

            <form method="post" action={SHOPIFY_CART_URL} className="formGrid">
              <input type="hidden" name="id" value={isSelf ? VARIANT_SELF : VARIANT_ASSISTED} />
              <input type="hidden" name="quantity" value="1" />
              <input type="hidden" name="return_to" value="/checkout" />
              <input
                type="hidden"
                name="properties[Tipo de personalização]"
                value={isSelf ? "Eu mesmo personalizo" : "Quero que montem para mim"}
              />

              {isSelf ? (
                <>
                  <label>
                    Para quem é o presente?
                    <input name="properties[Para]" placeholder="Ex.: Mãe, João, Vovó..." required />
                  </label>
                  <label>
                    De quem é?
                    <input name="properties[De]" placeholder="Seu nome" required />
                  </label>
                  <label className="full">
                    Mensagem principal
                    <textarea
                      name="properties[Mensagem]"
                      placeholder="Escreva a mensagem que a pessoa verá ao escanear o QR..."
                      required
                    />
                  </label>
                  <label>
                    Tema
                    <select name="properties[Tema]" defaultValue="amor">
                      <option value="amor">Amor</option>
                      <option value="familia">Família</option>
                      <option value="pet">Pet</option>
                      <option value="aniversario">Aniversário</option>
                      <option value="homenagem">Homenagem</option>
                    </select>
                  </label>
                  <label>
                    Link de foto, vídeo ou áudio (opcional)
                    <input name="properties[Mídia]" type="url" placeholder="https://..." />
                  </label>
                  <div className="full helperBox">
                    <strong>Não tem o vídeo ou as fotos agora?</strong>
                    <p>Sem problema. Finalize a compra e você poderá completar a memória depois pela área de personalização.</p>
                  </div>
                </>
              ) : (
                <>
                  <label>
                    Seu nome
                    <input name="properties[Nome do cliente]" placeholder="Seu nome" required />
                  </label>
                  <label>
                    WhatsApp
                    <input name="properties[WhatsApp]" inputMode="tel" placeholder="(41) 99999-9999" required />
                  </label>
                  <label>
                    E-mail
                    <input name="properties[E-mail para contato]" type="email" placeholder="voce@email.com" />
                  </label>
                  <label>
                    Para quem é a caneca?
                    <input name="properties[Para]" placeholder="Ex.: marido, neta, amiga..." />
                  </label>
                  <label className="full">
                    O que você gostaria de fazer?
                    <textarea
                      name="properties[Observações]"
                      placeholder="Pode escrever do seu jeito. Ex.: Quero homenagear minha esposa com 3 fotos e nossa música..."
                      required
                    />
                  </label>
                  <div className="full helperBox assisted">
                    <strong>Você não precisa saber mexer com tecnologia.</strong>
                    <p>Depois do pagamento, entraremos em contato pelo WhatsApp para receber fotos, vídeos e ajudar a montar tudo.</p>
                  </div>
                </>
              )}

              <div className="full checkoutBox">
                <div>
                  <strong>{isSelf ? "Caneca Interativa — Eu mesmo personalizo" : "Caneca Interativa — Montagem assistida"}</strong>
                  <p className="small">Seus dados de personalização serão anexados ao pedido da Shopify.</p>
                </div>
                <button className="button checkoutButton" type="submit">
                  Continuar para pagamento
                </button>
              </div>
            </form>
          </div>

          <div className="afterPurchase">
            <div>
              <span className="eyebrow">já comprou?</span>
              <h2>Continue ou edite sua memória</h2>
              <p className="muted">Entre na sua área para criar a página do QR, adicionar arquivos e editar o conteúdo quando quiser.</p>
            </div>
            <Link href="/login?next=/criar" className="button secondary">Acessar minha memória</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
