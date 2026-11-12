import { useSuspenseQuery } from "@tanstack/react-query";
import { productsQueryOptions, type Product } from "@/lib/products.functions";

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <article
      className="group animate-rise overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className="aspect-square overflow-hidden bg-sand">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl leading-tight text-primary">{product.name.replace(/-/g, "\u2011")}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
      </div>
    </article>
  );
}

export function Collection() {
  const { data } = useSuspenseQuery(productsQueryOptions);

  return (
    <section id="collection" className="bg-card py-20 md:py-28">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-muted-foreground">Our Collection</p>
          <h2 className="font-display mt-3 text-4xl text-primary md:text-5xl">Discover Our Collection.</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            A little indulgence, a lot of flavour. Explore our debut treats—with more sweet creations
            joining the lineup soon.
          </p>
        </div>

        {data.error ? (
          <p className="mt-14 text-center text-muted-foreground">{data.error}</p>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}

        <p className="mx-auto mt-12 max-w-xl rounded-full bg-background px-6 py-3 text-center text-sm text-muted-foreground">
          More treats—including donuts, shortbread biscuits, and cookies—joining the collection soon.
        </p>
      </div>
    </section>
  );
}
