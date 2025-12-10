import type { Request, Response } from 'express';
import { getStripe } from '../_core/stripe';
import * as db from '../db';

export async function handleStripeWebhook(req: Request, res: Response) {
  const stripe = getStripe();
  const sig = req.headers['stripe-signature'];
  
  if (!sig) {
    console.error('[Stripe Webhook] No signature provided');
    return res.status(400).send('No signature');
  }
  
  let event;
  
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('[Stripe Webhook] STRIPE_WEBHOOK_SECRET not configured');
      return res.status(500).send('Webhook secret not configured');
    }
    
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      webhookSecret
    );
  } catch (err: any) {
    console.error('[Stripe Webhook] Signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Handle test events
  if (event.id.startsWith('evt_test_')) {
    console.log('[Stripe Webhook] Test event detected, returning verification response');
    return res.json({ verified: true });
  }
  
  console.log('[Stripe Webhook] Event received:', event.type);
  
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const orderId = session.client_reference_id ? parseInt(session.client_reference_id) : null;
        
        if (orderId && session.payment_status === 'paid') {
          await db.updateOrderPaymentStatus(orderId, 'paid', session.payment_intent as string);
          await db.updateOrderStatus(orderId, 'processing');
          console.log(`[Stripe Webhook] Order ${orderId} marked as paid`);
        }
        break;
      }
      
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        console.log('[Stripe Webhook] Payment succeeded:', paymentIntent.id);
        break;
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        console.log('[Stripe Webhook] Payment failed:', paymentIntent.id);
        // Could update order status to failed here if needed
        break;
      }
      
      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }
    
    res.json({ received: true });
  } catch (error) {
    console.error('[Stripe Webhook] Error processing event:', error);
    res.status(500).send('Webhook processing error');
  }
}
