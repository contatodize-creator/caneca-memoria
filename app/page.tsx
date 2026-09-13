import Link from "next/link";
import Nav from "../components/Nav";
import { collections, physicalProducts } from "../lib/catalog";

export default function Home() {
  return (
    <main>
      <Nav />
      <div className="container">
        <section className="hero platformHero">
          <div>
            <span className="eyebrow">produto físico + experiência digital</span>
            <h1>Presentes que continuam contando histórias.</h1>
            <p className="lead">Escolha uma caneca, camiseta ou outro produto, personalize a arte e conecte um QR Code a fotos, vídeos, áudios, mensagens, links e surpresas.</p>
            <div className="actions">
              <Link href="/colecoes" className="button">Explorar coleções</Link>
              <Link href="/personalizar" className="button secondary">Criar do meu jeito</Link>
            </div>
            <div className="trustRow">
              <span>QR permanente</span><span>Conteúdo editável</span><span>Faça sozinho ou peça ajuda</span>
            </div>
          </div>

          <div className="experiencePreview">
            <div className="previewProduct">
              <span className="previewLabel">produto físico</span>
              <div className="mug modernMug">
                <div className="mugArt">
                  <div className="qrFake">▦</div>
                  <h3>Tem algo aqui para você.</h3>
                  <p className="small">Escaneie e descubra.</p>
                </div>
              </div>
            </div>
            <div className="previewArrow">→</div>
            <div className="phoneMock">
              <span className="previewLabel">experiência digital</span>
              <div className="phoneScreen">
                <span className="miniEyebrow">Uma surpresa para você</span>
                <div className="memoryCover">♥</div>
                <strong>Nossa história</strong>
                <p>Fotos, vídeo, áudio e uma mensagem especial.</p>
                <div className="miniButton">Abrir lembrança</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section compactSection">
          <div className="sectionHeading">
            <div><span className="sectionKicker">Para qualquer momento</span><h2>Comece pelo significado</h2></div>
            <Link href="/colecoes" className="textLink">Ver todas as coleções →</Link>
          </div>
          <div className="collectionGrid homeCollections">
            {collections.slice(0, 8).map((collection) => (
              <Link className="collectionCard compactCard" href={`/personalizar?colecao=${collection.slug}`} key={collection.slug}>
                <div className="collectionIcon">{collection.icon}</div>
                <h3>{collection.title}</h3>
                <p>{collection.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section splitFeature">
          <div>
            <span className="sectionKicker">Como funciona</span>
            <h2>Você vende o produto. O QR entrega a experiência.</h2>
            <p className="lead smallerLead">Cada item recebe um endereço digital próprio. O conteúdo pode ser criado antes ou depois da compra e continuar editável sem trocar o QR impresso.</p>
          </div>
          <div className="stepsList">
            <div className="step"><strong>01</strong><div><h3>Escolha</h3><p>O cliente seleciona tema, arte e produto físico.</p></div></div>
            <div className="step"><strong>02</strong><div><h3>Personalize</h3><p>Adiciona nome, mensagem, fotos, áudio, vídeo e links.</p></div></div>
            <div className="step"><strong>03</strong><div><h3>Presenteie</h3><p>O QR abre uma página única, bonita e preparada para celular.</p></div></div>
          </div>
        </section>

        <section className="section compactSection">
          <div className="sectionHeading"><div><span className="sectionKicker">Um motor, muitos produtos</span><h2>Começamos com canecas. Não paramos nelas.</h2></div></div>
          <div className="productGrid">
            {physicalProducts.map((product) => (
              <div className="physicalProduct" key={product.slug}>
                <span className="physicalIcon">{product.icon}</span>
                <strong>{product.title}</strong>
                <span className={product.status === "available" ? "status available" : "status"}>{product.status === "available" ? "Disponível" : "Em breve"}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="businessBand">
          <div>
            <span className="sectionKicker lightKicker">Para empresas</span>
            <h2>Um brinde pode virar catálogo, homenagem ou campanha.</h2>
            <p>Crie experiências para funcionários, clientes, eventos, escolas, profissionais e equipes — inclusive com QR individual para cada pessoa.</p>
          </div>
          <Link href="/personalizar?colecao=empresas" className="button lightButton">Criar para empresa</Link>
        </section>

        <section className="section finalCta">
          <span className="eyebrow">uma ideia, infinitas possibilidades</span>
          <h2>Transforme um objeto comum em algo que a pessoa vai querer escanear.</h2>
          <div className="actions centeredActions">
            <Link href="/personalizar" className="button">Começar agora</Link>
            <Link href="/colecoes" className="button secondary">Ver ideias</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
