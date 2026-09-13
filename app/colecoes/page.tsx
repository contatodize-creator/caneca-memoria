import Link from "next/link";
import Nav from "../../components/Nav";
import { collections, physicalProducts } from "../../lib/catalog";

export default function CollectionsPage() {
  return (
    <main>
      <Nav />
      <div className="container pageTop">
        <span className="eyebrow">escolha a ocasião, depois o produto</span>
        <h1 className="pageTitle">Encontre uma ideia para transformar em presente.</h1>
        <p className="lead">A mesma experiência digital pode viver em uma caneca hoje e, depois, em camisetas, ecobags, quadros, pratos, garrafas e outros produtos.</p>

        <section className="section compactSection">
          <div className="sectionHeading">
            <div><span className="sectionKicker">Coleções</span><h2>Comece pelo significado</h2></div>
          </div>
          <div className="collectionGrid">
            {collections.map((collection) => (
              <article className="collectionCard" key={collection.slug}>
                <div className="collectionIcon">{collection.icon}</div>
                <h3>{collection.title}</h3>
                <p>{collection.description}</p>
                <div className="tagRow">
                  {collection.examples.map((item) => <span className="tag" key={item}>{item}</span>)}
                </div>
                <Link href={`/produto/caneca?colecao=${collection.slug}`} className="textLink">Ver caneca desta coleção →</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section compactSection">
          <div className="sectionHeading">
            <div><span className="sectionKicker">Produtos físicos</span><h2>Um sistema, vários formatos</h2></div>
          </div>
          <div className="productGrid">
            {physicalProducts.map((product) => (
              product.status === "available" ? (
                <Link href="/produto/caneca" className="physicalProduct clickableProduct" key={product.slug}>
                  <span className="physicalIcon">{product.icon}</span>
                  <strong>{product.title}</strong>
                  <span className="status available">Disponível</span>
                </Link>
              ) : (
                <div className="physicalProduct" key={product.slug}>
                  <span className="physicalIcon">{product.icon}</span>
                  <strong>{product.title}</strong>
                  <span className="status">Em breve</span>
                </div>
              )
            ))}
          </div>
        </section>

        <section className="ctaBand">
          <div><span className="sectionKicker">Sua ideia não está aqui?</span><h2>Crie algo totalmente seu.</h2><p>Comece pela caneca e monte a experiência com texto, fotos, vídeos e áudio.</p></div>
          <Link href="/produto/caneca" className="button lightButton">Criar minha caneca</Link>
        </section>
      </div>
    </main>
  );
}
