import express from 'express';
import stripe from '../config/stripe.js';
import nodemailer from 'nodemailer';
import models from '../models/index.js';

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/confirm-payment', async (req, res) => {
  const { session_id } = req.body;

  if (!session_id) {
    return res.status(400).json({ error: 'Session ID required' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items.data.price.product'],
    });

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    // Extract details from metadata
    const { bookingId, bookingRef } = session.metadata;
    const customerEmail = session.customer_details?.email;
    const lineItem = session.line_items.data[0];
    const packageName = lineItem.description || lineItem.price.product.name;
    const quantity = lineItem.quantity;
    const amountTotal = session.amount_total / 100;

    // Update booking status
    const booking = await models.Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    await booking.update({ status: 'paid' });

    // Save payment record
    await models.Payment.create({
      bookingId: booking.bookingId,
      stripePaymentId: session.payment_intent,
      amount: amountTotal,
      currency: session.currency,
      status: session.payment_status,
    });

    // Send confirmation email
    await transporter.sendMail({
      from: `"Cape Culture Tours" <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: 'Booking Confirmation',
      html: `
        <h2>Booking Confirmation</h2>
        <p><strong>Reference:</strong> ${bookingRef}</p>
        <p><strong>Package:</strong> ${packageName}</p>
        <p><strong>Participants:</strong> ${quantity}</p>
        <p><strong>Total Paid:</strong> R${amountTotal.toFixed(2)}</p>
        <p>Thank you for your booking!</p>
      `,
    });

    res.json({ 
      success: true,
      bookingRef,
      message: 'Payment confirmed and booking updated'
    });

  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({ 
      error: 'Failed to confirm payment',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;