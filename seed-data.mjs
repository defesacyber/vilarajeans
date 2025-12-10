import { drizzle } from 'drizzle-orm/mysql2';
import { categories, products } from './drizzle/schema.js';

const db = drizzle(process.env.DATABASE_URL);

const categoriesData = [
  {
    name: 'Core Denim',
    slug: 'core-denim',
    description: 'Do skinny ao reto, tecidos stretch e lavagens premium.'
  },
  {
    name: 'Camisaria Premium',
    slug: 'camisaria-premium',
    description: 'Caimento inteligente, toque macio, fácil de combinar.'
  },
  {
    name: 'Outlet',
    slug: 'outlet',
    description: 'Peças selecionadas com até 50% de desconto.'
  }
];

const productsData = [
  // Core Denim
  {
    categoryId: 1,
    name: 'Jeans Slim - Índigo Escuro',
    slug: 'jeans-slim-indigo-escuro',
    description: 'Jeans slim fit com lavagem índigo escuro. Tecido stretch de alta qualidade para máximo conforto. Perfeito para o dia a dia.',
    price: 19900, // R$ 199.00
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop',
    sizes: JSON.stringify(['36', '38', '40', '42', '44', '46']),
    colors: JSON.stringify(['Índigo Escuro']),
    stock: 50,
    featured: true,
    active: true
  },
  {
    categoryId: 1,
    name: 'Jeans Skinny - Azul Médio',
    slug: 'jeans-skinny-azul-medio',
    description: 'Jeans skinny com lavagem azul médio. Modelagem moderna e confortável.',
    price: 18900,
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop',
    sizes: JSON.stringify(['36', '38', '40', '42', '44', '46']),
    colors: JSON.stringify(['Azul Médio']),
    stock: 45,
    featured: true,
    active: true
  },
  {
    categoryId: 1,
    name: 'Jeans Reto - Lavagem Clara',
    slug: 'jeans-reto-lavagem-clara',
    description: 'Jeans de corte reto com lavagem clara. Estilo clássico e atemporal.',
    price: 17900,
    imageUrl: 'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=600&h=800&fit=crop',
    sizes: JSON.stringify(['36', '38', '40', '42', '44', '46']),
    colors: JSON.stringify(['Azul Claro']),
    stock: 40,
    featured: false,
    active: true
  },
  // Camisaria Premium
  {
    categoryId: 2,
    name: 'Camisa Básica - Branco',
    slug: 'camisa-basica-branco',
    description: 'Camisa básica de algodão premium. Essencial para qualquer guarda-roupa.',
    price: 12900,
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop',
    sizes: JSON.stringify(['P', 'M', 'G', 'GG']),
    colors: JSON.stringify(['Branco']),
    stock: 60,
    featured: true,
    active: true
  },
  {
    categoryId: 2,
    name: 'Camisa Social - Azul Marinho',
    slug: 'camisa-social-azul-marinho',
    description: 'Camisa social em tecido premium. Ideal para ocasiões formais.',
    price: 14900,
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop',
    sizes: JSON.stringify(['P', 'M', 'G', 'GG']),
    colors: JSON.stringify(['Azul Marinho']),
    stock: 35,
    featured: false,
    active: true
  },
  {
    categoryId: 2,
    name: 'Camisa Casual - Xadrez',
    slug: 'camisa-casual-xadrez',
    description: 'Camisa casual xadrez. Perfeita para o fim de semana.',
    price: 11900,
    imageUrl: 'https://images.unsplash.com/photo-1598032895397-b9372bc70ad4?w=600&h=800&fit=crop',
    sizes: JSON.stringify(['P', 'M', 'G', 'GG']),
    colors: JSON.stringify(['Xadrez Azul', 'Xadrez Vermelho']),
    stock: 30,
    featured: false,
    active: true
  },
  // Outlet
  {
    categoryId: 3,
    name: 'Jeans Bootcut - Preto',
    slug: 'jeans-bootcut-preto',
    description: 'Jeans bootcut preto. Modelo clássico com desconto especial.',
    price: 13900,
    compareAtPrice: 27900,
    imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&h=800&fit=crop',
    sizes: JSON.stringify(['36', '38', '40', '42', '44']),
    colors: JSON.stringify(['Preto']),
    stock: 20,
    featured: false,
    active: true
  },
  {
    categoryId: 3,
    name: 'Camisa Polo - Cinza',
    slug: 'camisa-polo-cinza',
    description: 'Camisa polo em algodão. Conforto e estilo com preço especial.',
    price: 6900,
    compareAtPrice: 13900,
    imageUrl: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&h=800&fit=crop',
    sizes: JSON.stringify(['P', 'M', 'G', 'GG']),
    colors: JSON.stringify(['Cinza', 'Preto']),
    stock: 25,
    featured: false,
    active: true
  },
  {
    categoryId: 3,
    name: 'Jeans Destroyed - Azul',
    slug: 'jeans-destroyed-azul',
    description: 'Jeans destroyed com lavagem especial. Estilo urbano com desconto.',
    price: 14900,
    compareAtPrice: 29900,
    imageUrl: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=600&h=800&fit=crop',
    sizes: JSON.stringify(['36', '38', '40', '42', '44', '46']),
    colors: JSON.stringify(['Azul Destroyed']),
    stock: 15,
    featured: true,
    active: true
  }
];

async function seed() {
  try {
    console.log('🌱 Iniciando seed do banco de dados...');

    // Insert categories
    console.log('📁 Inserindo categorias...');
    for (const category of categoriesData) {
      await db.insert(categories).values(category).onDuplicateKeyUpdate({
        set: { name: category.name, description: category.description }
      });
    }
    console.log('✅ Categorias inseridas com sucesso!');

    // Insert products
    console.log('📦 Inserindo produtos...');
    for (const product of productsData) {
      await db.insert(products).values(product).onDuplicateKeyUpdate({
        set: {
          name: product.name,
          description: product.description,
          price: product.price,
          imageUrl: product.imageUrl,
          stock: product.stock,
          featured: product.featured,
          active: product.active
        }
      });
    }
    console.log('✅ Produtos inseridos com sucesso!');

    console.log('🎉 Seed concluído!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao executar seed:', error);
    process.exit(1);
  }
}

seed();
