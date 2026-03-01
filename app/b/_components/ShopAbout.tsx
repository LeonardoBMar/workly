interface ShopAboutProps {
  description?: string | null;
}

export default function ShopAbout({ description }: ShopAboutProps) {
  return (
    <div className="shop-section w-full">
      <h2 className="mb-4 text-lg font-semibold text-neutral-900">
        Sobre o estabelecimento
      </h2>

      {description && (
        <p className="mb-6 leading-relaxed text-neutral-600">{description}</p>
      )}

      <p className="mb-6 text-sm leading-relaxed text-neutral-500">
        Nosso espaço foi pensado para proporcionar a melhor experiência
        possível. Contamos com profissionais qualificados, ambiente aconchegante
        e os melhores produtos do mercado. Agende seu horário e venha nos
        conhecer!
      </p>
    </div>
  );
}
