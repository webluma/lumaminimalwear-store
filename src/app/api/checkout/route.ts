import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function POST(request: NextRequest) {
  try {
    const { items, successUrl, cancelUrl } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    // Create line items for Stripe using price_data
    const lineItems = items.map(
      (item: {
        product: {
          id: string;
          name: string;
          description: string;
          image: string;
          price: number;
          stripeProductId?: string;
        };
        quantity: number;
      }) => {
        const imageUrl = item.product.image.startsWith("http")
          ? item.product.image
          : `${baseUrl}${item.product.image}`;

        return {
          price_data: {
            currency: "brl", // Real brasileiro
            product_data: {
              name: item.product.name,
              description: item.product.description,
              images: [imageUrl], // URL completa da imagem
              metadata: {
                auraId: item.product.id, // ID interno
                stripeProductId: item.product.stripeProductId, // ID do Stripe (se existir)
              },
            },
            unit_amount: Math.round(item.product.price * 100), // Preço em centavos
          },
          quantity: item.quantity,
        };
      }
    );

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Apenas cartão
      line_items: lineItems, // Itens do carrinho
      mode: "payment", // Pagamento único
      success_url:
        successUrl || `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${baseUrl}/cancel`,
      metadata: {
        orderId: `LUMA-${Date.now()}`, // ID único do pedido
      },
      customer_creation: "always", // Sempre criar cliente
      locale: "pt-BR", // Português brasileiro
    });

    return NextResponse.json({
      sessionId: session.id, // ID da sessão
      url: session.url, // URL do checkout
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}