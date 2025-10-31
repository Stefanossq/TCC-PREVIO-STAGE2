/**
 * @file Central registry for all project templates.
 * This file contains the content for every file in each project skeleton,
 * and exports a single `PROJECT_TEMPLATES` object that the application uses
 * to display file structures and generate project ZIP files.
 */

// --- COMMON FILE TEMPLATES ---

const faviconBase64Content = 'AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAA/4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
const nextConfigContent = `/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
`;
const postcssConfigContent = `module.exports = {
  plugins: [],
};
`;
const tsConfigContent = `{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@/convex/*": ["./convex/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`;
const gitignoreContent = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# Convex
.convex
convex/.convex
convex/dev.db*
`;


// --- TEMPLATES FOR 'STORE' PROJECT ---

const storePackageJsonContent = `{
  "name": "loja-simples-convex",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "next": "14.2.3",
    "convex": "^1.12.0",
    "@clerk/nextjs": "^5.1.2"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18"
  }
}`;
const storeReadmeContent = `# Loja Simples com Next.js, Convex e Clerk

Este é um projeto Next.js com um backend reativo usando Convex e autenticação gerenciada pelo Clerk.

## Pré-requisitos

- Node.js
- Uma conta Convex (gratuita em [convex.dev](https://convex.dev))
- Uma conta Clerk (gratuita em [clerk.com](https://clerk.com))

## Como Executar

1.  **Instale as Dependências:**
    *   Descompacte o arquivo .zip e navegue até a pasta do projeto no terminal.
    *   Execute \`npm install\`.

2.  **Configure o Clerk:**
    *   Faça login na sua conta Clerk e crie uma nova aplicação.
    *   Na dashboard do Clerk, vá para "API Keys". Copie a **Publishable key** e a **Secret key**.
    *   Ainda no Clerk, vá para "JWT Templates", crie um novo template e selecione a opção "Convex".
    *   Copie o valor do campo **Issuer URL**.

3.  **Configure o Convex:**
    *   No terminal, execute \`npx convex deploy\`. Isso irá:
        *   Pedir para você fazer login na sua conta Convex.
        *   Ajudá-lo a criar um novo projeto.
        *   O Convex irá detectar o arquivo \`convex/auth.config.ts\` e configurar o Clerk como provedor de autenticação automaticamente.

4.  **Configure as Variáveis de Ambiente:**
    *   Crie um arquivo \`.env.local\` na raiz do projeto. Você pode copiar o \`.env.local.example\`.
    *   Adicione as chaves do Clerk que você copiou no passo 2. O arquivo deve ficar parecido com isto:

    \`\`\`
    # Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_sua_chave_publica"
    CLERK_SECRET_KEY="sk_test_sua_chave_secreta"
    # Cole a Issuer URL do seu template JWT do Clerk aqui
    CLERK_JWT_ISSUER_DOMAIN="https_sua_issuer_url.clerk.accounts.dev"

    # A URL do Convex será preenchida automaticamente ao rodar 'npx convex dev'
    # NEXT_PUBLIC_CONVEX_URL=...
    \`\`\`

5.  **Execute a Aplicação:**
    *   Em um terminal, execute \`npx convex dev\` para iniciar o dashboard e o servidor de desenvolvimento do Convex. Ele irá popular o seu \`.env.local\` com a URL do projeto.
    *   Em **outro terminal**, execute \`npm run dev\` para iniciar o servidor de desenvolvimento do Next.js.
    *   Abra [http://localhost:3000](http://localhost:3000) no seu navegador. O banco de dados será populado com dados de exemplo na primeira visita.
`;
const convexSchemaContent = `import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    price: v.number(),
    description: v.string(),
    category: v.string(),
    stock: v.number(),
    imageUrl: v.string(),
  }),
  sales: defineTable({
    userId: v.id("users"),
    total: v.number(),
    items: v.array(v.object({
        productId: v.id("products"),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
    })),
    shippingAddress: v.object({
        fullName: v.string(),
        address: v.string(),
        city: v.string(),
        postalCode: v.string(),
    }),
  }),
  users: defineTable({
    name: v.string(),
    clerkId: v.string(),
  }).index("by_clerk_id", ["clerkId"]),
  cart: defineTable({
    userId: v.id("users"),
    items: v.array(
      v.object({
        productId: v.id("products"),
        quantity: v.number(),
      })
    ),
  }).index("by_userId", ["userId"]),
});
`;
const convexAuthConfigContent = `
export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
      applicationID: "convex",
    },
  ],
};
`;
const convexUsersContent = `import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const create = internalMutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Verifica se já existe um usuário com este clerkId
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existingUser) {
        console.log(\`Usuário com clerkId \${args.clerkId} já existe.\`);
        return existingUser._id;
    }
    
    // Se não existir, cria um novo usuário
    return await ctx.db.insert("users", {
      clerkId: args.clerkId,
      name: args.name,
    });
  },
});
`;
const convexProductsContent = `import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const requireAuth = async (ctx: any) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
        throw new Error("Autenticação necessária para realizar esta ação.");
    }
    return identity;
};

// Busca todos os produtos (público)
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("products").order("desc").collect();
  },
});

// Adiciona um novo produto (protegido)
export const add = mutation({
    args: {
        name: v.string(),
        price: v.number(),
        stock: v.number(),
        description: v.string(),
        category: v.string(),
        imageUrl: v.string()
    },
    handler: async (ctx, args) => {
        await requireAuth(ctx);
        const productId = await ctx.db.insert("products", args);
        return productId;
    }
});

// Atualiza um produto (protegido)
export const update = mutation({
    args: {
        id: v.id("products"),
        name: v.optional(v.string()),
        price: v.optional(v.number()),
        stock: v.optional(v.number()),
        description: v.optional(v.string()),
        category: v.optional(v.string()),
        imageUrl: v.optional(v.string())
    },
    handler: async (ctx, { id, ...rest }) => {
        await requireAuth(ctx);
        await ctx.db.patch(id, rest);
    }
});

// Deleta um produto (protegido)
export const remove = mutation({
    args: { id: v.id("products") },
    handler: async (ctx, args) => {
        await requireAuth(ctx);
        await ctx.db.delete(args.id);
    }
});

// Popula o banco com dados iniciais se estiver vazio (público)
export const seed = mutation({
    args: {},
    handler: async (ctx) => {
        const existingProducts = await ctx.db.query("products").collect();
        if (existingProducts.length > 0) {
            console.log("Banco de dados já populado. Semeamento ignorado.");
            return;
        }
        console.log("Banco de dados vazio. Semeando dados iniciais...");
        const initialProducts = [
            { name: 'Laptop Ultra Fino', price: 4999.90, description: 'Leve e potente, ideal para trabalho e entretenimento.', category: 'Eletrônicos', stock: 15, imageUrl: 'https://placehold.co/300x300/1f2937/d1d5db?text=Laptop' },
            { name: 'Smartphone 5G', price: 2499.00, description: 'Conectividade de ponta e câmera de alta resolução.', category: 'Eletrônicos', stock: 30, imageUrl: 'https://placehold.co/300x300/1f2937/d1d5db?text=Smartphone' },
            { name: 'Fone de Ouvido Bluetooth', price: 399.50, description: 'Som imersivo e cancelamento de ruído para total foco.', category: 'Acessórios', stock: 50, imageUrl: 'https://placehold.co/300x300/1f2937/d1d5db?text=Fone' },
            { name: 'Smartwatch Esportivo', price: 899.99, description: 'Monitore suas atividades físicas com estilo e precisão.', category: 'Acessórios', stock: 25, imageUrl: 'https://placehold.co/300x300/1f2937/d1d5db?text=Watch' },
        ];
        for (const product of initialProducts) {
            await ctx.db.insert("products", product);
        }
        console.log("Semeamento concluído.");
    }
});
`;
const convexOrdersContent = `import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Busca todas as vendas (para o painel de admin)
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    // NOTA: Em um aplicativo de produção, esta query deve ser protegida
    // para garantir que apenas administradores possam ver todas as vendas.
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return []; // Retorna vazio se não estiver logado
    return await ctx.db.query("sales").order("desc").collect();
  },
});

// Busca uma venda específica pelo ID (protegido para o dono da venda)
export const getById = query({
    args: { id: v.id("sales") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return null;
        }

        const sale = await ctx.db.get(args.id);
        if (!sale) {
            return null;
        }
        
        const user = await ctx.db.get(sale.userId);
        if (!user || user.clerkId !== identity.subject) {
            // O usuário logado não é o dono desta venda
            return null;
        }

        return sale;
    }
});

// Cria uma nova venda e atualiza o estoque (protegido)
export const create = mutation({
    args: {
        total: v.number(),
        items: v.array(v.object({
            productId: v.id("products"),
            name: v.string(),
            price: v.number(),
            quantity: v.number(),
        })),
        shippingAddress: v.object({
            fullName: v.string(),
            address: v.string(),
            city: v.string(),
            postalCode: v.string(),
        }),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Usuário não autenticado.");
        }

        // Função auxiliar para criar a venda e atualizar o estoque
        const createSaleAndUpdateStock = async (userId: Id<"users">) => {
            for (const item of args.items) {
               const product = await ctx.db.get(item.productId);
               if (!product) {
                   throw new Error(\`Produto com ID "\${item.productId}" não encontrado.\`);
               }
               if (product.stock < item.quantity) {
                   throw new Error(\`Estoque insuficiente para "\${product.name}". Disponível: \${product.stock}, Pedido: \${item.quantity}.\`);
               }
               const newStock = product.stock - item.quantity;
               await ctx.db.patch(item.productId, { stock: newStock });
           }
           const saleId = await ctx.db.insert("sales", { ...args, userId });

           // Limpa o carrinho do usuário após a venda ser criada
           const cart = await ctx.db
            .query("cart")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .unique();
           
           if (cart) {
               await ctx.db.patch(cart._id, { items: [] });
           }
           
           return saleId;
        };
        
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
            .unique();

        if (!user) {
             const newUser = { name: identity.name!, clerkId: identity.subject };
             const userId = await ctx.db.insert("users", newUser);
             return await createSaleAndUpdateStock(userId);
        } else {
             return await createSaleAndUpdateStock(user._id);
        }
    }
});
`;
const convexCartContent = `import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { MutationCtx } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

// Helper to get or create a user document from a mutation context
const getOrCreateUser = async (ctx: MutationCtx): Promise<Doc<"users">> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
        throw new Error("Usuário não autenticado.");
    }
    
    // Check if user exists
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (user !== null) {
        return user;
    }

    // If not, create a new user
    const newUser = {
        name: identity.name!,
        clerkId: identity.subject,
    };
    const userId = await ctx.db.insert("users", newUser);
    
    const createdUser = await ctx.db.get(userId);
    if (!createdUser) {
        // This case should not happen in practice
        throw new Error("Falha ao criar e buscar o usuário.");
    }
    return createdUser;
};

// Get cart for the current user, with product details
export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      return [];
    }
    
    const cart = await ctx.db
        .query("cart")
        .withIndex("by_userId", (q) => q.eq("userId", user._id))
        .unique();
    
    if (!cart) {
        return [];
    }

    const cartWithProducts = await Promise.all(cart.items.map(async (item) => {
        const product = await ctx.db.get(item.productId);
        if (!product) return null;
        return {
            ...product,
            quantity: item.quantity,
        };
    }));

    return cartWithProducts.filter(item => item !== null);
  },
});

// Add an item to the cart
export const addItem = mutation({
    args: { productId: v.id("products"), quantity: v.number() },
    handler: async (ctx, { productId, quantity }) => {
        const user = await getOrCreateUser(ctx);
        const userId = user._id;

        const cart = await ctx.db
            .query("cart")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .unique();

        if (!cart) {
            await ctx.db.insert("cart", {
                userId,
                items: [{ productId, quantity }],
            });
            return;
        }

        const existingItemIndex = cart.items.findIndex(item => item.productId === productId);
        
        if (existingItemIndex !== -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }
        
        await ctx.db.patch(cart._id, { items: cart.items });
    },
});

// Update item quantity
export const updateItemQuantity = mutation({
    args: { productId: v.id("products"), quantity: v.number() },
    handler: async (ctx, { productId, quantity }) => {
        const user = await getOrCreateUser(ctx);
        const cart = await ctx.db.query("cart").withIndex("by_userId", q => q.eq("userId", user._id)).unique();
        if (!cart) throw new Error("Carrinho não encontrado.");

        const itemIndex = cart.items.findIndex(item => item.productId === productId);
        if (itemIndex === -1) throw new Error("Item não encontrado.");

        if (quantity > 0) {
            cart.items[itemIndex].quantity = quantity;
        } else {
            cart.items.splice(itemIndex, 1);
        }

        await ctx.db.patch(cart._id, { items: cart.items });
    }
});


// Remove item from cart
export const removeItem = mutation({
    args: { productId: v.id("products") },
    handler: async (ctx, { productId }) => {
        const user = await getOrCreateUser(ctx);
        const cart = await ctx.db.query("cart").withIndex("by_userId", q => q.eq("userId", user._id)).unique();
        if (!cart) return;

        const updatedItems = cart.items.filter(item => item.productId !== productId);
        await ctx.db.patch(cart._id, { items: updatedItems });
    },
});

// Clear the cart
export const clear = mutation({
    args: {},
    handler: async (ctx) => {
        const user = await getOrCreateUser(ctx);
        const cart = await ctx.db.query("cart").withIndex("by_userId", q => q.eq("userId", user._id)).unique();
        if (cart) {
            await ctx.db.patch(cart._id, { items: [] });
        }
    }
});
`;
const convexProviderWithClerkContent = `"use client";
import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth } from "@clerk/nextjs";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexProviderWithClerkComponent({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}
`;
const convexJsonContent = `{
  "project": "seu-projeto-aqui",
  "team": "seu-time-aqui",
  "prodUrl": "https://seu-projeto-aqui.convex.cloud"
}
`;
const storeEnvExampleContent = `
# Clerk - Obtenha no dashboard do Clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Crie um template JWT para Convex no dashboard do Clerk e cole a Issuer URL aqui
CLERK_JWT_ISSUER_DOMAIN=

# Convex - Será preenchido automaticamente ao rodar 'npx convex dev'
NEXT_PUBLIC_CONVEX_URL=
`;
const storeTypesContent = `import { Doc } from "../convex/_generated/dataModel";

export type Product = Doc<"products">;

export interface CartItem extends Product {
  quantity: number;
}
`;
const storeGlobalsCssContent = `
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --background-dark: #111827;
  --background-light: #1f2937;
  --border-color: #374151;
  --text-primary: #f3f4f6;
  --text-secondary: #9ca3af;
  --primary-accent: #38bdf8;
  --primary-accent-hover: #0ea5e9;
  --green-accent: #22c55e;
  --green-accent-hover: #16a34a;
  --red-accent: #ef4444;
  --red-accent-hover: #dc2626;
  --container-width: 1200px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  background-color: var(--background-dark);
  color: var(--text-primary);
  line-height: 1.6;
}

a {
  color: var(--primary-accent);
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

a:hover {
  text-decoration: underline;
  color: var(--primary-accent-hover);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

h1, h2, h3 {
  line-height: 1.2;
}

button {
  cursor: pointer;
  font-family: inherit;
  border: none;
  background-color: transparent;
  color: inherit;
}
`;
const storeLayoutContent = `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConvexProviderWithClerkComponent from "./ConvexProviderWithClerk";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { ToasterProvider } from "@/context/ToasterContext";
import Toaster from "@/components/Toaster";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Minha Loja com Convex",
  description: "Loja Simples criada com Next.js e Convex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR} publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="pt-BR">
        <body className={inter.className}>
          <ConvexProviderWithClerkComponent>
            <ToasterProvider>
              <CartProvider>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <Header />
                  <main style={{ flexGrow: 1 }}>{children}</main>
                  <Footer />
                </div>
                <Toaster />
              </CartProvider>
            </ToasterProvider>
          </ConvexProviderWithClerkComponent>
        </body>
      </html>
    </ClerkProvider>
  );
}`;
const storeCartContextContent = `'use client';
import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { useUser } from '@clerk/nextjs';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { CartItem } from '@/types';
import { useToaster } from './ToasterContext';

interface CartContextType {
  cart: CartItem[];
  isLoading: boolean;
  addToCart: (productId: Id<"products">) => Promise<void>;
  removeFromCart: (productId: Id<"products">) => Promise<void>;
  updateCartQuantity: (productId: Id<"products">, newQuantity: number) => Promise<void>;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { isSignedIn } = useUser();
  const { showToast } = useToaster();
  
  const cartData = useQuery(api.cart.get, !isSignedIn ? 'skip' : undefined);
  
  const addItem = useMutation(api.cart.addItem);
  const removeItem = useMutation(api.cart.removeItem);
  const updateQuantity = useMutation(api.cart.updateItemQuantity);

  const isLoading = cartData === undefined;
  const cart = (cartData as CartItem[] | undefined) || [];

  const addToCart = async (productId: Id<"products">) => {
    if (!isSignedIn) {
        showToast('Você precisa estar logado para adicionar itens.', 'info');
        return;
    }
    try {
        await addItem({ productId, quantity: 1 });
        showToast('Produto adicionado ao carrinho!', 'success');
    } catch (error) {
        console.error('Failed to add item to cart:', error);
        showToast('Erro ao adicionar produto.', 'error');
    }
  };

  const removeFromCart = async (productId: Id<"products">) => {
    try {
        await removeItem({ productId });
        showToast('Produto removido do carrinho.', 'success');
    } catch (error) {
        console.error('Failed to remove item from cart:', error);
        showToast('Erro ao remover produto.', 'error');
    }
  };

  const updateCartQuantity = async (productId: Id<"products">, quantity: number) => {
    try {
        await updateQuantity({ productId, quantity });
    } catch (error) {
        console.error('Failed to update item quantity:', error);
        showToast('Erro ao atualizar quantidade.', 'error');
    }
  };

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const value: CartContextType = {
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
`;
const storeHomePageContent = `'use client';
import React, { useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Product } from '@/types';
import ProductList from '@/components/ProductList';
import styles from './page.module.css';

export default function HomePage() {
  const products = useQuery(api.products.get);
  const seedDatabase = useMutation(api.products.seed);

  useEffect(() => {
    // Se a busca de produtos retornou (não está undefined) e está vazia, popule o banco.
    if (products && products.length === 0) {
      seedDatabase();
    }
  }, [products, seedDatabase]);

  if (products === undefined) {
      return (
          <div className={styles.loading}>
              <div className={styles.spinner}></div>
              Carregando produtos...
          </div>
      )
  }

  const featuredProducts = products.slice(0, 4);

  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Bem-vindo à Nossa Loja!</h1>
          <p className={styles.heroSubtitle}>
              Os melhores produtos de tecnologia, com a confiança e segurança que você merece.
          </p>
          <a href="#produtos" className={styles.heroButton}>
            Ver Produtos
          </a>
      </section>

      <section id="destaques" className={styles.section}>
          <h2 className={styles.sectionTitle}>Produtos em Destaque</h2>
          <ProductList products={featuredProducts as Product[]} />
      </section>
      
      <section className={styles.section}>
           <div className={styles.benefitsGrid}>
                <div className={styles.benefitItem}>
                    <span className={styles.benefitIcon}>✅</span>
                    <h3 className={styles.benefitTitle}>Pagamento Seguro</h3>
                    <p>Utilizamos as melhores tecnologias.</p>
                </div>
                <div className={styles.benefitItem}>
                    <span className={styles.benefitIcon}>🚚</span>
                    <h3 className={styles.benefitTitle}>Entrega Rápida</h3>
                    <p>Receba seu produto em tempo recorde.</p>
                </div>
                <div className={styles.benefitItem}>
                    <span className={styles.benefitIcon}>💬</span>
                    <h3 className={styles.benefitTitle}>Suporte Humanizado</h3>
                    <p>Nossa equipe está pronta para ajudar.</p>
                </div>
           </div>
      </section>

      <section id="produtos" className={styles.section}>
        <h2 className={styles.sectionTitle}>Todos os Nossos Produtos</h2>
        <ProductList products={products as Product[]} showSearch={true} />
      </section>
    </div>
  );
};
`;
const storeHomePageCssContent = `
.section {
  max-width: var(--container-width);
  margin: 4rem auto;
  padding: 0 1.5rem;
}

.sectionTitle {
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    min-height: 50vh;
    text-align: center;
    font-size: 1.25rem;
    color: var(--text-secondary);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid var(--primary-accent);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}


.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 5rem 1.5rem;
  background-color: var(--background-light);
  border-bottom: 1px solid var(--border-color);
}

.heroTitle {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 1.25rem;
}

.heroSubtitle {
  color: var(--text-secondary);
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 600px;
}

.heroButton {
  background-color: var(--primary-accent);
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.1rem;
  transition: background-color 0.2s;
  text-decoration: none;
}

.heroButton:hover {
  background-color: var(--primary-accent-hover);
  color: white;
}

.benefitsGrid {
  display: flex;
  justify-content: space-around;
  text-align: center;
  flex-wrap: wrap;
  gap: 1.25rem;
  background-color: var(--background-light);
  padding: 2.5rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.benefitItem {
  color: var(--text-secondary);
  flex: 1;
  min-width: 200px;
}

.benefitIcon {
  font-size: 2rem;
}

.benefitTitle {
  font-weight: 700;
  margin: 0.5rem 0;
  font-size: 1.1rem;
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .heroTitle {
    font-size: 2.5rem;
  }
  .heroSubtitle {
    font-size: 1rem;
  }
  .sectionTitle {
    font-size: 2rem;
  }
}
`;
const storeProductListComponent = `'use client';
import React, { useState } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import styles from './ProductList.module.css';

interface ProductListProps {
  products: Product[];
  showSearch?: boolean;
}

export default function ProductList({ products, showSearch = false }: ProductListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {showSearch && (
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      )}
      <div className={styles.productListGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className={styles.noProducts}>Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
}`;
const storeProductListCssContent = `
.searchContainer {
  margin-bottom: 2.5rem;
  display: flex;
  justify-content: center;
}

.searchInput {
  display: block;
  width: 100%;
  max-width: 500px;
  padding: 0.8rem 1rem;
  background-color: var(--background-light);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
}

.searchInput:focus {
  outline: none;
  border-color: var(--primary-accent);
}

.productListGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.noProducts {
  text-align: center;
  color: var(--text-secondary);
  grid-column: 1 / -1;
}
`;
const storeProductCardContent = `'use client';
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import styles from './ProductCard.module.css';
import { Id } from '@/convex/_generated/dataModel';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleButtonClick = async (productId: Id<"products">) => {
    setIsAdding(true);
    await addToCart(productId);
    setIsAdding(false);
  };
  
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.imageContainer}>
          <img src={product.imageUrl} alt={product.name} className={styles.image} />
        </div>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
      </div>
      <div className={styles.cardFooter}>
        <p className={styles.price}>R$ {product.price.toFixed(2).replace('.', ',')}</p>
        <button 
          className={styles.button}
          onClick={() => handleButtonClick(product._id)}
          disabled={isAdding}
        >
          {isAdding ? 'Adicionando...' : 'Adicionar ao Carrinho'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;`;
const storeProductCardCssContent = `
.card {
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background-color: var(--background-light);
  padding: 1.25rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
}

.imageContainer {
  width: 100%;
  aspect-ratio: 1 / 1;
  position: relative;
  margin-bottom: 1rem;
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  min-height: 2.5em; /* Two lines */
}

.description {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
  flex-grow: 1;
}

.price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-accent);
  margin-bottom: 1rem;
}

.button {
  background-color: var(--primary-accent);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 700;
  width: 100%;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.button:hover {
  background-color: var(--primary-accent-hover);
}

.button:disabled {
  cursor: not-allowed;
  background-color: #0c8ab8;
}
`;
const storeHeaderContent = `'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './Header.module.css';
import { SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';

const Header: React.FC = () => {
  const { cartCount } = useCart();
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>Minha Loja</Link>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <SignedIn>
            <Link href="/admin" className={styles.navLink}>Admin</Link>
        </SignedIn>
        <Link href="/cart" className={styles.navLink}>
          🛒 Carrinho
          {cartCount > 0 && (
            <span className={styles.cartCount}>
              {cartCount}
            </span>
          )}
        </Link>
        <SignedOut>
            <div className={styles.signInButton}>
                <SignInButton mode="modal" />
            </div>
        </SignedOut>
        <SignedIn>
            <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </nav>
    </header>
  );
};

export default Header;
`;
const storeHeaderCssContent = `
.header {
  background-color: rgba(17, 24, 39, 0.8);
  backdrop-filter: blur(10px);
  padding: 1.25rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 50;
}

.logo {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
}
.logo:hover {
    color: var(--text-primary);
}


.nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.navLink {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
  position: relative;
}

.navLink:hover {
  color: var(--text-primary);
}

.signInButton button {
    background-color: var(--primary-accent);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-weight: 600;
    transition: background-color 0.2s;
}

.signInButton button:hover {
    background-color: var(--primary-accent-hover);
}

.cartCount {
  position: absolute;
  top: -8px;
  right: -12px;
  background-color: var(--red-accent);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
}

@media (max-width: 640px) {
  .header {
    flex-direction: column;
    gap: 1rem;
  }
  .nav {
    gap: 1.5rem;
  }
}
`;
const storeFooterContent = `import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
          <p>Minha Loja © ${new Date().getFullYear()} - Todos os direitos reservados.</p>
          <p className={styles.contact}>Contato: contato@minhaloja.com | (11) 99999-8888</p>
      </div>
    </footer>
  );
};

export default Footer;
`;
const storeFooterCssContent = `
.footer {
  background-color: var(--background-dark);
  color: var(--text-secondary);
  padding: 2.5rem 1.25rem;
  text-align: center;
  border-top: 1px solid var(--border-color);
  margin-top: auto;
}

.container {
  max-width: var(--container-width);
  margin: 0 auto;
}

.contact {
  margin-top: 0.5rem;
  font-size: 0.9rem;
}
`;
const storeCartPageContent = `'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useUser, SignInButton } from '@clerk/nextjs';
import styles from './page.module.css';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, isLoading } = useCart();
  const { isSignedIn } = useUser();
  const router = useRouter();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }
    // A verificação de login será feita na página de checkout
    router.push('/checkout');
  };

  if (isLoading) {
    return (
        <div className={styles.container}>
             <h1 className={styles.title}>Seu Carrinho</h1>
             <p className={styles.emptyMessage}>Carregando carrinho...</p>
        </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Seu Carrinho</h1>
      {cart.length === 0 ? (
        <p className={styles.emptyMessage}>Seu carrinho está vazio.</p>
      ) : (
        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {cart.map(item => (
              <div key={item._id} className={styles.cartItem}>
                <div className={styles.itemDetails}>
                  <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />
                  <div>
                    <h2 className={styles.itemName}>{item.name}</h2>
                    <p className={styles.itemPrice}>R$ {item.price.toFixed(2).replace('.', ',')}</p>
                  </div>
                </div>
                <div className={styles.itemControls}>
                  <div className={styles.quantityControl}>
                    <button onClick={() => updateCartQuantity(item._id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item._id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item._id)} className={styles.removeButton}>Remover</button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Total: R$ {total.toFixed(2).replace('.', ',')}</h2>
            {isSignedIn ? (
                <button
                onClick={handleCheckout}
                className={styles.checkoutButton}
                disabled={cart.length === 0}
                >
                Ir para o Checkout
                </button>
            ) : (
                <div className={styles.signInPrompt}>
                    <p>Você precisa estar logado para continuar.</p>
                    <SignInButton mode="modal">
                        <button className={styles.checkoutButton}>Fazer Login</button>
                    </SignInButton>
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
`;
const storeCartPageCssContent = `.container {
  max-width: 900px;
  margin: 2.5rem auto;
  padding: 2rem;
  background-color: var(--background-light);
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.emptyMessage {
  color: var(--text-secondary);
}

.cartItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
}
.cartItem:last-child {
  border-bottom: none;
}

.itemDetails {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.itemImage {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.itemName {
  font-size: 1.1rem;
  font-weight: 600;
}
.itemPrice {
  color: var(--primary-accent);
}

.itemControls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quantityControl {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 6px;
}
.quantityControl button {
  padding: 0.25rem 0.75rem;
  font-size: 1.2rem;
}
.quantityControl span {
  padding: 0.25rem 1rem;
}

.removeButton {
  color: var(--red-accent);
  font-weight: 600;
}
.removeButton:hover {
  color: var(--red-accent-hover);
}

.summary {
  margin-top: 2rem;
  text-align: right;
  border-top: 2px solid var(--border-color);
  padding-top: 1.5rem;
}

.summaryTitle {
  font-size: 1.5rem;
  font-weight: 700;
}

.checkoutButton {
  margin-top: 1rem;
  background-color: var(--primary-accent);
  color: white;
  font-weight: 700;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  transition: background-color 0.2s, opacity 0.2s;
}
.checkoutButton:hover {
  background-color: var(--primary-accent-hover);
}
.checkoutButton:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.signInPrompt {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
}
.signInPrompt p {
    color: var(--text-secondary);
}


@media (max-width: 640px) {
    .cartItem, .itemControls {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
    .itemControls {
        align-items: flex-start;
        width: 100%;
        margin-top: 0.5rem;
    }
    .summary {
        text-align: center;
    }
    .signInPrompt {
        align-items: center;
    }
}
`;
const checkoutPageContent = `'use client';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser, RedirectToSignIn } from '@clerk/nextjs';
import styles from './page.module.css';

const CheckoutPage: React.FC = () => {
  const { cart } = useCart();
  const createOrder = useMutation(api.orders.create);
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn, isLoaded, user } = useUser();
  const router = useRouter();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.fullName || '',
    address: '',
    city: '',
    postalCode: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }
    setIsLoading(true);

    const saleData = {
      items: cart.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: total,
      shippingAddress: shippingInfo,
    };

    try {
      const orderId = await createOrder(saleData);
      router.push(\`/order-confirmation?orderId=\${orderId}\`);
    } catch (error) {
      console.error("Falha ao criar o pedido:", error);
      alert(\`Ocorreu um erro ao criar o pedido: \${(error as Error).message}\`);
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
      return <div className={styles.loading}>Carregando autenticação...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }
  
  if (cart.length === 0 && isLoaded) {
      return (
          <div className={styles.container}>
              <h1 className={styles.title}>Seu carrinho está vazio</h1>
              <p style={{textAlign: 'center', color: 'var(--text-secondary)'}}>Adicione produtos ao seu carrinho antes de prosseguir para o checkout.</p>
          </div>
      )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Finalizar Compra</h1>
      <div className={styles.layout}>
        <form onSubmit={handlePlaceOrder} className={styles.formContainer}>
            <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Endereço de Entrega</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="fullName">Nome Completo</label>
                    <input type="text" id="fullName" name="fullName" value={shippingInfo.fullName} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="address">Endereço</label>
                    <input type="text" id="address" name="address" placeholder="Rua, número e complemento" value={shippingInfo.address} onChange={handleInputChange} required />
                </div>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="city">Cidade</label>
                        <input type="text" id="city" name="city" value={shippingInfo.city} onChange={handleInputChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="postalCode">CEP</label>
                        <input type="text" id="postalCode" name="postalCode" placeholder="00000-000" value={shippingInfo.postalCode} onChange={handleInputChange} required />
                    </div>
                </div>
            </div>

            <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Pagamento</h2>
                <p className={styles.disclaimer}>Esta é uma loja de demonstração. Nenhuma cobrança real será feita.</p>
                <div className={styles.formGroup}>
                    <label>Número do Cartão</label>
                    <input type="text" placeholder="**** **** **** ****" disabled />
                </div>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>Validade</label>
                        <input type="text" placeholder="MM/AA" disabled />
                    </div>
                    <div className={styles.formGroup}>
                        <label>CVC</label>
                        <input type="text" placeholder="***" disabled />
                    </div>
                </div>
            </div>
            
             <button type="submit" className={styles.confirmButton} disabled={isLoading || cart.length === 0}>
                {isLoading ? 'Processando...' : 'Finalizar Pedido e Pagar'}
            </button>
        </form>

        <div className={styles.summary}>
          <h2 className={styles.sectionTitle}>Resumo da Compra</h2>
          {cart.map(item => (
            <div key={item._id} className={styles.item}>
              <span className={styles.itemName}>{item.name} (x{item.quantity})</span>
              <span>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
            </div>
          ))}
          <div className={styles.total}>
            <strong>Total</strong>
            <strong>R$ {total.toFixed(2).replace('.', ',')}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
`;
const checkoutPageCssContent = `.container {
  max-width: 1100px;
  margin: 2.5rem auto;
  padding: 0 2rem;
}

.loading {
    text-align: center;
    padding: 4rem;
    font-size: 1.2rem;
    color: var(--text-secondary);
}

.title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
}

.layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 992px) {
  .layout {
    grid-template-columns: 1.5fr 1fr;
    gap: 3rem;
  }
}

.formContainer {
    background-color: var(--background-light);
    padding: 2rem;
    border-radius: 12px;
}

.formSection {
    margin-bottom: 2rem;
}

.sectionTitle {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
}

.formGroup {
    margin-bottom: 1rem;
}

.formGroup label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
}

.formGroup input {
    width: 100%;
    padding: 0.8rem 1rem;
    background-color: var(--background-dark);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    color: var(--text-primary);
    font-size: 1rem;
}
.formGroup input:focus {
    outline: none;
    border-color: var(--primary-accent);
}
.formGroup input:disabled {
    background-color: #2a3341;
    cursor: not-allowed;
}

.formRow {
    display: flex;
    gap: 1rem;
}
.formRow .formGroup {
    flex: 1;
}

.summary {
  background-color: var(--background-light);
  padding: 2rem;
  border-radius: 12px;
  height: fit-content;
  position: sticky;
  top: 120px;
}

.item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-color);
}
.item:last-of-type {
    border-bottom: none;
}
.itemName {
    padding-right: 1rem;
}

.total {
  display: flex;
  justify-content: space-between;
  font-size: 1.25rem;
  padding-top: 1rem;
  margin-top: 1rem;
  border-top: 2px solid var(--border-color);
  font-weight: bold;
}

.disclaimer {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    background-color: var(--background-dark);
    padding: 0.8rem;
    border-radius: 6px;
}

.confirmButton {
  background-color: var(--green-accent);
  color: white;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 8px;
  transition: background-color 0.2s, opacity 0.2s;
  width: 100%;
  font-size: 1.1rem;
  margin-top: 1rem;
}

.confirmButton:hover {
  background-color: var(--green-accent-hover);
}

.confirmButton:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
`;
const storeAdminPageContent = `'use client';
import React, { useState, useMemo, ChangeEvent, FormEvent, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import styles from './page.module.css';

type EditableProduct = Omit<Doc<"products">, '_id' | '_creationTime' | 'price' | 'stock'> & {
  _id?: Id<"products">;
  price: string | number;
  stock: string | number;
};

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'sales'>('dashboard');
  
  const products = useQuery(api.products.get);
  const sales = useQuery(api.orders.getAll);
  
  const addProduct = useMutation(api.products.add);
  const updateProduct = useMutation(api.products.update);
  const deleteProduct = useMutation(api.products.remove);

  const [editingProduct, setEditingProduct] = useState<EditableProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [salesSearchTerm, setSalesSearchTerm] = useState('');

  useEffect(() => {
    if (editingProduct && editingProduct._id) {
        const productToEdit = products?.find(p => p._id === editingProduct._id);
        if (productToEdit) {
            setEditingProduct(productToEdit);
        }
    }
  }, [editingProduct?._id, products]);

  const dashboardData = useMemo(() => {
    if (!sales || !products) return { totalRevenue: 0, totalSales: 0, topSoldProducts: [], lowStockProducts: 0 };
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
    const productSales: { [key: string]: { name: string, quantity: number } } = {};
    sales.forEach(sale => {
      sale.items.forEach(item => {
        const productIdStr = item.productId.toString();
        if (!productSales[productIdStr]) productSales[productIdStr] = { name: item.name, quantity: 0 };
        productSales[productIdStr].quantity += item.quantity;
      });
    });
    const topSoldProducts = Object.values(productSales).sort((a, b) => b.quantity - a.quantity).slice(0, 5);
    const lowStockProducts = products.filter(p => p.stock < 5).length;
    return { totalRevenue, totalSales: sales.length, topSoldProducts, lowStockProducts };
  }, [sales, products]);

  const filteredSales = useMemo(() => {
    if (!sales) return [];
    return sales.filter(sale => 
      !salesSearchTerm || sale.items.some(item => 
        item.name.toLowerCase().includes(salesSearchTerm.toLowerCase())
      )
    )
  }, [sales, salesSearchTerm]);

  const handleEdit = (product: Doc<"products">) => { setEditingProduct(product); setIsModalOpen(true); };
  const handleAddNew = () => { setEditingProduct({ name: '', price: '', stock: '', description: '', category: '', imageUrl: 'https://placehold.co/300x300/1f2937/d1d5db?text=Nova+Imagem' }); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingProduct(null); };

  const handleDelete = async (productId: Id<"products">) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
        try {
            await deleteProduct({ id: productId });
            alert('Produto excluído com sucesso.');
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            alert(\`Falha ao excluir o produto: \${(error as Error).message}\`);
        }
    }
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    const { _id, ...productData } = editingProduct;
    const productToSave = {
      ...productData,
      price: Number(productData.price),
      stock: Number(productData.stock),
    };

    try {
        if (_id) {
            await updateProduct({ id: _id, ...productToSave });
        } else {
            await addProduct(productToSave);
        }
        alert(\`Produto \${_id ? 'atualizado' : 'adicionado'} com sucesso.\`);
        closeModal();
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
        alert(\`Falha ao salvar o produto: \${(error as Error).message}\`);
    }
  };
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingProduct) return;
    setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
  };

  const renderContent = () => {
    if (products === undefined || sales === undefined) return <p className={styles.noData}>Carregando dados...</p>;
    
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className={styles.dashboardContent}>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}><h3>Receita Total</h3><p>R$ {dashboardData.totalRevenue.toFixed(2).replace('.', ',')}</p></div>
              <div className={styles.statCard}><h3>Vendas Totais</h3><p>{dashboardData.totalSales}</p></div>
              <div className={styles.statCard}><h3>Baixo Estoque (&lt;5)</h3><p>{dashboardData.lowStockProducts}</p></div>
            </div>
            <div className={styles.chartContainer}>
              <h3 className={styles.chartTitle}>Produtos Mais Vendidos (Top 5)</h3>
              <div className={styles.chartBars}>
                {dashboardData.topSoldProducts.length > 0 ? dashboardData.topSoldProducts.map(p => (
                  <div key={p.name} className={styles.chartBarWrapper}>
                    <div className={styles.chartLabel}>{p.name} ({p.quantity} vendidos)</div>
                    <div className={styles.chartBar} style={{ width: \`\${(p.quantity / (dashboardData.topSoldProducts[0]?.quantity || 1)) * 100}%\` }}></div>
                  </div>
                )) : <p className={styles.noData}>Nenhuma venda registrada ainda.</p>}
              </div>
            </div>
          </div>
        );
      case 'products':
        return (
          <div>
            <button onClick={handleAddNew} className={styles.addButton}>Adicionar Novo Produto</button>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead><tr><th>Nome</th><th>Preço</th><th>Estoque</th><th>Ações</th></tr></thead>
                <tbody>{products.map(p => (<tr key={p._id}><td data-label="Nome">{p.name}</td><td data-label="Preço">R$ {p.price.toFixed(2)}</td><td data-label="Estoque" className={p.stock < 5 ? styles.lowStock : ''}>{p.stock}</td><td data-label="Ações"><div className={styles.actions}><button onClick={() => handleEdit(p)} className={styles.editButton}>Editar</button><button onClick={() => handleDelete(p._id)} className={styles.deleteButton}>Excluir</button></div></td></tr>))}</tbody>
              </table>
            </div>
          </div>
        );
      case 'sales':
        return (
          <div>
            <input type="text" placeholder="Buscar por nome do produto..." value={salesSearchTerm} onChange={e => setSalesSearchTerm(e.target.value)} className={styles.searchInput}/>
            {filteredSales.length > 0 ? filteredSales.map(sale => (
              <div key={sale._id} className={styles.saleRecord}>
                <div className={styles.saleHeader}>
                  <span><strong>Data:</strong> {new Date(sale._creationTime).toLocaleString()}</span>
                  <span><strong>Total:</strong> R$ {sale.total.toFixed(2).replace('.', ',')}</span>
                </div>
                <table className={styles.saleItemsTable}>
                  <thead><tr><th>Produto</th><th>Qtd.</th><th>Preço Unit.</th></tr></thead>
                  <tbody>{sale.items.map((item, idx) => (<tr key={\`\${sale._id}-\${item.productId}-\${idx}\`}><td>{item.name}</td><td>{item.quantity}</td><td>R$ {item.price.toFixed(2).replace('.', ',')}</td></tr>))}</tbody>
                </table>
              </div>
            )) : <p className={styles.noData}>Nenhuma venda encontrada.</p>}
          </div>
        );
      default: return null;
    }
  };

  return (
    <>
      <h1 className={styles.title}>Painel de Administração</h1>
      <div className={styles.tabs}>
        <button className={\`\${styles.tab} \${activeTab === 'dashboard' ? styles.active : ''}\`} onClick={() => setActiveTab('dashboard')}>Dashboard</button>
        <button className={\`\${styles.tab} \${activeTab === 'products' ? styles.active : ''}\`} onClick={() => setActiveTab('products')}>Produtos</button>
        <button className={\`\${styles.tab} \${activeTab === 'sales' ? styles.active : ''}\`} onClick={() => setActiveTab('sales')}>Vendas</button>
      </div>
      {renderContent()}
      {isModalOpen && editingProduct && (
        <div className={styles.modalOverlay}><div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>{editingProduct._id ? 'Editar Produto' : 'Adicionar Produto'}</h2>
            <form onSubmit={handleSave}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}><label htmlFor="name">Nome</label><input id="name" name="name" type="text" value={editingProduct.name} onChange={handleInputChange} required /></div>
                <div className={styles.formGroup}><label htmlFor="price">Preço</label><input id="price" name="price" type="number" step="0.01" value={editingProduct.price} onChange={handleInputChange} required /></div>
                <div className={styles.formGroup}><label htmlFor="stock">Estoque</label><input id="stock" name="stock" type="number" value={editingProduct.stock} onChange={handleInputChange} required /></div>
                <div className={styles.formGroup}><label htmlFor="category">Categoria</label><input id="category" name="category" type="text" value={editingProduct.category} onChange={handleInputChange} required /></div>
              </div>
              <div className={styles.formGroup}><label htmlFor="imageUrl">URL da Imagem</label><input id="imageUrl" name="imageUrl" type="text" value={editingProduct.imageUrl} onChange={handleInputChange} required /></div>
              <div className={styles.formGroup}><label htmlFor="description">Descrição</label><textarea id="description" name="description" value={editingProduct.description} onChange={handleInputChange} required rows={3}></textarea></div>
              <div className={styles.modalActions}><button type="button" onClick={closeModal} className={styles.cancelButton}>Cancelar</button><button type="submit" className={styles.saveButton}>Salvar</button></div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const AdminPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <SignedIn>
                <AdminDashboard />
            </SignedIn>
            <SignedOut>
                <div className={styles.signedOutContainer}>
                    <h2 className={styles.signedOutTitle}>Acesso Restrito</h2>
                    <p className={styles.signedOutText}>Por favor, faça login para acessar o painel de administração.</p>
                    <SignInButton mode="modal">
                        <button className={styles.signInButton}>Fazer Login</button>
                    </SignInButton>
                </div>
            </SignedOut>
        </div>
    );
}

export default AdminPage;
`;
const storeAdminPageCssContent = `
/* Container and Tabs */
.container {
  max-width: var(--container-width);
  margin: 2.5rem auto;
  padding: 2rem;
  background-color: var(--background-light);
  border-radius: 12px;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
}

.tabs {
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.tab {
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-bottom: 3px solid transparent;
  color: var(--text-secondary);
}
.tab.active {
  color: var(--primary-accent);
  border-bottom-color: var(--primary-accent);
}

.noData {
  text-align: center;
  color: var(--text-secondary);
  padding: 2rem;
}

/* Signed Out View */
.signedOutContainer {
    text-align: center;
    padding: 3rem 1rem;
}
.signedOutTitle {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}
.signedOutText {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
}
.signInButton {
    background-color: var(--primary-accent);
    color: white;
    padding: 0.7rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    transition: background-color 0.2s;
}
.signInButton:hover {
    background-color: var(--primary-accent-hover);
}


/* Dashboard */
.statsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.statCard {
  background-color: var(--background-dark);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}
.statCard h3 {
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}
.statCard p {
  font-size: 2rem;
  font-weight: 700;
}

.chartContainer {
  background-color: var(--background-dark);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}
.chartTitle {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}
.chartBarWrapper {
  margin-bottom: 1rem;
}
.chartLabel {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}
.chartBar {
  height: 25px;
  background-color: var(--primary-accent);
  border-radius: 4px;
}

/* Products Table */
.addButton {
  background-color: var(--primary-accent);
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  margin-bottom: 1.5rem;
}
.addButton:hover {
  background-color: var(--primary-accent-hover);
}

.tableContainer {
  overflow-x: auto;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th, .table td {
  padding: 0.8rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}
.table th {
  background-color: var(--background-dark);
}

.lowStock {
    color: var(--red-accent);
    font-weight: 700;
}

.actions {
  display: flex;
  gap: 0.5rem;
}
.editButton, .deleteButton {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-weight: 600;
}
.editButton {
  background-color: var(--green-accent);
  color: white;
}
.editButton:hover { background-color: var(--green-accent-hover); }
.deleteButton {
  background-color: var(--red-accent);
  color: white;
}
.deleteButton:hover { background-color: var(--red-accent-hover); }


/* Sales View */
.searchInput {
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1.5rem;
  background-color: var(--background-dark);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-primary);
}

.saleRecord {
  background-color: var(--background-dark);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
}
.saleHeader {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}
.saleItemsTable {
  width: 100%;
  font-size: 0.9rem;
}

/* Modal */
.modalOverlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.modalContent {
  background-color: var(--background-light);
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}
.modalTitle {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}
.formGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.formGroup {
  margin-bottom: 1rem;
}
.formGrid .formGroup:last-child {
    grid-column: 1 / -1;
}

.formGroup label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  font-weight: 600;
}
.formGroup input, .formGroup textarea {
  width: 100%;
  padding: 0.7rem;
  background-color: var(--background-dark);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  color: var(--text-primary);
}
.modalActions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
.saveButton, .cancelButton {
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
}
.saveButton { background-color: var(--primary-accent); color: white; }
.saveButton:hover { background-color: var(--primary-accent-hover); }
.cancelButton { background-color: var(--border-color); }
.cancelButton:hover { background-color: #4b5563; }

/* Responsive Adjustments */
@media (max-width: 768px) {
    .table thead {
        display: none;
    }
    .table, .table tbody, .table tr, .table td {
        display: block;
        width: 100%;
    }
    .table tr {
        margin-bottom: 1rem;
        border: 1px solid var(--border-color);
        border-radius: 8px;
    }
    .table td {
        text-align: right;
        padding-left: 50%;
        position: relative;
        border-bottom: none;
    }
    .table td::before {
        content: attr(data-label);
        position: absolute;
        left: 0.8rem;
        width: calc(50% - 1.6rem);
        padding-right: 0.8rem;
        text-align: left;
        font-weight: bold;
        color: var(--text-primary);
    }
    .actions {
        justify-content: flex-end;
    }
    .formGrid {
        grid-template-columns: 1fr;
    }
}
`;

const orderConfirmationPageContent = `'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import styles from './page.module.css';

const OrderConfirmationContent: React.FC = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');

    const sale = useQuery(api.orders.getById, orderId ? { id: orderId as Id<"sales"> } : 'skip');

    if (sale === undefined) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                Carregando detalhes do pedido...
            </div>
        )
    }

    if (sale === null) {
        return (
            <div className={styles.container}>
                <h1 className={styles.titleError}>Pedido não encontrado</h1>
                <p>Não foi possível encontrar os detalhes do seu pedido. Verifique o link ou entre em contato com o suporte.</p>
                <Link href="/" className={styles.homeButton}>Voltar para a Home</Link>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.icon}>✅</div>
            <h1 className={styles.title}>Obrigado pelo seu pedido!</h1>
            <p className={styles.subtitle}>Sua compra foi finalizada com sucesso. Enviamos um email de confirmação para você.</p>
            
            <div className={styles.orderDetails}>
                <h2 className={styles.summaryTitle}>Resumo do Pedido</h2>
                <p className={styles.orderInfo}><strong>Número do Pedido:</strong> {sale._id}</p>
                <p className={styles.orderInfo}><strong>Data:</strong> {new Date(sale._creationTime).toLocaleString()}</p>
                
                <ul className={styles.itemList}>
                    {sale.items.map((item, index) => (
                        <li key={index} className={styles.item}>
                            <span>{item.name} (x{item.quantity})</span>
                            <span>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                        </li>
                    ))}
                </ul>
                
                <div className={styles.total}>
                    <strong>Total:</strong>
                    <strong>R$ {sale.total.toFixed(2).replace('.', ',')}</strong>
                </div>
            </div>

            <Link href="/" className={styles.homeButton}>Continuar Comprando</Link>
        </div>
    );
}

const OrderConfirmationPage: React.FC = () => {
    return (
        <Suspense fallback={
            <div className="loading-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh'}}>
                Carregando...
            </div>
        }>
            <OrderConfirmationContent />
        </Suspense>
    )
}

export default OrderConfirmationPage;
`;

const orderConfirmationPageCssContent = `
.container {
  max-width: 700px;
  margin: 2.5rem auto;
  padding: 2.5rem;
  background-color: var(--background-light);
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  text-align: center;
}

.icon {
    font-size: 4rem;
    line-height: 1;
    margin-bottom: 1rem;
    color: var(--green-accent);
}

.title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.titleError {
    color: var(--red-accent);
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
}

.orderDetails {
    background-color: var(--background-dark);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    text-align: left;
    margin-bottom: 2.5rem;
}

.summaryTitle {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border-color);
}

.orderInfo {
    color: var(--text-secondary);
    margin-bottom: 0.25rem;
}

.itemList {
    list-style: none;
    margin: 1.5rem 0;
    padding: 0;
}

.item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
}

.total {
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
}

.homeButton {
    background-color: var(--primary-accent);
    color: white;
    padding: 0.8rem 2rem;
    border-radius: 8px;
    font-weight: 700;
    font-size: 1rem;
    transition: background-color 0.2s;
    text-decoration: none;
    display: inline-block;
}

.homeButton:hover {
  background-color: var(--primary-accent-hover);
  color: white;
}

.loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    min-height: 50vh;
    text-align: center;
    font-size: 1.25rem;
    color: var(--text-secondary);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid var(--primary-accent);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}
`;

const toasterContextContent = `'use client';
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info';

export interface ToastState {
  message: string;
  type: ToastType;
  id: number;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
  toast: ToastState | null;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToasterProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastState | null>(null);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const hideToast = useCallback(() => {
    setToast(null);
    if (timerId) clearTimeout(timerId);
  }, [timerId]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    if (timerId) clearTimeout(timerId);
    setToast({ message, type, id: Date.now() });
    const newTimerId = setTimeout(() => {
        setToast(null);
    }, 3000);
    setTimerId(newTimerId);
  }, [timerId]);


  return (
    <ToastContext.Provider value={{ showToast, toast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToaster = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
};
`;

const toasterComponentContent = `'use client';
import React from 'react';
import { useToaster } from '@/context/ToasterContext';
import styles from './Toaster.module.css';

const Toaster: React.FC = () => {
    const { toast, hideToast } = useToaster();
    if (!toast) return null;
    
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };

    return (
        <div className={\`\${styles.toaster} \${styles[toast.type]}\`} role="alert" aria-live="assertive">
            <span className={styles.icon} aria-hidden="true">{icons[toast.type]}</span>
            <p className={styles.message}>{toast.message}</p>
            <button onClick={hideToast} className={styles.closeButton} aria-label="Fechar notificação">&times;</button>
        </div>
    );
};

export default Toaster;
`;

const toasterCssContent = `@keyframes slideInUp {
    from {
        transform: translate(-50%, 100px);
        opacity: 0;
    }
    to {
        transform: translate(-50%, 0);
        opacity: 1;
    }
}

.toaster {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem 1.5rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--background-dark);
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    animation: slideInUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    min-width: 300px;
    justify-content: center;
}

.toaster.success {
    background-color: var(--green-accent);
}

.toaster.error {
    background-color: var(--red-accent);
}

.toaster.info {
    background-color: var(--primary-accent);
}

.icon {
    font-size: 1.2rem;
}

.message {
    font-weight: 600;
    margin: 0; /* Override default p margin */
}

.closeButton {
    font-size: 1.5rem;
    line-height: 1;
    opacity: 0.8;
    margin-left: auto;
    padding-left: 1rem;
}
.closeButton:hover {
    opacity: 1;
}
`;


// --- TEMPLATES FOR 'BLOG' PROJECT ---

const blogGlobalsCssContent = `
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --background: #121212;
  --foreground: #f5f5f5;
  --card-background: #1e1e1e;
  --border-color: #2e2e2e;
  --primary: #bb86fc;
  --primary-hover: #a259ff;
  --secondary-text: #b3b3b3;
  --container-width: 800px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  font-family: var(--font-sans);
  background-color: var(--background);
  color: var(--foreground);
  line-height: 1.7;
}

a { color: var(--primary); text-decoration: none; transition: color 0.2s; }
a:hover { text-decoration: underline; color: var(--primary-hover); }
img { max-width: 100%; height: auto; display: block; }
h1, h2, h3 { line-height: 1.3; margin-bottom: 1rem; font-weight: 700; }
h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }
p { margin-bottom: 1.5rem; }
ul, ol { padding-left: 1.5rem; margin-bottom: 1.5rem; }
li { margin-bottom: 0.5rem; }

code {
  background-color: var(--card-background);
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.9em;
}

pre {
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  font-size: 0.9em;
}
pre code { background: none; padding: 0; border-radius: 0; }
`;
const blogLayoutContent = `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meu Blog Pessoal",
  description: "Um blog sobre tecnologia e desenvolvimento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flexGrow: 1, paddingTop: '2rem' }}>{children}</main>
            <Footer />
        </div>
      </body>
    </html>
  );
}`;
const blogHomePageContent = `import Link from 'next/link';
import { getPosts, Post } from '@/lib/posts';
import styles from './page.module.css';

export default function HomePage() {
  const posts = getPosts();

  return (
    <div>
      <section className={styles.intro}>
        <h1 className={styles.title}>Bem-vindo ao Meu Blog</h1>
        <p className={styles.description}>
          Aqui eu compartilho pensamentos e aprendizados sobre desenvolvimento de software, 
          tecnologia e carreira.
        </p>
      </section>
      
      <section>
        <h2 className={styles.sectionTitle}>Últimos Posts</h2>
        <div className={styles.postList}>
          {posts.map((post: Post) => (
            <article key={post.slug} className={styles.postCard}>
              <h3 className={styles.postTitle}>
                <Link href={\`/posts/\${post.slug}\`}>{post.title}</Link>
              </h3>
              <p className={styles.postExcerpt}>{post.excerpt}</p>
              <time dateTime={post.date} className={styles.postDate}>
                {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(post.date))}
              </time>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}`;
const blogHomePageCssContent = `
.intro {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
}
.title {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}
.description {
  font-size: 1.1rem;
  color: var(--secondary-text);
  max-width: 600px;
  margin: 0 auto;
}
.sectionTitle {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid var(--primary);
  display: inline-block;
  padding-bottom: 0.25rem;
}
.postList {
  display: grid;
  gap: 1.5rem;
}
.postCard {
  background-color: var(--card-background);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  transition: border-color 0.2s;
}
.postCard:hover {
  border-color: var(--primary);
}
.postTitle {
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}
.postExcerpt {
  color: var(--secondary-text);
  margin-bottom: 1rem;
}
.postDate {
  font-size: 0.9rem;
  color: var(--secondary-text);
}
`;
const blogPostsLibContent = `import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'src/posts');

export function getPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    const slug = fileName.replace(/\\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      content,
    };
  });

  return allPostsData.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
    const fullPath = path.join(postsDirectory, \`\${slug}.md\`);
    if (!fs.existsSync(fullPath)) {
        return undefined;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      content,
    };
}
`;
const blogPackageJsonContent = `{
  "name": "blog-pessoal",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "next": "14.2.3",
    "gray-matter": "^4.0.3",
    "marked": "^12.0.2"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18"
  }
}`;
const blogPostPageContent = `import { getPostBySlug, getPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import styles from './page.module.css';

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const htmlContent = marked(post.content);

  return (
    <article className={styles.post}>
      <header className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        <time dateTime={post.date} className={styles.date}>
          {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(post.date))}
        </time>
      </header>
      <div 
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: htmlContent }} 
      />
    </article>
  );
}`;
const blogPostPageCssContent = `
.post {
  /* No specific styles needed for the container itself, globals handle it. */
}
.header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  text-align: center;
}
.title {
  font-size: 2.8rem;
  margin-bottom: 0.5rem;
}
.date {
  color: var(--secondary-text);
  font-size: 1rem;
}
.content {
  /* The styles for h1, p, code etc. are in globals.css */
}
`;
const blogHeaderContent = `import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>Meu Blog</Link>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/about" className={styles.navLink}>Sobre</Link>
      </nav>
    </header>
  );
}`;
const blogHeaderCssContent = `
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}
.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--foreground);
}
.logo:hover {
    color: var(--foreground);
}
.nav {
  display: flex;
  gap: 1.5rem;
}
.navLink {
  color: var(--secondary-text);
}
.navLink:hover {
  color: var(--primary);
}
`;
const blogFooterContent = `import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© ${new Date().getFullYear()} Meu Blog Pessoal. Criado com Next.js.</p>
    </footer>
  );
}`;
const blogFooterCssContent = `
.footer {
  text-align: center;
  padding-top: 2rem;
  margin-top: 3rem;
  border-top: 1px solid var(--border-color);
  color: var(--secondary-text);
  font-size: 0.9rem;
}
`;
const blogAboutPageContent = `import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sobre Mim</h1>
      <p>
        Olá! Sou um desenvolvedor apaixonado por criar soluções inovadoras e 
        compartilhar conhecimento. Este blog é o meu espaço para documentar 
        minha jornada, explorar novas tecnologias e discutir tópicos que 
        considero importantes no mundo do desenvolvimento de software.
      </p>
      <p>
        Fique à vontade para explorar os posts e entrar em contato.
      </p>
    </div>
  );
}`;
const blogAboutPageCssContent = `
.container {
  /* Styles are mostly handled by globals */
}
.title {
  border-bottom: 2px solid var(--primary);
  display: inline-block;
  padding-bottom: 0.25rem;
  margin-bottom: 1.5rem;
}
`;
const blogSamplePost1Content = `---
title: 'Primeiro Post: Começando com Next.js'
date: '2024-01-15'
excerpt: 'Uma introdução rápida sobre por que escolhi Next.js para este blog e os primeiros passos para configurá-lo.'
---

## Bem-vindo ao meu novo blog!

Estou animado para começar esta jornada. Para o primeiro post, quero falar um pouco sobre a tecnologia por trás deste blog: **Next.js**.

### Por que Next.js?

- **Renderização Híbrida**: A capacidade de ter páginas estáticas (SSG) e renderizadas no servidor (SSR) no mesmo projeto é incrível.
- **Ecossistema Vercel**: A integração com a Vercel para deploy é perfeita.
- **Developer Experience**: A experiência de desenvolvimento é fantástica, com hot-reloading rápido e uma estrutura de arquivos intuitiva.

\`\`\`javascript
// Exemplo de um componente React em Next.js
function HomePage() {
  return <h1>Olá, Next.js!</h1>;
}

export default HomePage;
\`\`\`

Este é apenas o começo. Fique ligado para mais conteúdo!
`;
const blogSamplePost2Content = `---
title: 'A Importância de um CSS Limpo'
date: '2024-02-20'
excerpt: 'Reflexões sobre como uma boa organização de CSS pode transformar um projeto, tornando-o mais manutenível e escalável.'
---

## CSS não precisa ser uma bagunça

Muitos desenvolvedores têm uma relação de amor e ódio com CSS. No entanto, com as abordagens certas, ele pode ser um grande aliado.

### Estratégias para um CSS Melhor

1.  **Metodologias como BEM**: Usar convenções de nomenclatura ajuda a evitar conflitos.
2.  **CSS-in-JS**: Ferramentas como Styled Components ou Emotion trazem o CSS para dentro do seu componente, melhorando o escopo.
3.  **Variáveis CSS (Custom Properties)**: Elas são extremamente poderosas para criar sistemas de design consistentes e temas.

\`\`\`css
:root {
  --primary-color: #bb86fc;
  --background-color: #121212;
}

body {
  background-color: var(--background-color);
  color: var(--primary-color);
}
\`\`\`

Investir tempo em organizar seu CSS no início de um projeto sempre compensa a longo prazo.
`;
const blogReadmeContent = `# Blog Pessoal - Projeto Next.js
Este é um projeto Next.js gerado automaticamente.

## Como Executar
1.  Descompacte o arquivo .zip
2.  Abra o terminal na pasta do projeto.
3.  Execute \`npm install\` para instalar as dependências.
4.  Execute \`npm run dev\` para iniciar o servidor de desenvolvimento.
5.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador.
`;

// --- PROJECT TEMPLATES REGISTRY ---

type ProjectFile = string | { base64: string };

interface ProjectTemplate {
  name: string;
  slug: string;
  lifecycle: string[];
  files: Record<string, ProjectFile>;
}

export const PROJECT_TEMPLATES: Record<'store' | 'blog', ProjectTemplate> = {
  store: {
    name: 'Loja Simples',
    slug: 'loja-simples-com-convex',
    lifecycle: [
      'Definindo Schema de Dados no Convex',
      'Configurando Autenticação com Clerk',
      'Criando Queries e Mutations do Backend',
      'Protegendo Rotas e Endpoints da API',
      'Conectando Componentes React ao Backend',
      'Implementando Funcionalidades Reativas',
      'Empacotando projeto Full-Stack com Next.js e Convex',
    ],
    files: {
      'convex/auth.config.ts': convexAuthConfigContent,
      'convex/cart.ts': convexCartContent,
      'convex/orders.ts': convexOrdersContent,
      'convex/products.ts': convexProductsContent,
      'convex/schema.ts': convexSchemaContent,
      'convex/users.ts': convexUsersContent,
      'src/app/admin/page.tsx': storeAdminPageContent,
      'src/app/admin/page.module.css': storeAdminPageCssContent,
      'src/app/cart/page.tsx': storeCartPageContent,
      'src/app/cart/page.module.css': storeCartPageCssContent,
      'src/app/checkout/page.tsx': checkoutPageContent,
      'src/app/checkout/page.module.css': checkoutPageCssContent,
      'src/app/order-confirmation/page.tsx': orderConfirmationPageContent,
      'src/app/order-confirmation/page.module.css': orderConfirmationPageCssContent,
      'src/app/ConvexProviderWithClerk.tsx': convexProviderWithClerkContent,
      'src/app/favicon.ico': { base64: faviconBase64Content },
      'src/app/globals.css': storeGlobalsCssContent,
      'src/app/layout.tsx': storeLayoutContent,
      'src/app/page.tsx': storeHomePageContent,
      'src/app/page.module.css': storeHomePageCssContent,
      'src/components/Header.tsx': storeHeaderContent,
      'src/components/Header.module.css': storeHeaderCssContent,
      'src/components/Footer.tsx': storeFooterContent,
      'src/components/Footer.module.css': storeFooterCssContent,
      'src/components/ProductList.tsx': storeProductListComponent,
      'src/components/ProductList.module.css': storeProductListCssContent,
      'src/components/ProductCard.tsx': storeProductCardContent,
      'src/components/ProductCard.module.css': storeProductCardCssContent,
      'src/components/Toaster.tsx': toasterComponentContent,
      'src/components/Toaster.module.css': toasterCssContent,
      'src/context/CartContext.tsx': storeCartContextContent,
      'src/context/ToasterContext.tsx': toasterContextContent,
      'src/types/index.ts': storeTypesContent,
      'src/convex/_generated/api.d.ts': '// This file is auto-generated by Convex. Do not edit.',
      'src/convex/_generated/dataModel.d.ts': '// This file is auto-generated by Convex. Do not edit.',
      'public/.placeholder': '',
      'package.json': storePackageJsonContent,
      '.env.local.example': storeEnvExampleContent,
      'next.config.js': nextConfigContent,
      'tsconfig.json': tsConfigContent,
      'postcss.config.js': postcssConfigContent,
      'convex.json': convexJsonContent,
      '.gitignore': gitignoreContent,
      'README.md': storeReadmeContent,
    }
  },
  blog: {
    name: 'Blog Pessoal',
    slug: 'blog-pessoal-com-nextjs',
    lifecycle: [
      'Configurando Roteamento Dinâmico',
      'Criando Layouts com Next.js',
      'Implementando Geração de Páginas Estáticas (SSG)',
      'Processando Markdown para HTML',
      'Estilizando Componentes com CSS Modules',
      'Finalizando Estrutura de Arquivos',
      'Empacotando projeto com Next.js',
    ],
    files: {
      'src/app/about/page.tsx': blogAboutPageContent,
      'src/app/about/page.module.css': blogAboutPageCssContent,
      'src/app/posts/[slug]/page.tsx': blogPostPageContent,
      'src/app/posts/[slug]/page.module.css': blogPostPageCssContent,
      'src/app/favicon.ico': { base64: faviconBase64Content },
      'src/app/globals.css': blogGlobalsCssContent,
      'src/app/layout.tsx': blogLayoutContent,
      'src/app/page.tsx': blogHomePageContent,
      'src/app/page.module.css': blogHomePageCssContent,
      'src/components/Header.tsx': blogHeaderContent,
      'src/components/Header.module.css': blogHeaderCssContent,
      'src/components/Footer.tsx': blogFooterContent,
      'src/components/Footer.module.css': blogFooterCssContent,
      'src/lib/posts.ts': blogPostsLibContent,
      'src/posts/primeiro-post.md': blogSamplePost1Content,
      'src/posts/css-limpo.md': blogSamplePost2Content,
      'public/.placeholder': '',
      'package.json': blogPackageJsonContent,
      'next.config.js': nextConfigContent,
      'tsconfig.json': tsConfigContent,
      'postcss.config.js': postcssConfigContent,
      '.gitignore': gitignoreContent,
      'README.md': blogReadmeContent,
    }
  }
};