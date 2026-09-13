export type Collection = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  examples: string[];
};

export type PhysicalProduct = {
  slug: string;
  title: string;
  icon: string;
  status: "available" | "coming-soon";
};

export const collections: Collection[] = [
  { slug: "amor", title: "Amor", description: "Presentes para casais, namoro, casamento e bodas.", icon: "♥", examples: ["Nossa história", "Pedido especial", "Aniversário de namoro"] },
  { slug: "familia", title: "Família", description: "Mãe, pai, avós, filhos e pessoas que fazem parte da sua história.", icon: "⌂", examples: ["Dia das Mães", "Avós", "Família"] },
  { slug: "bebes", title: "Bebês", description: "Nascimento, padrinhos, primeiro ano e lembranças de infância.", icon: "☁", examples: ["Nascimento", "Padrinhos", "Primeiro ano"] },
  { slug: "pets", title: "Pets", description: "Celebre seu companheiro com fotos, vídeos, histórias ou homenagem.", icon: "●", examples: ["Meu pet", "Adoção", "Memorial pet"] },
  { slug: "fe", title: "Fé", description: "Presentes religiosos personalizados com respeito a cada tradição.", icon: "✦", examples: ["Batismo", "Gratidão", "Mensagem de fé"] },
  { slug: "futebol", title: "Futebol & Esportes", description: "Torcida, pelada, corrida, academia e paixões esportivas.", icon: "⚽", examples: ["Torcedor", "Time da pelada", "Corrida"] },
  { slug: "humor", title: "Memes & Humor", description: "Piadas internas, amigos, trabalho e presentes que viram assunto.", icon: "☺", examples: ["Meme secreto", "Amigo", "Zoação"] },
  { slug: "profissoes", title: "Profissões", description: "Professor, enfermagem, direito, vendas, construção e muito mais.", icon: "◆", examples: ["Professor", "Saúde", "Vendas"] },
  { slug: "empresas", title: "Empresas", description: "Brindes, equipes, clientes, eventos, catálogos e campanhas.", icon: "▣", examples: ["Funcionários", "Clientes", "Eventos"] },
  { slug: "aniversarios", title: "Aniversários", description: "Do primeiro aniversário aos grandes marcos da vida.", icon: "★", examples: ["Infantil", "15 anos", "50+ anos"] },
  { slug: "amizade", title: "Amizade", description: "Momentos, despedidas, viagens e histórias que merecem ficar.", icon: "∞", examples: ["Melhores amigos", "Despedida", "Viagem"] },
  { slug: "lembrancas", title: "Lembranças", description: "Recordações afetivas, homenagens e histórias para guardar.", icon: "◇", examples: ["Homenagem", "Retrospectiva", "Memória especial"] },
];

export const physicalProducts: PhysicalProduct[] = [
  { slug: "canecas", title: "Canecas", icon: "◯", status: "available" },
  { slug: "camisetas", title: "Camisetas", icon: "T", status: "coming-soon" },
  { slug: "ecobags", title: "Ecobags", icon: "▱", status: "coming-soon" },
  { slug: "quadros", title: "Quadros", icon: "□", status: "coming-soon" },
  { slug: "garrafas", title: "Garrafas", icon: "│", status: "coming-soon" },
  { slug: "pratos", title: "Pratos", icon: "○", status: "coming-soon" },
];
