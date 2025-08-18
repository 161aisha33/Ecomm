import express from 'express';
import stripe from '../config/stripe.js';
import models from '../models/index.js';

const router = express.Router();

// Helper function to generate booking reference
function generateBookingReference() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = 'CRT-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Validate email format
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post('/bookings', async (req, res) => {
  try {
    const { full_name, email, phone, packageId, number_of_people, townId } = req.body;

    // Enhanced validation
    if (!full_name?.trim()) {
      return res.status(400).json({ error: 'Full name is required' });
    }
    if (!email?.trim()) {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    if (!packageId) {
      return res.status(400).json({ error: 'Package selection is required' });
    }
    if (isNaN(number_of_people) || number_of_people < 1) {
      return res.status(400).json({ error: 'Number of people must be at least 1' });
    }

    // Get package details
    const packageData = await models.Package.findByPk(packageId);
    if (!packageData) {
      return res.status(404).json({ error: 'Package not found' });
    }

    // Calculate total price
    const totalPrice = packageData.price * number_of_people;

    // Find or create customer
    let customer = await models.Customer.findOne({ where: { email } });
    if (!customer) {
      customer = await models.Customer.create({ 
        name: full_name.trim(), 
        email: email.trim(), 
        cell: phone?.trim() || null 
      });
    }

    // Generate booking reference
    const bookingRef = generateBookingReference();

    // Create booking with the reference
    const booking = await models.Booking.create({
      customerId: customer.customerId,
      packageId,
      townId: townId || null,
      numberOfPeople: number_of_people,
      totalPrice,
      status: 'pending',
      bookingRef
    });

    // Configure frontend URLs
    const frontendBaseUrl = process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080'
      : process.env.FRONTEND_URL || 'https://yourdomain.com';

    if (!frontendBaseUrl.startsWith('http')) {
      throw new Error('Invalid FRONTEND_URL in environment variables');
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email.trim(),
      line_items: [
        {
          price_data: {
            currency: 'zar',
            product_data: { 
              name: packageData.packageName,
              description: `Booking for ${number_of_people} people`
            },
            unit_amount: Math.round(packageData.price * 100),
          },
          quantity: number_of_people,
        },
      ],
      metadata: { 
        bookingId: booking.bookingId.toString(),
        bookingRef: bookingRef,
        customerId: customer.customerId.toString()
      },
      success_url: `${frontendBaseUrl}/success?session_id={CHECKOUT_SESSION_ID}&booking_ref=${bookingRef}`,
      cancel_url: `${frontendBaseUrl}/cancel?booking_ref=${bookingRef}`,
    });

    // Return success response
    res.json({ 
      success: true,
      checkoutUrl: session.url, 
      bookingId: booking.bookingId,
      bookingRef: bookingRef,
      amountTotal: totalPrice,
      customerEmail: email
    });

  } catch (error) {
    console.error('Booking error:', error);
    
    // Return appropriate status code based on error type
    const statusCode = error.type === 'StripeInvalidRequestError' ? 400 : 500;
    
    res.status(statusCode).json({ 
      success: false,
      error: 'Booking processing failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      ...(error.code && { code: error.code })
    });
  }
});

// Add endpoint to retrieve booking by reference
router.get('/bookings/:reference', async (req, res) => {
  try {
    const booking = await models.Booking.findOne({
      where: { bookingRef: req.params.reference },
      include: [
        { 
          model: models.Package,
          attributes: ['packageName', 'price', 'duration'] 
        },
        { 
          model: models.Customer,
          attributes: ['name', 'email', 'cell'] 
        }
      ]
    });

    if (!booking) {
      return res.status(404).json({ 
        success: false,
        error: 'Booking not found' 
      });
    }

    res.json({
      success: true,
      booking: {
        reference: booking.bookingRef,
        package: booking.Package,
        customer: booking.Customer,
        numberOfPeople: booking.numberOfPeople,
        totalPrice: booking.totalPrice,
        status: booking.status,
        createdAt: booking.createdAt
      }
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to retrieve booking'
    });
  }
});

export default router;